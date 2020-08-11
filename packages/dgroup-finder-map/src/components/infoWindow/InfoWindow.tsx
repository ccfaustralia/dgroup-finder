import React, {useState} from "react";
import styles from './InfoWindow.module.css'
import ContactForm from "../contactForm/ContactForm";


export const InfoWindow: React.FunctionComponent<any> = ({dgroup}) => {
    const [showContactModal, setShowContactModal] = useState<boolean>(false);

    return (
        <div className={styles.infoWindowContainer}>
            <h2>
                {dgroup.name}
            </h2>
            <i>{dgroup.lifeStage}</i>
            <p>{dgroup.description}</p>
            <button onClick={() => setShowContactModal(true)}>Join This DGroup</button>
            {showContactModal && <ContactForm dgroup={dgroup} onCloseModal={() => setShowContactModal(false)}/>}
        </div>
    );
};

export default InfoWindow;