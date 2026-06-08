use serde::Serialize;
use uuid::Uuid;

#[derive(Serialize)]
pub struct TestResponse {
    pub uuid: String,
}

#[tauri::command]
pub async fn commandTest() -> Result<TestResponse, String> {
    let uuid = Uuid::new_v4();
    Ok(TestResponse {
        uuid: uuid.to_string(),
    })
}