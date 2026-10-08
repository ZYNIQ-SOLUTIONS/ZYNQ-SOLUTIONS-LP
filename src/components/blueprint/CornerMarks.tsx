const MARK = 'absolute w-3 h-3 border-ink pointer-events-none';

// Registration marks for a framed block. The parent must be position: relative.
export function CornerMarks() {
  return (
    <div aria-hidden="true">
      <span className={`${MARK} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${MARK} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${MARK} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${MARK} -bottom-px -right-px border-b-2 border-r-2`} />
    </div>
  );
}
