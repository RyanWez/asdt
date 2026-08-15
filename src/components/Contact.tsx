import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eyebrow, Magnetic, MaskText } from "@/components/ui";
import { budgetRanges, outfitTypes, site, social } from "@/lib/content";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success";
interface FormState {
  name: string;
  phone: string;
  email: string;
  outfitType: string;
  occasion: string;
  budget: string;
  description: string;
  contactMethod: string;
}

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  outfitType: "",
  occasion: "",
  budget: "",
  description: "",
  contactMethod: "Email",
};

const contactMethods = ["Email", "Phone", "Social media DM"];

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };
  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFileName("");
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "Please share your name.";
    if (!form.phone.trim()) e.phone = "A phone number helps Aye reach you.";
    if (!emailRe.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.outfitType) e.outfitType = "Choose an outfit type.";
    if (form.description.trim().length < 10) e.description = "A few words about your idea helps a lot.";
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1400);
  };

  const inputBase =
    "mt-1.5 w-full rounded-xl border bg-ivory/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-raspberry focus:outline-none focus:ring-2 focus:ring-raspberry/20";
  const errClass = (k: keyof FormState) => cn(inputBase, errors[k] ? "border-raspberry" : "border-line");

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Intro + details */}
          <div className="lg:col-span-5">
            <Eyebrow>Contact & Booking</Eyebrow>
            <h2 id="contact-heading" className="display-1 mt-6">
              <MaskText text="Let's design something together." />
            </h2>
            <p className="measure mt-6 text-lg text-muted">
              Tell me a little about your occasion, your style, and how you'd love to
              feel. I'll get back to you to talk through the next steps.
            </p>

            <dl className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <dt className="w-24 shrink-0 uppercase tracking-[0.18em] text-muted">Location</dt>
                <dd className="font-500 text-ink">{site.location}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="w-24 shrink-0 uppercase tracking-[0.18em] text-muted">Phone</dt>
                <dd>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-500 text-ink link-underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="w-24 shrink-0 uppercase tracking-[0.18em] text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-500 text-ink link-underline">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-sm text-muted transition-colors hover:text-raspberry"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex h-full min-h-[420px] flex-col items-start justify-center rounded-2xl border border-line bg-ivory-deep/40 p-8 sm:p-12"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-raspberry text-ivory">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-3xl text-ink">Thank you for sharing your idea.</h3>
                <p className="measure mt-3 text-lg text-muted">
                  Aye will get back to you soon to discuss the next steps.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial);
                    clearFile();
                    setStatus("idle");
                  }}
                  className="btn btn-outline mt-8"
                >
                  Send another idea
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-ivory-deep/30 p-6 sm:p-9">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Full name <span className="text-raspberry">*</span>
                    </label>
                    <input id="name" type="text" value={form.name} onChange={set("name")} className={errClass("name")} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                    {errors.name && <p id="name-err" className="mt-1.5 text-xs text-raspberry">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Phone <span className="text-raspberry">*</span>
                    </label>
                    <input id="phone" type="tel" value={form.phone} onChange={set("phone")} className={errClass("phone")} placeholder="+95 9 ..." aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
                    {errors.phone && <p id="phone-err" className="mt-1.5 text-xs text-raspberry">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Email <span className="text-raspberry">*</span>
                    </label>
                    <input id="email" type="email" value={form.email} onChange={set("email")} className={cn(errClass("email"), "sm:max-w-md")} placeholder="you@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
                    {errors.email && <p id="email-err" className="mt-1.5 text-xs text-raspberry">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="outfitType" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Type of outfit <span className="text-raspberry">*</span>
                    </label>
                    <select id="outfitType" value={form.outfitType} onChange={set("outfitType")} className={errClass("outfitType")} aria-invalid={!!errors.outfitType} aria-describedby={errors.outfitType ? "outfit-err" : undefined}>
                      <option value="">Select…</option>
                      {outfitTypes.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.outfitType && <p id="outfit-err" className="mt-1.5 text-xs text-raspberry">{errors.outfitType}</p>}
                  </div>

                  <div>
                    <label htmlFor="occasion" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Occasion / date
                    </label>
                    <input id="occasion" type="text" value={form.occasion} onChange={set("occasion")} className={errClass("occasion")} placeholder="e.g. Wedding, late March" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="budget" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Budget range
                    </label>
                    <select id="budget" value={form.budget} onChange={set("budget")} className={cn(errClass("budget"), "sm:max-w-md")}>
                      <option value="">Select…</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="text-xs font-600 uppercase tracking-[0.18em] text-muted">
                      Short description <span className="text-raspberry">*</span>
                    </label>
                    <textarea id="description" rows={4} value={form.description} onChange={set("description")} className={errClass("description")} placeholder="Tell me about the look, colours, or feeling you have in mind…" aria-invalid={!!errors.description} aria-describedby={errors.description ? "desc-err" : undefined} />
                    {errors.description && <p id="desc-err" className="mt-1.5 text-xs text-raspberry">{errors.description}</p>}
                  </div>

                  {/* File upload */}
                  <div className="sm:col-span-2">
                    <span className="text-xs font-600 uppercase tracking-[0.18em] text-muted">Inspiration image</span>
                    <input ref={fileRef} id="inspiration" type="file" accept="image/*" onChange={onFile} className="sr-only" />
                    {preview ? (
                      <div className="mt-1.5 flex items-center gap-4 rounded-xl border border-line bg-ivory/60 p-3">
                        <img src={preview} alt="Inspiration preview" className="h-16 w-16 rounded-lg object-cover" />
                        <span className="flex-1 truncate text-sm text-ink">{fileName}</span>
                        <button type="button" onClick={clearFile} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:border-raspberry hover:text-raspberry">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="inspiration" className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-ivory/40 px-4 py-4 text-sm text-muted transition-colors hover:border-raspberry hover:text-raspberry">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Upload an image (optional)
                      </label>
                    )}
                  </div>

                  {/* Preferred contact method */}
                  <fieldset className="sm:col-span-2">
                    <legend className="text-xs font-600 uppercase tracking-[0.18em] text-muted">Preferred contact method</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {contactMethods.map((m) => {
                        const checked = form.contactMethod === m;
                        return (
                          <label key={m} className={cn("cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors", checked ? "border-raspberry bg-raspberry/10 text-raspberry" : "border-line text-muted hover:border-raspberry/50")}>
                            <input type="radio" name="contactMethod" value={m} checked={checked} onChange={set("contactMethod")} className="sr-only" />
                            {m}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-8">
                  <Magnetic strength={0.16}>
                    <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                      {status === "submitting" ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Send My Design Idea
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M2 8h11m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
