// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

mod commands;
mod consts;
mod config;
mod utils;

use commands::*;
use config::AppConfig;
use tauri::Manager;
use utils::logging::DualLogger;
use utils::path::get_data_folder_path;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // 在 Tauri 启动之前初始化日志系统
    let data_dir = get_data_folder_path();
    if let Err(e) = DualLogger::init(data_dir) {
        eprintln!("Failed to initialize logger: {e}");
    }

    tauri::Builder::default()
        .setup(|app| {
            let config = AppConfig::init_global();
            app.manage(config);
            Ok(())
        })
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![command_test])
        .run(tauri::generate_context!())
        .expect("error");
}
