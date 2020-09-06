function getToken() {
    return localStorage.getItem("auth_token");
}

function saveToken(token) {
    return localStorage.setItem("auth_token", token);
}

function removeToken() {
    return localStorage.removeItem("auth_token");
}

function tokenDetails() {
    try {
        const token = getToken();

        if (token) {
            const payload = window.atob(token.split(".")[1]);
            return JSON.parse(payload);
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

function authenticate() {
    const details = tokenDetails();
    console.log(`details`);
    console.log(details);
    if (details && (details.exp > Math.round(new Date() / 1000))) {
        console.log('auth pass');
        return details._id;
    } else {
        console.log('auth fail')
        return false;
    }
};

module.exports = { getToken, authenticate, removeToken, saveToken, tokenDetails };