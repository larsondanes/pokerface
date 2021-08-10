import { Card, CardRank, getCardRankDisplay } from "../Card";
import { PokerHandRank, PokerService } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a four of a kind.
 */

export class FourOfAKind extends PokerHand {
  /**
   * Create a FourOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract FourOfAKind from.
   * @returns A new FourOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]) {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = PokerService.matchesInArray(hand, hand[i]);
      if (matches.length > 3) {
        return new FourOfAKind(matches);
      }
    }
    return null;
  }

  /**
   * @returns The rank of the cards that make up a given FourOfAKind.
   */
  get of(): CardRank {
    return this.matchingCards[0].rank;
  }

  /**
   * @returns A human readable description of a given FourOfAKind
   * including the hand kind, the matching cards' suit, and the high
   * card rank.
   */
  getDisplay() {
    return "Four of a kind, " + getCardRankDisplay(this.of) + "s";
  }

  /**
   * Constructor for poker hand of kind FourOfAKind.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.FOUROFAKIND, matchingCards);
  }
}
