import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Layout from "~/components/Layout";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <Layout>
      <h1>Form Builder</h1>
      {sessionData?.user ? (
        <>
          <p>Welcome back {sessionData.user.name}</p>
          <div>
            <Link href="/form">Go to forms</Link>
          </div>
          <button onClick={() => void signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => void signIn("github")}>Sign in</button>
      )}
    </Layout>
  );
};

export default Home;
