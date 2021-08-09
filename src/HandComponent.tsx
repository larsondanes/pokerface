import React from "react";
import { FunctionComponent } from "react";
import { Card, Rank } from "./RankService";
import "./card.scss";

interface HandProps {
  cards: ReadonlyArray<Card>;
  ranking: number | null;
};

const CardComponent: FunctionComponent<{ card: Card }> = ({ card }) => {
  return <div className="card" key={card.rank + card.suit}>{card.rank} of {card.suit}</div>
}

const cardDisplays = {
  [Rank.TWO]: [0, 2, 0],
  [Rank.THREE]: [0, 3, 0],
  [Rank.FOUR]: [2, 0, 2],
  [Rank.FIVE]: [2, 1, 2],
  [Rank.SIX]: [3, 0, 3],
  [Rank.SEVEN]: [3, 1, 3],
  [Rank.EIGHT]: [3, 2, 3],
  [Rank.NINE]: [4, 1, 4],
  [Rank.TEN]: [4, 2, 4]
};

const suitSymbols = {
  heart: "♥",
  spade: "♠",
  diamond: "♦",
  club: "♣"
};

const faceRankMapping = {
  [Rank.JACK]: "J",
  [Rank.QUEEN]: "Q",
  [Rank.KING]: "K",
  [Rank.ACE]: "A"
}

export const HandComponent: FunctionComponent<HandProps> = ({ cards, ranking }) => {
  let markup: React.ReactElement[] = [];
  //markup.push(<div className={`card card--${card.suit} card--rank-${card.rank}`} ></div>);

  const desiredOutputExample = ({ rank, suit }: Card) => {
    // array of columns, each column is a number indicating how many
    // symbols should be displayed in that column
    // TODO: generate this based on rank and stuff
    // TODO: Move suits to enum
    const symbol = suitSymbols[suit as keyof typeof suitSymbols];
    const cardDisplay = cardDisplays[rank as keyof typeof cardDisplays];

    if (rank > 10) {
      // TODO: Handle face cards
      const diff = rank - 10;
      return (
        <div className={`card card--${suit} card--rank-${rank}`}>
          <div className="card__topleft">{faceRankMapping[rank as keyof typeof faceRankMapping]} {symbol}</div>
          <div className="card__inner card__inner--centered">
            <div className="card__column face">{faceRankMapping[rank as keyof typeof faceRankMapping]}</div>
          </div>
        <div className="card__botright">{faceRankMapping[rank as keyof typeof faceRankMapping]} {symbol}</div>
      </div>
      );
    }
    return (
      <div className={`card card--${suit} card--rank-${rank}`}>
        <div className="card__topleft">{rank} {symbol}</div>
        <div className="card__inner card__inner--centered">

          {
            cardDisplay.map(numSymbolsInColumn =>
              <div className="card__column">
                {
                  [...Array(numSymbolsInColumn)].map(() => <div className="card__symbol">{symbol}</div>)
                }
              </div>
            )
          }

        </div>
        <div className="card__botright">{rank} {symbol}</div>
      </div>
    );
  }

  const fnThatReturnsNothing = (a: number, b: number): void => {
    a + b;
  }

  const fnThatAddsNumbers = (a: number, b: number): number => a + b;

  return <>
    <div className="hand">
      {
        //cards.map(c => <CardComponent card={c} />)
        cards.map(c => desiredOutputExample(c))
      }
      {
        (ranking !== null) && <div className="ranking">Ranking: {ranking}</div>
      }
    </div>
  </>
}