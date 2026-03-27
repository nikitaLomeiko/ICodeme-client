interface IProps {
  className?: string;
}

export const Logotype: React.FC<IProps> = ({ className }) => {
  return (
    <div className={`p-2 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-md"></div>
    </div>
  );
};
