import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="p-6">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
