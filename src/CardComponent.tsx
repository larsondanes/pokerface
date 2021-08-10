import * as React from "react";
import { FunctionComponent } from "react";
import { CardRank, Suit, getCardRankDisplay, Card } from "./Card";
import "./card.scss";

const getCardSymbolColumns = (rank: CardRank): [number, number, number] => {
  // array of columns, each column is a number indicating how many
  // symbols should be displayed in that column
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

/**
 * Describes props to be passed to Card.
 */
interface CardProps {
  card: Card
}

/**
 *
 * @param param0
 * @returns
 */
export const CardComponent: FunctionComponent<CardProps> = ({ card }) => {
  const symbol = getSuitSymbol(card.suit);
  const cardDisplay = getCardSymbolColumns(card.rank);

  if (card.rank > 10) {
    return (
      <div className={`card card--${card.suit} card--rank-${card.rank}`}>
        <div className="card__topleft">
          {getCardRankDisplay(card.rank)} {symbol}
        </div>
        <div className="card__inner card__inner--centered">
          <div className="card__column face">{getCardRankDisplay(card.rank)}</div>
        </div>
        <div className="card__botright">
          {getCardRankDisplay(card.rank)} {symbol}
        </div>
      </div>
    );
  }

  return (
    <div className={`card card--${card.suit} card--rank-${card.rank}`}>
      <div className="card__topleft">
        {card.rank} {symbol}
      </div>
      <div className="card__inner card__inner--centered">
        {cardDisplay.map((numSymbolsInColumn) => (
          // TODO: give key
          <div className="card__column">
            {
              // TODO: here too
              [...Array(numSymbolsInColumn)].map(() => (
                <div className="card__symbol">{symbol}</div>
              ))
            }
          </div>
        ))}
      </div>
      <div className="card__botright">
        {card.rank} {symbol}
      </div>
    </div>
  );
}
