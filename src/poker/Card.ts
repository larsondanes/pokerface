/**
 * Describes a Card object.
 */
export interface Card {
  /**
   * rank is expected to be a member of CardRank.
   */
  rank: CardRank;
  /**
   * suit is expected to be a member of Suit.
   */
  suit: Suit;
}

/**
 * Enumerates possible playing card suits.
 */
export enum Suit {
  Heart = "heart",
  Spade = "spade",
  Diamond = "diamond",
  Club = "club",
}

/**
 * Assigns numeric value to all possible playing card ranks.
 * The ordering of card ranks is presented here as ace high.
 */
export enum CardRank {
  TWO = 2,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}

/**
 * Array of all possible playing card ranks.
 */
export const allRanks = Object.values(CardRank).filter(
  (v) => typeof v === "number"
) as CardRank[];

/**
 * Array of all possible playing card suits.
 */
export const suits = [Suit.Heart, Suit.Spade, Suit.Diamond, Suit.Club];

/**
 * Generate a minimalistic user-readable string display for a card rank.
 * @param rank The card rank to display
 * @returns A 1-or-2 digit string representing the rank of the card.
 *  Matches what you would expect to see in the corner of a playing card
 */
export const getCardRankDisplay = (rank: CardRank): string => {
  const faceRankMapping: Partial<Record<CardRank, string>> = {
    [CardRank.JACK]: "J",
    [CardRank.QUEEN]: "Q",
    [CardRank.KING]: "K",
    [CardRank.ACE]: "A",
  };

  // if we have a face rank mapping, return it
  // otherwise, return the numeric rank as a string

  const faceRank = faceRankMapping[rank];
  if (faceRank) {
    return faceRank;
  } else {
    return String(rank);
  }
};
