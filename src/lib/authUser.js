"use server";

import { cookies } from "next/headers";
import { decrypt } from "./sessions";

//authenticate user
export async function authUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    return user;
  } else {
    console.log("Failed to authenticate user");
    return null;
  }
}
