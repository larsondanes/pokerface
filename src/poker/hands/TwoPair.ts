import { Card, CardRank, getCardRankDisplay } from "../Card";
import { Pair } from "./Pair";
import { PokerHandRank, PokerService } from "../PokerService";
import { PokerHand } from "./PokerHand";

/**
 * Poker hand representing a hand that contains a two pair.
 */

export class TwoPair extends PokerHand {
  /**
   * Create a TwoPair poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract TwoPair from.
   * @returns A new TwoPair if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): TwoPair | null {
    const pairA = Pair.from(hand);
    if (pairA) {
      const { matchingCards } = pairA;
      let filteredHand = hand.filter((item) => !matchingCards.includes(item));
      const pairB = Pair.from(filteredHand);
      if (pairB)
        return new TwoPair([...pairA.matchingCards, ...pairB.matchingCards]);
    }
    return null;
  }

  /**
   * @returns The rank of the hand's matching cards.
   */
  public get of(): [CardRank, CardRank] {
    return [this.matchingCards[0], this.matchingCards[2]]
      .sort((a, b) => PokerService.compareRanks(b, a))
      .map((c) => c.rank) as [CardRank, CardRank];
  }

  /**
   * @returns The human readable hand kind and ranks of the cards that
   * make up the TwoPair.
   */
  getDisplay() {
    return (
      "Two pair, " +
      getCardRankDisplay(this.of[0]) +
      "s and " +
      getCardRankDisplay(this.of[1]) +
      "s"
    );
  }

  /**
   * Constructor for poker hand of kind ThreeOfAKind.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(PokerHandRank.TWOPAIR, matchingCards);
  }
}
