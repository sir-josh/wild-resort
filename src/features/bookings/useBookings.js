import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";

export function useBookings() {
	const {
		isLoading,
		data: bookings, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["bookings"],
		queryFn: getAllBookings,
	});

	return { isLoading, bookings, error };
}
