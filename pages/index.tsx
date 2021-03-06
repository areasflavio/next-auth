import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await signIn({ email, password });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next Auth</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next Auth</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
