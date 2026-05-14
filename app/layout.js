import "./globals.css";
export const metadata = {
  title: "La salud mental en la Fe",
  description: "Charla psicológica — Hna. Andrea Moys de Alfaro & Hna. Keren de Alvarenga",
};
export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
