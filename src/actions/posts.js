"use server";

import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { BlogFormSchema } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    };
  }

  //Save post instance to Db
  const postCollection = await getCollection("posts");
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
    };
  }

  //find the post
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

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

  //find post to delete
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("postId")),
  });

  //check if user owns post
  if (user.userId !== post.userId.toString()) {
    return redirect("/");
  }

  //Delete the post
  await postCollection.findOneAndDelete({ _id: post._id });

  //revalidate path
  revalidatePath("/dashboard");
}
