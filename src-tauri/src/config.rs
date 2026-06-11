use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::{Arc, Mutex, OnceLock};
use uuid::Uuid;

use crate::utils::path::get_data_folder_path;
use log::{error, info, warn};

static APP_CONFIG: OnceLock<Arc<Mutex<AppConfig>>> = OnceLock::new();

/// 返回 config.toml 的完整路径：`{config_dir}/io.github.justprog.yahyl/config.toml`
fn config_path() -> &'static PathBuf {
    static PATH: OnceLock<PathBuf> = OnceLock::new();
    PATH.get_or_init(|| {
        let path = get_data_folder_path();
        path.join("config.toml")
    })
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct UIConfig {
    pub last_opened_game: u8
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    pub uuid: Uuid,
    pub ui: UIConfig
}

impl AppConfig {
    /// 从 `config_path()` 加载配置；若文件不存在则生成默认配置并立即落盘。
    /// 若文件已存在但缺少新增的配置项（例如升级后），自动将默认值补全到文件。
    pub fn load() -> Self {
        let path = config_path();

        let file_exists = path.exists();

        // 预先读取原始文件内容，用于后续判断是否需要补全新增配置项
        let original_content = if file_exists {
            std::fs::read_to_string(path).ok()
        } else {
            None
        };

        let settings = config::Config::builder()
            .add_source(
                config::File::new(
                    path.to_str().expect("config path is not valid UTF-8"),
                    config::FileFormat::Toml,
                )
                .required(false),
            )
            .build()
            .unwrap_or_else(|e| {
                warn!("Failed to load config, using defaults: {e}");
                config::Config::default()
            });

        let uuid = settings
            .get_string("uuid")
            .ok()
            .and_then(|s| Uuid::parse_str(&s).ok())
            .unwrap_or_else(Uuid::new_v4);

        let ui: UIConfig = settings.get("ui").ok().flatten().unwrap_or_else(|| {
            UIConfig { last_opened_game: 0 }
        });

        let config = Self { uuid, ui };

        // 判断是否需要落盘：文件不存在 或 文件中缺少新增的配置项
        let needs_save = if !file_exists {
            true
        } else if let Some(ref orig) = original_content {
            let new_toml = toml::to_string_pretty(&config).unwrap_or_default();
            let orig_val = toml::from_str::<toml::Value>(orig).ok();
            let new_val = toml::from_str::<toml::Value>(&new_toml).ok();
            orig_val != new_val
        } else {
            false
        };

        if needs_save {
            if let Err(e) = config.save() {
                error!("Failed to persist config: {e}");
            }
        }

        config
    }

    /// 初始化全局配置。应在 app setup 阶段调用且仅调用一次。
    /// 返回 `Arc<Mutex<Self>>` 以便注入 Tauri 托管状态。
    ///
    /// # Panics
    /// 若配置已初始化则 panic（重复初始化是 bug）。
    pub fn init_global() -> Arc<Mutex<Self>> {
        let config = Arc::new(Mutex::new(Self::load()));
        APP_CONFIG
            .set(Arc::clone(&config))
            .expect("AppConfig::init_global called more than once");
        config
    }

    /// 获取全局配置引用，用于读/写。
    ///
    /// # Panics
    /// 若 `init_global()` 尚未调用则 panic。
    pub fn global() -> &'static Arc<Mutex<Self>> {
        APP_CONFIG
            .get()
            .expect("AppConfig not initialized — call AppConfig::init_global() first")
    }

    /// 便捷方法：读取当前配置（锁内 clone）
    pub fn get() -> Self {
        Self::global().lock().expect("AppConfig lock poisoned").clone()
    }

    /// 持久化当前配置
    pub fn save(&self) -> Result<(), Box<dyn std::error::Error>> {
        let path = config_path();
        let toml_str = toml::to_string_pretty(self)?;
        info!("saving to {:?}\n{}", path, toml_str);
        std::fs::write(path, toml_str)?;
        Ok(())
    }
}
