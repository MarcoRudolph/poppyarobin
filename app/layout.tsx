export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* This will render either mobile or desktop children based on middleware */}
        {children}
      </body>
    </html>
  );
}
