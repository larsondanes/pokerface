import { CardRank, getCardRankDisplay, Suit } from "./Card";
import { Card, HandRank, RankService } from "./RankService";

const titleCase = (str: string) => str[0].toUpperCase() + str.substr(1);

/**
 * Abstract RankedHand outlines a base ranked poker hand object
 * to be extended by specific poker hand objects.
 */
export abstract class RankedHand {
  /**
   * Constructor for RankedHand
   * @param handRank The rank of the hand
   * @param matchingCards The cards that match the hand's definition
   */
  constructor(protected handRank: HandRank, public matchingCards: Card[]) {}
  /**
   * Abstract function that returns a human readable description of a
   * given poker hand includingone or more suits or ranks relevant
   * to the hand.
   */
  abstract getDisplay(): string;
}

/**
 * Poker hand representing a hand that contains a pair of two
 * same-ranked cards.
 */
export class Pair extends RankedHand {
  /**
   * Create a Pair ranked hand from a hand of cards if possible.
   * @param hand The hand of cards to extract a pair from
   * @returns A pair ranked hand if there is a pair in the input hand,
   * otherwise null
   */
  static from(hand: Card[]): Pair | null {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = RankService.matchesInArray(hand, hand[i]);
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
    super(HandRank.PAIR, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a high card.
 */
export class HighCard extends RankedHand {
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
    super(HandRank.HIGHCARD, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a royal flush.
 */
export class RoyalFlush extends RankedHand {
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
    super(HandRank.ROYALFLUSH, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a straight flush.
 */
export class StraightFlush extends RankedHand {
  /**
   * Create a StraightFlush poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract StraightFlush from.
   * @returns A new StraightFlush if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): StraightFlush | null {
    const straight = Straight.from(hand);
    const flush = Flush.from(hand);
    if (straight && flush) {
      return new StraightFlush(hand);
    }
    return null;
  }

  /**
   * @returns The suit of the cards that make up a given StraightFlush.
   */
  get of() {
    return this.matchingCards[0].suit;
  }

  /**
   * @returns A human readable description of a given StraightFlush
   * including the hand kind, the matching cards' suit, and the high
   * card rank.
   */
  getDisplay(): string {
    return (
      "Straight Flush, " +
      titleCase(this.of) +
      "s, " +
      getCardRankDisplay(
        this.matchingCards[this.matchingCards.length - 1].rank
      ) +
      " high"
    );
  }

  /**
   * Constructor for poker hand of kind StraightFlush.
   * @param matchingCards The cards that make up the primary
   * scoring structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(HandRank.STRAIGHTFLUSH, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a four of a kind.
 */
export class FourOfAKind extends RankedHand {
  /**
   * Create a FourOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract FourOfAKind from.
   * @returns A new FourOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]) {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = RankService.matchesInArray(hand, hand[i]);
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
    super(HandRank.FOUROFAKIND, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a full house.
 */
export class FullHouse extends RankedHand {
  /**
   * Create a FourOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract FourOfAKind from.
   * @returns A new FourOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]) {
    // TODO: consume ThreeOfAKind before Pair.
    // also write a test to capture this first.
    const pair = Pair.from(hand);
    if (pair) {
      const { matchingCards } = pair;
      let filteredHand = hand.filter((card) => !matchingCards.includes(card));
      let threeOfAKind = ThreeOfAKind.from(filteredHand);
      if (threeOfAKind) {
        return new FullHouse([
          ...threeOfAKind.matchingCards,
          ...pair.matchingCards,
        ]);
      }
    }
    return null;
  }

  /**
   * Extracts a ThreeOfAKind from the FullHouse hand.
   * @returns The rank of the ThreeOfAKind cards.
   */
  get threeOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    return threeOak!.of;
  }

  /**
   * Extracts a Pair from the FullHouse hand.
   * @returns The rank of the Pair cards.
   */
  get twoOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    const pair = Pair.from(
      this.matchingCards.filter((c) => !threeOak!.matchingCards.includes(c))
    );
    return pair!.of;
  }

  /**
   * @returns A human readable description of a given FullHouse
   * including the hand kind and the matching cards' ranks.
   */
  getDisplay(): string {
    return (
      "Full House, " +
      getCardRankDisplay(this.threeOf) +
      "s full of " +
      getCardRankDisplay(this.twoOf) +
      "s"
    );
  }

  /**
   * Constructor for poker hand of kind FullHouse.
   * @param matchingCards The cards that make up the primary scoring
   * structure of the hand.
   */
  constructor(matchingCards: Card[]) {
    super(HandRank.FULLHOUSE, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a flush.
 */
export class Flush extends RankedHand {
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
    super(HandRank.FLUSH, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a straight.
 */
export class Straight extends RankedHand {
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
    const orderedHand = [...hand].sort(RankService.compareRanks);
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
      const aceLowOrderedHand = [...hand].sort(RankService.compareRanksAceLow);
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
    super(HandRank.STRAIGHT, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a three of a kind.
 */
export class ThreeOfAKind extends RankedHand {
  /**
   * Create a ThreeOfAKind poker hand from a hand of cards if possible.
   * @param hand The hand of cards to extract ThreeOfAKind from.
   * @returns A new ThreeOfAKind if there is one in the input hand,
   * otherwise null.
   */
  static from(hand: Card[]): ThreeOfAKind | null {
    let matches: Card[];
    for (let i = 0; i < hand.length; i++) {
      matches = RankService.matchesInArray(hand, hand[i]);
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
    super(HandRank.THREEOFAKIND, matchingCards);
  }
}

/**
 * Poker hand representing a hand that contains a two pair.
 */
export class TwoPair extends RankedHand {
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
      .sort((a, b) => RankService.compareRanks(b, a))
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
    super(HandRank.TWOPAIR, matchingCards);
  }
}

// TODO: document this
export interface RankedHandFactory {
  from(hand: ReadonlyArray<Card>): RankedHand | null;
}
