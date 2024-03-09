import React, { Suspense } from 'react';

// Define interfaces for clarity and type safety
export interface JComponentBlueprint {
  component: string;
  type: 'JComponent' | 'JTag';
  basePath?: string;
  attributes?: any;
  components?: JComponentBlueprint[]; // Allows for recursive component structures
}

export interface JPageConfig {
  components: JComponentBlueprint[];
}

// Helper function for dynamically loading components
const loadComponent = (componentName: string, basePath: string) => {
  return React.lazy(() => import(`../../jason/${componentName}`)
    .catch(() => {
      console.error(`Failed to load component: ${componentName}`);
      return { default: () => <div>Component not found</div> }
    }));
};

const JasonBringsComponent = (blueprint: JComponentBlueprint) => {
  if (blueprint.type === "JComponent") {
    const Component = loadComponent(blueprint.component, blueprint.basePath ? blueprint.basePath : "../../jason/");
    // Directly pass nested components if any
    const nestedComponents = blueprint.components?.map((c, index) => <JasonBringsComponent key={index} {...c} />);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...blueprint.attributes} components={nestedComponents} />
      </Suspense>
    );
  } else { // Handle JTag or default case
    const Tag = blueprint.component as keyof JSX.IntrinsicElements;
    return (
      <Tag {...blueprint.attributes}>
        {blueprint.components?.map((c, index) => <JasonBringsComponent key={index} {...c} />)}
      </Tag>
    );
  }
};

// Main function to craft pages from JSON
const JasonCraftsPageFromJson = ({ json }: { json: JPageConfig }) => {
  return (
    <>
      {json.components.map((component, index) => (
        <JasonBringsComponent key={index} {...component} />
      ))}
    </>
  );
};

export default JasonCraftsPageFromJson;
