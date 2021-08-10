import * as React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { PokerService } from "../poker/PokerService";
import { DrawHandButton } from "./DrawHandButton";
import { HandComponent } from "./HandComponent";
import { PokerHand } from "../poker/hands/PokerHand";
import { CustomHandInput } from "./CustomHandInput";
import { Card } from "../poker/Card";

render(<App />, document.getElementById("root"));

function App() {
  const [hand, setHand] = useState<ReadonlyArray<Card>>([]);
  const [rankedHand, setRankedHand] = useState<PokerHand | null>(null);
  const [showError, setShowError] = useState(false);

  /**
   * Update state when hand changes
   */
  useEffect(() => {
    // setting the hand to something new, rank it and stop displaying
    // the error
    if (hand.length) {
      setRankedHand(PokerService.rankHand(hand));
      setShowError(false);
    } else {
      // clear rank
      setRankedHand(null);
    }
  }, [hand]);

  /**
   * Update state when showError changes
   */
  useEffect(() => {
    // check for showError, set hand to empty if true
    if (showError) {
      setHand([]);
    }
  }, [showError])

  /**
   * Draw a random hand of 5 unique Cards
   */
  const drawHand = () => {
    const deck = PokerService.createDeck();
    const hand = PokerService.drawHand(deck);
    setHand(hand);
  };

  return (
    <>
      <DrawHandButton onClick={drawHand} />
      <CustomHandInput
        onDraw={(hand) => setHand(hand)}
        onError={() => setShowError(true)}
        showError={showError}
      />
      <HandComponent cards={hand} rankedHand={rankedHand} />
    </>
  );
}
