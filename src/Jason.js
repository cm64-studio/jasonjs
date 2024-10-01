import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const JasonBringsComponent = ({ 
  component: componentName, 
  attributes, 
  components, 
  jcomponents, 
  jcontext, 
  innerHTML,
  renderComponent // New prop for custom rendering
}) => {
  const Component = jcomponents[componentName] || componentName;

  if (!Component) {
    console.error(`Component ${componentName} not found in registry.`);
    return null;
  }

  let content = null;

  if (innerHTML) {
    var sanitizedInnerHTML = innerHTML;
    if (typeof window !== 'undefined' && innerHTML) {
      sanitizedInnerHTML = DOMPurify.sanitize(innerHTML);
    }
    
    content = (
      <>
        {sanitizedInnerHTML}
        {components?.map((c, index) => (
          <JasonBringsComponent 
            key={index} 
            {...c} 
            jcomponents={jcomponents} 
            jcontext={jcontext}
            renderComponent={renderComponent}
          />
        ))}
      </>
    );
  } else {
    content = components?.map((c, index) => (
      <JasonBringsComponent 
        key={index} 
        {...c} 
        jcomponents={jcomponents} 
        jcontext={jcontext}
        renderComponent={renderComponent}
      />
    ));
  }

  // Use the custom renderComponent function if provided
  if (renderComponent && typeof Component === 'function') {
    return renderComponent({
      Component,
      props: { ...attributes, jcontext },
      content,
      componentName
    });
  }

  return (
    <Component jcontext={jcontext} {...attributes}>
      {content}
    </Component>
  );
};

JasonBringsComponent.propTypes = {
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  components: PropTypes.array,
  innerHTML: PropTypes.string,
  renderComponent: PropTypes.func, // New PropType for renderComponent
};

const JasonCraftThisJSON = ({ 
  json, 
  jcomponents = {}, 
  jcontext = {},
  renderComponent // New prop for custom rendering
}) => {
  return (
    <>
      {json.components.map((component, index) => (
        <JasonBringsComponent 
          key={index} 
          jcontext={jcontext} 
          jcomponents={jcomponents} 
          renderComponent={renderComponent}
          {...component} 
        />
      ))}
    </>
  );
};

JasonCraftThisJSON.propTypes = {
  json: PropTypes.shape({
    components: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  jcomponents: PropTypes.object,
  jcontext: PropTypes.object,
  renderComponent: PropTypes.func, // New PropType for renderComponent
};

export default JasonCraftThisJSON;