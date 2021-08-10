import { Card } from "../Card";
import { PokerHandRank } from "../PokerService";

export const titleCase = (str: string) => str[0].toUpperCase() + str.substr(1);

/**
 * Abstract RankedHand outlines a base ranked poker hand object
 * to be extended by specific poker hand objects.
 */
export abstract class PokerHand {
  /**
   * Constructor for RankedHand
   * @param handRank The rank of the hand
   * @param matchingCards The cards that match the hand's definition
   */
  constructor(
    protected handRank: PokerHandRank,
    public matchingCards: Card[]
  ) {}
  /**
   * Abstract function that returns a human readable description of a
   * given poker hand includingone or more suits or ranks relevant
   * to the hand.
   */
  abstract getDisplay(): string;
}

export interface PokerHandFactory {
  from(hand: ReadonlyArray<Card>): PokerHand | null;
}
