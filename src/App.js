import { Matrix } from "./components/Matrix/Matrix";
import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [level, setLevel] = useState(1);

  function handleLevelClear() {
    setLevel(level + 1);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Matrix level={level} onLevelClear={handleLevelClear} />
      <Footer level={level} />
    </>
  );
}

export default App;
