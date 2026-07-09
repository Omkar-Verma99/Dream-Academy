import { redirect } from "next/navigation";

export default function TrusteesRedirectPage() {
  redirect("/about#trustees");
}
