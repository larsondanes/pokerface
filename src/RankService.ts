import * as React from "react";
import { allRanks, CardRank, Suit, suits } from "./Card";
import { Flush, FourOfAKind, FullHouse, HighCard, Pair, RankedHand, RankedHandFactory, RoyalFlush, Straight, StraightFlush, ThreeOfAKind, TwoPair } from "./RankedHand";

export interface Card {
    rank: CardRank;
    suit: Suit;
}

// need enum for HandKind: point value

export enum HandRank {
    HIGHCARD,
    PAIR,
    TWOPAIR,
    THREEOFAKIND,
    STRAIGHT,
    FLUSH,
    FULLHOUSE,
    FOUROFAKIND,
    STRAIGHTFLUSH,
    ROYALFLUSH
}

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

    static rankHand(hand: ReadonlyArray<Card>): RankedHand {
        const RankedHandClasses: RankedHandFactory[] = [
            RoyalFlush, StraightFlush,FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, Pair, HighCard
        ];
        for (const RankedHandClass of RankedHandClasses) {
            const result = RankedHandClass.from(hand);
            if (result) {
                return result;
            }
        }
        throw new Error("Failed to rank hand");
    }

    static compareRanks(a: Card, b: Card): number {
        if (a.rank < b.rank) {
            return -1;
        } else if (a.rank > b.rank) {
            return 1;
        }
        return 0;
    }

    static compareRanksAceLow(a: Card, b: Card): number {
        if (a.rank === CardRank.ACE) {
            if (b.rank === CardRank.ACE) {
                return 0;
            } else {
                return -1;
            }
        } else if (b.rank === CardRank.ACE) {
            return 1;
        }
        return RankService.compareRanks(a, b);
    }

    static matchesInArray(cards: ReadonlyArray<Card>, target: Card): Card[] {
        const result = cards.filter(card => card.rank === target.rank);
        return result;
    }

    static getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

}