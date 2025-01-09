import userSurveyElStyles from "./userSurveyStyles.module.css";
import { Input } from "../Input/Input";
import { Typography } from "../Typography/Typography";

type UserSurveyElementProps = {
  questionTitle: string;
  questionOptions: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
};

const UserSurveyElement = ({
  questionTitle,
  questionOptions,
  selectedOptions,
  onOptionChange,
}: UserSurveyElementProps) => {
  return (
    <div className={userSurveyElStyles.container}>
      <Typography type="h2">{questionTitle}</Typography>
      {questionOptions.map((option) => (
        <Input
          labalValue={option}
          key={option}
          type="checkbox"
          name={option}
          checked={selectedOptions.includes(option)}
          onChange={() => onOptionChange(option)}
          required={false}
        />
      ))}
    </div>
  );
};

export default UserSurveyElement;
