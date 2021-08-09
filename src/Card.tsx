import * as React from "react";
import { FunctionComponent } from "react";

export enum Suit {
    "heart",
    "spade",
    "diamond",
    "club"
}
export const suits = ["heart", "spade", "diamond", "club"];
// usage: <Card rank={"A"} suit={"Hearts"} />
interface CardProps {
    rank: string;
    suit: Suit;
}
export const Card: FunctionComponent<CardProps> = ({rank, suit}) => {
    return <>{rank} of {suit}</>
}


const AceOfHearts = () => <Card rank="A" suit={Suit.heart} />

