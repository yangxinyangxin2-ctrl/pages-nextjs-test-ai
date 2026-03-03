"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForNewValue) {
      setDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const value = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(display);
    } else if (operator) {
      const current = parseFloat(prevValue);
      const newValue = calculate(current, value, operator);
      setDisplay(String(newValue));
      setPrevValue(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (!operator || prevValue === null) return;

    const value = parseFloat(display);
    const current = parseFloat(prevValue);
    const newValue = calculate(current, value, operator);

    setDisplay(String(newValue));
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-black">
      <div className="bg-gray-100 p-4 rounded-lg mb-4 text-right">
        <div className="text-3xl font-bold text-gray-800 truncate">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-100 text-red-600 font-bold py-3 rounded-lg hover:bg-red-200 transition"
        >
          AC
        </button>
        <button
          onClick={handlePercent}
          className="bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition"
        >
          %
        </button>
        <button
          onClick={() => handleOperator("/")}
          className="bg-orange-100 text-orange-600 font-bold py-3 rounded-lg hover:bg-orange-200 transition"
        >
          ÷
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(String(num))}
            className="bg-gray-50 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperator("*")}
          className="bg-orange-100 text-orange-600 font-bold py-3 rounded-lg hover:bg-orange-200 transition"
        >
          ×
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(String(num))}
            className="bg-gray-50 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperator("-")}
          className="bg-orange-100 text-orange-600 font-bold py-3 rounded-lg hover:bg-orange-200 transition"
        >
          -
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(String(num))}
            className="bg-gray-50 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperator("+")}
          className="bg-orange-100 text-orange-600 font-bold py-3 rounded-lg hover:bg-orange-200 transition"
        >
          +
        </button>

        <button
          onClick={() => handleDigit("0")}
          className="col-span-2 bg-gray-50 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="bg-gray-50 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          .
        </button>
        <button
          onClick={handleEqual}
          className="bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition shadow-lg shadow-blue-500/30"
        >
          =
        </button>
      </div>
    </div>
  );
}
