import "./style.css";
import { createNote, getNotes, getArchivedNotes } from "./api";
import Note from "./components/Note";
import LoadingIndicator from "./components/LoadingIndicator";

const showActiveNotes = async () => {
  const loadingIndicator = new LoadingIndicator();
  loadingIndicator.show();

  const notesContainer = document.querySelector("#notes-container");
  notesContainer.innerHTML = "";
  const notesData = await getNotes();

  notesData.data.forEach((note) => {
    const noteComponent = new Note(
      note.id,
      note.title,
      note.body,
      note.archived
    );
    notesContainer.appendChild(noteComponent.render());
  });

  loadingIndicator.hide();
};

const showArchivedNotes = async () => {
  const loadingIndicator = new LoadingIndicator();
  loadingIndicator.show();

  const archivedNotesContainer = document.querySelector("#archived-notes-list");
  archivedNotesContainer.innerHTML = "";
  const archivedNotesData = await getArchivedNotes();

  archivedNotesData.data.forEach((note) => {
    const noteComponent = new Note(
      note.id,
      note.title,
      note.body,
      note.archived
    );
    archivedNotesContainer.appendChild(noteComponent.render());
  });

  loadingIndicator.hide();
};

document.addEventListener("DOMContentLoaded", async () => {
  const createNoteForm = document.querySelector("#create-note-form");
  const activeNotesContainer = document.querySelector(
    "#active-notes-container"
  );
  const archivedNotesContainer = document.querySelector(
    "#archived-notes-container"
  );

  document
    .querySelector("#active-notes-link")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      createNoteForm.style.display = "block";
      activeNotesContainer.style.display = "block";
      archivedNotesContainer.style.display = "none";
      await showActiveNotes();
    });

  document
    .querySelector("#archived-notes-link")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      createNoteForm.style.display = "none";
      activeNotesContainer.style.display = "none";
      archivedNotesContainer.style.display = "block";
      await showArchivedNotes();
    });

  document
    .querySelector("#create-note-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;

      const response = await createNote(title, body);
      alert(response.message);
      window.location.reload();
    });

  // Default to showing active notes on page load
  await showActiveNotes();
  createNoteForm.style.display = "block";
  activeNotesContainer.style.display = "block";
  archivedNotesContainer.style.display = "none";
});
