import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({user}) => {
			toast.success("User account successfully updated");
			// queryClient.setQueryData(["user"], user);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => toast.ErrorIcon(err.message),
	});

	return { updateUser, isUpdating };
}
