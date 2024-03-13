import React, { Suspense } from 'react';
import PropTypes from 'prop-types'; // Adding PropTypes for basic type checking
import DOMPurify from 'dompurify';

// The JasonBringsComponent dynamically loads and renders components based on the passed props.
const JasonBringsComponent = ({ component: componentName, attributes, components, componentRegistry, innerHTML }) => {
  const Component = componentRegistry[componentName] || componentName;

  if (!Component) {
    console.error(`Component ${componentName} not found in registry.`);
    return null; // Or render a fallback component
  }

  const sanitizedInnerHTML = innerHTML ? DOMPurify.sanitize(innerHTML) : null;

  const nestedComponents = components?.map((c, index) => (
    <JasonBringsComponent key={index} {...c} componentRegistry={componentRegistry} />
  ));

  // if innerHTML is provided, wrap nestedComponents in a div that also includes the sanitized innerHTML
  // Otherwise, just render nestedComponents directly
  const content = sanitizedInnerHTML
    ? (<div dangerouslySetInnerHTML={{ __html: sanitizedInnerHTML }} />)
    : nestedComponents;

  return (
    <Component {...attributes}>
      {content}
    </Component>
  );
};

// Adding PropTypes for basic validation
JasonBringsComponent.propTypes = {
  component: PropTypes.string.isRequired,
  type: PropTypes.string,
  attributes: PropTypes.object,
  components: PropTypes.array,
  innerHTML: PropTypes.string,
};

const JasonCraftThisJSON = ({ json, componentRegistry = {}}) => {
  return (
    <>
      {json.components.map((component, index)  => {
        return <JasonBringsComponent key={index} componentRegistry={componentRegistry} {...component} />
      })}
    </>
  );
};

// Adding PropTypes for basic validation
JasonCraftThisJSON.propTypes = {
  json: PropTypes.shape({
    components: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  componentRegistry: PropTypes.object, // Updated to expect an object
};

export default JasonCraftThisJSON;
