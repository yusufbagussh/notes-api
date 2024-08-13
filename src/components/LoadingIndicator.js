class LoadingIndicator {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'loading-indicator';
      this.element.innerHTML = '<p>Loading...</p>';
    }
  
    show() {
      document.body.appendChild(this.element);
    }
  
    hide() {
      document.body.removeChild(this.element);
    }
  }
  
  export default LoadingIndicator;
  