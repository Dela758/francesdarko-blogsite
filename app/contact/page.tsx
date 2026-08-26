import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Get in touch or subscribe to occasional letters on observation and writing.",
};

export default function ContactPage() {
  return (
    <div className="container-content pb-20 pt-4 md:pb-28">
      <header className="fade-in mb-16 text-center md:mb-20">
        <h1 className="display-lg">Stay in Touch</h1>
        <p className="body-lg mx-auto mt-6 max-w-xl text-on-surface-variant">
          Occasional letters on observation, writing, and the quiet life. No
          noise, no spam—just thoughtful notes, a few times a year.
        </p>
      </header>

      <div className="fade-in mx-auto max-w-lg">
        <ContactForm />

        <div className="mt-16 text-center">
          <p className="label-caps text-neutral mb-4">Or write directly</p>
          <a href={`mailto:${siteConfig.email}`} className="text-link body-lg">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}
