import { Route, Routes } from "react-router-dom";

import UsersList from "../pages/UsersList.tsx";

function AdminRoutes() {
	return (
		<Routes>
			<Route index element={<UsersList />} />
		</Routes>
	);
}

export default AdminRoutes;
