import supabase from "./supabase.js";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createCabin(newCabin) {
	const { data, error } = await supabase
		.from("cabins")
		.insert([newCabin])//This is so because form data matches DB table names
		// .select();

	if (error) {
		console.log(error);
		throw new Error("This cabin could not be deleted");
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
