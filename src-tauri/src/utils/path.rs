use dirs;
use std::path::PathBuf;
use crate::consts::*;

pub fn get_data_folder_path () -> PathBuf {
    let dir = dirs::config_dir()
            .expect("parse config dir failed")
            .join(HG_APP_ID);
    std::fs::create_dir_all(&dir).ok();
    println!("config path: {:?}", dir);
    dir
}