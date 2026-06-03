import { ICON_AK, ICON_ENFIELD, ICON_PMPM } from "../consts";

const GameSelectorItem = ({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) => {
  return (
    <div className="rounded w-14 h-14 object-cover overflow-clip">
      <img src={icon} alt="game" onClick={onClick} />
    </div>
  );
};

const GameSelector = ({
  setCurrentGame,
}: {
  setCurrentGame: (param1: number) => void;
}) => {
  const GameSelectorItems: string[] = [ICON_AK, ICON_ENFIELD, ICON_PMPM];
  return (
    <div className="rounded bg-white/10 backdrop-blur-md flex flex-col gap-y-2">
      {GameSelectorItems.map((v, k) => (
        <GameSelectorItem icon={v} key={k} onClick={() => setCurrentGame(k)} />
      ))}
    </div>
  );
};

export { GameSelector };
