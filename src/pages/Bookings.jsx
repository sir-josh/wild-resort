import BookingFilterAndSort from "../features/bookings/BookingFilterAndSort.jsx";
import BookingTable from "../features/bookings/BookingTable.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
	
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
				<BookingFilterAndSort />
			</Row>
			<BookingTable />
		</>
	);
}

export default Bookings;
