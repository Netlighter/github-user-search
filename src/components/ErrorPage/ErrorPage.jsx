import { useRouteError } from "react-router-dom";
import styles from './ErrorPage.module.scss';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.parent} id="error-page">
      <h1 className={styles.heading}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <p className={styles.alert_text}>{error.statusText || error.message}</p>
      </p>
    </div>
  );
}