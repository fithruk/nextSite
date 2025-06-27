import { Exercise, ExerciseStepDescription } from "@/Types/types";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

type Props = {
  exercise: Exercise;
  locale: "ua" | "ru";
};

const ExerciseDetails = ({ exercise, locale }: Props) => {
  const steps = locale === "ua" ? "DescriptionsUa" : "DescriptionsRu";

  return (
    <Card>
      <CardContent>
        <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
          <img
            src={exercise.ImageUrl}
            alt={exercise.ExerciseName}
            style={{ maxWidth: 300, maxHeight: 400, borderRadius: 8 }}
          />

          <Box flex={1}>
            <Typography variant="h5">{exercise.ExerciseName}</Typography>
            <Typography variant="subtitle1">
              М'язи: {exercise.ExerciseMuscleGroup}
            </Typography>
            <Typography variant="subtitle2">
              Обладнання: {exercise.Equipment} | Складність:{" "}
              {exercise.Difficulty}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {exercise.Steps.map((step, stepIndex) => (
              <Box key={stepIndex} mb={2}>
                <Typography variant="h6">
                  {locale === "ua" ? step.StepNameUa : step.StepNameRu}
                </Typography>

                {(step[steps] as ExerciseStepDescription[]).map((desc) => (
                  <Box key={desc.PhaseKey} ml={2} mb={1}>
                    <Typography fontWeight="bold">
                      🔹 {phaseLabel(desc.PhaseName)}
                    </Typography>
                    <ul>
                      {desc.Instructions.map((text, i) => (
                        <li key={i}>
                          <Typography variant="body2">{text}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

function phaseLabel(phase: "prepearing" | "processing" | "technicalTips") {
  switch (phase) {
    case "prepearing":
      return "Підготовка";
    case "processing":
      return "Виконання";
    case "technicalTips":
      return "Технічні поради";
  }
}

export default ExerciseDetails;
