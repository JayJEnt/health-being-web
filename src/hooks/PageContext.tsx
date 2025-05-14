import { createContext, useContext, useState } from "react";

//Type definition for the PageContext.
//Contains the current page name and a function to update it.

const PageContext = createContext<{
	page: string;
	setPage: (page: string) => void;
} | null>(null);

// @param {Object} props - The component props.
// @param {React.ReactNode} props.children - The child components that will have access to the PageContext.
// @returns {JSX.Element} The provider component wrapping the children.

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
	const [page, setPage] = useState("Home");

	return (
		<PageContext.Provider value={{ page, setPage }}>
			{children}
		</PageContext.Provider>
	);
};

//Custom hook to access the PageContext.
//Throws an error if used outside of a PageProvider.

//@returns {{ page: string, setPage: (page: string) => void }} The current page and setter function.

//@throws Will throw an error if used outside of a PageProvider.

//@example
//  * const { page, setPage } = usePage();

export const usePage = () => {
	const context = useContext(PageContext);
	if (!context) throw new Error("usePage must be used within PageProvider");
	return context;
};
