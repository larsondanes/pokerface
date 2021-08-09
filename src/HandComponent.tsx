import React from "react";
import { FunctionComponent } from "react";
import { Card, HandRank } from "./RankService";
import "./card.scss";
import { CardRank, getCardRankDisplay, Suit } from "./Card";
import { RankedHand } from "./RankedHand";

interface HandProps {
  cards: ReadonlyArray<Card>;
  rankedHand: RankedHand | null;
};

const CardComponent: FunctionComponent<{ card: Card }> = ({ card }) => {
  return <div className="card" key={card.rank + card.suit}>{card.rank} of {card.suit}</div>
}

const getCardSymbolColumns = (rank: CardRank): [number, number, number] => {
  const cardDisplays: Partial<Record<CardRank, [number, number, number]>> = {
    [CardRank.TWO]: [0, 2, 0],
    [CardRank.THREE]: [0, 3, 0],
    [CardRank.FOUR]: [2, 0, 2],
    [CardRank.FIVE]: [2, 1, 2],
    [CardRank.SIX]: [3, 0, 3],
    [CardRank.SEVEN]: [3, 1, 3],
    [CardRank.EIGHT]: [3, 2, 3],
    [CardRank.NINE]: [4, 1, 4],
    [CardRank.TEN]: [4, 2, 4]
  };
  const display = cardDisplays[rank];
  if (display) {
    return display;
  } else {
    // face cards
    return [0,1,0];
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

const getHandRankString = (rank: HandRank): string => {
  const handRankMapping: Record<HandRank, string> = {
    [HandRank.HIGHCARD]: "High Card",
    [HandRank.PAIR]: "Pair",
    [HandRank.TWOPAIR]: "Two Pair",
    [HandRank.THREEOFAKIND]: "Three of a Kind",
    [HandRank.STRAIGHT]: "Straight",
    [HandRank.FLUSH]: "Flush",
    [HandRank.FULLHOUSE]: "Full House",
    [HandRank.FOUROFAKIND]: "Four of a Kind",
    [HandRank.STRAIGHTFLUSH]: "Straight Flush",
    [HandRank.ROYALFLUSH]: "Royal Flush"
  }

  return handRankMapping[rank];
}

export const HandComponent: FunctionComponent<HandProps> = ({ cards, rankedHand }) => {
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
        (rankedHand !== null) && <div className="handRank">Hand: {rankedHand.getDisplay()}</div>
      }
    </div>
  </>
}