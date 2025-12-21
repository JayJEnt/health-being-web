import type React from "react";

import { ChevronDownIcon, Cog6ToothIcon } from "../../../shared/assets/icons";
import GenericButton from "../../../shared/components/Generic/Button";
import NavButton from "./NavButton";

interface Props {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
}

const SettingsDropdown: React.FC<Props> = ({ isOpen, toggle, close }) => {
	return (
		<div className="relative">
			<GenericButton
				type="button"
				onClick={toggle}
				className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
			>
				<Cog6ToothIcon className="w-6 h-6" />
				<ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</GenericButton>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col py-2 z-50">
					<NavButton icon={Cog6ToothIcon} label="Settings" to="/settings" onClick={close} />
				</div>
			)}
		</div>
	);
};

export default SettingsDropdown;
