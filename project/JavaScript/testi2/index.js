let allAnimals = [
    { name: "Buddy", type: "Dog", photo: "dog.jpg", bought: false },
    { name: "Mittens", type: "Cat", photo: "cat.jpg", bought: true },
    { name: "Bessie", type: "Cow", photo: "cow.jpg", bought: false }
];

// Use querySelector for classes, getElementById for IDs (no # or .)
const wrapper = document.querySelector(".wrapper");
const topbar = document.querySelector(".topbar");
const searchbox = document.querySelector(".searchbox");
const searchInput = document.getElementById("searchInput");
const addBTN = document.getElementById("addBTN");
const modal = document.querySelector(".modal");
const Animals = document.getElementById("Animals");
const animalModal = document.getElementById("animalModal");
const modalcontent = document.querySelector(".modalcontent");
const modalTitle = document.getElementById("modalTitle");
const animalName = document.getElementById("animalName");
const animalType = document.getElementById("animalType");
const animalPhoto = document.getElementById("animalPhoto");
const cancelBTN = document.getElementById("cancelBTN");
const submitBTN = document.getElementById("submitBTN");
const name = document.getElementById("name");
const type = document.getElementById("type");
const photo = document.getElementById("photo");
const bought = document.getElementById("bought");

let editAction = false;
let currentAnimal = 0;

function listAnimals() {
    let recordsHTML = "";
    for (let i = 0; i < allAnimals.length; i++) {
        recordsHTML += 
        `<tr>
            <td>${allAnimals[i].name}</td>
            <td>${allAnimals[i].type}</td>
            <td><img src="${allAnimals[i].photo}" alt="${allAnimals[i].name}"></td>
            <td>
                <button onclick="checkAnimal(${i})">${allAnimals[i].bought}</button>
            </td>
            <td>
                <button class="editBTN" onclick="editAnimal(${i})">Edit</button>
                <button class="deleteBTN" onclick="deleteAnimal(${i})">Delete</button>
            </td>
        </tr>`;
    }
    Animals.innerHTML = recordsHTML;
}

listAnimals();

addBTN.addEventListener("click", () => {
    modal.style.display = "block";
});

cancelBTN.addEventListener("click", removeAnimal);

function removeAnimal() {
    animalModal.style.display = "none";
    resetAnimal();
}

function resetAnimal() {
    animalName.value = "";
    animalType.value = "";
    animalPhoto.value = "";
    modalTitle.innerHTML = "Add New Animal";
    editAction = false;
    currentAnimal = 0;
}

submitBTN.addEventListener("click", submitAnimal);

function submitAnimal() {
    if (animalName.value === "" || animalType.value === "" || animalPhoto.value === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (editAction) {
        allAnimals[currentAnimal].name = animalName.value;
        allAnimals[currentAnimal].type = animalType.value;
        allAnimals[currentAnimal].photo = animalPhoto.value;
    } else {
        const newAnimal = {
            name: animalName.value,
            type: animalType.value,
            photo: animalPhoto.value,
            bought: false
        };
        allAnimals.push(newAnimal);
    }
    listAnimals();
    removeAnimal();
}

function editAnimal(i) {
    editAction = true;
    animalModal.style.display = "block";
    modalTitle.innerHTML = "Edit Animal";
    currentAnimal = i;
    animalName.value = allAnimals[i].name;
    animalType.value = allAnimals[i].type;
    animalPhoto.value = allAnimals[i].photo;
}

function deleteAnimal(i) {
    if (confirm(`Are you sure you want to delete ${allAnimals[i].name}?`)) {
        allAnimals.splice(i, 1);
        listAnimals();
    }
}

function checkAnimal(i) {
    allAnimals[i].bought = !allAnimals[i].bought;
    listAnimals();
    if (allAnimals[i].bought) {
        allAnimals[i].name = `<s>${allAnimals[i].name}</s>`;
    }
    else {
        allAnimals[i].name = allAnimals[i].name.replace(/<\/?s>/g, '');
    }
}

searchInput.addEventListener("keyup", searchAnimals);

function searchAnimals() {
    const filterAnimal = searchInput.value.toLowerCase();
    const rows = Animals.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName("td")[0];
        const typeCell = rows[i].getElementsByTagName("td")[1]; 
        if (nameCell && typeCell) {
            const animalName = nameCell.textContent || nameCell.innerText;
            const animalText = typeCell.textContent || typeCell.innerText;
            if (animalName.toLowerCase().indexOf(filterAnimal) > -1 || animalText.toLowerCase().indexOf(filterAnimal) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}