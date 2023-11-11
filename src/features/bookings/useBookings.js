import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();

	//FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	const {
		isLoading,
		data: bookings, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["bookings", filter],
		queryFn: () => getAllBookings({ filter }),
	});

	return { isLoading, bookings, error };
}
