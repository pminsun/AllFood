import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={`${styles.header} `}>
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
