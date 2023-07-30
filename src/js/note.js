import { notesData } from "../data/notesData";
import {
  createNotes,
  popupTitle,
  addBtn,
  popupNameInput,
  popupCategoryInput,
  popupContentInput,
  popupDatesInput,
} from "./selectors";
import { months, dateRegex } from "./constants";
import { renderAll, showCountNotes } from "./showNotes";
import { state } from "./state";
import { onClickOpenModal } from "./index";

export function fetchNotes() {
  return notesData.notes;
}
export function saveNotes(notes) {
  notesData.notes = notes;
}
export function deleteNote(id) {
  notesData.notes = notesData.notes.filter((note) => note.id !== id);
}
export function clearInputPopup() {
  popupNameInput.value = "";
  popupCategoryInput.value = "";
  popupContentInput.value = "";
  popupDatesInput.value = "";
}
export function createNote() {
  let selectedCategory = onChangeCategory();
  let noteName = popupNameInput.value;
  let noteCategory = selectedCategory;
  let noteContent = popupContentInput.value;
  let noteDates = noteContent.match(dateRegex) || "";
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
  return noteInfo;
}

export function onChangeCategory() {
  let selectedCategory = popupCategoryInput.value;
  return selectedCategory;
}

export function editNote(e) {
  state.isEdit = true;
  const idNote = e.target.dataset.id;
  const noteById = notesData.notes.find((note) => note.id === idNote);
  state.chosenNoteById = noteById;
  onClickOpenModal();
  addBtn.innerText = "Edit Note";
  popupTitle.innerText = "Edit a Note";
  popupNameInput.value = noteById.name;
  popupCategoryInput.value = noteById.category;
  popupContentInput.value = noteById.content;
  popupDatesInput.value = noteById.dates;
  showCountNotes();
}

export function changeStatus(e, status) {
  const notes = fetchNotes();
  const id = e.target.dataset.id;
  const noteById = notes.find((note) => note.id === id);
  noteById.status = status;
  renderAll();
}
