"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

//Register server actions
export async function register(state, formData) {
  //Validate form data
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  //check if user collection exists
  const userCollection = await getCollection("user");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  //check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "User with this email already exists.",
      },
    };
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user to the database
  let savedUser;
  try {
    savedUser = await userCollection.insertOne({
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log("Failed to save user:", error);
  }

  //create a session
  await createSession(savedUser.insertedId);

  //redirect
  redirect("/dashboard");
}

//Login server action
export async function login(state, formData) {
  //Validate form data
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  // check if user collection exists
  const userCollection = await getCollection("user");
  if (!userCollection) {
    return {
      errors: {
        email: "User collection does not exist.",
      },
    };
  }

  // check if user exists
  const user = await userCollection.findOne({ email });
  if (!user) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      errors: {
        email: "Invalid email or password.",
      },
    };
  }

  // create a session
  await createSession(user._id);

  //redirect
  redirect("/dashboard");
}

//Logout server action
export async function logout(formData) {
  //Clear the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  //Redirect
  redirect("/");
}
