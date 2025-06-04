# JasonJS Examples

This folder contains comprehensive examples demonstrating the capabilities of JasonJS.

## Examples Overview

### 1. Basic HTML Elements (`basic-html.js`)
Demonstrates how to use JasonJS with standard HTML elements:
- Basic text and containers
- Lists and forms
- Input elements and buttons
- Simple layouts

### 2. Custom React Components (`custom-components.js`)
Shows how to integrate custom React components:
- Component registration with `jcomponents`
- Passing props through `attributes`
- Using `jcontext` for data sharing
- Custom styling and interactions

### 3. Event Handlers (`event-handlers.js`)
Illustrates interactive functionality:
- Button click handlers
- Form submissions
- State management within components
- Dynamic content updates
- Toggle controls and counters

### 4. Nested Structures (`nested-structures.js`)
Demonstrates complex UI patterns:
- Collapsible sections
- Tabbed interfaces
- Tree navigation components
- Grid layouts
- Deeply nested component hierarchies

## Running the Examples

To use these examples in your own project:

1. Install JasonJS:
```bash
npm install @cm64/jasonjs
```

2. Copy any example file to your project

3. Import and use the component:
```jsx
import BasicHTMLExample from './examples/basic-html';

function App() {
  return <BasicHTMLExample />;
}
```

## Key Concepts Demonstrated

### Component Registration
```jsx
const jcomponents = {
  MyButton: ButtonComponent,
  MyCard: CardComponent
};

<JasonCraftThisJSON 
  json={jsonConfig} 
  jcomponents={jcomponents} 
/>
```

### Context Usage
```jsx
const jcontext = {
  user: { name: 'John Doe' },
  theme: 'dark'
};

<JasonCraftThisJSON 
  json={jsonConfig} 
  jcontext={jcontext} 
/>
```

### Event Handling
```jsx
const jsonConfig = {
  components: [{
    component: 'MyButton',
    attributes: {
      onClick: () => console.log('Clicked!')
    }
  }]
};
```

### Nested Components
```jsx
const jsonConfig = {
  components: [{
    component: 'div',
    components: [{
      component: 'p',
      innerHTML: 'Nested content'
    }]
  }]
};
```

## Best Practices

1. **Component Organization**: Keep custom components in separate files and import them cleanly
2. **State Management**: Use React hooks within custom components for local state
3. **Context Usage**: Leverage `jcontext` for sharing data across the component tree
4. **Event Handling**: Define event handlers in the parent component and pass them through attributes
5. **Security**: JasonJS automatically sanitizes `innerHTML` content for safety