import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking.jsx";
import Checkin from "./pages/Checkin.jsx";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

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
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}>
							<Route
								index
								element={<Navigate replace to="dashboard" />}
							/>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="bookings" element={<Bookings />} />
							<Route
								path="bookings/:bookingId"
								element={<Booking />}
							/>
							<Route
								path="checkin/:bookingId"
								element={<Checkin />}
							/>
							<Route path="cabins" element={<Cabins />} />
							<Route path="users" element={<NewUsers />} />
							<Route path="settings" element={<Settings />} />
							<Route path="account" element={<Account />} />
						</Route>
						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position="top-right"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "400px",
							padding: "16px 24px",
							backgroundColor: "var(--color-grey-400)",
							color: "var(--color-grey-700)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
};

export default App;
