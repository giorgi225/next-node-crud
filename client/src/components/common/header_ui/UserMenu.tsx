import { UserResponseTypes } from "@/types/response.types";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";

const userNavigation = [
  { name: "Home", href: "/" },
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const UserMenu = ({
  user,
  classNames,
}: {
  user: UserResponseTypes;
  classNames: (...classes: string[]) => string;
}) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-12 w-12 rounded-full"
            src={
              (user.profile_image && user.profile_image === "profile.svg") ||
              !user.profile_image
                ? "/imgs/user/profile.svg"
                : user.profile_image
            }
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
