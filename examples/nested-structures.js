// Nested Structures Example
import React, { useState } from 'react';
import JasonCraftThisJSON from '@cm64/jasonjs';

// Collapsible Section Component
const CollapsibleSection = ({ title, children, defaultOpen = false, jcontext }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span style={{ fontSize: '18px' }}>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div style={{ padding: '15px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Tab Component
const Tabs = ({ children, jcontext }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Extract tab data from children structure
  const tabs = React.Children.toArray(children).filter(child => 
    React.isValidElement(child) && child.props.tabTitle
  );

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '15px 20px',
              border: 'none',
              backgroundColor: activeTab === index ? '#007bff' : 'transparent',
              color: activeTab === index ? 'white' : '#333',
              cursor: 'pointer',
              borderBottom: activeTab === index ? '2px solid #007bff' : 'none'
            }}
          >
            {tab.props.tabTitle}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px' }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
};

// Tab Panel Component
const TabPanel = ({ tabTitle, children, jcontext }) => (
  <div>{children}</div>
);

// Navigation Tree Component
const TreeNode = ({ label, children, jcontext }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && React.Children.count(children) > 0;

  return (
    <div style={{ marginLeft: '20px' }}>
      <div 
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        style={{ 
          cursor: hasChildren ? 'pointer' : 'default',
          padding: '5px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {hasChildren && (
          <span style={{ marginRight: '5px', width: '15px' }}>
            {isExpanded ? '−' : '+'}
          </span>
        )}
        {!hasChildren && <span style={{ marginRight: '5px', width: '15px' }}>•</span>}
        <span>{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div style={{ marginLeft: '15px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Card Grid Component
const CardGrid = ({ columns = 3, children, jcontext }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(${columns}, 1fr)`, 
    gap: '20px',
    margin: '20px 0'
  }}>
    {children}
  </div>
);

// Product Card Component
const ProductCard = ({ name, price, image, description, jcontext }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    {image && (
      <div style={{
        height: '150px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        {image || 'Product Image'}
      </div>
    )}
    <div style={{ padding: '15px' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>{name}</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{description}</p>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>{price}</div>
    </div>
  </div>
);

const NestedStructuresExample = () => {
  const jcomponents = {
    CollapsibleSection,
    Tabs,
    TabPanel,
    TreeNode,
    CardGrid,
    ProductCard
  };

  const jsonConfig = {
    components: [
      {
        component: "div",
        attributes: { style: { maxWidth: '1000px', margin: '0 auto', padding: '20px' } },
        components: [
          {
            component: "h1",
            innerHTML: "Nested Structures Example"
          },
          
          // Collapsible Sections
          {
            component: "h2",
            innerHTML: "Collapsible Sections"
          },
          {
            component: "CollapsibleSection",
            attributes: { title: "Getting Started", defaultOpen: true },
            components: [
              {
                component: "p",
                innerHTML: "This section contains information about getting started with JasonJS."
              },
              {
                component: "ul",
                components: [
                  {
                    component: "li",
                    innerHTML: "Install the package via npm"
                  },
                  {
                    component: "li",
                    innerHTML: "Import JasonCraftThisJSON in your project"
                  },
                  {
                    component: "li",
                    innerHTML: "Create your JSON configuration"
                  }
                ]
              }
            ]
          },
          {
            component: "CollapsibleSection",
            attributes: { title: "Advanced Features" },
            components: [
              {
                component: "p",
                innerHTML: "Learn about advanced features like custom components and context."
              },
              {
                component: "CollapsibleSection",
                attributes: { title: "Custom Components" },
                components: [
                  {
                    component: "p",
                    innerHTML: "You can register your own React components and use them in JSON configurations."
                  }
                ]
              },
              {
                component: "CollapsibleSection",
                attributes: { title: "Context System" },
                components: [
                  {
                    component: "p",
                    innerHTML: "The jcontext prop allows you to share data across your component tree."
                  }
                ]
              }
            ]
          },

          // Tabs
          {
            component: "h2",
            innerHTML: "Tabbed Interface",
            attributes: { style: { marginTop: '40px' } }
          },
          {
            component: "Tabs",
            components: [
              {
                component: "TabPanel",
                attributes: { tabTitle: "Overview" },
                components: [
                  {
                    component: "h3",
                    innerHTML: "Project Overview"
                  },
                  {
                    component: "p",
                    innerHTML: "JasonJS is a powerful library for creating dynamic React UIs from JSON configuration. It supports nested structures, custom components, and event handling."
                  }
                ]
              },
              {
                component: "TabPanel",
                attributes: { tabTitle: "Features" },
                components: [
                  {
                    component: "h3",
                    innerHTML: "Key Features"
                  },
                  {
                    component: "ul",
                    components: [
                      {
                        component: "li",
                        innerHTML: "Dynamic component rendering from JSON"
                      },
                      {
                        component: "li",
                        innerHTML: "Custom React component registration"
                      },
                      {
                        component: "li",
                        innerHTML: "Context-based data sharing"
                      },
                      {
                        component: "li",
                        innerHTML: "HTML sanitization for security"
                      },
                      {
                        component: "li",
                        innerHTML: "Custom render function support"
                      }
                    ]
                  }
                ]
              },
              {
                component: "TabPanel",
                attributes: { tabTitle: "Documentation" },
                components: [
                  {
                    component: "h3",
                    innerHTML: "Documentation Links"
                  },
                  {
                    component: "p",
                    innerHTML: "Find comprehensive documentation and examples in the following resources:"
                  },
                  {
                    component: "ul",
                    components: [
                      {
                        component: "li",
                        innerHTML: "API Reference"
                      },
                      {
                        component: "li",
                        innerHTML: "Component Examples"
                      },
                      {
                        component: "li",
                        innerHTML: "Best Practices Guide"
                      }
                    ]
                  }
                ]
              }
            ]
          },

          // Tree Navigation
          {
            component: "h2",
            innerHTML: "Navigation Tree",
            attributes: { style: { marginTop: '40px' } }
          },
          {
            component: "div",
            attributes: { style: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' } },
            components: [
              {
                component: "TreeNode",
                attributes: { label: "Project Root" },
                components: [
                  {
                    component: "TreeNode",
                    attributes: { label: "src" },
                    components: [
                      {
                        component: "TreeNode",
                        attributes: { label: "components" },
                        components: [
                          {
                            component: "TreeNode",
                            attributes: { label: "Button.js" }
                          },
                          {
                            component: "TreeNode",
                            attributes: { label: "Card.js" }
                          },
                          {
                            component: "TreeNode",
                            attributes: { label: "Navigation.js" }
                          }
                        ]
                      },
                      {
                        component: "TreeNode",
                        attributes: { label: "utils" },
                        components: [
                          {
                            component: "TreeNode",
                            attributes: { label: "helpers.js" }
                          },
                          {
                            component: "TreeNode",
                            attributes: { label: "constants.js" }
                          }
                        ]
                      },
                      {
                        component: "TreeNode",
                        attributes: { label: "index.js" }
                      }
                    ]
                  },
                  {
                    component: "TreeNode",
                    attributes: { label: "public" },
                    components: [
                      {
                        component: "TreeNode",
                        attributes: { label: "index.html" }
                      },
                      {
                        component: "TreeNode",
                        attributes: { label: "favicon.ico" }
                      }
                    ]
                  },
                  {
                    component: "TreeNode",
                    attributes: { label: "package.json" }
                  },
                  {
                    component: "TreeNode",
                    attributes: { label: "README.md" }
                  }
                ]
              }
            ]
          },

          // Product Grid
          {
            component: "h2",
            innerHTML: "Product Grid",
            attributes: { style: { marginTop: '40px' } }
          },
          {
            component: "CardGrid",
            attributes: { columns: 3 },
            components: [
              {
                component: "ProductCard",
                attributes: {
                  name: "Premium Package",
                  price: "$29.99",
                  image: "Premium Image",
                  description: "Everything you need to get started with advanced features."
                }
              },
              {
                component: "ProductCard",
                attributes: {
                  name: "Standard Package",
                  price: "$19.99",
                  image: "Standard Image",
                  description: "Perfect for small to medium projects with essential features."
                }
              },
              {
                component: "ProductCard",
                attributes: {
                  name: "Basic Package",
                  price: "$9.99",
                  image: "Basic Image",
                  description: "Great for getting started with basic functionality."
                }
              },
              {
                component: "ProductCard",
                attributes: {
                  name: "Enterprise Package",
                  price: "$99.99",
                  image: "Enterprise Image",
                  description: "Full-featured solution for large-scale applications."
                }
              },
              {
                component: "ProductCard",
                attributes: {
                  name: "Developer Package",
                  price: "$49.99",
                  image: "Developer Image",
                  description: "Specialized tools and features for developers."
                }
              },
              {
                component: "ProductCard",
                attributes: {
                  name: "Starter Package",
                  price: "$4.99",
                  image: "Starter Image",
                  description: "Perfect introduction to our platform with core features."
                }
              }
            ]
          }
        ]
      }
    ]
  };

  return <JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} />;
};

export default NestedStructuresExample;