export const metadata = {
  title: "BACKOFF",
  description: "Ropa y productos personalizados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
