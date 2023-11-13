import supabase from "./supabase.js";

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: sessionData } = await supabase.auth.getSession();

	if (!sessionData.session) return null;

	const { data, error } = await supabase.auth.getUser();
	console.log(data);

	if (error) throw new Error(error.message);

	return data?.user;
}
