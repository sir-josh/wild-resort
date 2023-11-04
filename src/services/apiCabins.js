import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
		"/",
		"",
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create Cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }]); //This is so because form data matches DB table names
	// .select();

	if (error) {
		console.log(error);
		throw new Error("This cabin could not be deleted");
	}

	// 2. Upload image

	// const avatarFile = event.target.files[0]
	const { error: imageStorageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. Delete cabin IF there was an error uploading image
	if (imageStorageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.log(error);
		throw new Error(
			"Cabin image could not be uploaded and the cabin was not created",
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.log(error);
		throw new Error("This cabin could not be deleted");
	}

	return data;
}
