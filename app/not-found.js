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
        <p className="mb-6">
          Sorry, we couldn’t find the page you’re looking for.
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
