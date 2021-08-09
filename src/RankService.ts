import * as React from "react";
import { Suit, suits } from "./Card";

export interface Card {
    rank: Rank;
    suit: Suit;
}

// need enum for HandKind: point value

export enum Rank {
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
    ACE
}
export const allRanks: Rank[] = Object.values(Rank).filter(v => typeof v === "number") as Rank[];

export class RankService {
    static handSize: number = 5;

    static createDeck(): Card[] {
        let deck: Card[] = [];

        for (let i = 0; i < allRanks.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                //const card = new Card();
                let rank = allRanks[i];
                let suit = suits[j];
                deck.push({ rank, suit });
            }
        }
        console.log(deck);
        return deck;
    }

    static drawHand(deck: Card[]): Card[] {
        let hand: Card[] = [];
        for (let i = 0; i < this.handSize; i++) {
            console.log(deck.length);
            let cardIdx = this.getRandomInt(deck.length - 1);
            let card = deck.splice(cardIdx, 1)[0];
            hand.push(card);
        }
        console.log(hand);
        return hand;
    }

    static rankHand(hand: ReadonlyArray<Card>): number {
        let result = 0;
        if (this.isRoyalFlush(hand).match) {
            result = 10;
        } else if (this.isStraightFlush(hand).match) {
            result = 9;
        } else if (this.isFourOfAKind(hand).match) {
            result = 8;
        } else if (this.isFullHouse(hand).match) {
            result = 7;
        } else if (this.isFlush(hand).match) {
            result = 6;
        } else if (this.isStraight(hand).match) {
            result = 5;
        } else if (this.isThreeOfAKind(hand).match) {
            result = 4;
        } else if (this.isTwoPair(hand).match) {
            result = 3;
        } else if (this.isPair(hand).match) {
            result = 2;
        } else {
            //this.isHighCard(hand).rank;
            result = 1;
        }
        console.log({result});
        return result;
    }

    static isRoyalFlush(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        // XXX: does this formatting smell?
        // why does not checking for a flush here make the ace high test fail?
        if (this.isStraight(hand).match && 
            this.isFlush(hand).match && 
            hand.filter(c => c.rank === Rank.KING).length > 0 && 
            hand.filter(c => c.rank === Rank.ACE).length > 0) {
            return { matchingCards: [...hand], match: true };
        }
        return { matchingCards: [], match: false };
    }

    static isStraightFlush(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        if (this.isStraight(hand).match && this.isFlush(hand).match) {
            return { matchingCards: [...hand], match: true };
        }
        return { matchingCards: [], match: false };
    }

    static isFourOfAKind(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        let matches: Card[];
        for (let i = 0; i < hand.length; i++) {
            matches = this.matchesInArray(hand, hand[i]);
            if (matches.length > 3) {
                return { matchingCards: matches, match: true };
            }
        }
        return { matchingCards: [], match: false };
    }

    static isFullHouse(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        let pairResult = this.isPair(hand);
        if (pairResult.match) {
            let filteredHand = hand.filter((card) => !pairResult.matchingCards.includes(card));
            //console.log({ filteredHand });
            let threeOAKResult = this.isThreeOfAKind(filteredHand);
            if (threeOAKResult.match) {
                const matchingCards = pairResult.matchingCards.concat(threeOAKResult.matchingCards);
                return { matchingCards: matchingCards, match: true };
            } else {
                return { matchingCards: [], match: false };
            }
        } else {
            return { matchingCards: [], match: false };
        }
    }

    static isFlush(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        const targetSuit = hand[0].suit;
        const isSameSuit = (card: Card) => card.suit === targetSuit;
        const match = hand.every(isSameSuit);
        if (match) {
            const matchingCards = [...hand];
            return { matchingCards, match };
        }
        return { matchingCards: [], match };
    }

    static isStraight(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        // order hand
        // see if ordered hand matches subset of this.ranks
        const orderedHand = [...hand].sort(this.compareRanks);
        //console.log({ orderedHand });
        let failedStraight = false;
        let hasAce = false;
        for (let i = 1; i < hand.length; i++) {
            const card = orderedHand[i];
            const lastCard = orderedHand[i - 1];
            if (card.rank === Rank.ACE) {
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
            const aceLowRanks = hand.map(c => {
                if (c.rank === Rank.ACE) {
                    return 1;
                } else {
                    return c.rank;
                }
            }).sort();
            for (let i = 1; i < aceLowRanks.length; i++) {
                const lastRank = aceLowRanks[i - 1];
                const rank = aceLowRanks[i];
                if (rank === lastRank + 1) {
                    continue;
                } else {
                    return { match: false, matchingCards: [] };
                }
            }
        } else if (failedStraight) {
            return { match: false, matchingCards: [] };
        }
        return { matchingCards: [...hand], match: true };
    }

    static compareRanks(a: Card, b: Card): number {
        if (a.rank < b.rank) {
            return -1;
        } else if (a.rank > b.rank) {
            return 1;
        }
        return 0;
    }

    static isThreeOfAKind(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        let matches: Card[];
        for (let i = 0; i < hand.length; i++) {
            matches = this.matchesInArray(hand, hand[i]);
            if (matches.length > 2) {
                return { matchingCards: matches, match: true };
            }
        }
        return { matchingCards: [], match: false };
    }

    static isTwoPair(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        let pairAResult = this.isPair(hand);
        if (pairAResult.match) {
            let filteredHand = hand.filter((item) => !pairAResult.matchingCards.includes(item));
            //console.log({ filteredHand });
            let pairBResult = this.isPair(filteredHand);
            if (pairBResult.match) {
                const matchingCards = pairAResult.matchingCards.concat(pairBResult.matchingCards);
                return { matchingCards: matchingCards, match: true };
            } else {
                return { matchingCards: [], match: false };
            }
        } else {
            return { matchingCards: [], match: false };
        }
    }

    static isPair(hand: ReadonlyArray<Card>): { matchingCards: Card[], match: boolean } {
        /*
        const targetNumberOfMatches = 2;
        return { matchingCards: this.findNumberOfMatches(hand, targetNumberOfMatches), match: false };
        */

        let matches: Card[];
        for (let i = 0; i < hand.length; i++) {
            matches = this.matchesInArray(hand, hand[i]);
            if (matches.length > 1) {
                return { matchingCards: matches, match: true };
            }
        }
        return { matchingCards: [], match: false };
    }

    static isHighCard(hand: Card[]): Card {
        let highCard = hand[0];
        for (let i = 0; i < this.handSize; i++) {
            if (hand[i].rank > highCard.rank) {
                highCard = hand[i];
            }
        }
        return highCard;
    }

    static matchesInArray(cards: ReadonlyArray<Card>, target: Card): Card[] {
        const result = cards.filter(card => card.rank === target.rank);
        return result;
    }

    /*
    static findNumberOfMatches(cards: Card[], targetNumberOfMatches: number): Card[] {
        let matches: Card[] = [];
        for (let i = 0; i < cards.length; i++) {
            matches = this.matchesInArray(cards, cards[i]);
            if (matches.length > targetNumberOfMatches) {
                return matches;
            }
        }
        return matches;
    }
    */

    static getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

}