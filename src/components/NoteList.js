if (!customElements.get('note-list')) {
  class NoteList extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    static get observedAttributes() {
      return ['notes'];
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const notes = JSON.parse(this.getAttribute('notes') || '[]');
      this.innerHTML = notes
        .map(
          (note, index) => `
              <note-item note='${JSON.stringify(note)}' highlighted='${
                index % 2 === 0
              }'></note-item>
            `
        )
        .join('');

      this.querySelectorAll('note-item').forEach((item) => {
        item.addEventListener('note-delete', (event) => {
          this.dispatchEvent(
            new CustomEvent('note-delete', {
              detail: event.detail,
              bubbles: true,
            })
          );
        });
      });
    }
  }

  customElements.define('note-list', NoteList);
}
