"use client";
import formStyles from "./form.module.css";
import { Input } from "../CommonComponents/Input/Input";
import { AppButton } from "../CommonComponents/Button/Button";
import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent, useState } from "react";

export const Form = () => {
  const b = useTranslations("ButtonText");
  const t = useTranslations("Form");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Сообщение отправлено");
        alert("Сообщение отправлено");
      } else {
        console.error("Ошибка при отправке сообщения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
    setForm({ name: "", phone: "", email: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <div className={`${formStyles.formItem} ${formStyles.upperLine}`}>
        <Input
          name={"name"}
          placeholder={t("namePlaceHolder")}
          type="text"
          onChange={handleChange}
          value={form.name}
        />
        <Input
          name={"phone"}
          placeholder={t("phonePlaceHolder")}
          type="phone"
          onChange={handleChange}
          value={form.phone}
        />
      </div>
      <div className={`${formStyles.formItem} ${formStyles.middleLine}`}>
        <Input
          name={"email"}
          placeholder={t("emailPlaceHolder")}
          type="email"
          onChange={handleChange}
          value={form.email}
        />
      </div>
      <div className={`${formStyles.formItem} ${formStyles.lowerLine}`}>
        <AppButton variant="secondary" type="submit">
          {b("lestJoinNow")}
        </AppButton>
      </div>
    </form>
  );
};
