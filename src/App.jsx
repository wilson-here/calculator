import { useState } from "react";
import "./styles/App.scss";
import CopyRight from "./components/CopyRight";
import { handleClick } from "./utils/eventHandlers";
import { manipulators, numbers } from "./constants/btns";

function App() {
  const [result, setResult] = useState(0);
  return (
    <>
      <div className="cal">
        <div className="cal__scr">
          <div className="cal__scr-formula"></div>
          <div id="display" className="cal__scr-output">
            {result}
          </div>
        </div>
        <div className="cal__ctrl">
          {/* manipulator */}
          {manipulators.map((manipulator) => (
            <button
              className="cal__ctrl-btn"
              key={manipulator.id}
              id={manipulator.id}
              onClick={() => manipulator.cb(setResult)}
            >
              {manipulator.value}
            </button>
          ))}

          {/* numbers */}
          {numbers.map((num) => (
            <button
              className="cal__ctrl-btn"
              key={num.id}
              id={num.id}
              onClick={(e) => handleClick(e, result, setResult)}
            >
              {num.value}
            </button>
          ))}
        </div>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
