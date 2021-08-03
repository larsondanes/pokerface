import * as React from "react";
import { useState } from "react";
export const ClearableInput = ({value, onChange}) => {
    return (<>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}></input>
        <button onClick={() => onChange("")}>x</button>
    </>)
}