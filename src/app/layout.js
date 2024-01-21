import ThemeRegistry from '@/components/App/ThemeRegistry';
import TitleBar from '@/components/App/TitleBar';
import Providers from '@/providers';
import {Button} from '@mui/material';
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <AppRouterCacheProvider options={{enableCssLayer: true, key: 'nd-web-theme'}}>
        <ThemeRegistry>
            <Providers>
              <TitleBar/>
              <div className="content-container">{children}</div>
            </Providers>
        </ThemeRegistry>
      </AppRouterCacheProvider>
      </body>
      </html>);
}
