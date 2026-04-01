export const Background = () => {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 59px,
                rgba(0, 0, 0, 0.03) 59px,
                rgba(0, 0, 0, 0.03) 60px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 59px,
                rgba(0, 0, 0, 0.03) 59px,
                rgba(0, 0, 0, 0.03) 60px
              )
            `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};
