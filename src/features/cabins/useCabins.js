import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useCabins() {
	const {
		isLoading,
		data: cabins, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
}
