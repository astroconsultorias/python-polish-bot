type KnotMarkProps = {
  className?: string;
  title?: string;
};

const KnotMark = ({
  className = "h-12 w-12",
  title = "Ponto Protegido — Inclu@tech",
}: KnotMarkProps) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={title}
  >
    <title>{title}</title>
    <g className="protected-mark">
      <path
        d="M104 38C65 47 40 82 40 128C40 173 64 207 104 218"
        stroke="currentColor"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M152 38C191 47 216 82 216 128C216 173 192 207 152 218"
        stroke="currentColor"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <circle cx="128" cy="128" r="31" fill="currentColor" />
    </g>
  </svg>
);

export default KnotMark;
