import React from 'react';
import styles from './Popup.module.css';
import { assert } from 'src/utils/assert';
import ReactDOM from 'react-dom';

type TProps = {
    onClose(): void;
};

const modalRoot = document.getElementById('modal-root');
assert(modalRoot);

export const Popup: React.FC<TProps> = ({ onClose, children }) => {
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={styles.popup} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>,
        modalRoot,
    );
};
