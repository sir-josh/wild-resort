import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";


import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route
							index
							element={<Navigate replace to="dashboard" />}
						/>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<NewUsers />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
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
// Besides some minor things like not storing full names and
//not using computed columns,
