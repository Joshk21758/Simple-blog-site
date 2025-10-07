"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { BlogFormSchema } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod";

//create post server action
export async function createPost(state, formData) {
  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/login");
  }

  //Validate form data
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogFormSchema.safeParse({
    title,
    content,
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
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

//update post server action
export async function updatePost(state, formData) {
  //check if user is authenticated
  const user = authUser();
  if (!user) {
    redirect("/login");
  }

  //validate form fields
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const validatedFields = BlogFormSchema.safeParse({
    title,
    content,
    postId,
  });

  //check if fields is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  //find the post
  const postCollection = await getCollection("post");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  //check if user owns post
  if (user.userId !== post.userId.toString()) {
    redirect("/");
  }

  //update post
  await postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
      },
    }
  ),
    //redirect
    redirect("/");
}

//Delete post server action
export async function deletePost(formData) {
  //check if user is authenticated
  const user = await authUser();
  if (!user) {
    redirect("/login");
  }
}
