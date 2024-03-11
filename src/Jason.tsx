import React, { Suspense, ReactNode } from 'react';

// Define interfaces for clarity and type safety
export interface JComponentBlueprint {
  component: string;
  type: 'JComponent' | 'JTag';
  basePath?: string;
  attributes?: any;
  components?: JComponentBlueprint[]; // Allows for recursive component structures
  innerHTML?: string; // Add innerHTML to the interface
}

export interface JPageConfig {
  components: JComponentBlueprint[];
}

// Helper function for dynamically loading components
const loadComponent = (componentName: string, basePath: string) => {
  return React.lazy(() => import(`${basePath}${componentName}`)
    .catch(() => {
      console.error(`Failed to load component: ${componentName}`);
      return { default: () => <div>Component not found</div> }
    }));
};

const JasonBringsComponent = ({ component, type, attributes, components, innerHTML }: JComponentBlueprint): ReactNode => {
  // Handling JComponent type with dynamic loading
  if (type === "JComponent") {
    const Component = loadComponent(component,"../../jason/");
    const nestedComponents = components?.map((c, index) => <JasonBringsComponent key={index} {...c} />);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...attributes} components={nestedComponents} />
      </Suspense>
    );
  } 
  // Handling JTag or default case with potential innerHTML
  else {
    const Tag = component as keyof JSX.IntrinsicElements;
    const childElements = components?.map((c, index) => <JasonBringsComponent key={index} {...c} />);

    // Checking for innerHTML attribute to directly render HTML content or render nested components
    return (
      <Tag {...attributes}>
        {innerHTML ? <div dangerouslySetInnerHTML={{ __html: innerHTML }} /> : childElements}
      </Tag>
    );
  }
};

// Main function to craft pages from JSON
const JasonCraftThisJSON = ({ json }: { json: JPageConfig }) => {
  return (
    <>
      {json.components.map((component, index) => (
        <JasonBringsComponent key={index} {...component} />
      ))}
    </>
  );
};

export default JasonCraftThisJSON;
