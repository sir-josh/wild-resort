import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinFilterAndSort() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
				]}
			/>
			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
					{ value: "name-desc", label: "Sort by name (Z-A)" },
					{ value: "regularPrice-asc", label: "Price: low-high" },
					{ value: "regularPrice-desc", label: "Price: high-low" },
					{ value: "maxCapacity-asc", label: "Capacity: low-high" },
					{ value: "maxCapacity-desc", label: "Capacity: high-low" },
				]}
			/>
		</TableOperations>
	);
}

export default CabinFilterAndSort;
