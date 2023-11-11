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

	//SORT
	const sortByParams = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByParams.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getAllBookings({ filter, sortBy }),
	});

	return { isLoading, bookings, error };
}
