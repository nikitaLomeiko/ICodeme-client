import { Button } from "@/shared/ui/kit";
import { programmingLanguages } from "../../model/data/language.data";
import { useState } from "react";

interface LanguageStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({
  value,
  onChange,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(value);

  const handleSelected = (id: string) => {
    setSelectedId(id);
    onChange(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {programmingLanguages.map((item) => (
        <Button
          className={`${selectedId === item ? "!bg-green-500" : ""} transition-all`}
          onClick={() => handleSelected(item)}
        >
          {item}
        </Button>
      ))}
      <Button variant="danger" className="mt-5 w-full">
        Я не знаю что мне выбрать :(
      </Button>
    </div>
  );
};
