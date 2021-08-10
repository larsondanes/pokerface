import * as React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { PokerService } from "./PokerService";
import { DrawHandButton } from "./DrawHandButton";
import { HandComponent } from "./HandComponent";
import { PokerHand } from "./PokerHand";
import { CustomHandInput } from "./CustomHandInput";
import { Card } from "./Card";

render(<App />, document.getElementById("root"));

function App() {
  const [hand, setHand] = useState<ReadonlyArray<Card>>([]);
  const [rankedHand, setRankedHand] = useState<PokerHand | null>(null);

  useEffect(() =>{
    if (hand.length) {
      setRankedHand(PokerService.rankHand(hand));
    } else {
      setRankedHand(null);
    }
  }, [hand])

  const drawAndRankHand = () => {
    const deck = PokerService.createDeck();
    const hand = PokerService.drawHand(deck);
    setHand(hand);
  }

  return (<>
    <DrawHandButton onClick={drawAndRankHand}/>
    <CustomHandInput onDraw={hand => setHand(hand)} />
    <HandComponent cards={hand} rankedHand={rankedHand} />
  </>)
}
