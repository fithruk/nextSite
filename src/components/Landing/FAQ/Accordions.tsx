import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqItems = [
  {
    question: "Які формати тренувань ти пропонуєш?",
    answer:
      "Індивідуальні, групові, онлайн, офлайн, гібрид. Можемо працювати у залі, по відеозв’язку або повністю через платформу. Обираєш формат — я даю результат.",
  },
  {
    question: "Навіщо мені персональні тренування?",
    answer:
      "Щоб не зливати час на рандомні програми. Я веду тебе з головою, контролюю кожен крок, коригую навантаження, і не даю скотитися назад.",
  },
  {
    question: "Як ти відслідковуєш мій прогрес?",
    answer:
      "Обміри, фото, функціональні тести, + трекінг на сайті. Якщо ти сачкуєш — я бачу. Якщо працюєш — ми качаємо далі. Обговорюємо прогрес кожні 2–4 тижні.",
  },
  {
    question: "Скільки триває курс?",
    answer:
      "Мінімум — 4 тижні. Але якщо ти хочеш реально змінитись, готуйся на 3+ місяці. М’язи не виростають за ніч.",
  },
  {
    question: "Що входить у персональний супровід?",
    answer:
      "Програма тренувань, базове харчування, щотижнева звірка прогресу, підтримка в месенджерах і регулярний моральний п*здун, якщо сачкуєш.",
  },
  {
    question: "Я ніколи не тренувався. Можу почати?",
    answer:
      "Не просто можеш — тобі треба. Почнемо з основ, навчимо техніці, розженем тіло — і включим голову.",
  },
  {
    question: "А з харчуванням допомагаєш?",
    answer:
      "Так. Дам базу, поясню логіку, підлаштую під цілі. Якщо щось складне — направлю до нутриціолога.",
  },
  {
    question: "Які цілі я можу досягти?",
    answer:
      "Схуднення, маса, форма, витривалість, зміцнення спини/суглобів, відновлення після травм. Але працювати доведеться, це не вітаміни.",
  },
  {
    question: "Як часто треба тренуватись?",
    answer:
      "Оптимум — 3–4 рази на тиждень. Все залежить від цілі, графіку й здатності відновлюватись. Головне — стабільність.",
  },
  {
    question: "Як записатись?",
    answer: (
      <>
        Пиши в Telegram —{" "}
        <a
          href="https://t.me/Death_rowww"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Death_rowww
        </a>
        , Instagram —{" "}
        <a
          href="https://instagram.com/i_am_dominus"
          target="_blank"
          rel="noopener noreferrer"
        >
          @i_am_dominus
        </a>{" "}
        або лишай заявку на сайті. Далі я включаюсь — і ми починаємо.
      </>
    ),
  },
];

const Accordions = () => {
  return (
    <Box textAlign={"center"} marginTop={{ xs: "5vh", md: "5rem" }}>
      <Typography
        variant="h3"
        color="var(--yellow)"
        fontSize={{ xs: "3vh", md: "1.5rem" }}
      >
        FAQ
      </Typography>
      {faqItems?.length > 0 &&
        faqItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                component="span"
                color="var(--blue)"
                fontWeight="bold"
                fontSize={{ xs: "2vh", md: "1.5rem" }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ border: "1px solid var(--yellow)", borderTop: "none" }}
            >
              <Typography
                component="p"
                color="var(--blue)"
                fontSize={{ xs: "1.5vh", md: "1.5rem" }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default Accordions;
