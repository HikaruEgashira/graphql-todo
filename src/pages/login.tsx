import type { NextPage } from "next";
import Head from "next/head";
import { AuthAction, withAuthUser } from "next-firebase-auth";

const DashBoard: NextPage = () => {
  return (
    <div data-theme="retro" className="text-primary-content bg-primary">
      <Head>
        <title>SMART SBSC | ログイン</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {/* <div className="fixed w-full text-center bg-base-100 text-base-content py-2">
        <p>【開発者からのメッセージ】こちらはまだリリース前のサービスです。</p>
        <a className="link" href="https://forms.gle/1Kz5ndKhJdYVakwy7">
          こちらから早期アクセスプログラムに参加できます
        </a>
      </div> */}

      <main className="container mx-auto flex flex-col md:flex-row h-screen w-screen items-center justify-evenly">
        login
      </main>
      <footer className="fixed bottom-0 right-0">@hikaetech</footer>
    </div>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(DashBoard);