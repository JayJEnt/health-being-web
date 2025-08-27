import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
type Props = {
    setImage: Dispatch<SetStateAction<File | null>>;
};
const ImageInput: React.FC<Props> = ({ setImage }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <label className="block text-lg font-semibold mb-2">Recipe Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
                <div className="mt-4">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-xs max-h-48 object-cover rounded shadow-md"
                    />
                </div>
            )}
        </div>
    );
};
export default ImageInput;
