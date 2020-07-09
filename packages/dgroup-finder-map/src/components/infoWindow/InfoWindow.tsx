import React from "react";
import styles from './InfoWindow.module.css'


export const InfoWindow: React.FunctionComponent<any> = ({dgroup}) => {
    return (
        <div className={styles.infoWindowContainer}>
            <p>
                {dgroup.name}
            </p>
        </div>
    );
};

export default InfoWindow;