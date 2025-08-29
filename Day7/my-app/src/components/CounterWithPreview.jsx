import React, { useState } from "react";

export default function CounterWithPreview() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Counter Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-80 mb-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Counter</h2>
        <p className="text-2xl font-bold mb-4">{count}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Live Text Preview Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Live Text Preview</h2>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded-xl p-2 w-full mb-4"
        />
        <p className="text-gray-700">Preview: <span className="font-bold">{text}</span></p>
      </div>
    </div>
  );
}