"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schema";
import { errors } from "jose";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/sessions";

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
    return {
      errors: {
        email: "Failed to save user.",
      },
    };
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
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;
}
