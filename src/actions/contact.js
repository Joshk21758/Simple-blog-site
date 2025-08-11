"use server";

import { ContactFormSchema } from "@/lib/schema";
import { errors } from "jose";

//contact form submission
export async function contact(state, formData) {
  //Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    names: formData.get("names"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
