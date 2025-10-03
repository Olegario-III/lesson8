import { useState } from "react";

// ColorPicker Component
function ColorPicker({ onColorChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="colorPicker">Pick a color: </label>
      <input
        type="color"
        id="colorPicker"
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
  );
}

// TextInput Component (Bonus)
function TextInput({ onColorChange }) {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateColor = (value) => {
    // Test if the input is a valid CSS color (name or hex)
    const testElement = document.createElement("div");
    testElement.style.backgroundColor = value;
    return testElement.style.backgroundColor !== "";
  };

  const handleBlur = (e) => {
    const value = e.target.value.trim();
    const valid = validateColor(value);
    setIsValid(valid);
    if (valid) {
      onColorChange(value); // Update parent state if valid
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="textInput">Enter a color (e.g., red, #FF0000): </label>
      <input
        type="text"
        id="textInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        placeholder="Enter color name or hex"
      />
      {!isValid && input && <p style={{ color: "red" }}>Invalid color name or hex</p>}
    </div>
  );
}

// Box Component
function Box({ color }) {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: color,
        border: "1px solid black",
      }}
    ></div>
  );
}

// App Component
function App() {
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default: black

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
      <h1>Color Picker App</h1>
      <ColorPicker onColorChange={handleColorChange} />
      <TextInput onColorChange={handleColorChange} />
      <Box color={selectedColor} />
    </div>
  );
}

export default App;