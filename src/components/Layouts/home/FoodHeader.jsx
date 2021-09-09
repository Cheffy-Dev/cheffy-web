import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";

const FoodHeader = (props) => {
  const [session, loading] = useSession();

  return (
    <nav
      style={{ backgroundColor: "#F7FCFF" }}
      className="dark:bg-gray-800 stickey"
    >
      <div className="mx-auto py-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex cursor-pointer red pl-12">
              <Link href="/">
                <img src="/images/logo.png" />
              </Link>
            </div>
            <div className="md:hidden cursor-pointer red  pl-8">
              <Link href="/">
                <img src="/images/mobile-logo.png" />
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="flex md:hidden pr-8">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className="hidden md:flex md:items-center md:justify-between flex-1">
            <div className="hidden md:flex md:items-center md:justify-between flex-1">
              <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                <Link href="/about">
                  <a>About</a>
                </Link>

                <Link href="/about">
                  <a className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md">
                    Contact us
                  </a>
                </Link>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <Link href="/kitchen">
                  <a className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm">
                    Rent Kitchen
                  </a>
                </Link>
                <Link href="/chef">
                  <a className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm">Chef</a>
                </Link>
                <Link href="/driver">
                  <a className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm">Driver</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FoodHeader;
