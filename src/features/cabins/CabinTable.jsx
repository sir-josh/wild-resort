import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import Table from "../../ui/Table.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useCabins } from "./useCabins.js";

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resource="cabins" />;

	// function compareText(a, b) {
	// 	if (a[field].toLowerCase() < b[field].toLowerCase()) {
	// 		return -1 * modifier;
	// 	}
	// 	if (a[field].toLowerCase() > b[field].toLowerCase()) {
	// 		return 1 * modifier;
	// 	}
	// 	return 0;
	// }

	//1) Filter
	const filterValue = searchParams.get("discount") || "all";
	let filteredCabins;
	if (filterValue === "all") filteredCabins = cabins;
	if (filterValue === "with-discount")
		filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
	if (filterValue === "no-discount")
		filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

	//2) Sort
	const sortBy = searchParams.get("sortBy") || "name-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins =
		field === "name"
			? filteredCabins.sort(
					(a, b) => a.name.localeCompare(b.name) * modifier)
			: filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div>#</div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
