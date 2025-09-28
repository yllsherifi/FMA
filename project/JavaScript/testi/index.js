let allData = [
    { year: "1998", title: "My Name is Red", cover: "red.jpg", rating: "5.0" },
    { year: "2021", title: "The Silent Patient", cover: "green.jpg", rating: "3.2" },
    { year: "2019", title: "Normal People", cover: "blue.jpg", rating: "2.2" }
];

const allBooks = document.querySelector("#allBooks");
const addBTN = document.querySelector("#addBTN");
const bookModal = document.querySelector("#bookModal");
const searchbox = document.querySelector(".search-box");
const searchInput = document.querySelector("#searchInput");
const topbar = document.querySelector(".top-bar");
const wrapper = document.querySelector(".wrapper");

const cancelBTN = document.querySelector("#cancelBTN");
const submitBTN = document.querySelector("#submitBTN");

const editBTN = document.querySelector(".editBTN");
const deleteBTN = document.querySelector(".deleteBTN");
const year = document.querySelector("#year")
const bookTitle = document.querySelector("#bookTitle")
const cover = document.querySelector("#cover")
const rating = document.querySelector("#rating")
const modalTitle = document.querySelector("#modalTitle");

let editAction = false;
currentbook = 0;

function listTable() {
    let recordsHTML = "";
    for (let i = 0; i < allData.length; i++) {
        recordsHTML += `<tr>`;
        recordsHTML += `
            <td>${allData[i].year}</td>
            <td>${allData[i].title}</td>
            <td><img src="${allData[i].cover}" alt="${allData[i].title} Cover" width="50px"></td>
            <td>${allData[i].rating}</td>
            <td><button>Edit</button> <button class="deleteBTN">Delete</button></td>
        </tr>
        `;
        recordsHTML += `</tr>`;
    }
    allBooks.innerHTML = recordsHTML;
}
listTable();

addBTN.addEventListener("click", () => {
    bookModal.style.display = "block";
});

cancelBTN.addEventListener("click", removebook);

function removebook() {
    bookModal.style.display = "none";
    resetbook();
}

function resetbook() {
    year.value = "";
    title.value = "";
    cover.value = "";
    rating.value = "";
    modalTitle.innerHTML = "Add New Book";
    editAction = false;
}

submitBTN.addEventListener("click", submitbook);

function submitbook() {
    if (year.value === "" || bookTitle.value === "" || cover.value === "" || rating.value === "") {
        alert("Please fill in all fields.");
        return;
    }
    const newBook = {
        year: year.value,
        title: bookTitle.value,
        cover: cover.value,
        rating: rating.value
    };
    if (editAction) {
        allData[currentbook] = newBook;
    } else {
        allData.push(newBook);
    }   
    listTable();
    removebook();
    resetbook();
}

editBTN.addEventListener("click", (editbook) => {
    editAction = true;
    bookModal.style.display = "block";
    modalTitle.innerHTML = "Edit Book";
    year.value = year.value;
    bookTitle.value = bookTitle.value;
    cover.value = cover.value;
    rating.value = rating.value;
});

deleteBTN.addEventListener("click", (removebook) => {
    allData.splice(i, 1);
    listTable();
});