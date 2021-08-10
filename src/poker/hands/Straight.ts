import { Card, CardRank, getCardRankDisplay } from "../Card";
import { PokerHandRank, PokerService } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a straight.
 */

export class Straight extends PokerHand {
  /**
   * Create a Straight poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract Straight from.
   * @returns A new Straight if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): Straight | null {
    /**
     * We assume if there is an ace in hand that it is the high card.
     * Hand is then sorted in ascending order so that we may walk up it
     * and check if our current card's rank matches our last card's
     * rank - 1.
     * If this holds true for all cards in hand, we have found our
     * Straight.
     */
    const orderedHand = [...hand].sort(PokerService.compareRanks);
    let failedStraight = false;
    let hasAce = false;
    for (let i = 1; i < hand.length; i++) {
      const card = orderedHand[i];
      const lastCard = orderedHand[i - 1];
      if (card.rank === CardRank.ACE) {
        hasAce = true;
      }
      if (card.rank === lastCard.rank + 1) {
        continue;
      } else {
        failedStraight = true;
        break;
      }
    }
    /**
     * If our check resulted in failedStraight being true and we saw
     * an ace, we must now check for a Straight and assume the ace
     * is our low card. We then walk the hand again as before. If we
     * have a Straight we will return it and if not we return null.
     */
    if (failedStraight && hasAce) {
      const aceLowOrderedHand = [...hand].sort(PokerService.compareRanksAceLow);
      for (let i = 1; i < aceLowOrderedHand.length; i++) {
        const lastRank = aceLowOrderedHand[i - 1].rank;
        const rank = aceLowOrderedHand[i].rank;
        if (
          rank === lastRank + 1 ||
          (rank === CardRank.TWO && lastRank === CardRank.ACE)
        ) {
          continue;
        } else {
          return null;
        }
      }
      return new Straight(aceLowOrderedHand);
    } else if (failedStraight) {
      return null;
    }
    return new Straight(orderedHand);
  }

  /**
   * @returns The hand kind and high card's rank.
   */
  getDisplay() {
    return (
      "Straight, " +
      getCardRankDisplay(
        this.matchingCards[this.matchingCards.length - 1].rank
      ) +
      " high"
    );
  }

  /**
   * Constructor for poker hand of kind Straight.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.STRAIGHT, matchingCards);
  }
}
