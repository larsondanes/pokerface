import * as React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { RankService, Card } from "./RankService";
import { DrawHandButton } from "./DrawHandButton";
import { HandComponent } from "./HandComponent";
import { RankedHand } from "./RankedHand";
import { CustomHandInput } from "./CustomHandInput";

render(<App />, document.getElementById("root"));

function App() {
  const [hand, setHand] = useState<ReadonlyArray<Card>>([]);
  const [rankedHand, setRankedHand] = useState<RankedHand | null>(null);

  useEffect(() =>{
    if (hand.length) {
      setRankedHand(RankService.rankHand(hand));
    } else {
      setRankedHand(null);
    }
  }, [hand])

  const drawAndRankHand = () => {
    const deck = RankService.createDeck();
    const hand = RankService.drawHand(deck);
    setHand(hand);
  }

  return (<>
    <DrawHandButton onClick={drawAndRankHand}/>
    <CustomHandInput onDraw={hand => setHand(hand)} />
    <HandComponent cards={hand} rankedHand={rankedHand} />
  </>)
}
