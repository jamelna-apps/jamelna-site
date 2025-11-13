import "../globals.css";

export const metadata = {
  title: "Sanity Studio",
  description: "Content management for jamelna.com",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
