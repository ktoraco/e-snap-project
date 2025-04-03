import { AppProps } from 'next/app';
import '../styles/global.css';
import Sidebar from '../components/Sidebar';

const games = [
  { id: 1, name: 'Game 1', icon: '/icons/g-icon_1.jpg' },
  { id: 2, name: 'Game 2', icon: '/icons/g-icon_2.jpg' },
  { id: 3, name: 'Game 3', icon: '/icons/g-icon_3.jpg' },
  { id: 4, name: 'Game 4', icon: '/icons/g-icon_4.jpg' },
  { id: 5, name: 'Game 5', icon: '/icons/g-icon_5.jpg' },
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
