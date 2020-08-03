import React from "react";

export const ContactForm: React.FunctionComponent<any> = ({

}) => {

    const handleSubmit = () => {

    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text"/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="text"/>
            </div>
            <div className="inputGroup">
                <label htmlFor="mobile">Mobile</label>
                <input type="text"/>
            </div>
            <div className="inputGroup">
                <label htmlFor="gender">Gender</label>
                <input type="text"/>
            </div>
            <div className="inputGroup">
                <label htmlFor="message">Message</label>
                <textarea/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
};

export default ContactForm;