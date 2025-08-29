import React from "react";
import CounterWithPreview from "./components/CounterWithPreview";

function App() {

  return (
    <div style={{
      width:"100vw",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"rgba(39, 99, 160, 0.82)",
      color:"white",
    }}>
      <CounterWithPreview />
    </div>
  );
}

export default App;
