import { FunctionComponent, useState } from "react";
import * as React from "react";
import { Card, CardRank, Suit } from "../poker/Card";
import "./customHandInput.scss";

export interface CustomHandInputProps {
  onDraw: (hand: Card[]) => void;
  onError: () => void;
  showError: boolean
}
export const CustomHandInput: FunctionComponent<CustomHandInputProps> = ({
  onDraw, showError, onError
}) => {
  const [value, setValue] = useState("");

  const handleDraw = () => {
    const faceCards: Record<string, CardRank> = {
      A: CardRank.ACE,
      J: CardRank.JACK,
      Q: CardRank.QUEEN,
      K: CardRank.KING,
    };
    const suitMapping: Record<string, Suit> = {
      H: Suit.Heart,
      C: Suit.Club,
      D: Suit.Diamond,
      S: Suit.Spade,
    };

    let regexp = /^(([AKQJ]|[2-9]|10)[CSDH]\s*){5}$/i;
    const regexResult = value.match(regexp);
    if (regexResult === null) {
      onError();      
      return;
    }

    let [match] = regexResult;
    match = match.replace(/\s/g, "");
    let buffer = "";
    const cards: Card[] = [];
    while (cards.length < 5) {
      buffer += match[0];
      match = match.substr(1);
      if (buffer.length >= 2) {
        if (buffer === "10") {
          continue;
        }
        const rankLength = buffer.length - 1; // or ?
        const rankString = buffer.substr(0, rankLength);
        const suitString = buffer[rankLength];

        const rank: CardRank = faceCards[rankString.toUpperCase()] || Number(rankString);
        const suit: Suit = suitMapping[suitString.toUpperCase()];
        cards.push({ rank, suit });
        buffer = "";
      }
    }
    onDraw(cards);
  };
  return (
    <>
      <input
        type="text"
        placeholder="5S JD QH AC 4D"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button onClick={handleDraw}>Draw custom</button>
      {showError && (
        <div className="error">
          <p>That hand isn't valid, enter a hand with:</p>
          <ul>
            <li>5 Cards</li>
            <li>Format: RS (Rank, Suit)</li>
            <li>Ranks: 2-10, J, Q, K, A</li>
            <li>Suits: C, S, H, D</li>
            <li>Example: 5S 10H QH 8D 3C</li>
          </ul>
        </div>
      )}
    </>
  );
};
