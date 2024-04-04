import React, { Suspense } from 'react';
import PropTypes from 'prop-types'; // Adding PropTypes for basic type checking
import DOMPurify from 'dompurify';

// The JasonBringsComponent dynamically loads and renders components based on the passed props.
const JasonBringsComponent = ({ component: componentName, attributes, components, componentRegistry, dataContext, innerHTML }) => {
  const Component = componentRegistry[componentName] || componentName;

  if (!Component) {
    console.error(`Component ${componentName} not found in registry.`);
    return null; // Or render a fallback component
  }

  let content = null;

  if (innerHTML) {
    var sanitizedInnerHTML = innerHTML;
    if (typeof window !== 'undefined' && innerHTML) {
      sanitizedInnerHTML = DOMPurify.sanitize(innerHTML);
    }
    
    content = (
      <>
        {sanitizedInnerHTML }
        {/* Render nested components, if any */}
        {components?.map((c, index) => (
          <JasonBringsComponent key={index} {...c} componentRegistry={componentRegistry} />
        ))}
      </>
    );
  } else {
    // If no innerHTML, proceed with rendering nested components directly
    content = components?.map((c, index) => (
      <JasonBringsComponent key={index} {...c} componentRegistry={componentRegistry} />
    ));
  }

  return (
    <Component dataContext={dataContext} {...attributes}>
      {content}
    </Component>
  );
};

// Adding PropTypes for basic validation
JasonBringsComponent.propTypes = {
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  components: PropTypes.array,
  innerHTML: PropTypes.string,
};

const JasonCraftThisJSON = ({ json, componentRegistry = {}, dataContext = {}}) => {
  return (
    <>
      {json.components.map((component, index)  => {
        return <JasonBringsComponent key={index} dataContext={dataContext} componentRegistry={componentRegistry} {...component} />
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
