import emailjs from "@emailjs/browser";
import { FormEvent, useState } from "react";
import { profile } from "../data/portfolio";
import "./Contact.css";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PLACEHOLDER_VALUES = new Set([
  "your_service_id",
  "your_template_id",
  "your_public_key",
]);

function isConfigured(value: string | undefined): value is string {
  return Boolean(value && !PLACEHOLDER_VALUES.has(value));
}

function getEmailJsErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "text" in error) {
    return String((error as { text: string }).text);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailJsReady =
    isConfigured(serviceId) &&
    isConfigured(templateId) &&
    isConfigured(publicKey);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailJsReady) {
      setStatus("error");
      setErrorMessage(
        !isConfigured(templateId)
          ? "Set VITE_EMAILJS_TEMPLATE_ID in .env to your EmailJS template ID (e.g. template_abc123), then restart npm run dev."
          : "EmailJS is not configured. Add VITE_EMAILJS_* variables to a .env file and restart npm run dev.",
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fromName = String(formData.get("name") ?? "").trim();

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.send(
        serviceId!,
        templateId!,
        {
          from_name: fromName,
          reply_to: formData.get("email"),
          message: formData.get("message"),
          title: fromName
            ? `Portfolio message from ${fromName}`
            : "Portfolio contact form",
          to_email: profile.email,
        },
        { publicKey: publicKey! },
      );
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      const detail = getEmailJsErrorMessage(error);
      setErrorMessage(
        `Could not send: ${detail}. Check your EmailJS template variables (from_name, reply_to, message, title) and restart the dev server after editing .env.`,
      );
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">
          Send a message via the form below, or reach out at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} required />
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p className="contact__feedback contact__feedback--success" role="status">
              Thanks! Your message was sent.
            </p>
          )}
          {status === "error" && (
            <p className="contact__feedback contact__feedback--error" role="alert">
              {errorMessage}{" "}
              <a href={`mailto:${profile.email}`}>Email me directly</a>.
            </p>
          )}

          {!emailJsReady && status === "idle" && (
            <p className="contact__hint">
              Configure EmailJS: copy <code>.env.example</code> to <code>.env</code>{" "}
              and add your service, template, and public key.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
