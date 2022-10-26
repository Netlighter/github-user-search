import { useDispatch, useSelector } from 'react-redux';
import styles from './CommitPage.module.scss';

import { gitCommitRequest } from '../../store/fetchSlice';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function CommitPage() {
  const { commits, status } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const login = searchParams.get('login');
  const repo = searchParams.get('repo');

  const errorMsg = useSelector((state) => state.user.error);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(gitCommitRequest({ login, repo }));
  }, [dispatch]);

  return (
    <div>
      {status === 'rejected' && (
        <div className={styles.parent}>
          <container className={styles.alert}>
            <p className={styles.alert_text}>No commits found...</p>
          </container>
          <Link to={'..'} relative="path">
            <button className={styles.back_btn}>Go back</button>
          </Link>
        </div>
      )}

      {status === 'loading' && (
        <div className={styles.loader}>
          <img
            src={require('../../assets/gif/Pulse-1s-200px.gif')}
            alt="Loading"
          />
        </div>
      )}

      {status === 'resolved' && (
        <div className={styles.parent}>
          <header className={styles.user_card}>
            <div className={styles.user_info}>
              <p className={styles.user_login}>{login}</p>
              <p className={styles.user_name}>{repo}</p>
            </div>
          </header>
          <button className={styles.back_btn} onClick={() => navigate(-1)}>
            Go back
          </button>
          <div>
            <table className={styles.repos_table_wrapper}>
              <thead>
                <tr>
                  <th className={styles.col_name}>Name</th>
                  <th className={styles.col_sha}>Hash</th>
                  <th className={styles.col_date}>Date</th>
                </tr>
              </thead>
              <tbody>
                {commits[0] &&
                  commits?.map((commit) => (
                    <tr>
                      <td className={styles.col_name}>{commit.name}</td>
                      <td className={styles.col_sha}>{commit.sha}</td>
                      <td className={styles.col_date}>{commit.date.split("T")[0]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommitPage;

