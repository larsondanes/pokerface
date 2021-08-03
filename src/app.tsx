import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { ClearableInput } from "./ClearableInput";
import { Hello } from "./hello";
import { NameList } from "./NameList";
import { SaveButton } from "./SaveButton";

console.log("hello, world");

render(<App />, document.getElementById("root"));

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [names, setNames] = useState([]);

  const handleSave = () => {
    setNames([...names, {firstName, lastName}]);
    setFirstName("");
    setLastName("");
    console.log({firstName, lastName});
  };

  return (<>
    <ClearableInput value={firstName} onChange={setFirstName}/>
    <ClearableInput value={lastName} onChange={setLastName}/>
    <SaveButton onClick={handleSave}/>
    <NameList names={names}/>
  </>)
}
