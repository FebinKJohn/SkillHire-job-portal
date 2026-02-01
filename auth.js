// REGISTER FUNCTION
function register() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    if (name === "" || email === "" || password === "" || role === "") {
        alert("All fields are required");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            alert("User already exists");
            return;
        }
    }

    var user = {
        name: name,
        email: email,
        password: password,
        role: role
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    window.location.href = "login.html";
}

// LOGIN FUNCTION
function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var users = JSON.parse(localStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {

            localStorage.setItem("loggedInUser", JSON.stringify(users[i]));

            alert("Login successful");

            if (users[i].role === "recruiter") {
                window.location.href = "post-job.html";
            } else {
                window.location.href = "jobs.html";
            }
            return;
        }
    }

    alert("Invalid email or password");
}
