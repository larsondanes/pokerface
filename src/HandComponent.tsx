import React from "react";
import { FunctionComponent } from "react";
import { Card } from "./Card";
import { CardComponent } from "./CardComponent";
import { PokerHand } from "./PokerHand";
import "./hand.scss";

interface HandProps {
  cards: ReadonlyArray<Card>;
  rankedHand: PokerHand | null;
};

export const HandComponent: FunctionComponent<HandProps> = ({ cards, rankedHand }) => {
  return <>
    <div className="hand">
      {
        cards.map(c => <CardComponent card={c} />)
      }
      {
        (rankedHand !== null) && <div className="handRank">Hand: {rankedHand.getDisplay()}</div>
      }
    </div>
  </>
}