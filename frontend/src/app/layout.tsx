import type { Metadata } from 'next';
import '../app/globals.css'; // Importation des styles Tailwind

export const metadata: Metadata = {
  title: 'Voix Indélébiles',
  description: 'Un blog pour des voix inoubliables',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}