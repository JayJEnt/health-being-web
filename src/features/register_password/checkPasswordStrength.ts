function checkPasswordStrength(pw: string): string {
	if (pw.length < 8) return "Too short";

	let score = 0;
	if (/[a-z]/.test(pw)) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;

	if (score === 4) return "Strong";
	else if (score === 2 || score === 3) return "Medium";
	else return "Weak";
}

export default checkPasswordStrength;
