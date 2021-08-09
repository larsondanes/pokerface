import React from "react";
import { FunctionComponent } from "react";
import { Card } from "./RankService";
import "./card.scss";

interface HandProps {
  cards: ReadonlyArray<Card>;
  ranking: number | null;
};

const CardComponent: FunctionComponent<{ card: Card }> = ({ card }) => <div className="card" key={card.rank + card.suit}>{card.rank} of {card.suit}</div>

export const HandComponent: FunctionComponent<HandProps> = ({ cards, ranking }) => {
  return <>
    <div className="hand">
    {
      cards.map(c => <CardComponent card={c} />)
    }
    {
      (ranking !== null) && <div className="ranking">Ranking: {ranking}</div>
    }
    </div>
  </>
}