import { Typography } from "@/components/CommonComponents/Typography/Typography";
import exerciseStyles from "./exerciseFull.module.css";
import { ExerciceFullType } from "@/types/types";
import { usePathname } from "next/navigation";

const getProperlyInstructions = (text: string, locale: "ua" | "ru") => {
  const uaLetters = /[ҐЄІЇґєії]/;

  if (locale === "ua" && uaLetters.test(text)) return text;
  if (locale === "ru" && !uaLetters.test(text)) return text;
};

const FullExercise = (exercise: ExerciceFullType) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const instructions = exercise.exerciseSteps
    .map((step) => ({
      phaseName: step.phaseName,
      instructions: step.instructions.filter((inst) =>
        inst.instructions.some((i) =>
          getProperlyInstructions(i, locale as "ua" | "ru")
        )
      ),
    }))
    .filter((step) => step.instructions.length !== 0);
  console.log(instructions);

  return (
    <div>
      <img src={exercise.imageUrl} alt={exercise.exerciseName} />
      <Typography type="h1">{exercise.exerciseName}</Typography>
      <Typography type="h2">
        {locale === "ua" ? exercise.titleUa : exercise.titleRu}
      </Typography>
    </div>
  );
};

export default FullExercise;
