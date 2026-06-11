use chrono::Local;
use log::{LevelFilter, Log, Metadata, Record};
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;

/// 同时写入日志文件与 stderr 的日志器。
///
/// 日志文件放在 `data_dir` 下，文件名格式为 `hglauncher_YYYY-MM-DD_HHMMSS.log`，
/// 其中时间戳取程序启动时的时间（即构造时刻）。
pub struct DualLogger {
    file: Mutex<File>,
}

impl DualLogger {
    /// 创建一个 `DualLogger`，日志文件位于 `data_dir` 下，文件名包含启动时间戳。
    pub fn new(data_dir: PathBuf) -> std::io::Result<Self> {
        let timestamp = Local::now().format("%Y-%m-%d_%H%M%S");
        let log_path = data_dir.join(format!("hglauncher_{timestamp}.log"));

        let file = OpenOptions::new()
            .create(true)
            .write(true)
            .append(true)
            .open(&log_path)?;

        // 立即在日志文件中记录一条启动标记
        let header = format!(
            "[{}] [INFO] Logger initialized — logging to {:?}\n",
            Local::now().format("%Y-%m-%d %H:%M:%S%.3f"),
            log_path
        );

        // 同时打印到控制台让用户知道文件在哪
        let _ = std::io::stderr().write_all(header.as_bytes());

        Ok(Self {
            file: Mutex::new(file),
        })
    }

    /// 初始化全局日志器。应在程序最早期调用，且仅调用一次。
    ///
    /// # Panics
    /// 若 `log::set_logger` 多次调用则 panic。
    pub fn init(data_dir: PathBuf) -> Result<(), Box<dyn std::error::Error>> {
        let logger = Self::new(data_dir)?;
        log::set_boxed_logger(Box::new(logger)).map_err(|e| format!("set_logger: {e}"))?;
        log::set_max_level(LevelFilter::Info);
        Ok(())
    }
}

impl Log for DualLogger {
    fn enabled(&self, metadata: &Metadata) -> bool {
        metadata.level() <= log::Level::Info
    }

    fn log(&self, record: &Record) {
        if !self.enabled(record.metadata()) {
            return;
        }

        let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S%.3f");
        let level = record.level();
        let target = record.target();
        let line = format!("[{timestamp}] [{level}] [{target}] {}\n", record.args());

        // 写入文件
        if let Ok(mut file) = self.file.lock() {
            let _ = file.write_all(line.as_bytes());
            let _ = file.flush();
        }

        // 写入 stderr（控制台）
        let _ = std::io::stderr().write_all(line.as_bytes());
    }

    fn flush(&self) {
        if let Ok(mut file) = self.file.lock() {
            let _ = file.flush();
        }
    }
}
