use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::{Arc, Mutex, OnceLock};
use uuid::Uuid;

use crate::utils::path::get_data_folder_path;

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
pub struct AppConfig {
    pub uuid: Uuid,
}

impl AppConfig {
    /// 从 `config_path()` 加载配置；若文件不存在则生成默认配置并立即落盘。
    pub fn load() -> Self {
        let path = config_path();

        let file_exists = path.exists();
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
                eprintln!("Failed to load config, using defaults: {e}");
                config::Config::default()
            });

        let uuid = settings
            .get_string("uuid")
            .ok()
            .and_then(|s| Uuid::parse_str(&s).ok())
            .unwrap_or_else(Uuid::new_v4);

        let config = Self { uuid };

        // 首次运行时配置文件尚不存在，立即落盘
        if !file_exists {
            if let Err(e) = config.save() {
                eprintln!("Failed to persist initial config: {e}");
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
        println!("saving to {:?}\n{}", path, toml_str);
        std::fs::write(path, toml_str)?;
        Ok(())
    }
}
