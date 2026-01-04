export function validateName(name: string): string | null {
	const v = name.trim();

	if (v.length === 0) return "Name is required.";
	if (v.length < 3) return "Name must be at least 3 characters.";
	if (v.length > 30) return "Name must be at most 30 characters.";
	if (!/^[a-zA-Z0-9_.-]+$/.test(v)) {
		return "Allowed: letters, numbers, underscore, dot and dash.";
	}
	return null;
}

export function validateEmail(email: string): string | null {
	const v = email.trim();

	if (v.length === 0) return "Email is required.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Invalid email format.";
	return null;
}

export function validatePassword(p1: string, p2: string): string | null {
	if (p1.length === 0 || p2.length === 0) return "Please fill in both password fields.";
	if (p1.length < 8) return "Password must be at least 8 characters.";
	if (p1 !== p2) return "Passwords do not match.";
	return null;
}
