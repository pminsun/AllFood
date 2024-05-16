import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/Header.module.css";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://campaign.veloga.co.kr`
      : `http://localhost:3002`;
  const { data: session, status } = useSession();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${
        scrollPosition > 80 ? styles.headerChange : ""
      }`}
    >
      <div>
        <nav>
          <ul>
            <li>
              <Link href={"/nutrition"}>Nutrition</Link>
            </li>
            <li>
              <Link href={"/recipes"}>RECIPES</Link>
            </li>
          </ul>
        </nav>
        <h1>
          <Link href={"/"}>AllFood</Link>
        </h1>
        <nav>
          <ul>
            <li>
              {status === "authenticated" ? (
                <Link href={"/user/mypage"}>MY Page</Link>
              ) : (
                <Link href={"/user/login"}>LOGIN</Link>
              )}
            </li>
            {status === "authenticated" ? (
              <p onClick={() => signOut({ callbackUrl: `/` })}>LOGOUT</p>
            ) : (
              <li>
                <Link href={"/user/signup"}>Sign up</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
