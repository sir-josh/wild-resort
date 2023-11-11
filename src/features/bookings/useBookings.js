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

	//PAGINATION
	const page = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	const {
		isLoading,
		data: { data: bookings, count } = {}, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getAllBookings({ filter, sortBy, page }),
	});

	return { isLoading, bookings, error, count };
}
