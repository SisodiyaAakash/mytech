"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 | Not Found</title>
        <meta name="description" content="404 | Not Found" />
      </Head>
      <div className="not-found-page p-6 border-t border-grey flex-grow text-center flex flex-col items-center justify-center gap-6">
        <p className="text-base font-semibold text-[#2086BF]">404</p>
        <h1 className="text-5xl sm:text-7xl">Page not found</h1>
        <p className="mb-6 text-xl">
          Sorry, we couldn’t find the page you’re looking for.
          <br />
          <span className="text-sm">
            Designed by{" "}
            <a
              className="text-[#2086BF] font-medium opacity-60 relative after:w-0 after:h-0.5 after:bg-[#2086BF] after:absolute after:left-0 after:bottom-0 hover:opacity-100 hover:after:w-full hover:after:right-0 after:duration-500"
              href="https://github.com/SisodiyaAakash/mytech"
            >
              Aakash Sisodiya
            </a>
          </span>
        </p>
        <a
          href="/"
          className="mytech-btn bg-[#2086BF] hover:bg-transparent text-white hover:text-[#2086BF] border-[#2086BF] duration-500"
        >
          Go back home
        </a>
      </div>
    </>
  );
}
