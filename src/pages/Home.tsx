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
      </div>
    </div>
  );
};

export default HomeView;
