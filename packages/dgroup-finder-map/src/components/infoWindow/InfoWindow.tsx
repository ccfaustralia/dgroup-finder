import React from "react";
import styles from './InfoWindow.module.css'


export const InfoWindow: React.FunctionComponent<any> = ({dgroup}) => {
    return (
        <div className={styles.infoWindowContainer}>
            <h2>
                {dgroup.name}
            </h2>
            <i>{dgroup.lifeStage}</i>
            <p>{dgroup.description}</p>
        </div>
    );
};

export default InfoWindow;