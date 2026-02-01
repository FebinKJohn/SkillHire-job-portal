var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser || loggedUser.role !== "student") {
    alert("Access denied");
    window.location.href = "login.html";
}

var applications = JSON.parse(localStorage.getItem("applications")) || [];
var appliedDiv = document.getElementById("appliedJobs");

var userApplications = applications.filter(function (app) {
    return app.studentEmail === loggedUser.email;
});

if (userApplications.length === 0) {
    appliedDiv.innerHTML =
        "<div class='job-card'>" +
        "<h3>No Applications Found</h3>" +
        "<p>You haven’t applied for any jobs yet.</p>" +
        "</div>";
} else {

    for (var i = 0; i < userApplications.length; i++) {

        var card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML =
            "<h3>" + userApplications[i].jobTitle + "</h3>" +
            "<p><b>Company:</b> " + userApplications[i].company + "</p>" +
            "<p><b>Status:</b>" + userApplications[i].status + "</p>";

        appliedDiv.appendChild(card);
    }
}
