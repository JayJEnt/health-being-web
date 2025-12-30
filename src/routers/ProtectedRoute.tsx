import type { PropsWithChildren } from "react";

import LoginPage from "../pages/authorization/Login";

import LoadingSpinner from "../shared/components/Loading/LoadingSpinner";
import { useAuth } from "../shared/hooks/useAuth";
import type { User } from "../shared/models/user";

type ProtectedRouteProps = PropsWithChildren & {
	allowedRoles: User["role"][];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
	const { user } = useAuth();

	if (user === undefined) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return <LoginPage />;
	}

	if (!allowedRoles.includes(user.role)) {
		return <div>Permission denied</div>;
	}

	return children;
}
