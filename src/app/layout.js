// app/layout.jsx
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gerador de Senhas",
  description: "Gerador de senhas seguras",
  icons: {
    icon: [
      {
        url: "public/trancar.png", // /public path
        href: "public/trancar.png", // /public path
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155657319861390"
        crossorigin="anonymous"
      ></script>
      <meta name="google-adsense-account" content="ca-pub-8155657319861390" />
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
