import * as React from "react";
import { getText } from "../../../util/kit";
import "./index.scss";

export default function Footer() {
    return (
        <div className="FooterWrap">
            { getText("Welcome to ezbuy sellers settled in the platform, we look forward to working with you for your cooperation!") }
        </div>
    );
}
