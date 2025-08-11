"use client";

import { register } from "@/actions/auth";
import { useActionState } from "react";
import { MdPerson } from "react-icons/md";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: 45,
          marginTop: 13,
          marginBottom: 13,
          fontWeight: 700,
          marginRight: 30,
          fontFamily: "serif",
          marginLeft: -30,
        }}
      >
        Create An Account
      </p>
      <MdPerson size={73} className="account-icon" />
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
        <label className="label-class">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input-class"
          placeholder="Re-enter your password"
        />
        {state?.errors?.confirmPassword && (
          <p className="errors">{state.errors.confirmPassword}</p>
        )}
        <button className="reg-btn" disabled={isPending}>
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
