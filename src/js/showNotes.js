import { notesData } from "../data/notesData";
import { tableActive, tableArchive, countTableList } from "./selectors";
import {
  createTableRowArchived,
  generateCountTableRow,
  generateTableRowActive,
} from "./templates";
import { fetchNotes } from "./note";
import { countNotes } from "./countTable";

export function renderAll() {
  showNotes();
  showCountNotes();
  showArchivedNotes();
}
//Active
export function showNotes() {
  document
    .querySelectorAll(".table-row-active")
    .forEach((note) => note.remove());
  const activeNotes = notesData.notes.filter(
    (note) => note.status === "active"
  );
  activeNotes.forEach((note) => {
    const rowTableActive = generateTableRowActive(note);
    tableActive.insertAdjacentHTML("beforeend", rowTableActive);
  });
}
//Count
export function showCountNotes() {
  document.querySelectorAll(".table-row-list").forEach((note) => note.remove());
  const notes = fetchNotes();
  let countTaskActive = countNotes(notes, "active", "Task");
  let countTaskArchived = countNotes(notes, "archived", "Task");
  let countIdeaActive = countNotes(notes, "active", "Idea");
  let countIdeaArchived = countNotes(notes, "archived", "Idea");
  let countRandomActive = countNotes(notes, "active", "Random thought");
  let countRandomArchived = countNotes(notes, "archived", "Random thought");
  const rowCountTable = `
    ${generateCountTableRow("Task", countTaskActive, countTaskArchived)}
    ${generateCountTableRow("Idea", countIdeaActive, countIdeaArchived)}
    ${generateCountTableRow(
      "Random thought",
      countRandomActive,
      countRandomArchived
    )}
  `;
  countTableList.insertAdjacentHTML("beforeend", rowCountTable);
}
//Archive
export function showArchivedNotes() {
  const archivedNotes = notesData.notes.filter(
    (note) => note.status === "archived"
  );
  tableArchive.innerHTML = "";
  archivedNotes.forEach((note) => {
    tableArchive.innerHTML += createTableRowArchived(note);
  });
}
