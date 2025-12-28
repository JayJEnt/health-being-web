import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MagnifyingGlassIcon } from "../../../shared/assets/icons";

const SearchBar: React.FC = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			void navigate(`/search/${searchQuery.trim()}`);
			setSearchQuery("");
		}
	};

	return (
		<form onSubmit={handleSearchSubmit} className="flex-1 flex justify-center">
			<div className="relative w-full max-w-md">
				<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
				<input
					type="text"
					placeholder="Search recipes..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
		</form>
	);
};

export default SearchBar;
