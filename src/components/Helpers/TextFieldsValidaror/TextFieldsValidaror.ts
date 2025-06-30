export type InputNameTypes =
  | "email"
  | "phone"
  | "password"
  | "name"
  | "telegram";

type ResultOfValidate = {
  errorMessage?: string;
  result: boolean;
};

class TextFieldsValidaror {
  private static errorMesages: { key: string; errMsg: string }[] = [
    { key: "email", errMsg: "Невалідна адреса електронної пошти" },
    { key: "phone", errMsg: "Невалідний номер телефона" },
    { key: "name", errMsg: "Введіть ім'я і фамілію через пробел" },
    { key: "telegram", errMsg: "Невалідний нікнейм телеграма" },
    {
      key: "password",
      errMsg: "Мінімальна довжина пароля повинна бути не менше 4 символів",
    },
  ];

  private static ValidateField(
    validator: (value: string) => boolean,
    inputName: string,
    inputValue: string
  ) {
    const isFieldValid = validator(inputValue);
    const errMsg =
      (!isFieldValid && this.errorMesages.find((i) => i.key == inputName)) ||
      "";
    return {
      errorMessage: errMsg ? errMsg.errMsg : undefined,
      result: isFieldValid,
    };
  }

  private static IsEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static IsValidPhone = (phone: string): boolean => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  private static IsValidPassword(password: string): boolean {
    return password.length > 4;
  }

  private static IsValidName(name: string): boolean {
    const nameArr = name.trim().split(" ").filter(Boolean);
    return nameArr.length >= 2; // Под вопросом
  }

  private static IsValidTelegram(telegram: string): boolean {
    telegram = telegram.trim();

    if (telegram.startsWith("@")) {
      telegram = telegram.slice(1);
    }

    const telegramRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/;

    return telegramRegex.test(telegram);
  }

  static Validate(
    inputName: InputNameTypes,
    inputValue: string
  ): ResultOfValidate {
    switch (inputName) {
      case "email": {
        return this.ValidateField(this.IsEmailValid, inputName, inputValue);
      }
      case "phone": {
        return this.ValidateField(this.IsValidPhone, inputName, inputValue);
      }
      case "name": {
        return this.ValidateField(this.IsValidName, inputName, inputValue);
      }
      case "password": {
        return this.ValidateField(this.IsValidPassword, inputName, inputValue);
      }
      case "telegram": {
        return this.ValidateField(this.IsValidTelegram, inputName, inputValue);
      }

      default:
        return {
          errorMessage: "Невідоме поле",
          result: false,
        };
    }
  }
}

export { TextFieldsValidaror };
