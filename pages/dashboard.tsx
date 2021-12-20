import { useContext, useEffect } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function Dashboard(): JSX.Element {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return <h1>Dashboard - {user?.email}</h1>;
}
