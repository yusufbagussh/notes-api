if (!customElements.get('note-form')) {
  class NoteForm extends HTMLElement {
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }

    setupEventListeners() {
      const form = this.querySelector('form');
      const titleInput = this.querySelector('input');
      const bodyTextarea = this.querySelector('textarea');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (this.isValidForm()) {
          const title = titleInput.value;
          const body = bodyTextarea.value;
          const newNote = {
            id: `note-${Date.now()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          };
          this.dispatchEvent(
            new CustomEvent('note-add', {
              detail: newNote,
              bubbles: true,
            })
          );
          form.reset();
          this.resetValidationMessages();
        }
      });

      titleInput.addEventListener('input', () => {
        this.validateTitle();
      });

      bodyTextarea.addEventListener('input', () => {
        this.validateBody();
      });
    }

    isValidForm() {
      const isTitleValid = this.validateTitle();
      const isBodyValid = this.validateBody();
      return isTitleValid && isBodyValid;
    }

    validateTitle() {
      const titleInput = this.querySelector('input');
      const titleValue = titleInput.value.trim();
      const errorMessage = this.querySelector('.title-error');

      if (titleValue === '') {
        errorMessage.textContent = 'Title is required';
        return false;
      } else if (titleValue.length < 3) {
        errorMessage.textContent = 'Title must be at least 3 characters long';
        return false;
      } else {
        errorMessage.textContent = '';
        return true;
      }
    }

    validateBody() {
      const bodyTextarea = this.querySelector('textarea');
      const bodyValue = bodyTextarea.value.trim();
      const errorMessage = this.querySelector('.body-error');

      if (bodyValue === '') {
        errorMessage.textContent = 'Body is required';
        return false;
      } else if (bodyValue.length < 5) {
        errorMessage.textContent = 'Body must be at least 5 characters long';
        return false;
      } else {
        errorMessage.textContent = '';
        return true;
      }
    }

    resetValidationMessages() {
      this.querySelector('.title-error').textContent = '';
      this.querySelector('.body-error').textContent = '';
    }

    render() {
      this.innerHTML = `
            <form>
              <input type="text" placeholder="Title" name="title" required>
              <div class="title-error" style="color: red;"></div>
              <textarea placeholder="Body" name="body" required></textarea>
              <div class="body-error" style="color: red;"></div>
              <button type="submit">Add Note</button>
            </form>
          `;
    }
  }

  customElements.define('note-form', NoteForm);
}
