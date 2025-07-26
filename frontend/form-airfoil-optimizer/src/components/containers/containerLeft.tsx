import React from "react";
import "./styleContainers.css"

type Props = {
    children: React.ReactNode;
};

const ContainerLeft = ({children}: Props) => {

    return(
        <div className="container-left">
            {children}
        </div>
    )
}

export default ContainerLeft;