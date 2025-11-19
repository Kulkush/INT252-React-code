import { useState } from "react";

// Custom hook to toggle a boolean value
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Function to toggle between true/false
  const toggle = () => setValue((v) => !v);

  // Optionally let user set value directly
  return [value, toggle, setValue];
}

export default useToggle;

// import {useState} from "react";
// import useToggle from "./useToggle";

// function App() {
//   const [isVisible, toggleVisibility, setVisibility] = useToggle(false);

//   return (
//     <div>
//       <button onClick={toggleVisibility}>
//         {isVisible ? "Hide Text" : "Show Text"}
//       </button>
//       {isVisible && <p>Hello, I am Visible!</p>}

//       {/* Optional: Directly set the value */}
//       <button onClick={() => setVisibility(false)}>Force Hide</button>
//     </div>
//   );
// }

// export default App;



