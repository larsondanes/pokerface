import { Card, getCardRankDisplay } from "../Card";
import { PokerHandRank, PokerService } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a pair of two
 * same-ranked cards.
 */

export class Pair extends PokerHand {
  /**
   * Create a Pair ranked hand from a hand of cards if possible.
   * @param hand The hand of cards to extract a pair from
   * @returns A pair ranked hand if there is a pair in the input hand,
   * otherwise null
   */
  static from(hand: Card[]): Pair | null {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = PokerService.matchesInArray(hand, hand[i]);
      if (matches.length > 1) {
        return new Pair(matches);
      }
    }
    return null;
  }

  /**
   * @returns The rank of the cards that make up a given Pair.
   */
  get of() {
    return this.matchingCards[0].rank;
  }

  /**
   *
   * @returns A human readable description of a given Pair
   * including the hand kind and the matching cards' rank.
   */
  getDisplay() {
    return "Pair, " + getCardRankDisplay(this.matchingCards[0].rank) + "s";
  }

  /**
   * Constructor for poker hand of kind Pair.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.PAIR, matchingCards);
  }
}
