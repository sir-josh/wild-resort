import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinModal from "../features/cabins/CabinModal.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";
import CabinFilterAndSort from "../features/cabins/CabinFilterAndSort.jsx";

function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinFilterAndSort />
			</Row>
			<Row>
				<CabinTable />
				<CabinModal />
			</Row>
		</>
	);
}

export default Cabins;
