import { useSearchParams } from "react-router-dom";
import Select from "./Select.jsx";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	//On page reload, get the selected value option
	const sortByValue = searchParams.get("sortBy") || "";

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			activeValue={sortByValue}
			type="white"
			onChange={handleChange}
		/>
	);
}

export default SortBy;
