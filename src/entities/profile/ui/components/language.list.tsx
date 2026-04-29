interface IProps {
  languages: string[];
}

export const LanguageList: React.FC<IProps> = ({ languages }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
      {languages.map((lang, idx) => (
        <span
          key={idx}
          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[var(--ui-primary)]/10 rounded-lg text-xs sm:text-sm font-medium text-[var(--ui-primary)]"
        >
          {lang}
        </span>
      ))}
    </div>
  );
};
