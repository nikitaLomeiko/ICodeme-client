interface IProps {
  languages: string[];
}

export const LanguageList: React.FC<IProps> = ({ languages }) => {
  return (
    <div className="flex flex-wrap gap-1.5 justify-start">
      {languages.map((lang, idx) => (
        <span
          key={idx}
          className="px-2.5 py-1.5 bg-[var(--ui-primary)]/15 rounded-lg text-sm font-semibold text-[var(--ui-primary)]"
        >
          {lang}
        </span>
      ))}
    </div>
  );
};
