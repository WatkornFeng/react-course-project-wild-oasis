import { TypeCabin, TypeForm } from "../types";
import supabase, { supabaseUrl } from "./supabase";
import type { PostgrestQueryBuilder } from "@supabase/postgrest-js";
export async function getCabins(): Promise<TypeCabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(
  newCabin: TypeForm | TypeCabin,
  id?: number
) {
  const hasImagePath = (newCabin.image as string)?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    (newCabin.image as File).name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? (newCabin as TypeCabin).image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit Cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    query = query.insert([
      { ...newCabin, image: imagePath },
    ]) as unknown as PostgrestQueryBuilder<any, any, unknown>;

  // B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id) as unknown as PostgrestQueryBuilder<any, any, unknown>;

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      .eq("id", (data as unknown as TypeCabin).id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
