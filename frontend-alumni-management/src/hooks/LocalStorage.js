// Function to save user to local storage
const saveUser = (email) => {
    localStorage.setItem('email', JSON.stringify(email));
}

// Function to remove user from local storage
const removeUser = () => {
    localStorage.removeItem('email');
}

// Function to get user from local storage
const getUser = () => {
    const email = JSON.parse(localStorage.getItem('email'));
    return email;
};

export { saveUser, getUser, removeUser };