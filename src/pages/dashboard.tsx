import type { NextPage } from "next";
import Head from "next/head";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { toast } from "react-toastify";

const DashBoard: NextPage = () => {
  const AuthUser = useAuthUser();

  return (
    <div data-theme="retro" className="bg-base-100 text-base-content">
      <Head>
        <title>SMART SBSC | ダッシュボード</title>
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
        hello! {AuthUser.id}
        <button
          className="btn"
          onClick={async () => {
            await AuthUser.signOut();
            toast.success("ログアウトしました");
          }}
        >
          signout
        </button>
      </main>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashBoard);
