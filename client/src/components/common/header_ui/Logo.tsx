import Image from "next/image";

const Logo = () => {
  return (
    <a href="#" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <Image
        priority={true}
        className="h-14 w-auto"
        width={50}
        height={50}
        src="/imgs/logo/logo.png"
        alt="Logo"
      />
    </a>
  );
};

export default Logo;
