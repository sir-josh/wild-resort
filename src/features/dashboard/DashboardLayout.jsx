import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";
import Stats from "./Stats.jsx";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { recentBookings, isLoading: isLoadingBookings } =
		useRecentBookings();
	const { cabins, isLoading: isLoadingCabins } = useCabins();

	const {
		recentStays,
		numDays,
		confirmedStays,
		isLoading: isLoadingStays,
	} = useRecentStays();

	if (isLoadingBookings || isLoadingStays || isLoadingCabins)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				recentBookings={recentBookings}
				confirmStays={confirmedStays}
				numDays={numDays}
				cabinsCount={cabins.length}
			/>
			<div>Today&apos;s activity</div>
			<div>Chart stay duration</div>
			<SalesChart bookings={recentBookings} numDays={numDays}/>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
