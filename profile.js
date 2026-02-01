// STUDENT ACCESS ONLY
var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser || loggedUser.role !== "student") {
    alert("Access denied");
    window.location.href = "login.html";
}

// LOAD PROFILE IF EXISTS
var profiles = JSON.parse(localStorage.getItem("profiles")) || {};

if (profiles[loggedUser.email]) {
    var p = profiles[loggedUser.email];

    document.getElementById("pname").value = p.name;
    document.getElementById("skills").value = p.skills;
    document.getElementById("projects").value = p.projects;
    document.getElementById("github").value = p.github;
    document.getElementById("linkedin").value = p.linkedin;

    showProfile(p);
}

// SAVE PROFILE
function saveProfile() {

    var profile = {
        name: document.getElementById("pname").value,
        skills: document.getElementById("skills").value,
        projects: document.getElementById("projects").value,
        github: document.getElementById("github").value,
        linkedin: document.getElementById("linkedin").value
    };

    profiles[loggedUser.email] = profile;
    localStorage.setItem("profiles", JSON.stringify(profiles));

    alert("Profile saved successfully");
    showProfile(profile);
}

// DISPLAY PROFILE
function showProfile(p) {
    document.getElementById("profileView").innerHTML =
        "<p><b>Name:</b> " + p.name + "</p>" +
        "<p><b>Skills:</b> " + p.skills + "</p>" +
        "<p><b>Projects:</b> " + p.projects + "</p>" +
        "<p><b>GitHub:</b> <a href='" + p.github + "' target='_blank'>" + p.github + "</a></p>" +
        "<p><b>LinkedIn:</b> <a href='" + p.linkedin + "' target='_blank'>" + p.linkedin + "</a></p>";
}
