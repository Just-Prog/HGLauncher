import MainBackground from "@/components/home/Background";
import { GameSelector } from "@/components/home/Games";
import { useState } from "react";

const HomeView = () => {
  const [currentGame, setCurrentGame] = useState(0);
  return (
    <div className="w-full h-full flex">
      <MainBackground current={currentGame} />
      <div className="flex-1 flex w-full h-full">
        {/* 游戏切换器 */}
        <div className="absolute right-6 top-12 ">
          <GameSelector setCurrentGame={setCurrentGame} />
        </div>
        <div className="absolute right-6 bottom-6">
          <div className="w-64 h-20 flex flex-1 justify-center items-center bg-white/65 backdrop-blur-sm overflow-clip rounded-xl hover:bg-white/85 ease-in-out">
            <span className="font-bold text-xl">启动游戏</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
