import { Card, getCardRankDisplay } from "../Card";
import { PokerHandRank } from "../PokerService";
import { PokerHand, titleCase } from "./PokerHand";
import { Straight } from "./Straight";
import { Flush } from "./Flush";

/**
 * Poker hand representing a hand that contains a straight flush.
 */

export class StraightFlush extends PokerHand {
  /**
   * Create a StraightFlush poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract StraightFlush from.
   * @returns A new StraightFlush if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): StraightFlush | null {
    const straight = Straight.from(hand);
    const flush = Flush.from(hand);
    if (straight && flush) {
      return new StraightFlush(hand);
    }
    return null;
  }

  /**
   * @returns The suit of the cards that make up a given StraightFlush.
   */
  get of() {
    return this.matchingCards[0].suit;
  }

  /**
   * @returns A human readable description of a given StraightFlush
   * including the hand kind, the matching cards' suit, and the high
   * card rank.
   */
  getDisplay(): string {
    return (
      "Straight Flush, " +
      titleCase(this.of) +
      "s, " +
      getCardRankDisplay(
        this.matchingCards[this.matchingCards.length - 1].rank
      ) +
      " high"
    );
  }

  /**
   * Constructor for poker hand of kind StraightFlush.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.STRAIGHTFLUSH, matchingCards);
  }
}
