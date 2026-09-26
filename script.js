// ================================
// REGISTER
// ================================

function registerUser() {

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (name === "" || email === "" || password === "") {
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );

    window.location.href = "login.html";
}


// ================================
// LOGIN
// ================================

function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const savedUser = JSON.parse(
        localStorage.getItem("registeredUser")
    );

    if (!savedUser) {
        return;
    }

    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        window.location.href = "dashboard.html";

    }

}


// ================================
// LOGOUT
// ================================

function logoutUser() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}


// ================================
// CALCULATE RESULT
// ================================

function calculateGrade() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();

    const marks = [
        Number(document.getElementById("sub1").value),
        Number(document.getElementById("sub2").value),
        Number(document.getElementById("sub3").value),
        Number(document.getElementById("sub4").value),
        Number(document.getElementById("sub5").value)
    ];

    if (name === "" || roll === "") {
        return;
    }

    const total =
        marks[0] +
        marks[1] +
        marks[2] +
        marks[3] +
        marks[4];

    const percentage = total / 5;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    const result =
        percentage >= 50 ? "PASS" : "FAIL";

    const studentResult = {
        name: name,
        roll: roll,
        marks: marks,
        total: total,
        percentage: percentage,
        grade: grade,
        result: result
    };

    localStorage.setItem(
        "studentResult",
        JSON.stringify(studentResult)
    );

    window.location.href = "result.html";
}


// ================================
// WELCOME NAME
// ================================

function showWelcomeName() {

    const element =
        document.getElementById("welcomeName");

    if (!element) {
        return;
    }

    const user = JSON.parse(
        localStorage.getItem("registeredUser")
    );

    if (user) {
        element.textContent = user.name;
    }
}


// ================================
// DASHBOARD
// ================================

function showDashboard() {

    const nameElement =
        document.getElementById("dashboardName");

    if (!nameElement) {
        return;
    }

    const user = JSON.parse(
        localStorage.getItem("registeredUser")
    );

    if (user) {
        nameElement.textContent = user.name;
    }

    const result = JSON.parse(
        localStorage.getItem("studentResult")
    );

    if (!result) {
        return;
    }

    const total =
        document.getElementById("dashboardTotal");

    const percentage =
        document.getElementById("dashboardPercentage");

    const grade =
        document.getElementById("dashboardGrade");

    const resultElement =
        document.getElementById("dashboardResult");

    const roll =
        document.getElementById("dashboardRoll");

    if (total) {
        total.textContent = result.total;
    }

    if (percentage) {
        percentage.textContent =
            result.percentage.toFixed(2) + "%";
    }

    if (grade) {
        grade.textContent = result.grade;
    }

    if (resultElement) {
        resultElement.textContent = result.result;
    }

    if (roll) {
        roll.textContent = result.roll;
    }
}


// ================================
// SHOW RESULT
// ================================

function showResult() {

    const container =
        document.getElementById("resultContainer");

    if (!container) {
        return;
    }

    const result = JSON.parse(
        localStorage.getItem("studentResult")
    );

    if (!result) {

        container.innerHTML = `
            <div class="no-result">

                <div class="big-icon">
                    📊
                </div>

                <h2>No Result Available</h2>

                <p>
                    Please calculate your result first.
                </p>

                <br>

                <a
                    href="index.html"
                    class="start-btn"
                >
                    Calculate Result
                </a>

            </div>
        `;

        return;
    }

    const resultClass =
        result.result === "PASS"
            ? "pass"
            : "fail";

    container.innerHTML = `

        <div class="student-result-card">

            <div class="result-icon">
                🎓
            </div>

            <h2>
                ${result.name}
            </h2>

            <p>
                Roll Number: ${result.roll}
            </p>

        </div>


        <div class="grade-card">

            <p>Your Grade</p>

            <div class="grade">
                ${result.grade}
            </div>

            <span class="${resultClass}">
                ${result.result}
            </span>

        </div>


        <div class="marks-card">

            <h2>Subject Marks</h2>

            <div class="mark-line">
                <span>Subject 1</span>
                <strong>${result.marks[0]}</strong>
            </div>

            <div class="mark-line">
                <span>Subject 2</span>
                <strong>${result.marks[1]}</strong>
            </div>

            <div class="mark-line">
                <span>Subject 3</span>
                <strong>${result.marks[2]}</strong>
            </div>

            <div class="mark-line">
                <span>Subject 4</span>
                <strong>${result.marks[3]}</strong>
            </div>

            <div class="mark-line">
                <span>Subject 5</span>
                <strong>${result.marks[4]}</strong>
            </div>

        </div>


        <div class="summary">

            <div>

                <small>Total</small>

                <strong>
                    ${result.total}/500
                </strong>

            </div>

            <div>

                <small>Percentage</small>

                <strong>
                    ${result.percentage.toFixed(2)}%
                </strong>

            </div>

        </div>

        <br>

        <a
            href="index.html"
            class="start-btn"
        >
            Calculate Again
        </a>
    `;
}


// ================================
// PAGE LOAD
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showWelcomeName();

        showDashboard();

        showResult();

    }
);