import { AppProps } from "next/app";
import "../styles/global.css";
import Sidebar from "../components/Sidebar";
import games from "../lib/games";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar games={games} onGameClick={() => {}} />
      <div style={{ flex: 1 }}>
        <Component {...pageProps} games={games} />
      </div>
    </div>
  );
}
