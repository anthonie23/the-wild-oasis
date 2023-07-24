// import supabase, { supabaseUrl } from "./supabase";

// export async function getCabins() {
//   let { data: cabins, error } = await supabase.from("cabins").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }
//   return cabins;
// }

// export async function deleteCabin(id) {
//   const { data, error } = await supabase.from("cabins").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be deleted");
//   }

//   return data;
// }

// export async function createCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
//   console.log(hasImagePath);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Create Cabin/Edit Cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }
//   // 2. Upload Image

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. If image uploading failed, delete that cabin

//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error("Uploading image failed and cabin was not created");
//   }
//   return data;
// }
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  // const hasImagePath = newCabin.image.typeof === "string";
  // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create Cabin
  let query = supabase.from("cabins");

  // A) Create Cabin

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();

  // B) Edit Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  // 2. Upload Image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. If image uploading failed, delete that cabin

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Uploading image failed and cabin was not created");
  }
  return data;
}
