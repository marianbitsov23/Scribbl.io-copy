class User {
    setCurrentUser(user) {
        localStorage.setItem("user", user);
    }

    getCurrentUser(user) {
        localStorage.get("user");
    }
}

export default new User();