// import "./notes.js";
// import "./countTable";
import { notesData } from "../data/notesData";

const createNotes = document.querySelector(".create"),
  popupBox = document.querySelector(".popup-wrapper"),
  popupTitle = document.querySelector(".popup-title"),
  closePopup = document.querySelector(".cross"),
  addBtn = document.querySelector(".add");

const popupNameInput = document.getElementById("name"),
  popupCategoryInput = document.getElementById("options"),
  //   popupCategoryInput = document.getElementById("category"),
  popupContentInput = document.getElementById("content"),
  popupDatesInput = document.getElementById("dates");

const tableActive = document.querySelector(".table-active");
// const deleteBtn = document.querySelector(".btn-delete");

let isEdit = false,
  chosenNoteById,
  selectedCategory;

const countTableList = document.getElementById("count-table");

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
  isEdit = false;
  clearInputPopup();
  addBtn.innerText = "Create Note";
  popupTitle.innerText = "Create a New Note";
  popupBox.classList.remove("show");
});

showNotes();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const notes = fetchNotes();
  let noteName = popupNameInput.value,
    noteCategory = selectedCategory,
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
    if (!isEdit) {
      notes.push(noteInfo);
    } else {
      //   isEdit = false;
      chosenNoteById = noteInfo;
      console.log(chosenNoteById);
      console.log(noteInfo);
      //   saveNotes(notes);
    }
    saveNotes(notes);
    closePopup.click();
    showNotes();
  }
});

popupCategoryInput.addEventListener("change", function () {
  selectedCategory = popupCategoryInput.value;
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
                <button class="btn btn-icons btn-edit" data-action="edit" data-id="${note.id}">
                  
                </button>
              </td>
              <td>
                <button class="btn btn-icons btn-archive" data-action="archive" data-id="${note.id}">
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
  if (e.target.dataset.action === "archive") {
    const id = e.target.dataset.id;
  }
  if (e.target.dataset.action === "edit") {
    isEdit = true;
    const idNote = e.target.dataset.id;
    const noteById = notesData.notes.filter(
      (note) => note.id === Number(idNote)
    );
    chosenNoteById = noteById[0];
    createNotes.click();
    addBtn.innerText = "Edit Note";
    popupTitle.innerText = "Edit a Note";
    popupNameInput.value = noteById[0].name;
    popupCategoryInput.value = noteById[0].category;
    popupContentInput.value = noteById[0].content;
    popupDatesInput.value = noteById[0].dates;
  }
}

function clearInputPopup() {
  popupNameInput.value = "";
  popupCategoryInput.value = "";
  popupContentInput.value = "";
  popupDatesInput.value = "";
}

//Cума по категоріям
function createCountTable() {
  document.querySelectorAll(".table-row-list").forEach((note) => note.remove());
  let countTaskActive = countNotes(notesData.notes, "active", "Task");
  let countTaskArchived = countNotes(notesData.notes, "archived", "Task");
  let countIdeaActive = countNotes(notesData.notes, "active", "Idea");
  let countIdeaArchived = countNotes(notesData.notes, "archived", "Idea");
  let countRandomActive = countNotes(
    notesData.notes,
    "active",
    "Random thought"
  );
  let countRandomArchived = countNotes(
    notesData.notes,
    "archived",
    "Random thought"
  );

  const rowCountTable = `<tr class="table-row table-row-list" >
              <td>Task</td>
              <td>${countTaskActive}</td>
              <td>${countTaskArchived}</td>
            </tr>
            <tr class="table-row table-row-list" >
              <td>Idea</td>
              <td>${countIdeaActive}</td>
              <td>${countIdeaArchived}</td>
            </tr>
            <tr class="table-row table-row-list" >
              <td>Random thought</td>
              <td>${countRandomActive}</td>
              <td>${countRandomArchived}</td>
            </tr>`;
  countTableList.insertAdjacentHTML("beforeend", rowCountTable);
}

createCountTable();

function countNotes(arr, str, category) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].status === str && arr[i].category === category) {
      count++;
    }
  }

  return count;
}

function createTableRowArchived(note) {
  return `
    <tr class="table-row table-row-archived" id="${note.id}">
              <td id="list-name">${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content">${note.content}</td>
              <td id="list-date">${note.dates}</td>
                <td><button class="btn btn-icons btn-archive" data-action="unarchive" data-id="${note.id}">
                </button></td>
            </tr>`;
}

// Функція для відображення даних в таблиці
function displayNotesInTable(notes, tableClass) {
  const tableBody = document.querySelector(`.${tableClass}`);
  tableBody.innerHTML = "";

  notes.forEach((note) => {
    tableBody.innerHTML += createTableRow(note);
  });
}

window.addEventListener("load", function () {
  const archivedNotes = notesData.notes.filter(
    (note) => note.status === "archived"
  );
  //   displayNotesInTable(activeNotes, "table-active");
  displayNotesInTable(archivedNotes, "table-archived");
});
