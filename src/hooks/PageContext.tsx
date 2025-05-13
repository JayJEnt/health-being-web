import { createContext, useContext, useState } from "react";

const PageContext = createContext<{
	page: string;
	setPage: (page: string) => void;
} | null>(null);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
	const [page, setPage] = useState("Home");

	return (
		<PageContext.Provider value={{ page, setPage }}>
			{children}
		</PageContext.Provider>
	);
};

export const usePage = () => {
	const context = useContext(PageContext);
	if (!context) throw new Error("usePage must be used within PageProvider");
	return context;
};
