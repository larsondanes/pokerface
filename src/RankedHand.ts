import { CardRank, getCardRankDisplay, Suit } from "./Card";
import { Card, HandRank, RankService } from "./RankService";

const titleCase = (str: string) => str[0].toUpperCase() + str.substr(1);

export abstract class RankedHand {
  constructor(protected handRank: HandRank, public matchingCards: Card[]) {
  }
  abstract getDisplay(): string;
}

/**
 * Ranked hand representing a hand that contains a pair of two same-ranked cards.
 */
export class Pair extends RankedHand {
  /**
   * Create a Pair ranked hand from a hand of cards if possible.
   * @param hand The hand of cards to extract a pair from
   * @returns A pair ranked hand if there is a pair in the input hand, otherwise null
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
   * The rank of the cards that make up this pair
   */
  get of() {
    return this.matchingCards[0].rank;
  }

  getDisplay() {
    return "Pair, " + getCardRankDisplay(this.matchingCards[0].rank) + "s"
  }

  constructor(matchingCards: Card[]) {
    super(HandRank.PAIR, matchingCards);
  }
}

export class HighCard extends RankedHand {
  static from(hand: Card[]): HighCard | null {
    let highCard = hand[0];
    for (let i = 0; i < hand.length; i++) {  // hand.length ok here?
      if (hand[i].rank > highCard.rank) {
        highCard = hand[i];
      }
    }
    return new HighCard([highCard]);
  }
  getDisplay(): string {
    return "High card, " + getCardRankDisplay(this.matchingCards[0].rank);
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.HIGHCARD, matchingCards);
  }
}

export class RoyalFlush extends RankedHand {
  static from(hand: Card[]): RoyalFlush | null {
    const straight = Straight.from(hand);
    const flush = Flush.from(hand);
    if (straight && flush &&
      hand.filter(c => c.rank === CardRank.KING).length > 0 &&
      hand.filter(c => c.rank === CardRank.ACE).length > 0) {
      return new RoyalFlush([...hand]);
    }
    return null;
  }
  get of() {
    return this.matchingCards[0].suit;
  }
  getDisplay(): string {
    return "Royal Flush, " + titleCase(this.of) + "s"
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.ROYALFLUSH, matchingCards);
  }
}

export class StraightFlush extends RankedHand {
  static from(hand: Card[]): StraightFlush | null {
    const straight = Straight.from(hand);
    const flush = Flush.from(hand);
    if (straight && flush) {
      return new StraightFlush(hand);
    }
    return null;
  }
  get of() {
    return this.matchingCards[0].suit
  }
  getDisplay(): string {
    return "Straight Flush, " + titleCase(this.of) + "s, " + getCardRankDisplay(this.matchingCards[this.matchingCards.length - 1].rank) + " high";
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.STRAIGHTFLUSH, matchingCards);
  }
}

export class FourOfAKind extends RankedHand {
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

  get of(): CardRank {
    return this.matchingCards[0].rank;
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.FOUROFAKIND, matchingCards);
  }
  getDisplay() {
    return "Four of a kind, " + getCardRankDisplay(this.of) + "s"
  }
}

export class FullHouse extends RankedHand {
  static from(hand: Card[]) {
    const pair = Pair.from(hand);
    if (pair) {
      const { matchingCards } = pair;
      let filteredHand = hand.filter((card) => !matchingCards.includes(card));
      let threeOfAKind = ThreeOfAKind.from(filteredHand);
      if (threeOfAKind) {
        return new FullHouse([...threeOfAKind.matchingCards, ...pair.matchingCards])
      }
    }
    return null;
  }
  get threeOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    return threeOak!.of;
  }
  get twoOf(): CardRank {
    const threeOak = ThreeOfAKind.from(this.matchingCards);
    const pair = Pair.from(this.matchingCards.filter(c => !threeOak!.matchingCards.includes(c)))
    return pair!.of;
  }
  getDisplay(): string {
    return "Full House, " + getCardRankDisplay(this.threeOf) + "s full of " + getCardRankDisplay(this.twoOf) + "s";
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.FULLHOUSE, matchingCards);
  }
}



export class Flush extends RankedHand {
  static from(hand: Card[]) {
    return hand.every(c => c.suit === hand[0].suit) ? new Flush(hand) : null
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.FLUSH, matchingCards);
  }
  get of(): Suit {
    return this.matchingCards[0].suit;
  }
  getDisplay() {
    return "Flush, " + titleCase(this.of) + "s"
  }

}

export class Straight extends RankedHand {
  static from(hand: Card[]): Straight | null {
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
    if (failedStraight && hasAce) {
      const aceLowOrderedHand = [...hand].sort(RankService.compareRanksAceLow);
      for (let i = 1; i < aceLowOrderedHand.length; i++) {
        const lastRank = aceLowOrderedHand[i - 1].rank;
        const rank = aceLowOrderedHand[i].rank;
        if (rank === lastRank + 1 || (rank === CardRank.TWO && lastRank === CardRank.ACE)) {
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
  constructor(matchingCards: Card[]) {
    super(HandRank.STRAIGHT, matchingCards);
  }
  getDisplay() {
    return "Straight, " + getCardRankDisplay(this.matchingCards[this.matchingCards.length - 1].rank) + " high"
  }
}

export class ThreeOfAKind extends RankedHand {
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
  get of(): CardRank {
    return this.matchingCards[0].rank;
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.THREEOFAKIND, matchingCards);
  }
  getDisplay() {
    return "Three of a kind, " + getCardRankDisplay(this.of) + "s"
  }
}

export class TwoPair extends RankedHand {
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
  public get of(): [CardRank, CardRank] {
    return [this.matchingCards[0], this.matchingCards[2]].sort((a, b) => RankService.compareRanks(b, a)).map(c => c.rank) as [CardRank, CardRank]
  }
  constructor(matchingCards: Card[]) {
    super(HandRank.TWOPAIR, matchingCards)
  }
  getDisplay() {
    return "Two pair, " + getCardRankDisplay(this.of[0]) + "s and " + getCardRankDisplay(this.of[1]) + "s"
  }
}

export interface RankedHandFactory {
  from(hand: ReadonlyArray<Card>): RankedHand | null
}