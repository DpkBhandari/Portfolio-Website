export default function TextGradient({ children }) {
  return (
    <h1
      className="
        font-[var(--font-head)]
        text-center
        bg-[--color-gradient]
        bg-clip-text
        text-transparent
        leading-tight
        tracking-tight
        px-4
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
      "
    >
      {children}
    </h1>
  );
}
