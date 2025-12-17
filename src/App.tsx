import { Route, Routes } from "react-router-dom";
import NavigationBar from "./features/navigation_bar/NavigationBar.tsx";
import AdminRoutes from "./routers/Admin.tsx";
import ProtectedRoute from "./routers/ProtectedRoute.tsx";
import PublicRoutes from "./routers/Public.tsx";
import UserRoutes from "./routers/User.tsx";
import { AuthProvider } from "./shared/authentication/AuthContextProvider.tsx";

function App() {
	return (
		<AuthProvider>
			<NavigationBar />
			<main className="pt-16 absolute inset-0">
				<Routes>
					<Route path="/*" element={<PublicRoutes />} />
					<Route
						path="/user/*"
						element={
							<ProtectedRoute allowedRoles={["admin", "user"]}>
								<UserRoutes />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/*"
						element={
							<ProtectedRoute allowedRoles={["admin"]}>
								<AdminRoutes />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
		</AuthProvider>
	);
}

export default App;
