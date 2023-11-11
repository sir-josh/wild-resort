import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";

export function useBookingDetail() {
	const { bookingId } = useParams();

	const {
		isLoading,
		data: booking, //eslint-disable-next-line
		error,
	} = useQuery({
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	return { isLoading, booking, error };
}
