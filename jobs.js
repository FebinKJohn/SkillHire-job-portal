// RESTRICT ACCESS TO RECRUITERS ONLY
var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
var currentPage = window.location.pathname;

if (currentPage.includes("post-job.html")) {

    if (!loggedUser || loggedUser.role !== "recruiter") {
        alert("Access denied. Recruiters only.");
        window.location.href = "login.html";
    }
}

if (currentPage.includes("jobs.html")) {

    if (!loggedUser || loggedUser.role !== "student") {
        alert("Access denied. Students only.");
        window.location.href = "login.html";
    }
}


// POST JOB FUNCTION
function postJob() {
    var title = document.getElementById("title").value;
    var company = document.getElementById("company").value;
    var location = document.getElementById("location").value;
    var skills = document.getElementById("skills").value;

    if (title === "" || company === "" || location === "" || skills === "") {
        alert("All fields are required");
        return;
    }

    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    var job = {
        title: title,
        company: company,
        location: location,
        skills: skills,
        postedBy: loggedUser.email
    };

    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job posted successfully");

    document.getElementById("title").value = "";
    document.getElementById("company").value = "";
    document.getElementById("location").value = "";
    document.getElementById("skills").value = "";
}


// STUDENT ACCESS CHECK (for jobs.html)
if (window.location.pathname.includes("jobs.html")) {
    
    var profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    var studentProfile = profiles[loggedUser.email];

    var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser || loggedUser.role !== "student") {
        alert("Access denied. Students only.");
        window.location.href = "login.html";
    }

    var jobListDiv = document.getElementById("jobList");
    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (jobs.length === 0) {
        jobListDiv.innerHTML =
            "<div class='job-card'>" +
            "<h3>No Jobs Available</h3>" +
            "<p>Please check back later.</p>" +
            "</div>";

    }

    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    var jobListDiv = document.getElementById("jobList");
    var searchInput = document.getElementById("searchInput");

    displayJobs(jobs);

    // LIVE SEARCH
    searchInput.addEventListener("keyup", function () {
        var keyword = searchInput.value.toLowerCase();

        var filteredJobs = jobs.filter(function (job) {
            return (
                job.title.toLowerCase().includes(keyword) ||
                job.skills.toLowerCase().includes(keyword) ||
                job.location.toLowerCase().includes(keyword)
            );
        });

        displayJobs(filteredJobs);
    });
    
    if (!studentProfile || !studentProfile.skills) {
        document.getElementById("recommendedJobs").innerHTML =
            "<div class='job-card'>" +
            "<h3>No Recommendations</h3>" +
            "<p>Complete your profile to get job recommendations.</p>" +
            "</div>";
    } else {
        showRecommendedJobs();
    }

}

// APPLY JOB FUNCTION
function applyJob(index) {

    var loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    var applications = JSON.parse(localStorage.getItem("applications")) || [];

    var application = {
        studentEmail: loggedUser.email,
        jobTitle: jobs[index].title,
        company: jobs[index].company,
        status: "Applied"
    };
    
    for (var i = 0; i < applications.length; i++) {
        if (
            applications[i].studentEmail === loggedUser.email &&
            applications[i].jobTitle === jobs[index].title
        ) {
            var msg = document.getElementById("applyMessage");
            msg.className = "message error";
            msg.innerText = "You have already applied for this job";

            return;
        }   
    }

    applications.push(application);
    localStorage.setItem("applications", JSON.stringify(applications));

    var msg = document.getElementById("applyMessage");
    msg.className = "message success";
    msg.innerText = "Application submitted successfully";

}

function displayJobs(jobArray) {

    jobListDiv.innerHTML = "";

    if (jobArray.length === 0) {
        jobListDiv.innerHTML =
            "<div class='job-card'>" +
            "<h3>No matching jobs found</h3>" +
            "<p>Try a different keyword</p>" +
            "</div>";
        return;
    }

    for (var i = 0; i < jobArray.length; i++) {

        var jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML =
            "<h3>" + jobArray[i].title + "</h3>" +
            "<p><b>Company:</b> " + jobArray[i].company + "</p>" +
            "<p><b>Location:</b> " + jobArray[i].location + "</p>" +
            "<p><b>Skills:</b> " + jobArray[i].skills + "</p>" +
            "<button onclick='applyJob(" + i + ")'>Apply</button>";

        jobListDiv.appendChild(jobCard);
    }
}

function showRecommendedJobs() {

    var studentSkills = studentProfile.skills
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim());

    var recommendedDiv = document.getElementById("recommendedJobs");
    recommendedDiv.innerHTML = "";

    var scoredJobs = [];

    for (var i = 0; i < jobs.length; i++) {

        var jobSkills = jobs[i].skills
            .toLowerCase()
            .split(",")
            .map(skill => skill.trim());

        var matchCount = 0;

        for (var j = 0; j < studentSkills.length; j++) {
            if (jobSkills.includes(studentSkills[j])) {
                matchCount++;
            }
        }

        if (matchCount > 0) {
            scoredJobs.push({
                job: jobs[i],
                score: matchCount
            });
        }
    }

    // sort by best match
    scoredJobs.sort(function (a, b) {
        return b.score - a.score;
    });

    if (scoredJobs.length === 0) {
        recommendedDiv.innerHTML =
            "<div class='job-card'>" +
            "<h3>No Matching Jobs</h3>" +
            "<p>Try adding more skills to your profile.</p>" +
            "</div>";
        return;
    }

    for (var k = 0; k < scoredJobs.length; k++) {

        var job = scoredJobs[k].job;

        var card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML =
            "<h3>" + job.title + "</h3>" +
            "<p><b>Company:</b> " + job.company + "</p>" +
            "<p><b>Skills:</b> " + job.skills + "</p>" +
            "<p><b>Match Score:</b> " + scoredJobs[k].score + "</p>" +
            "<button onclick='applyJob(" + k + ")'>Apply</button>";

        recommendedDiv.appendChild(card);
    }
}
