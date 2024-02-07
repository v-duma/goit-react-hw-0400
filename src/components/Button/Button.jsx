import React from 'react';
import styles from './Button.module.css'
import PropTypes from 'prop-types'
const Button = ({ onLoadMore }) => {
    return (
        <button type="button" className={styles.btn} onClick={onLoadMore}>
            Load more
        </button>
    );
};
Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};
export default Button;