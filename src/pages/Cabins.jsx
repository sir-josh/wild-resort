import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinModal from "../features/cabins/CabinModal.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";

function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter | Sort</p>
			</Row>
			<Row>
				<CabinTable />
				<CabinModal />
			</Row>
		</>
	);
}

export default Cabins;
