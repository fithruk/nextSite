import Image from "next/image";
import backgroundHeader from "../../assets/images/header_background.png";
import NavBar from "../navigation/NavBar";
import styles from "./header.module.css";
import { HeaderContent } from "./HeaderContent/HeaderContent";
import { ForwardedRef, forwardRef } from "react";

type Props = {
  refs: ForwardedRef<HTMLDivElement>[];
};

export const Header = forwardRef<HTMLDivElement, Props>(({ refs }, ref) => {
  return (
    <header ref={ref} className={styles.header}>
      <Image
        className={styles.background}
        src={backgroundHeader}
        alt="background foto"
      />
      <NavBar refs={refs} />
      <HeaderContent />
    </header>
  );
});

Header.displayName = "Header";
