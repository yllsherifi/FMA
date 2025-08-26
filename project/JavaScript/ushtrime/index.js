let allData = [
    {
        year: "2024",
        name: "John Doe",
        thumb: "student1.jpg",
        reviews: "3.8"
    },
    {
        year: "2023",
        name: "Anna Smith",
        thumb: "student2.jpg",
        reviews: "4.0"
    }
];

const allStudents = document.querySelector("#allStudents");
const addBTN = document.querySelector("#addBTN");
const cancelBTN = document.querySelector("#cancelBTN");
const submitBTN = document.querySelector("#submitBTN");
const movieModal = document.querySelector("#movieModal");
const year = document.querySelector("#year");
const studentName = document.querySelector("#studentName");
const thumb = document.querySelector("#thumb");
const gpa = document.querySelector("#gpa");
const modalTitle = document.querySelector("#modalTitle");
const removeBTN = document.querySelector("#removeBTN");

let editAction = false;
let currentStudent = 0;

listTable();
function listTable() {
    let recordsHTML = "";
    for (let i = 0; i < allData.length; i++) {
        recordsHTML += `<tr>`;
        recordsHTML += `
            <td>${allData[i].year}</td>
            <td>${allData[i].name}</td>
            <td><img width="50" src="${allData[i].thumb}" alt="" class="student-thumb"></td>
            <td>${allData[i].reviews}</td>
            <td>
                <button onclick="editStudent(${i})">Edit</button>
                <button onclick="removeStudent(${i})">Remove</button>
            </td>
        </tr>
        `;
        recordsHTML += `</tr>`;
    }
    allStudents.innerHTML = recordsHTML;
}

addBTN.addEventListener("click", () => {
    movieModal.style.display = "block";
});

cancelBTN.addEventListener("click", removeModal);

submitBTN.addEventListener("click", submitForm);

function removeStudent(i) {
    allData.splice(i, 1);
    listTable();
}

function editStudent() {
    editAction = true;
    movieModal.style.display = "block";
    modalTitle.innerHTML = "Edit Student";
    year.value = year.value;
    studentName.value = studentName.value;
    thumb.value = thumb.value;
    gpa.value = gpa.value;
}

function removeModal() {
    movieModal.style.display = "none";
    resetForm();
}

function resetForm() {
    year.value = "";
    studentName.value = "";
    thumb.value = "";
    gpa.value = "";
    modalTitle.innerHTML = "Add Student";
    editAction = false;
}

function submitForm() {
    if (editAction) {
        allData[currentStudent].year = year.value;
        allData[currentStudent].name = studentName.value;
        allData[currentStudent].thumb = thumb.value;
        allData[currentStudent].reviews = gpa.value;
    } else {
        allData.push({
            year: year.value,
            name: studentName.value,
            thumb: thumb.value,
            reviews: gpa.value
        });
    }

    removeModal();
    listTable();
}