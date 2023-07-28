// import "./notes.js";
import { notesData } from "../data/notesData";

const createNotes = document.querySelector(".create"),
  popupBox = document.querySelector(".popup-wrapper"),
  closePopup = document.querySelector(".cross"),
  addBtn = document.querySelector(".add");

const popupNameInput = document.getElementById("name"),
  popupCategoryInput = document.getElementById("category"),
  popupContentInput = document.getElementById("content"),
  popupDatesInput = document.getElementById("dates");

const tableActive = document.querySelector(".table-active");
const deleteBtn = document.querySelector(".btn-delete");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

createNotes.addEventListener("click", () => {
  popupBox.classList.add("show");
});
closePopup.addEventListener("click", () => {
  clearInputPopup();
  popupBox.classList.remove("show");
});

showNotes();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const notes = fetchNotes();
  let noteName = popupNameInput.value,
    noteCategory = popupCategoryInput.value,
    noteContent = popupContentInput.value,
    noteDates = popupDatesInput.value;
  if (noteName || noteCategory || noteContent) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    let noteInfo = {
      id: Date.now(),
      name: noteName,
      category: noteCategory,
      content: noteContent,
      created_at: `${month} ${day},${year}`,
      status: "active",
      dates: noteDates,
    };
    notes.push(noteInfo);
    saveNotes(notes);
    console.log(notes);
    closePopup.click();
    showNotes();
  }
});

const fetchNotes = () => {
  return notesData.notes;
};
const saveNotes = (notes) => {
  notesData.notes = notes;
};

function showNotes() {
  document
    .querySelectorAll(".table-row-active")
    .forEach((note) => note.remove());
  notesData.notes.forEach((note) => {
    let rowTableActive = `<tr class="table-row table-row-active" id="${note.id}">
              <td id="list-name">${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content">${note.content}</td>
              <td id="list-date">${note.dates}</td>
              <td>
                <button class="btn btn-icons btn-edit">
                  
                </button>
              </td>
              <td>
                <button class="btn btn-icons btn-archive">
                  
                </button>
              </td>
              <td >
                <button class="btn btn-icons btn-delete" data-action="delete" data-id="${note.id}">
                </button>
              </td>
            </tr>`;
    tableActive.insertAdjacentHTML("beforeend", rowTableActive);
  });
}

tableActive.addEventListener("click", onBtn);

function onBtn(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (e.target.dataset.action === "delete") {
    const id = e.target.dataset.id;
    const tr = document.getElementById(`${id}`);
    tr.remove();
  }
}

function clearInputPopup() {
  popupNameInput.value = "";
  popupCategoryInput.value = "";
  popupContentInput.value = "";
  popupDatesInput.value = "";
}
