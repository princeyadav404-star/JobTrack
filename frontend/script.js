const API_URL = "http://localhost:8080/api/jobs";

const jobForm = document.getElementById("jobForm");
const jobId = document.getElementById("jobId");
const company = document.getElementById("company");
const role = document.getElementById("role");
const locationInput = document.getElementById("location");
const appliedDate = document.getElementById("appliedDate");
const status = document.getElementById("status");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const formTitle = document.getElementById("formTitle");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const clearFilters = document.getElementById("clearFilters");

const jobList = document.getElementById("jobList");
const resultText = document.getElementById("resultText");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", loadJobs);

jobForm.addEventListener("submit", saveJob);
cancelButton.addEventListener("click", resetForm);
clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    statusFilter.value = "";
    loadJobs();
});

let searchTimer;

searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadJobs, 250);
});

statusFilter.addEventListener("change", loadJobs);

async function loadJobs() {
    try {
        const search = searchInput.value.trim();
        const filter = statusFilter.value;

        let url = API_URL;

        if (search) {
            url = `${API_URL}/search?company=${encodeURIComponent(search)}`;
        } else if (filter) {
            url = `${API_URL}/filter?status=${encodeURIComponent(filter)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load applications");
        }

        const jobs = await response.json();

        renderJobs(jobs);
        updateDashboard(jobs);
        resultText.textContent = `${jobs.length} application${jobs.length === 1 ? "" : "s"} found`;

    } catch (error) {
        showMessage("Backend server is not running or unavailable.", "error");
        jobList.innerHTML = '<div class="empty">Start the Spring Boot backend and refresh this page.</div>';
        resultText.textContent = "Unable to load applications";
    }
}

async function saveJob(event) {
    event.preventDefault();

    const payload = {
        company: company.value.trim(),
        role: role.value.trim(),
        location: locationInput.value.trim(),
        appliedDate: appliedDate.value,
        status: status.value
    };

    const id = jobId.value;

    try {
        const response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const firstError = Object.values(errorData)[0] || "Request failed";
            throw new Error(firstError);
        }

        showMessage(
            id ? "Application updated successfully." : "Application added successfully.",
            "success"
        );

        resetForm();
        await loadJobs();

    } catch (error) {
        showMessage(error.message || "Could not save application.", "error");
    }
}

async function deleteJob(id) {
    const confirmed = confirm("Delete this job application?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete application");
        }

        showMessage("Application deleted successfully.", "success");
        await loadJobs();

    } catch (error) {
        showMessage(error.message, "error");
    }
}

async function editJob(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Could not load application");
        }

        const job = await response.json();

        jobId.value = job.id;
        company.value = job.company;
        role.value = job.role;
        locationInput.value = job.location || "";
        appliedDate.value = job.appliedDate;
        status.value = job.status;

        formTitle.textContent = "Edit Job Application";
        submitButton.textContent = "Update Application";
        cancelButton.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        showMessage(error.message, "error");
    }
}

function resetForm() {
    jobForm.reset();
    jobId.value = "";
    formTitle.textContent = "Add Job Application";
    submitButton.textContent = "Add Application";
    cancelButton.classList.add("hidden");

    status.value = "APPLIED";
}

function renderJobs(jobs) {
    jobList.innerHTML = "";

    if (jobs.length === 0) {
        jobList.innerHTML = '<div class="empty">No applications found.</div>';
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement("article");
        card.className = "job-card";

        const statusClass = job.status.toLowerCase();
        const statusText = formatStatus(job.status);

        card.innerHTML = `
            <div class="job-main">
                <h3>${escapeHtml(job.company)}</h3>
                <div class="job-meta">
                    <span><strong>Role:</strong> ${escapeHtml(job.role)}</span>
                    <span><strong>Location:</strong> ${escapeHtml(job.location || "Not specified")}</span>
                    <span><strong>Applied:</strong> ${job.appliedDate}</span>
                </div>
                <span class="badge ${statusClass}">${statusText}</span>
            </div>

            <div class="job-actions">
                <button class="edit-btn" onclick="editJob(${job.id})">Edit</button>
                <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
            </div>
        `;

        jobList.appendChild(card);
    });
}

function updateDashboard(jobs) {
    document.getElementById("totalCount").textContent = jobs.length;
    document.getElementById("appliedCount").textContent =
        jobs.filter(job => job.status === "APPLIED").length;
    document.getElementById("interviewCount").textContent =
        jobs.filter(job => job.status === "INTERVIEW").length;
    document.getElementById("selectedCount").textContent =
        jobs.filter(job => job.status === "SELECTED").length;
    document.getElementById("rejectedCount").textContent =
        jobs.filter(job => job.status === "REJECTED").length;
}

function formatStatus(value) {
    return value.charAt(0) + value.slice(1).toLowerCase();
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;

    setTimeout(() => {
        message.className = "message hidden";
    }, 3500);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
