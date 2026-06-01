import "./App.css";

import MainAppFrame from "./components/global/Main";
import TitleBar from "./components/global/TitleBar";

function App() {
  return (
    <>
      <TitleBar />
      <main>
        <MainAppFrame />
      </main>
    </>
  );
}

export default App;
