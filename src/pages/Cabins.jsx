import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins.js";

function Cabins() {
	useEffect(function () {
		getCabins().then((data) => console.log(data));
	}, []);
	return (
		<Row type="horizontal">
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>TEST</p>
			</Row>
			<Row type="horizontal">
				<img
					src="https://qujwpovtobfewqhbslpa.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
					alt="Cabin pics"
					width={800}
				/>
			</Row>
		</Row>
	);
}

export default Cabins;
