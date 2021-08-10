import { Card, CardRank, getCardRankDisplay } from "../Card";
import { Pair } from "./Pair";
import { PokerHandRank } from "../PokerService";
import { PokerHand } from "./PokerHand";
import { ThreeOfAKind } from "./ThreeOfAKind";

/**
 * Poker hand representing a hand that contains a full house.
 */

export class FullHouse extends PokerHand {
  /**
   * Create a FourOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract FourOfAKind from.
   * @returns A new FourOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]) {
    const threeOfAKind = ThreeOfAKind.from(hand);
    if (threeOfAKind) {
      const { matchingCards } = threeOfAKind;
      let filteredHand = hand.filter((card) => !matchingCards.includes(card));
      const pair = Pair.from(filteredHand);
      if (pair) {
        return new FullHouse([
          ...threeOfAKind.matchingCards,
          ...pair.matchingCards,
        ]);
      }
    }
    return null;
  }

  /**
   * Extracts a ThreeOfAKind from the FullHouse hand.
   * @returns The rank of the ThreeOfAKind cards.
   */
  get threeOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    return threeOak!.of;
  }

  /**
   * Extracts a Pair from the FullHouse hand.
   * @returns The rank of the Pair cards.
   */
  get twoOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    const pair = Pair.from(
      this.matchingCards.filter((c) => !threeOak!.matchingCards.includes(c))
    );
    return pair!.of;
  }

  /**
   * @returns A human readable description of a given FullHouse
   * including the hand kind and the matching cards' ranks.
   */
  getDisplay(): string {
    return (
      "Full House, " +
      getCardRankDisplay(this.threeOf) +
      "s full of " +
      getCardRankDisplay(this.twoOf) +
      "s"
    );
  }

  /**
   * Constructor for poker hand of kind FullHouse.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.FULLHOUSE, matchingCards);
  }
}
