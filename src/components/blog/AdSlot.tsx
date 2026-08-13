/**
 * Ad placeholders render nothing until ads are actually configured.
 * Flip ADS_ENABLED to true (and add real ad unit markup) once AdSense
 * approval is granted; until then no empty labeled boxes are shown.
 */
const ADS_ENABLED = false;

export function AdSlot({
  label = "Advertisement",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  if (!ADS_ENABLED) return null;

  return (
    <div aria-hidden className={`ad-slot my-8 ${className}`} data-ad-placeholder>
      {label}
    </div>
  );
}
