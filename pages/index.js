import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/client";

export default function Home() {
  return <div className={styles.container}></div>;
}
