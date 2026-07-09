import { siteConfig } from "@/lib/site";

function formatTel(phone: string) {
  return phone.replace(/\s/g, "");
}

export function ContactPhones() {
  return (
    <div className="space-y-1">
      {siteConfig.contact.phones.map((phone) => (
        <p key={phone}>
          <a href={`tel:${formatTel(phone)}`} className="font-sans text-sm">
            {phone}
          </a>
        </p>
      ))}
    </div>
  );
}

export function ContactPhonesInline() {
  return (
    <span>
      {siteConfig.contact.phones.map((phone, index) => (
        <span key={phone}>
          {index > 0 ? ", " : null}
          <a href={`tel:${formatTel(phone)}`}>{phone}</a>
        </span>
      ))}
    </span>
  );
}

