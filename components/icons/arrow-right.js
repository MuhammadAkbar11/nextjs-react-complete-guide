function arrowRight({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${size}`}
      width={`${size}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

arrowRight.defaultProps = {
  size: 28,
};

export default arrowRight;
