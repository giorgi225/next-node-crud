import Link from "next/link";

const Nav = () => {
  return (
    <>
      <Link
        href="/"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        Home
      </Link>
      <Link
        href="/products"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        Products
      </Link>
    </>
  );
};

export default Nav;
