import './style.css';

// Import custom elements
import './components/NoteForm';
import './components/NoteItem';
import './components/NoteList';
import './components/LoadingIndicator';
import anime from 'animejs/lib/anime.es.js';
import Swal from 'sweetalert2';

const apiUrl = 'https://notes-api.dicoding.dev/v2/notes';

class App {
  constructor() {
    this.notes = [];
    this.noteListElement = document.querySelector('note-list');
    this.loadingIndicator = document.querySelector('loading-indicator');
    this.init();
  }

  async init() {
    this.showLoading();
    await this.fetchNotes();
    this.hideLoading();
    this.renderNotes();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .querySelector('note-form')
      .addEventListener('note-add', async (event) => {
        this.showLoading();
        await this.addNoteToServer(event.detail);
        this.hideLoading();
      });

    this.noteListElement.addEventListener('note-delete', async (event) => {
      this.showLoading();
      await this.deleteNoteFromServer(event.detail);
      this.hideLoading();
    });

    this.noteListElement.addEventListener('note-archive', async (event) => {
      this.showLoading();
      await this.archiveNoteToServer(event.detail);
      this.hideLoading();
    });

    this.noteListElement.addEventListener('note-unarchive', async (event) => {
      this.showLoading();
      await this.unarchiveNoteFromServer(event.detail);
      this.hideLoading();
    });
  }

  async fetchNotes() {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (result.status !== 'success') {
        this.handleError('Error fetching notes. Please try again.');
      } else {
        this.notes = result.data;
      }
    } catch (error) {
      this.handleError('Error fetching notes. Please try again.');
    }
  }

  async addNoteToServer(note) {
    const data = {
      title: note.title,
      body: note.body,
    };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 'success') {
        this.notes.unshift(result.data);
        this.renderNotes();
        this.animateAddition(result.data.id); // Trigger animation after adding note
        this.handleSuccess('Note added successfully');
      }
    } catch (error) {
      this.handleError('Error adding note. Please try again.');
    }
  }

  async deleteNoteFromServer(noteId) {
    try {
      const response = await fetch(`${apiUrl}/${noteId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === 'success') {
        this.handleSuccess('Note deleted successfully');
        this.notes = this.notes.filter((note) => note.id !== noteId);
        this.renderNotes();
      }
    } catch (error) {
      this.handleError('Error deleting note. Please try again.');
    }
  }

  async archiveNoteToServer(noteId) {
    try {
      const response = await fetch(`${apiUrl}/${noteId}/archiv`, {
        method: 'POST',
      });
      const result = await response.json();
      if (result.status === 'success') {
        this.handleSuccess('Note archived successfully');
        const note = this.notes.find((note) => note.id === noteId);
        if (note) note.archived = true;
        this.renderNotes();
      }
    } catch (error) {
      this.handleError('Error archiving note. Please try again.');
    }
  }

  async unarchiveNoteFromServer(noteId) {
    try {
      const response = await fetch(`${apiUrl}/${noteId}/unarchive`, {
        method: 'POST',
      });
      const result = await response.json();
      if (result.status === 'success') {
        this.handleSuccess('Note unarchived successfully');
        const note = this.notes.find((note) => note.id === noteId);
        if (note) note.archived = false;
        this.renderNotes();
      }
    } catch (error) {
      this.handleError('Error unarchiving note. Please try again.');
    }
  }

  renderNotes() {
    this.noteListElement.setAttribute('notes', JSON.stringify(this.notes));
  }

  showLoading() {
    this.loadingIndicator.style.display = 'flex';
  }

  hideLoading() {
    this.loadingIndicator.style.display = 'none';
  }

  handleError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  handleSuccess(message) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  animateAddition(noteId) {
    const noteElement = document.querySelector(
      `note-item[note-id='${noteId}']`
    );
    if (noteElement) {
      anime({
        targets: noteElement,
        opacity: [0, 1],
        translateY: [-50, 0],
        easing: 'easeOutBounce',
        duration: 1500, // Durasi diperpanjang agar animasinya lebih terlihat
      });
    } else {
      console.error('Note element not found for animation.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
