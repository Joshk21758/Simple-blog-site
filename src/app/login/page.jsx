"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";
import { MdLogin } from "react-icons/md";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: 45,
          marginTop: 13,
          marginBottom: 13,
          fontWeight: 700,
          marginRight: 35,
          fontFamily: "serif",
        }}
      >
        Login
      </p>
      <MdLogin size={75} className="login-icon" />
      <form action={action} className="form-class">
        <label className="label-class">Email</label>
        <input
          type="email"
          name="email"
          className="input-class"
          placeholder="Enter your email"
        />
        {state?.errors?.email && <p className="errors">{state.errors.email}</p>}
        <label className="label-class">Password</label>
        <input
          type="password"
          name="password"
          className="input-class"
          placeholder="Enter your password"
        />
        {state?.errors?.password && (
          <p className="errors">{state.errors.password}</p>
        )}
        <button className="login-btn" disabled={isPending}>
          {isPending ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
