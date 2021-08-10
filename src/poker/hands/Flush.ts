import { Card, Suit } from "../Card";
import { PokerHandRank } from "../PokerService";
import { PokerHand, titleCase } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a flush.
 */

export class Flush extends PokerHand {
  /**
   * Create a Flush poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract Flush from.
   * @returns A new Flush if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]) {
    return hand.every((c) => c.suit === hand[0].suit) ? new Flush(hand) : null;
  }

  /**
   * @returns The suit of the cards that make up the Flush.
   */
  get of(): Suit {
    return this.matchingCards[0].suit;
  }

  /**
   * @returns The human readable hand kind and the suit of the hand.
   */
  getDisplay() {
    return "Flush, " + titleCase(this.of) + "s";
  }

  /**
   * Constructor for poker hand of kind Flush.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.FLUSH, matchingCards);
  }
}
