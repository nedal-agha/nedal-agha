import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/public/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nedal Agha Web Development to start your project.",
};

type ContactPageProps = {
  searchParams?: Promise<{ success?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const isSuccess = params?.success === "1";
  const isServiceError = params?.error === "service_unavailable";

  return (
    <div className="na-shell min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 md:px-6">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="na-muted mt-2">Send a message to start your project.</p>
        {isSuccess ? (
          <p className="mt-4 rounded-md border border-emerald-700 bg-emerald-950/30 p-3 text-sm text-emerald-200">
            Message sent successfully.
          </p>
        ) : null}
        {isServiceError ? (
          <p className="mt-4 rounded-md border border-red-700 bg-red-950/30 p-3 text-sm text-red-200">
            Unable to send your message right now. Please try again shortly.
          </p>
        ) : null}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
