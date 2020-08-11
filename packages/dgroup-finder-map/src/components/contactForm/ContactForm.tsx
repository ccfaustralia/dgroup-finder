import React from "react";
import Modal from "../modal/Modal";
import styles from './ContactForm.module.css'


export const ContactForm: React.FunctionComponent<any> = ({
    dgroup,
    onCloseModal
}) => {

    const handleSubmit = () => {

    };

    return(
        <Modal title='Join DGroup' onClose={onCloseModal}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className="input-group grid-full-width">
                    <label htmlFor="name">Name</label>
                    <input type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="text"/>
                </div>
                <div className="input-group grid-full-width">
                    <label htmlFor="message">Message</label>
                    <textarea/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Modal>
    )
};

export default ContactForm;