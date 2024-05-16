import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  console.log(scroll);

  return (
    <header className={`${styles.header} ${scroll ? "header_change" : ""}`}>
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
              <Link href={"/user/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/user/signup"}>Sign up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
