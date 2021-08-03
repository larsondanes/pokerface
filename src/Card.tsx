import * as React from "react";
import { FunctionComponent } from "react";
// usage: <Card rank={"A"} suit={"Hearts"} />
interface CardProps {
    rank: "A" | "K" | "Q" | "J" | number;
    suit: "Hearts"|"Spades"|"Diamonds"|"Clubs";
}
export const Card: FunctionComponent<CardProps> = ({rank, suit}) => {
    return <>{rank} of {suit}</>
}


const AceOfHearts = () => <Card rank="A" suit="Hearts" />

