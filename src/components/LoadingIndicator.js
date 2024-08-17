if (!customElements.get('loading-indicator')) {
  class LoadingIndicator extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
        <div class="loading-indicator">
          <p>Loading...</p>
        </div>
      `;
      this.style.display = 'none'; // Hide by default
    }
  }

  customElements.define('loading-indicator', LoadingIndicator);
}
