"use client";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState("");

  const checkAccessToken = () => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  };

  useEffect(() => {
    // Watch for pathname changes
    checkAccessToken();
  }, [pathname]);

  useEffect(() => {
    // Check access token every 30 seconds
    const interval = setInterval(() => {
      checkAccessToken();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setAccessToken("");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.href = "/"; // Redirect to home and refresh the page
  };

  return (
    <nav className="mx-auto flex justify-between items-center py-4">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-xl font-bold">
          Fish Species
        </Link>
      </div>
      <div className="flex gap-4">
        {accessToken ? (
          <div className="flex gap-2">
            <Link
              href="/add"
              className="text-black bg-green-400 p-2 text-sm font-mono rounded-md font-semibold"
            >
              Add Fish
            </Link>
            <button
              onClick={handleLogout}
              className="text-black bg-red-400 p-2 text-sm font-mono rounded-md font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-black bg-blue-400 p-2 text-sm font-mono rounded-md font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
