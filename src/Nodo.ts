interface NodoProps {
  [key: string]: any;
}

export default class Nodo<T extends HTMLElement> {
  el: T;
  props: NodoProps;
  refs: { [key: string]: HTMLElement | HTMLElement[] } = {};

  constructor(el: string | T, props: NodoProps = {}) {
    if (typeof el === 'string') {
      this.el = document.querySelector(`[data-el="${el}"]`) as T;
      if (!this.el) {
        throw new Error(`Element not found with data-el attribute: ${el}`);
      }
    } else if (el instanceof HTMLElement) {
      this.el = el;
    } else {
      throw new Error(`Invalid type for el: ${el}`);
    }
    this.props = props;
    this.findRefs();
  }

  private findRefs(): void {
    const refElements = this.el.querySelectorAll<HTMLElement>('[data-ref]');
    const tempRefs: { [key: string]: HTMLElement[] } = {};

    refElements.forEach(element => {
      const refName = element.dataset.ref;
      if (refName) {
        if (!tempRefs[refName]) {
          tempRefs[refName] = [];
        }
        tempRefs[refName].push(element);
      }
    });

    for (const refName in tempRefs) {
      const elements = tempRefs[refName];
      this.refs[refName] = elements.length > 1 ? elements : elements[0];
    }
  }
}