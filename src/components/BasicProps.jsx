import React, { useState } from "react";

function Button({ text, color, size, disabled, onClick }) {
  return (
    <button
      onChange={onChange}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-300
      ${size === "small" ? "text-sm px-4 py-1" : ""}
      ${size === "large" ? "text-lg px-8 py-3" : ""}
      ${size === "primary" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
      ${color === "secondary" ? "bg-gray-500 hover:bg-gray-600 text-white" : ""}
      ${color === "danger" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
      ${color === "success" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
       
       `}
    >
      {text}
    </button>
  );
}

function BasicProps() {
  const [clickCount, setclickCount]= useState(0)
  return <section className="p-4 bg-white rounded-xl shadow-2xl">
    <h2>BasicProps</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit quidem possimus laudantium id? Cum repellendus minus ducimus in labore porro!</p>
    <div className="space-y-4">
      <h3>Different Colors</h3>
      <div></div>
    </div>
    </section>;
}

export default BasicProps;
