import { Card, CardRank, getCardRankDisplay } from "../Card";
import { PokerHandRank, PokerService } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a three of a kind.
 */

export class ThreeOfAKind extends PokerHand {
  /**
   * Create a ThreeOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract ThreeOfAKind from.
   * @returns A new ThreeOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): ThreeOfAKind | null {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = PokerService.matchesInArray(hand, hand[i]);
      if (matches.length > 2) {
        return new ThreeOfAKind(matches);
      }
    }
    return null;
  }

  /**
   * @returns The rank of the hand's matching cards.
   */
  get of(): CardRank {
    return this.matchingCards[0].rank;
  }

  /**
   * @returns The human readable hand kind and rank of the cards that
   * make up the ThreeOfAKind.
   */
  getDisplay() {
    return "Three of a kind, " + getCardRankDisplay(this.of) + "s";
  }

  /**
   * Constructor for poker hand of kind ThreeOfAKind.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.THREEOFAKIND, matchingCards);
  }
}
