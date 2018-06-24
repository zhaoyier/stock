import * as React from "react";
import "./index.scss";

interface TdProps {
    children: React.ReactNode;
    className?: String;
    width?: number;
    style?: Object;
}

class Td extends React.Component<TdProps, {}> {
    render() {
        const { children = null, className = "", width = 0, style = {} } = this.props;
        const styleWidth = width ? {width: `${width * 100}%`} : {};
        const styles = Object.assign({}, styleWidth, style);

        return (
            <span
                className={`Td_Wrap ${className}`}
                style={styles}>
                { children }
            </span>
        );
    }
}

export default Td;
