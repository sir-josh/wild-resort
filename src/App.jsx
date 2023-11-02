import React from "react";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
	return (
		<>
			<GlobalStyles />
			<div>
				<h1>Hello Oasis</h1>
				<p>Welcome to world of infinite possibilities</p>
			</div>
		</>
	);
};

export default App;

// Wild Oasis[Internal Hotel Management App]- a small boutique
// hotel with 8 luxurious wooden cabins.

// Features
// -custom-built application to manage everything about the hotel:
// bookings, cabins and guests.
// -internal application used inside the hotel to check in guests
// as they arrive
// -API interaction server
// -customer-facing website where customers will be able to book
// stays, using the above API
