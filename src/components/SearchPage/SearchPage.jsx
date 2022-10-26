import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchPage.module.scss';

import { gitUserRequest } from '../../store/fetchSlice';
import { useState } from 'react';

import { Link } from "react-router-dom";

function SearchPage() {
  const [login, setLogin] = useState('');

  
  return (
    <div className={styles.parent}>
      <h1 className={styles.heading}>Github user search</h1>
      <input
        className={styles.search_input}
        placeholder="Search..."
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      
      <Link to={`user?login=${login}`}>
      <button className={styles.search_btn}>
        Search
      </button>

      </Link>
    </div>
  );
}

export default SearchPage;

