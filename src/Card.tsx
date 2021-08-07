import * as React from "react";
import { FunctionComponent } from "react";
export enum Suit {
    "Hearts",
    "Spades",
    "Diamonds",
    "Clubs"
}
export const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
// usage: <Card rank={"A"} suit={"Hearts"} />
interface CardProps {
    rank: string;
    suit: Suit;
}
export const Card: FunctionComponent<CardProps> = ({rank, suit}) => {
    return <>{rank} of {suit}</>
}


const AceOfHearts = () => <Card rank="A" suit={Suit.Hearts} />

