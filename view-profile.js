var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser || loggedUser.role !== "recruiter") {
    alert("Access denied");
    window.location.href = "login.html";
}

// get student email from URL
var params = new URLSearchParams(window.location.search);
var studentEmail = params.get("email");

var profiles = JSON.parse(localStorage.getItem("profiles")) || {};
var profile = profiles[studentEmail];

var container = document.getElementById("profileView");

if (!profile) {
    container.innerHTML =
        "<p>Profile not found.</p>";
} else {

    container.innerHTML =
        "<p><b>Name:</b> " + profile.name + "</p>" +
        "<p><b>Skills:</b> " + profile.skills + "</p>" +
        "<p><b>Projects:</b> " + profile.projects + "</p>" +
        "<p><b>GitHub:</b> <a href='" + profile.github + "' target='_blank'>" + profile.github + "</a></p>" +
        "<p><b>LinkedIn:</b> <a href='" + profile.linkedin + "' target='_blank'>" + profile.linkedin + "</a></p>";
}
