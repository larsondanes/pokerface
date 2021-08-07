import * as React from "react";
import { FunctionComponent, useState } from "react";
interface ClearableInputProps {
    value: string;
    onChange: (value: string) => void;
}
export const ClearableInput: FunctionComponent<ClearableInputProps> = ({value, onChange}) => {
    return (<>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}></input>
        <button onClick={() => onChange("")}>x</button>
    </>)
}