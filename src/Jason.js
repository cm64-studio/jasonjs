import React, { Suspense } from 'react';
import PropTypes from 'prop-types'; // Adding PropTypes for basic type checking

// Sanitization function to prevent XSS in innerHTML
const sanitizeInnerHTML = (htmlContent) => {
  // Simple example: you might want to replace this with a more robust sanitization logic
  return htmlContent.replace(/<script.*?>.*?<\/script>/gi, '');
};

// The JasonBringsComponent dynamically loads and renders components based on the passed props.
const JasonBringsComponent = ({ component, type, basePath, attributes, components, innerHTML }) => {
  if (type === "JComponent") {
    const DynamicComponent = React.lazy(async () => {
      const module = await import(`${basePath}${component}`);
      return { default: module.default };
    });

    const nestedComponents = components?.map((c, index) => <JasonBringsComponent key={index} {...c} />);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent {...attributes}>
          {nestedComponents}
        </DynamicComponent>
      </Suspense>
    );
  } else {
    const Tag = component;
    const childElements = components?.map((c, index) => <JasonBringsComponent key={index} {...c} />);

    return (
      <Tag {...attributes}>
        {innerHTML ? <div dangerouslySetInnerHTML={{ __html: sanitizeInnerHTML(innerHTML) }} /> : childElements}
      </Tag>
    );
  }
};

// Adding PropTypes for basic validation
JasonBringsComponent.propTypes = {
  component: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  basePath: PropTypes.string,
  attributes: PropTypes.object,
  components: PropTypes.array,
  innerHTML: PropTypes.string,
};

const JasonCraftThisJSON = ({ json, basePath  = process.env.NEXT_PUBLIC_JASON_BASE_PATH || '/jason/'  }) => {
  return (
    <>
      {json.components.map((component, index) => (
        <JasonBringsComponent key={index} basePath={basePath} {...component} />
      ))}
    </>
  );
};

// Adding PropTypes for basic validation
JasonCraftThisJSON.propTypes = {
  json: PropTypes.shape({
    components: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default JasonCraftThisJSON;
