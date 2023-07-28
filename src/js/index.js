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

const tableActive = document.querySelector(".tableActive");

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
  popupBox.classList.remove("show");
});

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
  }
});

const fetchNotes = () => {
  return notesData.notes;
};
const saveNotes = (notes) => {
  notesData.notes = notes;
};

function showNotes() {
  notesData.notes.forEach((note) => {
    console.log(note);
    let rowTableActive = `<tr class="table-row" id="list">
              <td id="list-name">${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content">${note.content}</td>
              <td id="list-date">${note.dates}</td>
              <td>
                <button class="btn">
                  <svg class="icon icon-edit" width="20" height="20">
                    <use xlink:href="./images/icons.svg#icon-edit"></use>
                  </svg>
                </button>
              </td>
              <td>
                <button class="btn">
                  <svg class="icon icon-archive" width="20" height="20">
                    <use xlink:href="./images/icons.svg#icon-archive"></use>
                  </svg>
                </button>
              </td>
              <td>
                <button class="btn">
                  <svg class="icon icon-delete" width="20" height="20">
                    <use xlink:href="./images/icons.svg#icon-delete"></use>
                  </svg>
                </button>
              </td>
            </tr>`;
    tableActive.insertAdjacentHTML("afterend", rowTableActive);
  });
}
showNotes();
