"use client";
import { useTransition, MouseEvent } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Select } from "../CommonComponents/Select/Select";

type LocaleType = "ua" | "ru";

const localeArray: LocaleType[] = ["ua", "ru"];

export const LocaleSwitcher = () => {
  const localActive: LocaleType = useLocale() as LocaleType;

  const [isPending, startTransition] = useTransition();
  if (isPending) {
  }
  const router = useRouter();
  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    const nextLocale = e.currentTarget.textContent;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <Select currentValue={localActive} clickHandler={clickHandler}>
      {localeArray}
    </Select>
  );
};
