import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings.js";

export function useTodayActivity() {
	const { isLoading, data: todayActivities } = useQuery({
		queryFn: () => getStaysTodayActivity(),
		queryKey: ["toady-activity"],
	});

	return { isLoading, todayActivities };
}
