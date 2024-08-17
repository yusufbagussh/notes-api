if (!customElements.get('note-item')) {
  class NoteItem extends HTMLElement {
    static get observedAttributes() {
      return ['highlighted', 'note-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'highlighted') {
        if (newValue === 'true') {
          this.style.border = '2px solid gold';
          this.style.backgroundColor = '#fff9c4';
        } else {
          this.style.border = '2px solid silver';
          this.style.backgroundColor = 'white';
        }
      }
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const note = JSON.parse(this.getAttribute('note'));
      this.setAttribute('note-id', note.id); // Menambahkan note-id sebagai atribut
      this.innerHTML = `
          <h2>${note.title}</h2>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleDateString()}</small>
          <div class="note-actions">
            <button class="delete-note" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
            <button class="archive-note" title="${
              note.archived ? 'Unarchive' : 'Archive'
            }">
              <i class="bi bi-archive${note.archived ? '-fill' : ''}"></i>
            </button>
          </div>
        `;

      this.querySelector('.delete-note').addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('note-delete', {
            detail: note.id,
            bubbles: true,
          })
        );
      });

      this.querySelector('.archive-note').addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent(note.archived ? 'note-unarchive' : 'note-archive', {
            detail: note.id,
            bubbles: true,
          })
        );
      });

      if (this.getAttribute('highlighted') === 'true') {
        this.style.border = '2px solid gold';
        this.style.backgroundColor = '#fff9c4';
      }
    }
  }

  customElements.define('note-item', NoteItem);
}
