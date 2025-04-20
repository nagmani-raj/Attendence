
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded!");

    const addButton = document.querySelector("#addStudentBtn");
    const tableBody = document.querySelector("#addedStudentTable tbody");
    const saveButton = document.querySelector("#saveStudentBtn");
    const profileIcon = document.querySelector("#profileIcon");

    if (!addButton || !tableBody || !saveButton || !profileIcon) {
        console.error("❌ Some Elements Not Found!");
        return;
    }

    // ✅ **Add Student Logic**
    addButton.addEventListener("click", function () {
        console.log("✅ Add Student Button Clicked!");

        const nameInput = document.querySelector("#studentName");
        const branchInput = document.querySelector("#studentBranch");
        const rollNoInput = document.querySelector("#studentRollNo");
        const registrationNoInput = document.querySelector("#studentRegistrationNo");

        if (!nameInput.value.trim() || !rollNoInput.value.trim() || !registrationNoInput.value.trim()) {
            alert("❌ Please enter Student Name, Roll No, and Registration No.");
            return;
        }

        const rollNo = rollNoInput.value.trim();
        const registrationNo = registrationNoInput.value.trim();

        // ✅ **Duplicate Entry Check**
        const existingRollNumbers = Array.from(tableBody.querySelectorAll("tr td:nth-child(3)"))
            .map(td => td.textContent.trim());

        const existingRegistrationNumbers = Array.from(tableBody.querySelectorAll("tr td:nth-child(4)"))
            .map(td => td.textContent.trim());

        if (existingRollNumbers.includes(rollNo)) {
            alert("❌ This Roll Number is already added!");
            return;
        }

        if (existingRegistrationNumbers.includes(registrationNo)) {
            alert("❌ This Registration Number is already added!");
            return;
        }

        // ✅ **Add Student to Table**
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nameInput.value}</td>
            <td>${branchInput.value}</td>
            <td>${rollNo}</td>
            <td>${registrationNo}</td>
            <td><button class="delete-btn">❌</button></td>
        `;

        tableBody.appendChild(newRow);
        console.log("✅ Student Added Successfully!");

        // ✅ **Clear Input Fields**
        nameInput.value = "";
        rollNoInput.value = "";
        registrationNoInput.value = "";
        branchInput.selectedIndex = 0;

        // ✅ **Delete Button Event Listener**
        newRow.querySelector(".delete-btn").addEventListener("click", function () {
            newRow.remove();
            console.log("✅ Student Deleted!");
        });
    });

    // ✅ **Save Attendance to Local Storage**
    saveButton.addEventListener("click", function () {
        console.log("💾 Save Button Clicked!");

        const tableRows = document.querySelectorAll("#addedStudentTable tbody tr");

        if (tableRows.length === 0) {
            alert("❌ No students to save!");
            return;
        }

        let studentData = [];
        tableRows.forEach(row => {
            const columns = row.querySelectorAll("td");
            if (columns.length >= 4) {
                studentData.push({
                    name: columns[0].textContent.trim(),
                    branch: columns[1].textContent.trim(),
                    rollNo: columns[2].textContent.trim(),
                    registrationNo: columns[3].textContent.trim()
                });
            }
        });

        console.log("📌 Saving Data: ", studentData);
        localStorage.setItem("attendanceData", JSON.stringify(studentData));

        alert("✅ Attendance Saved Successfully!");
    });

    // ✅ **Profile Icon पर क्लिक करने से Data Load होगा**
    profileIcon.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("👤 Profile Icon Clicked!");

        let students = JSON.parse(localStorage.getItem("attendanceData")) || [];

        console.log("📌 Loaded Data: ", students);

        if (students.length === 0) {
            alert("❌ No attendance data found!");
            return;
        }

        let studentList = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.rollNo}</td>
                <td>${student.registrationNo}</td>
                <td><button class="delete-btn">❌</button></td>
            </tr>
        `).join("");

        tableBody.innerHTML = studentList;

        // ✅ Delete Button के लिए Event Listener लगाओ
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                button.closest("tr").remove();
                console.log("✅ Student Deleted!");
            });
        });
    });

    // ✅ **Page Load होते ही Data Load हो जाएगा**
    function loadAttendanceData() {
        let students = JSON.parse(localStorage.getItem("attendanceData")) || [];

        if (students.length === 0) return;

        let studentList = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.rollNo}</td>
                <td>${student.registrationNo}</td>
                <td><button class="delete-btn">❌</button></td>
            </tr>
        `).join("");

        tableBody.innerHTML = studentList;

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                button.closest("tr").remove();
                console.log("✅ Student Deleted!");
            });
        });

        console.log("✅ Attendance Data Loaded on Page Load!");
    }

    // ✅ **Call Load Function on Page Load**
    loadAttendanceData();
});