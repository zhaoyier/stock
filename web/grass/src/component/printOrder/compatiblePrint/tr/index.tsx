import * as React from "react";
import "./index.scss";

interface TrProps {
    children: React.ReactNode;
    className?: String;
    style?: Object;
}

class Tr extends React.Component<TrProps, {}> {
    render() {
        const { children, className = "", style = {} } = this.props;
        const styles = Object.assign({}, style);

        return (
            <div className={`Tr_Wrap ${className}`} style={styles}>
                { children }
            </div>
        );
    }
}

export default Tr;
