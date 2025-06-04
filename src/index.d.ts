import React from 'react';

export interface ComponentConfig {
  component: string;
  attributes?: Record<string, any>;
  innerHTML?: string;
  components?: ComponentConfig[];
}

export interface JSONConfig {
  components: ComponentConfig[];
}

export interface RenderComponentParams {
  Component: React.ComponentType<any> | string;
  props: Record<string, any>;
  content: React.ReactNode;
  componentName: string;
}

export interface JasonBringsComponentProps {
  component: string;
  attributes?: Record<string, any>;
  innerHTML?: string;
  components?: ComponentConfig[];
  jcomponents?: Record<string, React.ComponentType<any>>;
  jcontext?: Record<string, any>;
  renderComponent?: (params: RenderComponentParams) => React.ReactNode;
}

export interface JasonCraftThisJSONProps {
  json: JSONConfig;
  jcomponents?: Record<string, React.ComponentType<any>>;
  jcontext?: Record<string, any>;
  renderComponent?: (params: RenderComponentParams) => React.ReactNode;
}

export declare const JasonBringsComponent: React.FC<JasonBringsComponentProps>;

declare const JasonCraftThisJSON: React.FC<JasonCraftThisJSONProps>;

export default JasonCraftThisJSON;