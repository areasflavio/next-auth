import { useContext, useEffect } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { setUpAPIClient } from '../services/api';
import { api } from '../services/apiClient';

import { withSSRAuth } from '../utils/withSSRAuth';

import { Can } from '../components/Can';

export default function Dashboard(): JSX.Element {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Dashboard - {user?.email}</h1>

      <button type="button" onClick={signOut}>
        Sign Out
      </button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setUpAPIClient(ctx);

  const response = await apiClient.get('/me');

  return {
    props: {},
  };
});
