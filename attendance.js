
const studentSelect = document.getElementById("studentSelect");
const presentList = document.getElementById("presentList");
const absentList = document.getElementById("absentList");

let students = JSON.parse(localStorage.getItem("students") || "[]");
let present = [];

students.forEach((student, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = student.name;
    studentSelect.appendChild(option);
});

document.getElementById("attendanceForm").onsubmit = function(e) {
    e.preventDefault();
    const index = studentSelect.value;
    if (!present.includes(index)) {
        present.push(index);
        renderAttendance();
    }
};

function renderAttendance() {
    presentList.innerHTML = "";
    absentList.innerHTML = "";

    students.forEach((student, index) => {
        const li = document.createElement("li");
        li.textContent = student.name;
        if (present.includes(index.toString())) {
            presentList.appendChild(li);
        } else {
            absentList.appendChild(li);
        }
    });
}

function exportToExcel() {
    let csvContent = "الاسم,الحالة\n";
    students.forEach((student, index) => {
        const status = present.includes(index.toString()) ? "حاضر" : "غائب";
        csvContent += `${student.name},${status}\n`;
    });
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "الحضور_" + new Date().toLocaleDateString("ar-EG") + ".csv";
    a.click();
}

renderAttendance();
