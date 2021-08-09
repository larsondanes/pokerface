import { FunctionComponent, useState } from "react";
import * as React from "react";
import { CardRank, Suit } from "./Card";
import { Card } from "./RankService";

export interface CustomHandInputProps {
  onDraw: (hand: Card[]) => void
}
export const CustomHandInput: FunctionComponent<CustomHandInputProps> = ({ onDraw }) => {
  const [value, setValue] = useState("");

  const handleDraw = () => {
    const faceCards: Record<string, CardRank> = {
      A: CardRank.ACE,
      J: CardRank.JACK,
      Q: CardRank.QUEEN,
      K: CardRank.KING
    }
    const suitMapping: Record<string, Suit> = {
        H: Suit.Heart,
        C: Suit.Club,
        D: Suit.Diamond,
        S: Suit.Spade
      }

    const cards: Card[] = [];

    // TODO: Validation
    const cardParts: string[] = value.split(" ");
    for (const cardStr of cardParts) {
      let rankIdentifier = cardStr[0].toUpperCase();
      let suitIdentifier = cardStr[1].toUpperCase();

      const rank: CardRank = faceCards[rankIdentifier] || Number(rankIdentifier);
      const suit: Suit = suitMapping[suitIdentifier];

      cards.push({rank, suit});
    }

    onDraw(cards);

  }
  return <>
    <input type="text" placeholder="5S JD QH AC 4D" onChange={e => setValue(e.target.value)} value={value} />
    <button onClick={handleDraw}>Draw</button>
  </>
}