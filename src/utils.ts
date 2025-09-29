export function isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
}
