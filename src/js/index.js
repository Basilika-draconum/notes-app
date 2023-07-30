import {
  createNotes,
  popupBox,
  popupTitle,
  closePopup,
  addBtn,
  popupCategoryInput,
  modalForm,
  tableActive,
  tableArchive,
} from "./selectors";
import {
  fetchNotes,
  saveNotes,
  deleteNote,
  clearInputPopup,
  createNote,
  onChangeCategory,
  editNote,
  changeStatus,
} from "./note";
import { renderAll, showNotes, showCountNotes } from "./showNotes";
import { state } from "./state";

renderAll();

popupCategoryInput.addEventListener("change", onChangeCategory);
modalForm.addEventListener("submit", onSubmitModalForm);
createNotes.addEventListener("click", onClickOpenModal);
closePopup.addEventListener("click", onClickCloseModal);
tableActive.addEventListener("click", onBtnActiveTable);
tableArchive.addEventListener("click", onBtnArchiveTable);

export function onClickOpenModal() {
  popupBox.classList.add("show");
}
function onClickCloseModal() {
  state.isEdit = false;
  clearInputPopup();
  addBtn.innerText = "Create Note";
  popupTitle.innerText = "Create a New Note";
  popupBox.classList.remove("show");
}

function onSubmitModalForm(e) {
  try {
    e.preventDefault();
    const notes = fetchNotes();
    const noteInfo = createNote();
    if (!state.isEdit) {
      if (!noteInfo.name || !noteInfo.category || !noteInfo.content) {
        alert("Please fill in all required fields.");
        return;
      }
      notes.push(noteInfo);
    } else {
      const existingNoteIndex = notes.findIndex(
        ({ id }) => id === state.chosenNoteById?.id
      );
      if (existingNoteIndex !== -1) {
        notes[existingNoteIndex] = {
          ...notes[existingNoteIndex],
          ...noteInfo,
        };
      }
    }
    saveNotes(notes);
    onClickCloseModal();
    showNotes();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function onBtnActiveTable(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (e.target.dataset.action === "delete") {
    const id = e.target.dataset.id;
    const tr = document.getElementById(`${id}`);
    tr.remove();
    deleteNote(id);
    showCountNotes();
  }
  if (e.target.dataset.action === "archive") {
    changeStatus(e, "archived");
  }
  if (e.target.dataset.action === "edit") {
    editNote(e);
  }
}

//Archived table
function onBtnArchiveTable(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  if (e.target.dataset.action === "unarchive") {
    changeStatus(e, "active");
  }
}
