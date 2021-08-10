import { Card, CardRank } from "../Card";
import { PokerHandRank } from "../PokerService";
import { PokerHand, titleCase } from "./PokerHand";
import { Straight } from "./Straight";
import { Flush } from "./Flush";

/**
 * Poker hand representing a hand that contains a royal flush.
 */

export class RoyalFlush extends PokerHand {
  /**
   * Create a RoyalFlush poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract RoyalFlush from.
   * @returns A new RoyalFlush if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): RoyalFlush | null {
    const straight = Straight.from(hand);
    const flush = Flush.from(hand);
    if (
      straight &&
      flush &&
      hand.filter((c) => c.rank === CardRank.KING).length > 0 &&
      hand.filter((c) => c.rank === CardRank.ACE).length > 0
    ) {
      return new RoyalFlush([...hand]);
    }
    return null;
  }

  /**
   * @returns The suit of the cards that make up a given RoyalFlush.
   */
  get of() {
    return this.matchingCards[0].suit;
  }

  /**
   * @returns A human readable description of a given RoyalFlush
   * including the hand kind and the matching cards' suit.
   */
  getDisplay(): string {
    return "Royal Flush, " + titleCase(this.of) + "s";
  }

  /**
   * Constructor for poker hand of kind RoyalFlush.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.ROYALFLUSH, matchingCards);
  }
}
