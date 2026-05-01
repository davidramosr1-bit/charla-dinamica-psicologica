import "./globals.css";

export const metadata = {
  title: "Ansiedad y Depresión — Charla Psicológica",
  description: "Comprendiendo nuestras emociones — Psic. Andrea Moys de Alfaro & Psic. Keren de Alvarenga",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
