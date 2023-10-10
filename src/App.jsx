import { useState } from "react";
import "./styles/App.scss";
import CopyRight from "./components/CopyRight";
import { manipulators, numbers } from "./constants/btns";

function App() {
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState(0);
  const [inputBlock, setInputBlock] = useState("");
  const [result, setResult] = useState(0);
  let flagMultipleDecimal = false;
  let flagMultipleZero = false;
  const handleInput = (value) => {
    setInput(value);
    setInputBlock((prevInBlock) => {
      // no operator before input number, exclude subtract
      if (prevInBlock === "" && /[+*/]/.test(value)) {
        return "";
      }

      // allow number block
      if (
        !/^0+/.test(prevInBlock) &&
        /\d$/.test(prevInBlock) &&
        /\d/.test(value)
      ) {
        return prevInBlock + value;
      }
      // no input block begin with multiple zero
      if (/^0/.test(prevInBlock) && value == 0) {
        flagMultipleZero = true;
        return 0;
      }
      if (/^0/.test(prevInBlock) && value != 0) {
        flagMultipleZero = true;
        return (prevInBlock + value).replace(/^0+/, "");
      }
      // no 2 decimal in a number block
      if (prevInBlock.includes(".") && value === ".") {
        flagMultipleDecimal = true;
        return prevInBlock;
      }

      // seperate operator and number block / decimal number block
      if (
        (/\d$/.test(prevInBlock) && /[-+*/]/.test(value)) ||
        (/[-+*/]$/.test(prevInBlock) && /[\d.]/.test(value))
      ) {
        return value;
      }

      // only 1 operator allow in one input block
      if (/[-+*/]$/.test(prevInBlock) && /[-+*/]/.test(value)) {
        return value;
      }

      // no input block of "="
      if (value === "=") {
        return prevInBlock;
      }
      return prevInBlock + value;
    });
    setExpression((prevExpression) => {
      // no operator before input number, exclude subtract
      if (prevExpression === "" && /[+*/]/.test(value)) {
        return "";
      }

      // no input block begin with multiple zero
      if (flagMultipleZero === true) {
        return (prevExpression + value)
          .replace(/\b0+(\d+)/g, "$1")
          .replace(/\b0+/g, "0");
      }

      // no 2 decimal in a number block
      if (flagMultipleDecimal === true) {
        return prevExpression;
      }
      //  3 operator
      if (/[-+*/]-$/.test(prevExpression) && value === "-") {
        return prevExpression;
      }

      if (/[-+*/]-$/.test(prevExpression) && /[-+*/]/.test(value)) {
        return prevExpression.slice(0, -2) + value;
      }

      // only 1 operator allow, exclude "+-" "*-" "/-"
      if (/[-+*/]$/.test(prevExpression) && /[+*/]/.test(value)) {
        return prevExpression.slice(0, -1) + value;
      }

      // "--"
      if (/-$/.test(prevExpression) && value === "-") {
        return prevExpression + " " + value;
      }

      // display "=" and result in the expression line
      if (value === "=" && !prevExpression.includes("=")) {
        return prevExpression + value + eval(prevExpression);
      }

      // no 2 consecutive "=" input
      if (value === "=" && prevExpression.includes("=")) {
        return prevExpression;
      }

      // after "=", input an operator, the expression line will ONLY display result with that operator
      if (prevExpression.includes("=") && /[-+*/]/.test(value)) {
        return result + value;
      }
      return prevExpression + value;
    });
  };
  const calculate = () => {
    try {
      if (!expression.includes("=")) {
        setResult(eval(expression));
      }
    } catch (error) {
      console.log("Error: ", error);
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
            {expression === "" ? 0 : input === "=" ? result : inputBlock}
          </div>
        </div>
        <div className="cal__ctrl">
          {/* manipulator */}
          {manipulators.map((manipulator) => (
            <button
              className="cal__ctrl-btn cal__ctrl-man orange"
              key={manipulator.id}
              id={manipulator.id}
              onClick={(e) => {
                handleInput(e.target.textContent);
              }}
            >
              {manipulator.value}
            </button>
          ))}

          {/* numbers */}
          {numbers.map((num) => (
            <button
              className="cal__ctrl-btn cal__ctrl-num grey-dark"
              key={num.id}
              id={num.id}
              onClick={(e) => {
                handleInput(e.target.textContent);
              }}
            >
              {num.value}
            </button>
          ))}

          {/* calculate */}
          <button
            className="cal__ctrl-btn cal__ctrl-man orange"
            id="equals"
            onClick={() => {
              calculate();
              handleInput("=");
            }}
          >
            =
          </button>
          {/* clear */}
          <button
            className="cal__ctrl-btn cal__ctrl-man orange"
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
