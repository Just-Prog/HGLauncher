const AboutView = () => {
  return (
    <div className="flex-1 flex justify-center items-center h-full">
      <div className="flex flex-col gap-y-4 items-center">
        <div className="flex-col flex gap-y-4 justify-center items-center text-center">
          <div className="broder-0 rounded-2xl w-32 h-32 bg-white text-sm">
            THERE
            <br />
            SHOULD
            <br />
            BE
            <br />
            AN
            <br />
            ICON
            <br />
            QAQ
          </div>
          <span className="text-3xl">
            Yet Another Hypergryph Games Launcher
          </span>
          <span>使用 Tauri / React / MUI 开发</span>
        </div>
        <div className="w-full border border-gray-400/20" />
        <div>GitHub @Just-Prog</div>
      </div>
    </div>
  );
};

export default AboutView;
