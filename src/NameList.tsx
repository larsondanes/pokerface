import * as React from "react";

export const NameList = ({names}) => {
    return names.map(({firstName, lastName}) => <div>{lastName}, {firstName}</div>)
}