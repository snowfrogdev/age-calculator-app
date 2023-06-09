const template = document.createElement("template");
template.innerHTML = `
  <style>
    label {
      display: block;
      color: var(--neutral-color-smokey-grey);
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    label.invalid {
      color: var(--primary-color-light-red);
    }

    :host ::slotted(input) {
      width: 68px;
      height: 50px;
      border: 1px solid var(--neutral-color-light-grey);
      padding-left: 15px;
      border-radius: 7px;
      font-family: "Poppins", sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--neutral-color-off-black);
      caret-color: var(--primary-color-purple);
    }

    :host ::slotted(input:focus-visible),
    :host ::slotted(input:hover) {
      outline: 1px solid var(--primary-color-purple);
    }

    :host ::slotted(input.invalid) {
      border: 1px solid var(--primary-color-light-red);
    }

    .error {
      color: var(--primary-color-light-red);
      font-weight: 400;
      font-style: italic;
      font-size: 10px;
      margin: 0;
    }

    @media screen and (min-width: 768px) {
      label {
        padding-bottom: 7px;
      }

      :host ::slotted(input) {
        width: 121px;
        height: 60px;
        font-size: var(--font-size-inputs);
        padding-left: 20px;
      }

      .error {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  </style>

  <label></label>
  <slot></slot>
  <p class="error" aria-live="polite"></p>
`;
export class InputGroupComponent extends HTMLElement {
    inputLabelElement;
    inputElement;
    inputErrorElement;
    get label() {
        return this.getAttribute("label");
    }
    set label(value) {
        if (value) {
            this.setAttribute("label", value);
        }
        else {
            this.removeAttribute("label");
        }
    }
    get invalid() {
        return this.hasAttribute("invalid");
    }
    set invalid(value) {
        if (value) {
            this.setAttribute("invalid", "");
            this.inputLabelElement.classList.add("invalid");
            this.inputElement.classList.add("invalid");
        }
        else {
            this.removeAttribute("invalid");
            this.inputLabelElement.classList.remove("invalid");
            this.inputElement.classList.remove("invalid");
            this.inputErrorElement.textContent = "";
        }
    }
    _submitted = false;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.inputLabelElement = this.shadowRoot.querySelector("label");
        this.inputElement = this.shadowRoot.querySelector("slot").assignedElements()[0];
        this.inputErrorElement = this.shadowRoot.querySelector(".error");
        this.inputLabelElement.textContent = this.label;
        this.inputElement.addEventListener("input", () => {
            if (this._submitted) {
                this.validate();
            }
        });
    }
    submit() {
        this._submitted = true;
        this.validate();
    }
    validate() {
        const validityState = this.inputElement.validity;
        if (validityState.valid) {
            this.invalid = false;
            return;
        }
        this.invalid = true;
        if (validityState.valueMissing) {
            this.inputErrorElement.textContent = "This field is required";
        }
        if (validityState.rangeOverflow || validityState.rangeUnderflow) {
            this.inputErrorElement.textContent = `Must be a valid ${this.label}`;
        }
        if (this.inputElement.name === "year" && validityState.rangeOverflow) {
            this.inputErrorElement.textContent = "Must be in the past";
        }
    }
}
customElements.define("x-input-group", InputGroupComponent);
//# sourceMappingURL=input-group.component.js.map