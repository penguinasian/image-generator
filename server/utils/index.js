
 const validatePassword = (password) => { 
    if (password.length < 5) {
        return false;
    }
    // if (password.search(/[a-z]/i) < 0) {
    //     return false;
    // }
    // if (password.search(/[A-Z]/i) < 0) {
    //     return false;
    // }
    return true;
}


export { validatePassword }