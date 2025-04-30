
import "./globals.css";

export const metadata = {
  title: "Bioetanol 3D",
  description: "Simulación 3D del proceso de producción de bioetanol a partir de piña",
  icons: {
    icon: '/pina.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
