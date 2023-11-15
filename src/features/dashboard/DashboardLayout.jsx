import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";
import Stats from "./Stats.jsx";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { recentBookings, isLoading: isLoadingBookings } =
		useRecentBookings();

	const {
		recentStays,
		confirmedStays,
		isLoading: isLoadingStays,
	} = useRecentStays();

	if (isLoadingBookings || isLoadingStays) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				recentBookings={recentBookings}
				confirmStays={confirmedStays}
			/>
			<div>Today&apos;s activity</div>
			<div>Chart stay duration</div>
			<div>Chart sales</div>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
