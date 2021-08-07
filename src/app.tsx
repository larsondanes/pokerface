import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { ClearableInput } from "./ClearableInput";
import { Hello } from "./hello";
import { NameList, Name } from "./NameList";
import { SaveButton } from "./SaveButton";
import { RankService, Card, Rank } from "./RankService";

console.log("hello, world");

render(<App />, document.getElementById("root"));

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [names, setNames] = useState<Name[]>([]);

  const handleSave = () => {
    setNames([...names, {firstName, lastName}]);
    setFirstName("");
    setLastName("");
    console.log({firstName, lastName});

    let deck = RankService.createDeck();
    //let hand = RankService.drawHand(deck);
    let hand: Card[] = [
      { rank: Rank.FOUR, suit: "Hearts" },
      { rank: Rank.FOUR, suit: "Diamonds" },
      { rank: Rank.KING, suit: "Hearts" },
      { rank: Rank.TEN, suit: "Hearts" },
      { rank: Rank.TEN, suit: "Spades" }
    ];
    let ranking = RankService.rankHand(hand);
    console.log({ranking});
  };

  return (<>
    <ClearableInput value={firstName} onChange={setFirstName}/>
    <ClearableInput value={lastName} onChange={setLastName}/>
    <SaveButton onClick={handleSave}/>
    <NameList names={names}/>
  </>)
}
