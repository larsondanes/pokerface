import * as React from "react";
import { FunctionComponent, ReactElement } from "react";

export interface Name {
    firstName: string;
    lastName: string;
}
interface NameListProps {
    names: Name[]
}
export const NameList: FunctionComponent<NameListProps> = ({names}) => {
    const result = names.map(({firstName, lastName}) => <div key={firstName + lastName}>{lastName}, {firstName}</div>)
    return <>{
        result
    }</>
}
