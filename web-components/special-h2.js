class Specialh2 extends HTMLElement{
    h2Text='Título h2';
    attr= '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.attr = this.getAttribute('my-attribute');
    }
    
    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['my-attribute'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback', name, oldValue, newValue);
        this.attr = newValue;
        this.render();
    }

    render() {
        const { shadowRoot } = this;
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(this.htmlToElement().content);
    }

    htmlToElement() {
        const h2Attribute = this.attr ? `my-attribute="${this.attr}"` : '';
        const html = `
                <style>
                h2 {
                    font-size: 2.5rem;
                    padding: 1rem 0;
                    font-weight: 700;
                    color: var(--primary-color);
                  }
                  
            </style>
            <h2 ${h2Attribute}>
                <slot name="h2-text">${this.h2Text}</slot>
            </h2>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;
        return template;
    }
}

window.customElements.define('special-h2', Specialh2);