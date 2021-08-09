import * as React from "react";
import { FunctionComponent } from "react";

export enum Suit {
    Heart = "heart",
    Spade = "spade",
    Diamond = "diamond",
    Club = "club"
}
export const suits = [Suit.Heart, Suit.Spade, Suit.Diamond, Suit.Club];
// usage: <Card rank={"A"} suit={"Hearts"} />
interface CardProps {
    rank: string;
    suit: Suit;
}
export const Card: FunctionComponent<CardProps> = ({rank, suit}) => {
    return <>{rank} of {suit}</>
}


const AceOfHearts = () => <Card rank="A" suit={Suit.Heart} />

