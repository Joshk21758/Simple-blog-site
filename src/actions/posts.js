"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { BlogFormSchema } from "@/lib/schema";
import { errors } from "jose";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

//create post server action
export async function createPost(state, formData) {
  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/login");
  }

  //Validate form data
  const validatedFields = BlogFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Save post instance to Db
  const postCollection = await getCollection("post");
  let post;
  try {
    post = await postCollection.insertOne({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      userId: ObjectId.createFromHexString(user.userId),
    });
  } catch (error) {
    console.log(error);
  }

  //redirect
  redirect("/");
}
