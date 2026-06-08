import MainBackground from "@/components/home/Background";
import { GameSelector } from "@/components/home/Games";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

const HomeView = () => {
  const [currentGame, setCurrentGame] = useState(0);
  return (
    <div className="w-full h-full flex flex-row">
      <MainBackground current={currentGame} />
      <div className="flex-1 flex w-full h-full p-12">
        <div className="flex-3 flex flex-col justify-end-safe"></div>
        <div className="flex-1 flex flex-col justify-between">
          {/* 游戏切换器 */}
          <div>
            <GameSelector
              setCurrentGame={setCurrentGame}
              currentGame={currentGame}
            />
          </div>
          <div>
            <div
              className="h-20 flex flex-1 justify-center items-center bg-white/65 backdrop-blur-sm overflow-clip rounded-xl hover:bg-white/85 ease-in-out transition"
              onClick={async () => {
                console.log(await invoke("commandTest"));
              }}
            >
              <span className="font-bold text-xl">启动游戏</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
