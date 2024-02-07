import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ image, onCloseModal }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseModal]);

    const handleCloseModal = (event) => {
        if (event.target === event.currentTarget) {
            onCloseModal();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleCloseModal}>
            <div className={styles.modal}>
                <img src={image.largeImageURL} alt="" />
            </div>
        </div>
    );
};

Modal.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
