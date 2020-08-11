import React from "react";
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import { ReactComponent as CloseIcon } from '../../assets/x.svg';

export const Modal: React.FunctionComponent<any> = ({title, children, onClose}) => {
    const modalRoot: HTMLElement = document.getElementById("modal-root") as HTMLElement;
    return ReactDOM.createPortal(
        <div className={styles.overlay} onMouseDown={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
            <div
                className={`${styles.modalContainer}`}
                role="button"
                tabIndex={0}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {title && (
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                )}
                <div className={styles.bodyOuter}>
                    <div className={styles.bodyInner}>
                        {children}
                        <button type="button" className={styles.topRightButton} onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;