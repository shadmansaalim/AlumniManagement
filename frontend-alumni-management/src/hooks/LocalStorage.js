// Function to save user to local storage
const saveUser = (username) => {
    localStorage.setItem('username', JSON.stringify(username));
}

// Function to remove user from local storage
const removeUser = () => {
    localStorage.removeItem('username');
}

// Function to get user from local storage
const getUser = () => {
    const username = JSON.parse(localStorage.getItem('username'));
    return username;
};

// Function to save JWT token to local storage
const saveToken = (token) => {
    localStorage.setItem('token', token);
}

// Function to get JWT token from local storage
const getToken = () => {
    return localStorage.getItem('token');
};

export { saveUser, getUser, removeUser, saveToken, getToken };