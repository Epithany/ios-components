import "@/app/globals.css";

export const metadata = {
  title: "iOS App Folder",
  description: "Created by Ethany Kahari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
