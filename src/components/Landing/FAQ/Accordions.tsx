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
    question: "Які формати тренувань ви пропонуєте?",
    answer:
      "Я пропоную індивідуальні та групові тренування: офлайн у залі, онлайн через відеозв’язок, гібридний формат, а також персональні програми з підтримкою в месенджерах.",
  },
  {
    question: "Які переваги персональних тренувань?",
    answer:
      "Персональні тренування забезпечують індивідуальний підхід, безпечне виконання вправ, зниження ризику травм, постійну мотивацію та корекцію навантажень.",
  },
  {
    question: "Як відбувається оцінка прогресу?",
    answer:
      "Ми використовуємо обміри, фото до/після, функціональні тести та трекінг у нашому сайті. Прогрес обговорюється кожні 2–4 тижні.",
  },
  {
    question: "Скільки триває курс тренувань?",
    answer:
      "Для адаптації достатньо 4–6 тижнів. Для стабільних результатів рекомендую курс від 3 місяців і більше.",
  },
  {
    question: "Що входить у вартість персонального супроводу?",
    answer:
      "Програма тренувань, базові рекомендації з харчування, щотижневий контроль прогресу, мотивація та підтримка у месенджерах.",
  },
  {
    question: "Чи можу я тренуватися без досвіду?",
    answer:
      "Так! Програма складається індивідуально, навіть якщо ви ніколи не тренувалися. Почнемо з базових вправ і навчання техніці.",
  },
  {
    question: "Чи допомагаєте ви з харчуванням?",
    answer:
      "Так. Надаю базовий план харчування з урахуванням ваших цілей або направляю до нутриціолога при необхідності.",
  },
  {
    question: "Які основні цілі тренувань можна досягти?",
    answer:
      "Схуднення, набір м’язової маси, корекція фігури, покращення витривалості, зміцнення суглобів, спини та післятравматичне відновлення.",
  },
  {
    question: "Як часто потрібно тренуватись?",
    answer:
      "Оптимально 3–4 рази на тиждень, залежно від ваших цілей, рівня підготовки та режиму відновлення.",
  },
  {
    question: "Як записатися на тренування?",
    answer:
      "Напишіть у Telegram / Viber / Instagram або заповніть форму на сайті — і ми домовимось про перше заняття.",
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
