export function AdSlot({
  label = "Advertisement",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  // Empty placeholder. Pre-AdSense approval — no ad code rendered.
  return (
    <div
      aria-hidden
      className={`ad-slot my-8 ${className}`}
      data-ad-placeholder
    >
      {label}
    </div>
  );
}
