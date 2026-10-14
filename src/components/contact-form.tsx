"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    package: "Starter Website (£99)",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
    setFormData({
      name: "",
      phone: "",
      email: "",
      package: "Starter Website (£99)",
      message: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Phone Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium text-neutral-600 uppercase tracking-wider"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-[#80ed99] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-medium text-neutral-600 uppercase tracking-wider"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter your phone number"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-[#80ed99] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-medium text-neutral-600 uppercase tracking-wider"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-[#80ed99] focus:bg-white focus:outline-none"
        />
      </div>

      {/* Packages Dropdown */}
      <div>
        <label
          htmlFor="package"
          className="mb-1.5 block text-xs font-medium text-neutral-600 uppercase tracking-wider"
        >
          Select Package
        </label>
        <select
          id="package"
          name="package"
          value={formData.package}
          onChange={(e) =>
            setFormData({ ...formData, package: e.target.value })
          }
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-[#80ed99] focus:bg-white focus:outline-none"
        >
          <option value="Starter Website (£99)">
            Starter Website (£90 + vat)
          </option>
          <option value="Professional Website">Professional Website</option>
          <option value="E-Commerce Store">E-Commerce Store</option>
          <option value="Bespoke / Custom Development">
            Bespoke / Custom Development
          </option>
        </select>
      </div>

      {/* Tell us about your business */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium text-neutral-600 uppercase tracking-wider"
        >
          Tell Us About Your Business
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Write here..."
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-[#80ed99] focus:bg-white focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#80ed99] px-8 py-3.5 text-sm font-semibold text-neutral-950 shadow-md transition-all hover:bg-[#6ee787] disabled:opacity-60"
        >
          <span>{status === "submitting" ? "Sending…" : "Send Message"}</span>
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Submission Feedback */}
      <div aria-live="polite" role="status" className="text-sm">
        {status === "success" && (
          <p className="text-emerald-600 font-medium">
            Thanks! We have received your inquiry and will be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium">
            Something went wrong. Please reach out via phone or email directly.
          </p>
        )}
      </div>
    </form>
  );
}
