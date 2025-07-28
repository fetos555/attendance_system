
const form = document.getElementById("registerForm");
const tableBody = document.querySelector("#studentsTable tbody");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td><button onclick="editStudent(${index})">تعديل</button></td>
            <td><button onclick="deleteStudent(${index})">حذف</button></td>
        `;
        tableBody.appendChild(row);
    });
}
form.onsubmit = function(e) {
    e.preventDefault();
    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        grade: document.getElementById("grade").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
    };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
    form.reset();
};

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    document.getElementById("phone").value = student.phone;
    document.getElementById("address").value = student.address;
    students.splice(index, 1);
    renderTable();
}

renderTable();
