import "./globals.css";
import Sidebar from "./comp/sidebar";
import Header from "./comp/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex items-start">
          <Sidebar />

          <div className="w-full md:pl-64">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
