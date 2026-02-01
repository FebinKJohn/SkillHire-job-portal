var nav = document.getElementById("navLinks");
var user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!nav) {
    // navbar not present on this page
} else if (!user) {

    nav.innerHTML =
        "<li><a href='index.html'>Home</a></li>" +
        "<li><a href='login.html'>Login</a></li>" +
        "<li><a href='register.html'>Register</a></li>";

} else if (user.role === "student") {

    nav.innerHTML =
        "<li><a href='jobs.html'>Jobs</a></li>" +
        "<li><a href='applied-jobs.html'>Applied Jobs</a></li>" +
        "<li><a href='profile.html'>My Profile</a></li>" +
        "<li><button onclick='toggleTheme()'>🌙</button></li>" +
        "<li><a href='#' onclick='logout()'>Logout</a></li>";


} else if (user.role === "recruiter") {

    nav.innerHTML =
        "<li><a href='post-job.html'>Post Job</a></li>" +
        "<li><a href='recruiter-applicants.html'>View Applicants</a><li>"+
        "<li><button onclick='toggleTheme()'>🌙</button></li>" +
        "<li><a href='#' onclick='logout()'>Logout</a></li>";
}

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    window.location.href = "index.html";
}

// DARK MODE TOGGLE
function toggleTheme() {
    var body = document.body;
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// LOAD SAVED THEME
var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

