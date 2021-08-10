import { Card, getCardRankDisplay } from "../Card";
import { PokerHandRank } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a high card.
 */

export class HighCard extends PokerHand {
  /**
   * Create a HighCard poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract HighCard from.
   * @returns A new HighCard if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): HighCard | null {
    let highCard = hand[0];
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].rank > highCard.rank) {
        highCard = hand[i];
      }
    }
    return new HighCard([highCard]);
  }

  /**
   *
   * @returns A human readable description of a given HighCard
   * including the hand kind and the matching cards' rank.
   */
  getDisplay(): string {
    return "High card, " + getCardRankDisplay(this.matchingCards[0].rank);
  }

  /**
   * Constructor for poker hand of kind HighCard.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.HIGHCARD, matchingCards);
  }
}
