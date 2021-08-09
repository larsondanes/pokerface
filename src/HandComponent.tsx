import React from "react";
import { FunctionComponent } from "react";
import { Card, Rank } from "./RankService";
import "./card.scss";
import { Suit } from "./Card";

interface HandProps {
  cards: ReadonlyArray<Card>;
  ranking: number | null;
};

const CardComponent: FunctionComponent<{ card: Card }> = ({ card }) => {
  return <div className="card" key={card.rank + card.suit}>{card.rank} of {card.suit}</div>
}

const getCardSymbolColumns = (rank: Rank): [number, number, number] => {
  const cardDisplays: Partial<Record<Rank, [number, number, number]>> = {
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
  const display = cardDisplays[rank];
  if (display) {
    return display;
  } else {
    // face cards
    return [0,1,0];
  }

}

const getCardRankDisplay = (rank: Rank): string => {
  const faceRankMapping: Partial<Record<Rank, string>> = {
    [Rank.JACK]: "J",
    [Rank.QUEEN]: "Q",
    [Rank.KING]: "K",
    [Rank.ACE]: "A"
  }

  // if we have a face rank mapping, return it
  // otherwise, return the numeric rank as a string

  const faceRank = faceRankMapping[rank];
  if (faceRank) {
    return faceRank;
  } else {
    return String(rank);
  }
}

const getSuitSymbol = (suit: Suit): string => {
  const suitSymbols: Record<Suit, string> = {
    heart: "♥",
    spade: "♠",
    diamond: "♦",
    club: "♣"
  };

  return suitSymbols[suit];
}

export const HandComponent: FunctionComponent<HandProps> = ({ cards, ranking }) => {
  let markup: React.ReactElement[] = [];
  //markup.push(<div className={`card card--${card.suit} card--rank-${card.rank}`} ></div>);

  const desiredOutputExample = ({ rank, suit }: Card) => {
    // array of columns, each column is a number indicating how many
    // symbols should be displayed in that column
    // TODO: generate this based on rank and stuff
    // TODO: Move suits to enum
    //const symbol = suitSymbols[suit as keyof typeof suitSymbols];
    const symbol = getSuitSymbol(suit);
    const cardDisplay = getCardSymbolColumns(rank);

    if (rank > 10) {
      // TODO: Handle face cards
      const diff = rank - 10;
      return (
        <div className={`card card--${suit} card--rank-${rank}`}>
          <div className="card__topleft">{getCardRankDisplay(rank)} {symbol}</div>
          <div className="card__inner card__inner--centered">
            <div className="card__column face">{getCardRankDisplay(rank)}</div>
          </div>
        <div className="card__botright">{getCardRankDisplay(rank)} {symbol}</div>
      </div>
      );
    }
    return (
      <div className={`card card--${suit} card--rank-${rank}`}>
        <div className="card__topleft">{rank} {symbol}</div>
        <div className="card__inner card__inner--centered">

          {
            cardDisplay.map(numSymbolsInColumn =>
              // TODO: give key
              <div className="card__column">
                {
                  // TODO: here too
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