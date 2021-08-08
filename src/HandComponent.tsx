import React from "react";
import { FunctionComponent } from "react";
import { Card } from "./RankService";

interface HandProps {
  cards: ReadonlyArray<Card>;
  ranking: number | null;
};

const CardComponent: FunctionComponent<{ card: Card }> = ({ card }) => <div key={card.rank + card.suit}>{card.rank} of {card.suit}</div>

export const HandComponent: FunctionComponent<HandProps> = ({ cards, ranking }) => {
  return <>
    {
      cards.map(c => <CardComponent card={c} />)
    }
    {
      (ranking !== null) && <div>Ranking: {ranking}</div>
    }
  </>
}