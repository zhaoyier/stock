import * as React from "react";
import "./index.scss";

interface TableProps {
    children: React.ReactNode;
    className?: string;
}

class Table extends React.Component<TableProps, {}> {
    render() {
        const { children, className = "" } = this.props;

        return (
            <div className={`Table_Wrap ${className}`}>
                { children }
            </div>
        );
    }
}

export default Table;
