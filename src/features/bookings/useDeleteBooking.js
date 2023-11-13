import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		// just pass in deleteBooking since the id params is the same for both
		mutationFn: (id) => deleteBookingApi(id),
		onSuccess: () => {
			toast.success("Booking successfully deleted");

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}
