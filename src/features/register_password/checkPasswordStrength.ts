function checkPasswordStrength(password: string): string {
	if (!password) return "You must enter a password";
	if (password.length < 8) return "Too short";

	let score = 0;
	if (/[a-z]/.test(password)) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	if (score === 4) return "Strong";
	else if (score === 2 || score === 3) return "Medium";
	else return "Weak";
}

export default checkPasswordStrength;
