import { deleteNote, archiveNote, unarchiveNote } from "../api";

class Note {
  constructor(id, title, body, archived) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.archived = archived;
  }

  render() {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
      <h2>${this.title}</h2>
      <p>${this.body}</p>
      <button class="archive-btn">${
        this.archived ? "Unarchive" : "Archive"
      }</button>
      <button class="delete-btn">Delete</button>
    `;

    noteElement.querySelector(".archive-btn").addEventListener("click", () => {
      this.archived ? this.unarchiveNote() : this.archiveNote();
    });

    noteElement.querySelector(".delete-btn").addEventListener("click", () => {
      this.deleteNote();
    });

    return noteElement;
  }

  async archiveNote() {
    const response = await archiveNote(this.id);
    alert(response.message);
    window.location.reload();
  }

  async unarchiveNote() {
    const response = await unarchiveNote(this.id);
    alert(response.message);
    window.location.reload();
  }

  async deleteNote() {
    const response = await deleteNote(this.id);
    alert(response.message);
    window.location.reload();
  }
}

export default Note;
