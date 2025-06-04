# JasonJS

A simple, powerful way to build React UIs using JSON configuration.

## Why JasonJS?

Building dynamic UIs often requires complex state management and conditional rendering logic. JasonJS simplifies this by letting you describe your UI as JSON data - making it easy to store, transmit, and generate user interfaces programmatically.

Whether you're building a CMS, a form builder, or any system where UI needs to be configured rather than coded, JasonJS provides a clean, declarative approach.

## Installation

```bash
npm install @cm64/jasonjs
```

## Basic Usage

```jsx
import JasonCraftThisJSON from '@cm64/jasonjs';

const myUI = {
  components: [
    {
      component: "div",
      attributes: { className: "container" },
      components: [
        {
          component: "h1",
          innerHTML: "Hello, JasonJS!"
        },
        {
          component: "p",
          innerHTML: "Build your UI with simple JSON."
        }
      ]
    }
  ]
};

function App() {
  return <JasonCraftThisJSON json={myUI} />;
}
```

## Using Custom Components

Register your React components and use them in your JSON:

```jsx
import JasonCraftThisJSON from '@cm64/jasonjs';
import { Button, Card } from './components';

const jcomponents = {
  Button,
  Card
};

const myUI = {
  components: [
    {
      component: "Card",
      attributes: { title: "Welcome" },
      components: [
        {
          component: "p",
          innerHTML: "This is a custom card component"
        },
        {
          component: "Button",
          attributes: { 
            onClick: () => alert('Clicked!'),
            variant: "primary"
          },
          innerHTML: "Click Me"
        }
      ]
    }
  ]
};

function App() {
  return <JasonCraftThisJSON json={myUI} jcomponents={jcomponents} />;
}
```

## Passing Context

Share data across your component tree using `jcontext`:

```jsx
const jcontext = {
  user: { name: "John Doe" },
  theme: "dark"
};

function App() {
  return (
    <JasonCraftThisJSON 
      json={myUI} 
      jcomponents={jcomponents}
      jcontext={jcontext}
    />
  );
}
```

## Custom Rendering

For advanced use cases, you can customize how components are rendered:

```jsx
const renderComponent = ({ Component, props, content, componentName }) => {
  // Add custom logic here
  console.log(`Rendering ${componentName}`);
  
  return <Component {...props}>{content}</Component>;
};

function App() {
  return (
    <JasonCraftThisJSON 
      json={myUI} 
      renderComponent={renderComponent}
    />
  );
}
```

## JSON Structure

```typescript
{
  components: [
    {
      component: string,        // Component name or HTML element
      attributes?: object,      // Props to pass to the component
      innerHTML?: string,       // Text content (sanitized)
      components?: array        // Nested components
    }
  ]
}
```

## Examples

### Form Example

```json
{
  "components": [
    {
      "component": "form",
      "attributes": { "className": "contact-form" },
      "components": [
        {
          "component": "input",
          "attributes": { 
            "type": "text",
            "placeholder": "Your Name",
            "name": "name"
          }
        },
        {
          "component": "input",
          "attributes": { 
            "type": "email",
            "placeholder": "Your Email",
            "name": "email"
          }
        },
        {
          "component": "button",
          "attributes": { "type": "submit" },
          "innerHTML": "Send"
        }
      ]
    }
  ]
}
```

### Navigation Example

```json
{
  "components": [
    {
      "component": "nav",
      "components": [
        {
          "component": "a",
          "attributes": { "href": "/" },
          "innerHTML": "Home"
        },
        {
          "component": "a",
          "attributes": { "href": "/about" },
          "innerHTML": "About"
        },
        {
          "component": "a",
          "attributes": { "href": "/contact" },
          "innerHTML": "Contact"
        }
      ]
    }
  ]
}
```

## Try It Online

[Try JasonJS on CodeSandbox →](https://codesandbox.io/p/sandbox/quizzical-morse-yfk5zl)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [CM64.studio](https://github.com/cm64-studio)

## Acknowledgments

Created with ❤️ by the team at CM64.studio