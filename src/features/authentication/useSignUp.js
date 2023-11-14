import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignUp() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: (user) => {
			toast.success(
				"Account successfully created! Please go and verify your email account",
			);
		},
	});

	return { signup, isLoading };
}
