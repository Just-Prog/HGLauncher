import { useState } from "react";
import { ICON_AK, ICON_ENFIELD, ICON_PMPM } from "../consts";

const GameSelectorItem = ({
  icon,
  desc,
  onClick,
}: {
  icon: string;
  desc: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="overflow-clip gap-x-4 flex flex-row justify-start items-center"
      onClick={onClick}
    >
      <img className="rounded-lg w-8 h-8 object-cover" src={icon} alt="game" />
      <span>{desc}</span>
    </div>
  );
};

const GameSelector = ({
  setCurrentGame,
  currentGame,
}: {
  setCurrentGame: (param1: number) => void;
  currentGame: number;
}) => {
  const GameSelectorItems: string[] = [ICON_AK, ICON_ENFIELD, ICON_PMPM];
  const GameSelectorItemDescs_zh_CN: string[] = [
    "明日方舟",
    "明日方舟：终末地",
    "泡姆泡姆",
  ];
  const [selectorExpanded, setSelectorExpanded] = useState<boolean>(false);
  return (
    <div className="rounded-xl bg-white/78 backdrop-blur-[2px] flex flex-col gap-y-3 p-4 transition ease-in-out">
      {selectorExpanded ? (
        GameSelectorItems.map((v, k) => (
          <GameSelectorItem
            icon={v}
            key={k}
            onClick={() => {
              setCurrentGame(k);
              setSelectorExpanded(false);
            }}
            desc={GameSelectorItemDescs_zh_CN[k]}
          />
        ))
      ) : (
        <GameSelectorItem
          onClick={() => {
            setSelectorExpanded(true);
          }}
          icon={GameSelectorItems[currentGame]}
          desc={GameSelectorItemDescs_zh_CN[currentGame]}
        />
      )}
    </div>
  );
};

export { GameSelector };
