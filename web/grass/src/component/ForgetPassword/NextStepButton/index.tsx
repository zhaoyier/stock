import * as React from "react";
import {
    Button
} from "antd";
import { getText } from "../../../util/kit";
import "./index.scss";

interface NextStepButtonProps {
    onClick?: Function;
    text?: string;
    disabled?: boolean;
    width?: number;
}

export default function NextStepButton(props: NextStepButtonProps) {
    const {
        onClick = () => {},
        text= getText("Next step"),
        disabled= false,
        width= 310
    } = props;

    return (
        <div className="NextStepButtonWrap">
            <Button
                type="primary"
                onClick={onClick as any}
                disabled={disabled}
                style={{width}}>
                { text }
            </Button>
        </div>
    );
}
