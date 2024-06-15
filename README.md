# @roukara/nodo

`@roukara/nodo` is a class designed to facilitate the manipulation of DOM elements within web pages. It serves as a base class, allowing for easy selection and manipulation of DOM elements, class management, and maintaining references to child elements through props.

## Features

- Simple selection and manipulation of DOM elements.
- Management of references and event listeners through props.

## Installation

Install `@roukara/nodo` using npm:

```bash
npm install @roukara/nodo
```

## Usage

Below is an example of how to use @roukara/nodo as a base class to create a more specific component class that adds custom functionality and handles events through props.

```ts
import Nodo from '@roukara/nodo';

type ButtonProps = {
  onClick: () => void;
};

// Extend Nodo to create a custom button component
class ButtonComponent extends Nodo<HTMLButtonElement> {
  constructor(selector: string, props?: ButtonProps) {
    super(selector, props);
    this.el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  activate() {
    this.addClass('active');
  }

  deactivate() {
    this.removeClass('active');
  }
}

// Use the ButtonComponent with an onClick prop
const button = new ButtonComponent('button', {
  onClick: () => console.log('Button clicked!')
});
```

## Properties

`el: HTMLElement`  
The DOM element that this Nodo instance is associated with.

`props: NodoProps`  
An object containing optional properties for the Nodo instance, such as event handlers and other settings.

`refs: { [key: string]: HTMLElement | HTMLElement[] }`  
An object containing references to child elements of the Nodo instance's element. The keys are the `data-ref` attribute values of the child elements.

## API

`constructor(selector: string | HTMLElement, props?: NodoProps)`  
Initializes a Nodo instance with the specified data-el value or DOM element. Optional properties can include event handlers and other settings.

## License
This project is released under the ISC License.