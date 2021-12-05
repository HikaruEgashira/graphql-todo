import type { NextPage } from "next";
import Head from "next/head";
import { login } from "~/app/auth";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const DashBoard: NextPage = () => {
  return (
    <div data-theme="retro" className="text-primary-content bg-primary">
      <Head>
        <title>TODO βベータ版 | ログイン</title>
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
        <div className="card shadow bg-base-100 text-base-content">
          <div className="card-body gap-5">
            <h2 className="card-title">ログイン</h2>
            <button
              className="btn btn-ghost btn-outline gap-6"
              onClick={async () => {
                await login("google");
                toast.success("ログインしました");
              }}
            >
              <Icon icon="logos:google-icon" width="16" height="16" />
              Sign in with Google
            </button>
            <button
              className="btn btn-ghost btn-outline gap-6"
              onClick={async () => {
                toast.error("Not Implemented");
              }}
            >
              <Icon icon="logos:github-icon" width="16" height="16" />
              Sign in with GitHub
            </button>
            <button
              className="btn btn-ghost btn-outline gap-6"
              onClick={async () => {
                toast.error("Not Implemented");
              }}
            >
              <Icon icon="logos:twitter" width="16" height="16" />
              Sign in with Twitter
            </button>
            <button
              className="btn btn-ghost btn-outline gap-6"
              onClick={async () => {
                await login("anonymous");
                toast.success("ログインしました");
              }}
            >
              <Icon icon="raphael:anonymous" width="16" height="16" />
              ゲストで試す
            </button>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 right-0">@hikaetech</footer>
    </div>
  );
};

export default DashBoard;
