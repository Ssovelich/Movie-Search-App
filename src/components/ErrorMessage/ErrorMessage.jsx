import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return <p className={styles.message}>❌ Oh no, something went wrong</p>;
};

export default ErrorMessage;
