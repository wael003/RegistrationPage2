

function signup() {
    var username = document.getElementById("signup-userName").value;
    var password = document.getElementById("signup-password").value;
    var email = document.getElementById("signup-email").value;
    errorDiv = document.getElementById("passwordError");

    const passwordMinLength = 8;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < passwordMinLength) {
        errorDiv.textContent = `Password must be at least ${passwordMinLength} characters long.`;
        errorDiv.style.color = 'red';
        return;
    }

    if (!passwordRegex.test(password)) {
        errorDiv.textContent = 'Password must include uppercase, lowercase, number, and special character.';
        errorDiv.style.color = 'red';
        return;
    }
    if (checkEmailProvider(email)) {
        const randomDigit = generateRandomCode();
        const userScheme = { UserName: username, Email: email, Password: password };
    
                            addUser(userScheme)
                                .then(res => {
                                    if (res.ok) {
                                        // Reset form fields
                                        document.getElementById("signupError").innerHTML = "User add successfully.";
                                        document.getElementById("signup-userName").value = "";
                                        document.getElementById("signup-password").value = "";
                                        document.getElementById("signup-email").value = "";
                                        
                                    } else {
                                        document.getElementById("signupError").innerHTML = "Failed to add user. Email might already exist.";
                                        
                                    }
                                })
                                .catch(err => {
                                    console.error("Error adding user:", err);
                                    document.getElementById("signupError").innerHTML = "An error occurred while signing up.";
                               
                                });
                        
                   
             


            
    } else {
        errorDiv.innerHTML = "Invalid Email Provider";
    }
    


}



function checkEmailProvider(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
    const outlookRegex = /^[a-zA-Z0-9._%+-]+@outlook\.$/;
    const hotmailRegex = /^[a-zA-Z0-9._%+-]+@hotmail\.$/;

    if (gmailRegex.test(email)) {
        return true;
    } else if (yahooRegex.test(email)) {
        return true;
    } else if (outlookRegex.test(email)) {
        return true;
    } else if (hotmailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}


