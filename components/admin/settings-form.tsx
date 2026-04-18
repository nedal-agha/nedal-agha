"use client";

import { useState, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SettingsValue = {
  siteNameAr: string;
  siteNameEn: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  footerText: string;
};

type SettingsFormProps = {
  initialValues: SettingsValue;
};

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const [form, setForm] = useState(initialValues);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onTextChange =
    (key: keyof SettingsValue) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/settings", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const result = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(result.error || "Failed to save settings");
        }

        setMessage("Settings updated successfully");
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save settings");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      {message ? <p className="rounded-md border border-emerald-700 bg-emerald-950/30 p-3 text-sm text-emerald-200">{message}</p> : null}
      {error ? <p className="rounded-md border border-red-700 bg-red-950/30 p-3 text-sm text-red-200">{error}</p> : null}

      <Input label="Arabic Site Name" name="siteNameAr" required value={form.siteNameAr} onChange={onTextChange("siteNameAr")} />
      <Input label="English Site Name" name="siteNameEn" required value={form.siteNameEn} onChange={onTextChange("siteNameEn")} />
      <Input label="Contact Email" name="email" type="email" required value={form.email} onChange={onTextChange("email")} />
      <Input label="Phone" name="phone" value={form.phone} onChange={onTextChange("phone")} />
      <Input label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={onTextChange("whatsapp")} />
      <Input label="LinkedIn URL" name="linkedinUrl" value={form.linkedinUrl} onChange={onTextChange("linkedinUrl")} />
      <Input label="Instagram URL" name="instagramUrl" value={form.instagramUrl} onChange={onTextChange("instagramUrl")} />
      <Input label="Facebook URL" name="facebookUrl" value={form.facebookUrl} onChange={onTextChange("facebookUrl")} />
      <Textarea label="Hero title" name="heroTitle" rows={3} required value={form.heroTitle} onChange={onTextChange("heroTitle")} />
      <Textarea
        label="Hero subtitle"
        name="heroSubtitle"
        rows={3}
        required
        value={form.heroSubtitle}
        onChange={onTextChange("heroSubtitle")}
      />
      <Textarea label="About text" name="aboutText" rows={5} required value={form.aboutText} onChange={onTextChange("aboutText")} />
      <Textarea label="Footer text" name="footerText" rows={2} required value={form.footerText} onChange={onTextChange("footerText")} />
      <Button type="submit">{isPending ? "Saving..." : "Save Settings"}</Button>
    </form>
  );
}
