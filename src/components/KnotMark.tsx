type KnotMarkProps = {
  className?: string;
  title?: string;
};

const KnotMark = ({
  className = "h-12 w-12",
  title = "O Nó que Desata",
}: KnotMarkProps) => (
  <svg
    viewBox="0 0 360 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={title}
  >
    <title>{title}</title>
    <path
      className="knot-line"
      pathLength="1"
      d="M24 126C47 72 108 49 139 82C166 111 143 158 105 151C67 144 59 99 92 78C133 52 183 82 180 127C177 173 126 197 84 172C43 148 42 93 81 61C126 23 198 42 220 96C242 150 208 201 157 214C199 211 239 195 269 169C297 145 319 126 340 118"
      stroke="currentColor"
      strokeWidth="18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default KnotMark;
