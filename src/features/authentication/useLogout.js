import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			toast.success("User successfully logged out");
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});

	return { logout, isLoading };
}
