import { useState } from "react";
import "./styles/App.scss";
import CopyRight from "./components/CopyRight";
// import { handleExpression } from "./utils/eventHandlers";
import { manipulators, numbers } from "./constants/btns";

function App() {
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState(0);
  const [inputBlock, setInputBlock] = useState("");
  const [result, setResult] = useState(0);

  const handleInput = (value) => {
    setInput((prevInput) => {
      // if (
      //   /[\d.]/.test(value) &&
      //   ((prevInput == 0 && value != 0) || /[1-9]/.test(prevInput))
      // ) {
      //   console.log("haha");

      //   setInputBlock(inputBlock.concat(value));
      // } else if (inputBlock.includes(".") && value === ".") {
      //   // return value;
      // } else if (
      //   (/\d/.test(prevInput) && /[-+*/]/.test(value)) ||
      //   /[-+*/]/.test(prevInput)
      // ) {
      //   setInputBlock(value);
      // } else if (prevInput == 0 && value == "0") {
      //   setExpression(0);
      //   setInputBlock(0);
      //   return value;
      // } else if (value === "=") {
      //   return value;
      // } else {
      //   return;
      // }

      // update inputBlock to see input number in the id of 'display'
      // 10. When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
      // 11. When the decimal element is clicked, a "." should append to the currently displayed value; two "." in one number should not be accepted
      if (/^0/.test(inputBlock) && value == 0) {
        setInputBlock(inputBlock.slice(0, 1));
        setExpression(expression.slice(0, 1));
      } else if (
        /\./g.test(inputBlock) &&
        /\./g.test(expression) &&
        value == "."
      ) {
        console.log("haha");
        // setInputBlock(inputBlock.slice(0, -1));
        // setExpression(expression.slice(0, -1));
        return;
      } else {
        setInputBlock(inputBlock.concat(value));
      }
      return value;
    });
    setExpression((prevExpression) => {
      if (/\d$/.test(prevExpression) || /\d/.test(value)) {
        return prevExpression + value;
      } else {
        return;
      }
    });
  };
  const calculate = () => {
    try {
      setResult(eval(expression.replaceAll("=", "")));
    } catch (error) {
      console.log("Error!!! ", error);
      setResult("Error!!!");
    }
  };

  const clear = () => {
    setExpression("");
    setInputBlock("");
    setResult(0);
    setInput(0);
  };

  return (
    <>
      <div className="cal">
        <div className="cal__scr">
          <div className="cal__scr-expression">{expression}</div>
          <div id="display" className="cal__scr-result">
            {input === 0 ? input : input === "=" ? result : inputBlock}
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
            onClick={() => {
              handleInput("=");
              calculate();
            }}
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
