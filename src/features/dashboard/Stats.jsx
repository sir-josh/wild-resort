import { formatCurrency } from "../../utils/helpers.js";
import Stat from "./Stat.jsx";
import {
	HiOutlineBriefcase,
	HiOutlineBanknotes,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ recentBookings, confirmStays, numDays, cabinsCount }) {
	// 1. Number of bookings made
	const numBookings = recentBookings.length;

	//2. Total sales from bookings made
	const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	//3. Number of actual check-ins by customers
	const checkins = confirmStays.length;

	//4. Occupany rate:- number of checked in nights / all available nights
	// NB: all available nights ( num of days * num of total cabins)
	const occupancyRate =
		confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinsCount);
	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				value={numBookings}
				icon={<HiOutlineBriefcase />}
			/>
			<Stat
				title="Sales"
				color="green"
				value={formatCurrency(sales)}
				icon={<HiOutlineBanknotes />}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				value={checkins}
				icon={<HiOutlineCalendarDays />}
			/>
			<Stat
				title="Occupany rate"
				color="yellow"
				value={`${Math.round(occupancyRate * 100)}%`}
				icon={<HiOutlineChartBar />}
			/>
		</>
	);
}

export default Stats;
