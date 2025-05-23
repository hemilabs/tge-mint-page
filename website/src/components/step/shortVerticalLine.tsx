type Props = {
  stroke?: "stroke-orange-500" | "stroke-rose-500";
};

export const ShortVerticalLine = ({ stroke = "stroke-orange-500" }: Props) => (
  <svg fill="none" height="24" viewBox="0 0 2 24" width="2">
    <path className={stroke} d="M1 0V24" />
  </svg>
);
