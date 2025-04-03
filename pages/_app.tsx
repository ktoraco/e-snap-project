import { AppProps } from 'next/app';
import '../styles/global.css';
import Sidebar from '../components/Sidebar';

const games = [
  { id: 1, name: 'Game 1', icon: '/icons/game1.png' },
  { id: 2, name: 'Game 2', icon: '/icons/game2.png' },
  { id: 3, name: 'Game 3', icon: '/icons/game3.png' },
];

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar games={games} onGameClick={() => {}} />
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
