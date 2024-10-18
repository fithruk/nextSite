// "use client";
import { AppButton } from "../CommonComponents/Button/Button";
import { AppLink } from "../CommonComponents/Link/Link";
import { Container } from "../CommonComponents/Container/Container";
import BurgerMenu from "../CommonComponents/Burger/Burger";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
import styles from "./navBar.module.css";
import { ForwardedRef, useState } from "react";
import { useTranslations } from "next-intl";
import { UseScrollIntoView } from "@/hooks/useScrollIntoView";
import { useRouter } from "next/navigation";

const navLinks: string[] = ["home", "about", "slider", "contacts", "login"];

type Props = {
  refs: ForwardedRef<HTMLDivElement>[];
};

const NavBar = ({ refs }: Props) => {
  const t = useTranslations("Navigation");
  const b = useTranslations("ButtonText");
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive((isActive) => (isActive = !isActive));
  };

  const handleClick = (
    index: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;

    if (target.dataset.key === "login") {
      return router.push("/login");
    }
    if (refs[index]) {
      const ref = refs[index];

      // Проверяем, является ли ref функцией или объектом
      if (typeof ref === "function") {
        // Если это функция, создаем временный элемент и вызываем функцию
        const tempElement = document.createElement("div");
        ref(tempElement);
        UseScrollIntoView({ current: tempElement });
      } else {
        // Если это объект, передаем его напрямую
        UseScrollIntoView(ref);
      }
    }
  };

  const handleBtnClick = () => {
    const ref = refs[3];
    if (ref && "current" in ref && ref.current) {
      UseScrollIntoView(ref);
    }
  };

  return (
    <Container type="inner">
      <div className={styles.navBar}>
        <div className={styles.logo}>IRONGYM</div>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navLinks.map((key, i) => (
              <AppLink
                href="#"
                key={i}
                data-key={key}
                onClick={(e) => handleClick(i, e)}
              >
                {t(key)}
              </AppLink>
            ))}
          </ul>
          {isActive && (
            <>
              <ul className={styles.navListMobile}>
                {navLinks.map((key, i) => (
                  <AppLink
                    href="#"
                    data-key={key}
                    key={i}
                    onClick={(e) => handleClick(i, e)}
                  >
                    {t(key)}
                  </AppLink>
                ))}
                <AppButton
                  type="button"
                  variant="primary"
                  onClick={handleBtnClick}
                >
                  {b("startedNow")}
                </AppButton>
              </ul>
            </>
          )}
        </nav>
        <LocaleSwitcher />
        <AppButton type="button" variant="primary" onClick={handleBtnClick}>
          {b("startedNow")}
        </AppButton>
        <BurgerMenu isActive={isActive} toggleMenu={toggleMenu} />
      </div>
    </Container>
  );
};

export default NavBar;
