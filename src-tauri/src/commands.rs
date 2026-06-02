#[tauri::command]
pub async fn test() -> String{
  format!("Hello from Rust")
}