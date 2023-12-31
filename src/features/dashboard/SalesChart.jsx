import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

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

  // allDates:- get the interval period of (numDays) in date format
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

  // salesData: generates data object from allDates interval period
  // required for the Area Chart in the pattern below
  // {"label": "Nov 10", "totalSales": 64120, "extrasSales": 120}
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
  //colors:- Various color format for the Area Chart in dark/light mode
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
  
  // dataFormater: custom format for the Y-axis of the area chart
	const dataFormater = (number) => {
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
			<Heading as="h2">
				Sales from &nbsp; {format(allDates.at(0), "MMM dd, yyyy")}{" "}
				&mdash; {format(allDates.at(-1), "MMM dd, yyyy")}
			</Heading>

			{/* Area Charts from recharts lib */}
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
						tickFormatter={dataFormater}
					/>
					<CartesianGrid strokeDasharray="4" />
					<Tooltip
						// content={<CustomTooltip />}
						contentStyle={{ background: colors.background }}
						formatter={(value, name, props) => [
							formatCurrency(value),
							name,
						]}
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
