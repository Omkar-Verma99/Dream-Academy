interface MapEmbedProps {
  title?: string;
  className?: string;
}

export function MapEmbed({
  title = "Map showing Chandra Diabetes Clinic, Gomti Nagar, Lucknow",
  className = "aspect-[16/10]",
}: MapEmbedProps) {
  const embedUrl =
    "https://www.google.com/maps?q=Chandra+Diabetes+Clinic,+D-4%2F658,+Vijayant+Khand,+Gomti+Nagar,+Lucknow,+226010&hl=en&z=16&output=embed";

  return (
    <div
      className={`relative w-full border border-border bg-surface-sunk ${className}`}
    >
      <iframe
        title={title}
        src={embedUrl}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

