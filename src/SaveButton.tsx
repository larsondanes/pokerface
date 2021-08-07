import * as React from "react";
import { FunctionComponent, MouseEventHandler } from "react";
interface SaveButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
}


export const SaveButton: FunctionComponent<SaveButtonProps> = ({onClick}) => {
    return <button onClick={onClick}>Save</button>
}

class ClassSaveButton extends React.Component<SaveButtonProps>{
    render() {
        return <button onClick={this.props.onClick}>Save</button>
    }
}
