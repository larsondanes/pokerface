import { Card, allRanks, CardRank, suits } from "./Card";
import {
  Flush,
  FourOfAKind,
  FullHouse,
  HighCard,
  Pair,
  RankedHand,
  RankedHandFactory,
  RoyalFlush,
  Straight,
  StraightFlush,
  ThreeOfAKind,
  TwoPair,
} from "./RankedHand";

/**
 * Assigns numerical value to hand kinds.
 */
export enum HandRank {
  HIGHCARD,
  PAIR,
  TWOPAIR,
  THREEOFAKIND,
  STRAIGHT,
  FLUSH,
  FULLHOUSE,
  FOUROFAKIND,
  STRAIGHTFLUSH,
  ROYALFLUSH,
}

/**
 * Handles the logic of identifying the hand kind of a given hand.
 */
export class RankService {
  /**
   * Defines a hand size limit. This is used in drawHand().
   */
  static handSize: number = 5;

  /**
   * Creates a deck of 52 playing cards.
   * @returns A Card[] which represents a deck of 52 playing cards.
   */
  static createDeck(): Card[] {
    let deck: Card[] = [];
    for (let i = 0; i < allRanks.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        //const card = new Card();
        let rank = allRanks[i];
        let suit = suits[j];
        deck.push({ rank, suit });
      }
    }
    console.log(deck);
    return deck;
  }

  /**
   * Creates a hand of size handSize of Cards.
   * @param deck A Card[] representing a deck of playing cards.
   * @returns A Card[] of size handSize made up of Cards from deck.
   */
  static drawHand(deck: Card[]): Card[] {
    let hand: Card[] = [];
    for (let i = 0; i < this.handSize; i++) {
      console.log(deck.length);
      let cardIdx = this.getRandomInt(deck.length - 1);
      let card = deck.splice(cardIdx, 1)[0];
      hand.push(card);
    }
    console.log(hand);
    return hand;
  }

  /**
   * Ranks a given hand of Cards.
   * @param hand A read-only array of Cards.
   * @returns The appropriate hand kind in the form of a class which
   * extends RankedHand.
   */
  static rankHand(hand: ReadonlyArray<Card>): RankedHand {
    const RankedHandClasses: RankedHandFactory[] = [
      RoyalFlush,
      StraightFlush,
      FourOfAKind,
      FullHouse,
      Flush,
      Straight,
      ThreeOfAKind,
      TwoPair,
      Pair,
      HighCard,
    ];
    // TODO: document this
    for (const RankedHandClass of RankedHandClasses) {
      const result = RankedHandClass.from(hand);
      if (result) {
        return result;
      }
    }
    throw new Error("Failed to rank hand");
  }

  /**
   * Compares the ranks of two Cards.
   * @param a Card
   * @param b Card
   * @returns Integer indicating comparison result.
   */
  static compareRanks(a: Card, b: Card): number {
    if (a.rank < b.rank) {
      return -1;
    } else if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  }

  /**
   * Compares the ranks of two Cards with special case for aces which
   * will get sorted as low cards.
   * @param a Card
   * @param b Card
   * @returns Integer indicated comparison result.
   */
  static compareRanksAceLow(a: Card, b: Card): number {
    if (a.rank === CardRank.ACE) {
      if (b.rank === CardRank.ACE) {
        return 0;
      } else {
        return -1;
      }
    } else if (b.rank === CardRank.ACE) {
      return 1;
    }
    return RankService.compareRanks(a, b);
  }

  /**
   * Finds number of Cards with specific rank in input cards.
   * @param cards Read-only array of Cards.
   * @param target Card with target rank for match.
   * @returns Number of matches in cards.
   */
  static matchesInArray(cards: ReadonlyArray<Card>, target: Card): Card[] {
    const result = cards.filter((card) => card.rank === target.rank);
    return result;
  }

  /**
   * Gets pseudo-random number.
   * @param max Upper limit on random number range.
   * @returns Number between 0 and max.
   */
  static getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
