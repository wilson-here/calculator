import { useState } from "react";
import "./styles/App.scss";
import CopyRight from "./components/CopyRight";
// import { handleInput } from "./utils/eventHandlers";
import { manipulators, numbers } from "./constants/btns";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handleInput = (value) => {
    if (input.endsWith(".") && value === ".") {
      return;
    } else if (input.endsWith("=") && "+-*/".includes(value)) {
      setInput(result + value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const calculate = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      console.log("An error occured: ", error);
      setResult("Error!!!");
    }
  };

  const clear = () => {
    setInput("");
    setResult(0);
  };

  return (
    <>
      <div className="cal">
        <div className="cal__scr">
          <div className="cal__scr-input">{input}</div>
          <div id="display" className="cal__scr-result">
            {result}
          </div>
        </div>
        <div className="cal__ctrl">
          {/* manipulator */}
          {manipulators.map((manipulator) => (
            <button
              className="cal__ctrl-btn cal__ctrl-man"
              key={manipulator.id}
              id={manipulator.id}
              onClick={() => {
                handleInput(manipulator.value);
              }}
            >
              {manipulator.value}
            </button>
          ))}

          {/* numbers */}
          {numbers.map((num) => (
            <button
              className="cal__ctrl-btn cal__ctrl-num"
              key={num.id}
              id={num.id}
              onClick={() => {
                handleInput(num.value.toString());
              }}
            >
              {num.value}
            </button>
          ))}

          {/* calculate */}
          <button
            className="cal__ctrl-btn cal__ctrl-man"
            id="equals"
            onClick={calculate}
          >
            =
          </button>
          {/* clear */}
          <button
            className="cal__ctrl-btn cal__ctrl-man"
            id="clear"
            onClick={clear}
          >
            AC
          </button>
        </div>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
