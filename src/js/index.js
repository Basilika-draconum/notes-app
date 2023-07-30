import { notesData } from "../data/notesData";

const createNotes = document.querySelector(".create");
const popupBox = document.querySelector(".popup-wrapper");
const popupTitle = document.querySelector(".popup-title");
const closePopup = document.querySelector(".cross");
const addBtn = document.querySelector(".add");

const popupNameInput = document.getElementById("name"),
  popupCategoryInput = document.getElementById("options"),
  popupContentInput = document.getElementById("content"),
  popupDatesInput = document.getElementById("dates"),
  modalForm = document.getElementById("modal-form");

const tableActive = document.querySelector(".table-active");
const tableArchive = document.querySelector(".table-archived");
const countTableList = document.getElementById("count-table");

let isEdit = false,
  chosenNoteById,
  selectedCategory;

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

const dateRegex = /\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}\b/g;

showNotes();
createCountTable();
showArchivedNotes();

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

modalForm.addEventListener("submit", (e) => {
  try {
    e.preventDefault();
    const notes = fetchNotes();
    let noteName = popupNameInput.value;
    let noteCategory = selectedCategory;
    let noteContent = popupContentInput.value;
    let noteDates = noteContent.match(dateRegex) || "";
    if (!noteName || !noteCategory || !noteContent) {
      alert("Please fill in all required fields.");
      return;
    }
    let dateObj = new Date();
    let month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    let noteInfo = {
      id: String(Date.now()),
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
      const existingNoteIndex = notes.findIndex(
        ({ id }) => id === chosenNoteById.id
      );
      if (existingNoteIndex !== -1) {
        notes[existingNoteIndex] = {
          ...notes[existingNoteIndex],
          ...noteInfo,
        };
      }
    }
    saveNotes(notes);
    closePopup.click();
    showNotes();
  } catch (error) {
    console.error("An error occurred:", error);
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

  const activeNotes = notesData.notes.filter(
    (note) => note.status === "active"
  );
  activeNotes.forEach((note) => {
    let rowTableActive = `<tr class="table-row table-row-active" id="${note.id}">
              <td id="list-name" required>${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content" required>${note.content}</td>
              <td id="list-date" readonly>${note.dates}</td>
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

tableActive.addEventListener("click", onBtnActiveTable);

function onBtnActiveTable(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (e.target.dataset.action === "delete") {
    const id = e.target.dataset.id;
    const tr = document.getElementById(`${id}`);
    tr.remove();
    deleteNote(id);
    createCountTable();
  }
  if (e.target.dataset.action === "archive") {
    const id = e.target.dataset.id;
    const noteById = notesData.notes.find((note) => note.id === id);
    noteById.status = "archived";
    showNotes();
    createCountTable();
    showArchivedNotes();
  }
  if (e.target.dataset.action === "edit") {
    isEdit = true;
    const idNote = e.target.dataset.id;
    const noteById = notesData.notes.find((note) => note.id === idNote);
    chosenNoteById = noteById;
    createNotes.click();
    addBtn.innerText = "Edit Note";
    popupTitle.innerText = "Edit a Note";
    popupNameInput.value = noteById.name;
    popupCategoryInput.value = selectedCategory;
    popupContentInput.value = noteById.content;
    popupDatesInput.value = noteById.dates;
    createCountTable();
  }
}
function deleteNote(id) {
  notesData.notes = notesData.notes.filter((note) => note.id !== id);
}
function clearInputPopup() {
  popupNameInput.value = "";
  popupCategoryInput.value = "";
  popupContentInput.value = "";
  popupDatesInput.value = "";
}

//Table with counter for all types category
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

function countNotes(arr, str, category) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].status === str && arr[i].category === category) {
      count++;
    }
  }
  return count;
}

//Archived table
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

function showArchivedNotes() {
  const archivedNotes = notesData.notes.filter(
    (note) => note.status === "archived"
  );
  tableArchive.innerHTML = "";
  archivedNotes.forEach((note) => {
    tableArchive.innerHTML += createTableRowArchived(note);
  });
}

tableArchive.addEventListener("click", onBtnArchiveTable);

function onBtnArchiveTable(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (e.target.dataset.action === "unarchive") {
    const id = e.target.dataset.id;
    const noteById = notesData.notes.find((note) => note.id === id);
    noteById.status = "active";
    showNotes();
    createCountTable();
    showArchivedNotes();
  }
}
