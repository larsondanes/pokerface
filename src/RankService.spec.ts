import { Card, Rank, RankService } from "./RankService";

describe("class:RankService", () => {
    describe("static:Rank()", () => {
        it("ranks an ACE high", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.FOUR, "Clubs"],
                [Rank.SIX, "Spades"],
                [Rank.EIGHT, "Hearts"],
                [Rank.ACE, "Diamonds"]
            ])
            expect(RankService.rankHand(hand)).toBe(1)
        });
        it("ranks a pair", () => {
            const hand = toCards([
                [Rank.KING, "Hearts"],
                [Rank.TWO, "Clubs"],
                [Rank.FIVE, "Diamonds"],
                [Rank.ACE, "Spades"],
                [Rank.FIVE, "Spades"]])
            expect(RankService.rankHand(hand)).toBe(2);
        });
        it("ranks a two pair", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.TWO, "Clubs"],
                [Rank.SIX, "Spades"],
                [Rank.EIGHT, "Hearts"],
                [Rank.EIGHT, "Diamonds"]
            ])
            expect(RankService.rankHand(hand)).toBe(3)
        });
        it("ranks a 3oak", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.TWO, "Spades"],
                [Rank.KING, "Clubs"],
                [Rank.ACE, "Hearts"],
                [Rank.TWO, "Diamonds"]
            ])
            expect(RankService.rankHand(hand)).toBe(4)
        });
        it("ranks a straight", () => {
            const hand = toCards([
                [Rank.SEVEN, "Hearts"],
                [Rank.THREE, "Spades"],
                [Rank.FOUR, "Clubs"],
                [Rank.FIVE, "Hearts"],
                [Rank.SIX, "Spades"]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a straight with ace HIGH", () => {
            const hand = toCards([
                [Rank.TEN, "Hearts"],
                [Rank.QUEEN, "Spades"],
                [Rank.JACK, "Clubs"],
                [Rank.ACE, "Hearts"],
                [Rank.KING, "Spades"]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a straight with ace LOW", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.THREE, "Spades"],
                [Rank.FOUR, "Clubs"],
                [Rank.FIVE, "Hearts"],
                [Rank.ACE, "Spades"]
            ])
            expect(RankService.rankHand(hand)).toBe(5);
        });
        it("ranks a flush", () => {
            const hand = toCards([
                [Rank.SEVEN, "Clubs"],
                [Rank.THREE, "Clubs"],
                [Rank.EIGHT, "Clubs"],
                [Rank.FIVE, "Clubs"],
                [Rank.SIX, "Clubs"]
            ])
            expect(RankService.rankHand(hand)).toBe(6);
        });
        it("ranks a full house", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.TWO, "Spades"],
                [Rank.THREE, "Clubs"],
                [Rank.THREE, "Hearts"],
                [Rank.THREE, "Spades"]
            ])
            expect(RankService.rankHand(hand)).toBe(7)
        });
        it("ranks a 4oak", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.TWO, "Spades"],
                [Rank.KING, "Clubs"],
                [Rank.TWO, "Hearts"],
                [Rank.TWO, "Diamonds"]
            ])
            expect(RankService.rankHand(hand)).toBe(8)
        });
        it("ranks a straight flush", () => {
            const hand = toCards([
                [Rank.TWO, "Hearts"],
                [Rank.THREE, "Hearts"],
                [Rank.FOUR, "Hearts"],
                [Rank.FIVE, "Hearts"],
                [Rank.SIX, "Hearts"]
            ]);
            expect(RankService.rankHand(hand)).toBe(9);
        });
        it("ranks a royal flush", () => {
            const hand = toCards([
                [Rank.ACE, "Hearts"],
                [Rank.KING, "Hearts"],
                [Rank.QUEEN, "Hearts"],
                [Rank.JACK, "Hearts"],
                [Rank.TEN, "Hearts"]
            ]);
            expect(RankService.rankHand(hand)).toBe(10);
        });
    });
})

function toCards(cards: [Rank, string][]) {
    const result: Card[] = []
    for (const [rank, suit] of cards) {
        result.push({
            rank, suit
        })
    }
    return result;
}