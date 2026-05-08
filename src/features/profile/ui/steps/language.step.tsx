import { InputWithSuggestions } from "@/shared/ui/kit";
import { programmingLanguages } from "../../model/data/language.data";

interface LanguageStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <InputWithSuggestions
      id="language"
      name="language"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSelectSuggestion={(value) => onChange(value)}
      suggestions={programmingLanguages}
      placeholder="Language"
      error={error}
      variant="underline"
      size="lg"
      fullWidth
      inputMode="static"
      maxSuggestions={8}
    />
  );
};
