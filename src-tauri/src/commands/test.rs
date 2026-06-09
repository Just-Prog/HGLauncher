use serde::Serialize;
use std::sync::{Arc, Mutex};
use tauri::State;

use crate::config::AppConfig;

#[derive(Serialize)]
pub struct TestResponse {
    pub uuid: String,
    pub a: String,
}

#[tauri::command]
pub async fn command_test(
    state: State<'_, Arc<Mutex<AppConfig>>>,
    a: String,
) -> Result<TestResponse, String> {
    let cfg = state.lock().map_err(|e| e.to_string())?;
    Ok(TestResponse {
        uuid: cfg.uuid.to_string(),
        a,
    })
}