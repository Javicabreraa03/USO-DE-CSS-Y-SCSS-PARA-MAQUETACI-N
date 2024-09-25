class SpecialCard extends HTMLElement {
    cardText = '';
    myAttr = '';
    colorText = 'font-light-color';
    colorBack = 'bg-neutral-color';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.myAttr = this.getAttribute('my-attribute');
        this.colorText = this.getAttribute('color-text') || this.colorText;
        this.colorBack = this.getAttribute('color-back') || this.colorBack;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['my-attribute', 'color-text', 'color-back'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback', name, oldValue, newValue);
        if (name === 'my-attribute') {
            this.myAttr = newValue;
        } else if (name === 'color-text') {
            this.colorText = newValue;
        } else if (name === 'color-back') {
            this.colorBack = newValue;
        }
        this.render();
    }

    render() {
        const { shadowRoot, colorText, colorBack } = this;
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(this.htmlToElement(colorText, colorBack).content);
    }

    htmlToElement(colorText, colorBack) {
        const cardAttribute = this.myAttr ? `my-attribute="${this.myAttr}"` : '';
        const html = `
            <style>
                .${colorBack} {
                    background-color: var(--${colorBack.replace('bg-', '')});
                }

                .${colorText} {
                    color: var(--${colorText.replace('font-', '')});
                }

                ul{
                    padding: 10rem 2rem 1rem 1rem;
                    border-radius: 0.5rem;
                    height: 1rem;
                }


                li {
                    padding-top: 0.5rem;
                }

                .guide-content__container {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    height: 28rem;
                }
            </style>
            <div ${cardAttribute} class="${colorBack} ${colorText}">
                <div class="guide-content__container">
                    <slot name="card-text">${this.cardText}</slot>
                    <slot></slot>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;
        return template;
    }
}

window.customElements.define('special-card', SpecialCard);
