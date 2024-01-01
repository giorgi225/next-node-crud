import DefaultLayout from "@/components/layouts/DefaultLayout";
import "./index.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
};

export default RootLayout;
