import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.jsx";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { formatCurrency, nairaCurrency } from "../../utils/helpers.js";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

function SalesChart({ bookings, numDays }) {
	const { isDarkMode } = useDarkMode();

	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const salesData = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at)),
				)
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at)),
				)
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});

	/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
	const colors = isDarkMode
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	const DataFormater = (number) => {
		if (number > 1000000000) {
			return formatCurrency(number / 1000000000).toString() + "B";
		} else if (number > 1000000) {
			return formatCurrency(number / 1000000).toString() + "M";
		} else if (number > 1000) {
			return formatCurrency(number / 1000).toString() + "K";
		} else {
			return formatCurrency(number);
		}
	};

	return (
		<StyledSalesChart>
			<Heading as="h2">Sales</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={salesData} margin={{ left: 10, right: 10 }}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text.fill }}
						tickLine={{ stroke: colors.text.stroke }}
					/>
					<YAxis
						// unit={`${nairaCurrency()}`}
						tick={{ fill: colors.text.fill }}
						tickLine={{ stroke: colors.text.stroke }}
						tickFormatter={DataFormater}
					/>
					<CartesianGrid strokeDasharray="4" />
					<Tooltip
						contentStyle={{ background: colors.background }}
						formatter={(value) => [formatCurrency(value)]}
					/>
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						tickFormatter={(value) => formatCurrency(value)}
						// unit={nairaCurrency()}
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extra sales"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
