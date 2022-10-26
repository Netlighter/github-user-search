import { useDispatch, useSelector } from 'react-redux';
import styles from './UserPage.module.scss';

import { gitUserRequest } from '../../store/fetchSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function UserPage() {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const login = searchParams.get('login');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(gitUserRequest(login));
  }, [login, dispatch]);

  const errorMsg = useSelector((state) => state.user.error);

  return (
    <div>
      {status === 'rejected' && (
        <div className={styles.parent}>
          <container className={styles.alert}>
            <p className={styles.alert_text}>{errorMsg}</p>
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
            <img src={user.avatar} alt="User avatar" />
            <div className={styles.user_info}>
              <p className={styles.user_login}>{user.login}</p>
              <p className={styles.user_name}>{user.name}</p>
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
                  <th className={styles.col_desc}>Description</th>
                  <th className={styles.col_lang}>Language</th>
                  <th className={styles.col_star}>Stars</th>
                </tr>
              </thead>
              <tbody>
                {user.repos?.map((repo) => (
                  <tr>
                    <Link
                      to={`../commits?login=${user.login}&repo=${repo.name}`}
                      relative="path"
                    >
                      <td className={styles.col_name}>
                        <b>{repo.name}</b>
                      </td>
                    </Link>
                    <td className={styles.col_desc}>{repo.description}</td>
                    <td className={styles.col_lang}>{repo.language}</td>
                    <td className={styles.col_star}>{repo.stars}</td>
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

export default UserPage;

