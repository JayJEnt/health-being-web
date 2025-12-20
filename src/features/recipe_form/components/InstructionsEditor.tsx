import { useState } from "react";

import GenericButton from "../../../shared/components/Generic/Button";

type InstructionsEditorProps = {
	instructions: string[];
	onChange: (instructions: string[]) => void;
};

const InstructionsEditor: React.FC<InstructionsEditorProps> = ({ instructions, onChange }) => {
	const [newInstruction, setNewInstruction] = useState<string>("");

	const addInstruction = () => {
		if (!newInstruction.trim()) return;

		onChange([...instructions, newInstruction]);
		setNewInstruction("");
	};

	const deleteInstruction = (index: number) => {
		onChange(instructions.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Instructions</h2>

			<ol className="list-decimal list-inside space-y-1 mb-3 text-sm">
				{instructions.map((instruction, index) => (
					<li
						key={`${index}-${instruction.slice(0, 40)}`}
						className="flex items-start justify-between gap-3"
					>
						<span className="flex-1">
							{index + 1}. {instruction}
						</span>
						<GenericButton type="cancel" onClick={() => deleteInstruction(index)} />
					</li>
				))}
			</ol>

			<div className="flex gap-2">
				<input
					type="text"
					placeholder="Add Instruction"
					value={newInstruction}
					onChange={(e) => setNewInstruction(e.target.value)}
					className="flex-1 border rounded px-3 py-2"
				/>
				<GenericButton type="add" onClick={addInstruction}>
					Add
				</GenericButton>
			</div>
		</div>
	);
};

export default InstructionsEditor;
