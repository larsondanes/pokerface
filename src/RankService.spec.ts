import { Suit } from "./Card";
import { Card, Rank, RankService } from "./RankService";

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
                [Rank.TWO, Suit.Heart],
                [Rank.FOUR, Suit.Club],
                [Rank.SIX, Suit.Spade],
                [Rank.EIGHT, Suit.Heart],
                [Rank.ACE, Suit.Diamond]
            ])
            expect(RankService.rankHand(hand)).toBe(1);
        });
        it("ranks a pair", () => {
            const hand = toCards([
                [Rank.KING, Suit.Heart],
                [Rank.TWO, Suit.Club],
                [Rank.FIVE, Suit.Diamond],
                [Rank.ACE, Suit.Spade],
                [Rank.FIVE, Suit.Spade]])
            expect(RankService.rankHand(hand)).toBe(2);
        });
        it("ranks a two pair", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.TWO, Suit.Club],
                [Rank.SIX, Suit.Spade],
                [Rank.EIGHT, Suit.Heart],
                [Rank.EIGHT, Suit.Diamond]
            ])
            expect(RankService.rankHand(hand)).toBe(3)
        });
        it("ranks a 3oak", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.TWO, Suit.Spade],
                [Rank.KING, Suit.Club],
                [Rank.ACE, Suit.Heart],
                [Rank.TWO, Suit.Diamond]
            ])
            expect(RankService.rankHand(hand)).toBe(4)
        });
        it("ranks a straight", () => {
            const hand = toCards([
                [Rank.SEVEN, Suit.Heart],
                [Rank.THREE, Suit.Spade],
                [Rank.FOUR, Suit.Club],
                [Rank.FIVE, Suit.Heart],
                [Rank.SIX, Suit.Spade]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a straight with ace HIGH", () => {
            const hand = toCards([
                [Rank.TEN, Suit.Heart],
                [Rank.QUEEN, Suit.Spade],
                [Rank.JACK, Suit.Club],
                [Rank.ACE, Suit.Heart],
                [Rank.KING, Suit.Spade]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a straight with ace LOW", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.THREE, Suit.Spade],
                [Rank.FOUR, Suit.Club],
                [Rank.FIVE, Suit.Heart],
                [Rank.ACE, Suit.Spade]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a flush", () => {
            const hand = toCards([
                [Rank.SEVEN, Suit.Club],
                [Rank.THREE, Suit.Club],
                [Rank.EIGHT, Suit.Club],
                [Rank.FIVE, Suit.Club],
                [Rank.SIX, Suit.Club]
            ])
            expect(RankService.rankHand(hand)).toBe(6);
        });
        it("ranks a full house", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.TWO, Suit.Spade],
                [Rank.THREE, Suit.Club],
                [Rank.THREE, Suit.Heart],
                [Rank.THREE, Suit.Spade]
            ])
            expect(RankService.rankHand(hand)).toBe(7)
        });
        it("ranks a 4oak", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.TWO, Suit.Spade],
                [Rank.KING, Suit.Club],
                [Rank.TWO, Suit.Heart],
                [Rank.TWO, Suit.Diamond]
            ])
            expect(RankService.rankHand(hand)).toBe(8)
        });
        it("ranks a straight flush", () => {
            const hand = toCards([
                [Rank.TWO, Suit.Heart],
                [Rank.THREE, Suit.Heart],
                [Rank.FOUR, Suit.Heart],
                [Rank.FIVE, Suit.Heart],
                [Rank.SIX, Suit.Heart]
            ]);
            expect(RankService.rankHand(hand)).toBe(9);
        });
        it("ranks a royal flush", () => {
            const hand = toCards([
                [Rank.ACE, Suit.Heart],
                [Rank.KING, Suit.Heart],
                [Rank.QUEEN, Suit.Heart],
                [Rank.JACK, Suit.Heart],
                [Rank.TEN, Suit.Heart]
            ]);
            expect(RankService.rankHand(hand)).toBe(10);
        });
    });
})

function toCards(cards: [Rank, Suit][]) {
    const result: Card[] = []
    for (const [rank, suit] of cards) {
        result.push({
            rank, suit
        })
    }
    return result;
}