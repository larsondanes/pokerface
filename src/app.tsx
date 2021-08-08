import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { ClearableInput } from "./ClearableInput";
import { Hello } from "./hello";
import { NameList, Name } from "./NameList";
import { SaveButton } from "./SaveButton";
import { RankService, Card, Rank } from "./RankService";
import { DrawHandButton } from "./DrawHandButton";
import { HandComponent } from "./HandComponent";

console.log("hello, world");

render(<App />, document.getElementById("root"));

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [names, setNames] = useState<Name[]>([]);

  const [hand, setHand] = useState<ReadonlyArray<Card>>([]);
  const [ranking, setRanking] = useState<number | null>(null);

  const handleSave = () => {
    setNames([...names, {firstName, lastName}]);
    setFirstName("");
    setLastName("");
    console.log({firstName, lastName});

    //let deck = RankService.createDeck();
    //let hand = RankService.drawHand(deck);
 
    //let ranking = RankService.rankHand(hand);
    //console.log({ranking});
  };

  // let hand: Card[] = [
  //   { rank: Rank.FOUR, suit: "Hearts" },
  //   { rank: Rank.FOUR, suit: "Diamonds" },
  //   { rank: Rank.KING, suit: "Hearts" },
  //   { rank: Rank.TEN, suit: "Hearts" },
  //   { rank: Rank.TEN, suit: "Spades" }
  // ];

  const deck = RankService.createDeck();

  const drawHand = (deck: Card[]) => {
      const hand = RankService.drawHand(deck);
      setHand(hand);
  }

  const rankHand = (hand: ReadonlyArray<Card>): number => {
    return RankService.rankHand(hand);
  }

  const drawAndRankHand = (deck: Card[]): number => {
    const hand = RankService.drawHand(deck);
    setHand(hand);
    const ranking = RankService.rankHand(hand);
    setRanking(ranking);
    return ranking;
  }

  return (<>
    {/* <ClearableInput value={firstName} onChange={setFirstName}/>
    <ClearableInput value={lastName} onChange={setLastName}/>
    <SaveButton onClick={handleSave}/>
    <NameList names={names}/> */}
    <DrawHandButton onClick={() => drawAndRankHand(deck)}/>
    <HandComponent cards={hand} ranking={ranking} />
    {/* <HandRank hand={hand} /> */}

  </>)
}
