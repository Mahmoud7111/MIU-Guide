import React from 'react';
import styles from './ErrorPage.module.css';

const ErrorPage = ({ message }) => <div className={styles.error}>{message || 'An error occurred.'}</div>;

export default ErrorPage;
