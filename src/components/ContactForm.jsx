"use client";

import { contact } from "@/actions/contact";
import { useActionState } from "react";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(contact, undefined);
  return (
    <div>
      <form action={action} className="contact-form">
        <label className="label-class">Full Names</label>
        <input
          type="text"
          name="names"
          className="input-class"
          placeholder="Enter your Names"
        />
        {state?.errors?.names && <p className="errors">{state.errors.names}</p>}
        <label className="label-class">Email</label>
        <input
          type="email"
          name="email"
          className="input-class"
          placeholder="Enter your Email"
        />
        {state?.errors?.email && <p className="errors">{state.errors.email}</p>}
        <label className="label-class">Message</label>
        <textarea
          className="message-body"
          placeholder="Share your Thoughts..."
        />
        {state?.errors?.message && (
          <p className="errors">{state.errors.message}</p>
        )}
        <button disabled={isPending} className="submit-btn">
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
