import { CardRank, Suit } from "./Card";
import {
  Flush,
  FourOfAKind,
  FullHouse,
  HighCard,
  Pair,
  RoyalFlush,
  Straight,
  StraightFlush,
  ThreeOfAKind,
  TwoPair,
} from "./RankedHand";
import { Card, HandRank, RankService } from "./RankService";

describe("class:RankService", () => {
  describe("static:createDeck()", () => {
    it("returns a deck of 52 cards", () => {
      const deck = RankService.createDeck();
      expect(deck).toHaveLength(52);
    });
  });
  describe("static:rankHand()", () => {
    it("ranks an ACE high", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.FOUR, Suit.Club],
        [CardRank.SIX, Suit.Spade],
        [CardRank.EIGHT, Suit.Heart],
        [CardRank.ACE, Suit.Diamond],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(HighCard);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(`"High card, A"`);
    });
    it("ranks a pair", () => {
      const hand = toCards([
        [CardRank.KING, Suit.Heart],
        [CardRank.TWO, Suit.Club],
        [CardRank.FIVE, Suit.Diamond],
        [CardRank.ACE, Suit.Spade],
        [CardRank.FIVE, Suit.Spade],
      ]);

      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(Pair);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(`"Pair, 5s"`);
    });
    it("ranks a two pair", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.TWO, Suit.Club],
        [CardRank.SIX, Suit.Spade],
        [CardRank.EIGHT, Suit.Heart],
        [CardRank.EIGHT, Suit.Diamond],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(TwoPair);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Two pair, 8s and 2s"`
      );
    });
    it("ranks a 3oak", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.TWO, Suit.Spade],
        [CardRank.KING, Suit.Club],
        [CardRank.ACE, Suit.Heart],
        [CardRank.TWO, Suit.Diamond],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(ThreeOfAKind);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Three of a kind, 2s"`
      );
    });
    it("ranks a straight", () => {
      const hand = toCards([
        [CardRank.SEVEN, Suit.Heart],
        [CardRank.THREE, Suit.Spade],
        [CardRank.FOUR, Suit.Club],
        [CardRank.FIVE, Suit.Heart],
        [CardRank.SIX, Suit.Spade],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(Straight);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Straight, 7 high"`
      );
    });
    it("ranks a straight with ace HIGH", () => {
      const hand = toCards([
        [CardRank.TEN, Suit.Heart],
        [CardRank.QUEEN, Suit.Spade],
        [CardRank.JACK, Suit.Club],
        [CardRank.ACE, Suit.Heart],
        [CardRank.KING, Suit.Spade],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(Straight);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Straight, A high"`
      );
    });
    it("ranks a straight with ace LOW", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.THREE, Suit.Spade],
        [CardRank.FOUR, Suit.Club],
        [CardRank.FIVE, Suit.Heart],
        [CardRank.ACE, Suit.Spade],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(Straight);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Straight, 5 high"`
      );
    });
    it("ranks a flush", () => {
      const hand = toCards([
        [CardRank.SEVEN, Suit.Club],
        [CardRank.THREE, Suit.Club],
        [CardRank.EIGHT, Suit.Club],
        [CardRank.FIVE, Suit.Club],
        [CardRank.SIX, Suit.Club],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(Flush);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(`"Flush, Clubs"`);
    });
    it("ranks a full house", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.TWO, Suit.Spade],
        [CardRank.THREE, Suit.Club],
        [CardRank.THREE, Suit.Heart],
        [CardRank.THREE, Suit.Spade],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(FullHouse);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Full House, 3s full of 2s"`
      );
    });
    it("ranks a 4oak", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.TWO, Suit.Spade],
        [CardRank.KING, Suit.Club],
        [CardRank.TWO, Suit.Heart],
        [CardRank.TWO, Suit.Diamond],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(FourOfAKind);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Four of a kind, 2s"`
      );
    });
    it("ranks a straight flush", () => {
      const hand = toCards([
        [CardRank.TWO, Suit.Heart],
        [CardRank.THREE, Suit.Heart],
        [CardRank.FOUR, Suit.Heart],
        [CardRank.FIVE, Suit.Heart],
        [CardRank.SIX, Suit.Heart],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(StraightFlush);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Straight Flush, Hearts, 6 high"`
      );
    });
    it("ranks a royal flush", () => {
      const hand = toCards([
        [CardRank.ACE, Suit.Heart],
        [CardRank.KING, Suit.Heart],
        [CardRank.QUEEN, Suit.Heart],
        [CardRank.JACK, Suit.Heart],
        [CardRank.TEN, Suit.Heart],
      ]);
      const rankedHand = RankService.rankHand(hand);
      expect(rankedHand).toBeInstanceOf(RoyalFlush);
      expect(rankedHand.getDisplay()).toMatchInlineSnapshot(
        `"Royal Flush, Hearts"`
      );
    });
  });
});

function toCards(cards: [CardRank, Suit][]) {
  const result: Card[] = [];
  for (const [rank, suit] of cards) {
    result.push({
      rank,
      suit,
    });
  }
  return result;
}
