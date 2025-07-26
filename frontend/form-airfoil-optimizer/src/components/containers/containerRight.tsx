import React from "react";
import "./styleContainers.css"

type Props = {
    children: React.ReactNode
};

const ContainerRight = ({children}: Props) => {

    return(
        <div className="container-right">
            {children}
        </div>
    )
};

export default ContainerRight
