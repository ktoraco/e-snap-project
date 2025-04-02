import { ReactNode } from 'react';
import ".styles/global.css";
import MainContent from './pages/MainContent';
import Sidebar from '../components/Sidebar';

export const metadata: { title: string; description: string } = {
  title: "e-Snap Project",
  description: "game世界のsnap写真を閲覧できるwebApp"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='jp'>
      <body>
        <div className="layout-container">
          <Sidebar />
        </div>
        <div className="main-content-">
          {children}
        </div>
      </body>
    </html>
  );
}
