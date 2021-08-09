import * as React from "react";
import { FunctionComponent } from "react";

export enum Suit {
    Heart = "heart",
    Spade = "spade",
    Diamond = "diamond",
    Club = "club"
}

export enum CardRank {
    TWO = 2,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}

export const allRanks: CardRank[] = Object.values(CardRank).filter(v => typeof v === "number") as CardRank[];

export const getCardRankDisplay = (rank: CardRank): string => {
    const faceRankMapping: Partial<Record<CardRank, string>> = {
      [CardRank.JACK]: "J",
      [CardRank.QUEEN]: "Q",
      [CardRank.KING]: "K",
      [CardRank.ACE]: "A"
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

export const suits = [Suit.Heart, Suit.Spade, Suit.Diamond, Suit.Club];
// usage: <Card rank={"A"} suit={"Hearts"} />
interface CardProps {
    rank: string;
    suit: Suit;
}
export const Card: FunctionComponent<CardProps> = ({rank, suit}) => {
    return <>{rank} of {suit}</>
}


const AceOfHearts = () => <Card rank="A" suit={Suit.Heart} />

