import Logo from "@/components/common/header_ui/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-105px)] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
