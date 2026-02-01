var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser || loggedUser.role !== "recruiter") {
    alert("Access denied");
    window.location.href = "login.html";
}

var jobs = JSON.parse(localStorage.getItem("jobs")) || [];
var applications = JSON.parse(localStorage.getItem("applications")) || [];
var container = document.getElementById("applicantList");

// get recruiter jobs
var recruiterJobs = jobs.filter(function (job) {
    return job.postedBy === loggedUser.email;
});

if (recruiterJobs.length === 0) {
    container.innerHTML =
        "<div class='job-card'>" +
        "<h3>No Jobs Posted</h3>" +
        "<p>You have not posted any jobs yet.</p>" +
        "</div>";
} else {

    var hasApplicants = false;

    recruiterJobs.forEach(function (job) {

        var jobApplicants = applications.filter(function (app) {
            return app.jobTitle === job.title &&
                   app.company === job.company;
        });

        if (jobApplicants.length > 0) {
            hasApplicants = true;

            var card = document.createElement("div");
            card.className = "job-card";

            var html =
                "<h3>" + job.title + "</h3>" +
                "<p><b>Company:</b> " + job.company + "</p>" +
                "<p><b>Applicants:</b></p><ul>";

            jobApplicants.forEach(function (app, index) {

                html +=
                        "<li>" +
                        "<a href='view-profile.html?email=" + app.studentEmail + "'>" +
                        app.studentEmail +
                        "</a><br>" +
                        "<b>Status:</b> " + app.status + "<br>" +
                        "<button onclick=\"updateStatus('" + app.studentEmail + "','" + job.title + "','Reviewed')\">Mark Reviewed</button> " +
                        "<button onclick=\"updateStatus('" + app.studentEmail + "','" + job.title + "','Selected')\">Select</button>" +
                        "</li><br>";
            });


            html += "</ul>";
            card.innerHTML = html;
            container.appendChild(card);
        }
    });

    if (!hasApplicants) {
        container.innerHTML =
            "<div class='job-card'>" +
            "<h3>No Applications Yet</h3>" +
            "<p>Students have not applied to your jobs yet.</p>" +
            "</div>";
    }
}

function updateStatus(studentEmail, jobTitle, newStatus) {

    var applications = JSON.parse(localStorage.getItem("applications")) || [];

    for (var i = 0; i < applications.length; i++) {
        if (
            applications[i].studentEmail === studentEmail &&
            applications[i].jobTitle === jobTitle
        ) {
            applications[i].status = newStatus;
        }
    }

    localStorage.setItem("applications", JSON.stringify(applications));

    var msg = document.getElementById("statusMessage");
    msg.className = "message success";
    msg.innerText = "Application marked as " + newStatus;

}

