/* ========================================
   REGISTER
======================================== */

function registerUser() {

    let name =
        document.getElementById("regName").value.trim();

    let email =
        document.getElementById("regEmail").value.trim();

    let password =
        document.getElementById("regPassword").value;


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        showMessage(
            "Please fill all fields.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        "registeredName",
        name
    );

    localStorage.setItem(
        "registeredEmail",
        email
    );

    localStorage.setItem(
        "registeredPassword",
        password
    );


    window.location.href =
        "login.html";
}



/* ========================================
   LOGIN
======================================== */

function loginUser() {

    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;


    let registeredEmail =
        localStorage.getItem("registeredEmail");

    let registeredPassword =
        localStorage.getItem("registeredPassword");


    if (
        email === "" ||
        password === ""
    ) {

        showMessage(
            "Please enter email and password.",
            "error"
        );

        return;
    }


    if (
        email === registeredEmail &&
        password === registeredPassword
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        window.location.href =
            "dashboard.html";

    } else {

        showMessage(
            "Invalid email or password.",
            "error"
        );

    }

}



/* ========================================
   LOGOUT
======================================== */

function logoutUser() {

    localStorage.removeItem(
        "isLoggedIn"
    );


    window.location.href =
        "login.html";
}



/* ========================================
   CALCULATE GRADE
======================================== */

function calculateGrade() {

    let name =
        document.getElementById("name").value.trim();

    let roll =
        document.getElementById("roll").value.trim();


    let sub1 =
        Number(
            document.getElementById("sub1").value
        );

    let sub2 =
        Number(
            document.getElementById("sub2").value
        );

    let sub3 =
        Number(
            document.getElementById("sub3").value
        );

    let sub4 =
        Number(
            document.getElementById("sub4").value
        );

    let sub5 =
        Number(
            document.getElementById("sub5").value
        );


    if (
        name === "" ||
        roll === ""
    ) {

        showMessage(
            "Please enter student name and roll number.",
            "error"
        );

        return;
    }


    let marks = [
        sub1,
        sub2,
        sub3,
        sub4,
        sub5
    ];


    for (let mark of marks) {

        if (
            mark < 0 ||
            mark > 100 ||
            isNaN(mark)
        ) {

            showMessage(
                "Please enter marks between 0 and 100.",
                "error"
            );

            return;
        }

    }


    let total =
        sub1 +
        sub2 +
        sub3 +
        sub4 +
        sub5;


    let percentage =
        total / 5;


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


    let result =
        percentage >= 40
        ? "PASS"
        : "FAIL";


    /* SAVE RESULT */

    localStorage.setItem(
        "studentName",
        name
    );

    localStorage.setItem(
        "rollNumber",
        roll
    );

    localStorage.setItem(
        "sub1",
        sub1
    );

    localStorage.setItem(
        "sub2",
        sub2
    );

    localStorage.setItem(
        "sub3",
        sub3
    );

    localStorage.setItem(
        "sub4",
        sub4
    );

    localStorage.setItem(
        "sub5",
        sub5
    );

    localStorage.setItem(
        "total",
        total
    );

    localStorage.setItem(
        "percentage",
        percentage
    );

    localStorage.setItem(
        "grade",
        grade
    );

    localStorage.setItem(
        "result",
        result
    );


    window.location.href =
        "result.html";
}



/* ========================================
   MESSAGE
======================================== */

function showMessage(message, type) {

    let oldMessage =
        document.getElementById(
            "pageMessage"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    let messageBox =
        document.createElement("div");


    messageBox.id =
        "pageMessage";


    messageBox.className =
        type === "error"
        ? "page-message error-message"
        : "page-message success-message";


    messageBox.innerText =
        message;


    let app =
        document.querySelector(".app");


    app.insertBefore(
        messageBox,
        app.firstChild
    );


    setTimeout(
        function () {

            if (messageBox) {

                messageBox.remove();

            }

        },
        2500
    );
}



/* ========================================
   SHOW RESULT
======================================== */

function showResult() {

    let resultBox =
        document.getElementById("result");


    if (!resultBox) {

        return;

    }


    let name =
        localStorage.getItem(
            "studentName"
        );


    if (!name) {

        resultBox.innerHTML = `

            <div class="no-result">

                <div class="big-icon">
                    📊
                </div>

                <h2>
                    No Result Available
                </h2>

                <p>
                    Calculate your result first.
                </p>

                <a
                    href="index.html#calculator"
                    class="calculate-btn"
                >
                    Calculate Result
                </a>

            </div>

        `;

        return;
    }


    let roll =
        localStorage.getItem(
            "rollNumber"
        );


    let sub1 =
        localStorage.getItem("sub1");

    let sub2 =
        localStorage.getItem("sub2");

    let sub3 =
        localStorage.getItem("sub3");

    let sub4 =
        localStorage.getItem("sub4");

    let sub5 =
        localStorage.getItem("sub5");


    let total =
        localStorage.getItem("total");


    let percentage =
        Number(
            localStorage.getItem(
                "percentage"
            )
        );


    let grade =
        localStorage.getItem(
            "grade"
        );


    let result =
        localStorage.getItem(
            "result"
        );


    resultBox.innerHTML = `

        <div class="student-result-card">

            <div class="result-icon">
                🏆
            </div>

            <h2>
                ${name}
            </h2>

            <p>
                Roll Number: ${roll}
            </p>

        </div>


        <div class="grade-card">

            <p>
                Your Grade
            </p>

            <div class="grade">
                ${grade}
            </div>

            <div
                class="${
                    result === "PASS"
                    ? "pass"
                    : "fail"
                }"
            >
                ${result}
            </div>

        </div>


        <div class="marks-card">

            <h2>
                Marks
            </h2>


            <div class="mark-line">

                <span>
                    Subject 1
                </span>

                <strong>
                    ${sub1}
                </strong>

            </div>


            <div class="mark-line">

                <span>
                    Subject 2
                </span>

                <strong>
                    ${sub2}
                </strong>

            </div>


            <div class="mark-line">

                <span>
                    Subject 3
                </span>

                <strong>
                    ${sub3}
                </strong>

            </div>


            <div class="mark-line">

                <span>
                    Subject 4
                </span>

                <strong>
                    ${sub4}
                </strong>

            </div>


            <div class="mark-line">

                <span>
                    Subject 5
                </span>

                <strong>
                    ${sub5}
                </strong>

            </div>

        </div>


        <div class="summary">

            <div>

                <small>
                    Total
                </small>

                <strong>
                    ${total}/500
                </strong>

            </div>


            <div>

                <small>
                    Percentage
                </small>

                <strong>
                    ${percentage.toFixed(2)}%
                </strong>

            </div>

        </div>


        <a
            href="index.html#calculator"
            class="calculate-btn"
        >
            Calculate Again
        </a>

    `;
}



/* ========================================
   SHOW WELCOME NAME
======================================== */

function showWelcomeName() {

    let welcomeName =
        document.getElementById(
            "welcomeName"
        );


    if (!welcomeName) {

        return;

    }


    let name =
        localStorage.getItem(
            "registeredName"
        );


    if (name) {

        welcomeName.innerText =
            name;

    }

}



/* ========================================
   SHOW DASHBOARD
======================================== */

function showDashboard() {

    let dashboardName =
        document.getElementById(
            "dashboardName"
        );


    if (!dashboardName) {

        return;

    }


    let name =
        localStorage.getItem(
            "registeredName"
        );


    let total =
        localStorage.getItem(
            "total"
        );


    let percentage =
        localStorage.getItem(
            "percentage"
        );


    let grade =
        localStorage.getItem(
            "grade"
        );


    let result =
        localStorage.getItem(
            "result"
        );


    let roll =
        localStorage.getItem(
            "rollNumber"
        );


    if (name) {

        dashboardName.innerText =
            name;

    }


    if (total) {

        document.getElementById(
            "dashboardTotal"
        ).innerText =
            total + "/500";

    }


    if (percentage) {

        document.getElementById(
            "dashboardPercentage"
        ).innerText =
            Number(percentage).toFixed(2) + "%";

    }


    if (grade) {

        document.getElementById(
            "dashboardGrade"
        ).innerText =
            grade;

    }


    if (result) {

        document.getElementById(
            "dashboardResult"
        ).innerText =
            result;

    }


    if (roll) {

        document.getElementById(
            "dashboardRoll"
        ).innerText =
            roll;

    }

}



/* ========================================
   PAGE LOAD
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showResult();

        showWelcomeName();

        showDashboard();

    }
);