import { AppProps } from "next/app";
import "../styles/global.css";
import Sidebar from "../components/Sidebar";
import games from "../lib/games";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar games={games} onGameClick={() => {}} />
      <div className="flex-grow overflow-y-scroll h-full">
        <Component {...pageProps} games={games} />
      </div>
    </div>
  );
}
