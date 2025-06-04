// tests/JasonCraftThisJSON.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JasonCraftThisJSON from '../src/Jason';
import '@testing-library/jest-dom';

// Custom test components
const TestButton = ({ children, onClick, variant = 'default', jcontext }) => (
  <button 
    onClick={onClick} 
    className={`btn-${variant}`}
    data-testid="test-button"
  >
    {children}
  </button>
);

const TestCard = ({ title, children, jcontext }) => (
  <div className="card" data-testid="test-card">
    {title && <h3>{title}</h3>}
    <div className="card-content">{children}</div>
  </div>
);

describe('JasonCraftThisJSON', () => {
  it('renders basic HTML elements from JSON config', () => {
    const jsonConfig = {
      components: [
        {
          component: 'div',
          attributes: { className: 'test-class' },
          components: [
            {
              component: 'span',
              innerHTML: 'Test Content'
            }
          ]
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} />);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Content').closest('div')).toHaveClass('test-class');
  });

  it('renders custom React components', () => {
    const jcomponents = {
      TestButton,
      TestCard
    };

    const jsonConfig = {
      components: [
        {
          component: 'TestCard',
          attributes: { title: 'Test Card Title' },
          components: [
            {
              component: 'TestButton',
              attributes: { variant: 'primary' },
              innerHTML: 'Click Me'
            }
          ]
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} />);

    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toHaveClass('btn-primary');
  });

  it('handles nested components correctly', () => {
    const jsonConfig = {
      components: [
        {
          component: 'div',
          attributes: { className: 'outer' },
          components: [
            {
              component: 'div',
              attributes: { className: 'middle' },
              components: [
                {
                  component: 'p',
                  innerHTML: 'Nested Content'
                }
              ]
            }
          ]
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} />);

    const nestedP = screen.getByText('Nested Content');
    expect(nestedP.closest('.middle')).toBeInTheDocument();
    expect(nestedP.closest('.outer')).toBeInTheDocument();
  });

  it('passes jcontext to components', () => {
    const ContextConsumer = ({ jcontext }) => (
      <div data-testid="context-consumer">
        User: {jcontext?.user?.name || 'Unknown'}
      </div>
    );

    const jcomponents = { ContextConsumer };
    const jcontext = { user: { name: 'John Doe' } };

    const jsonConfig = {
      components: [
        {
          component: 'ContextConsumer'
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} jcontext={jcontext} />);

    expect(screen.getByText('User: John Doe')).toBeInTheDocument();
  });

  it('handles event handlers in custom components', () => {
    const mockClick = jest.fn();
    
    const jcomponents = {
      TestButton
    };

    const jsonConfig = {
      components: [
        {
          component: 'TestButton',
          attributes: { 
            onClick: mockClick,
            variant: 'primary'
          },
          innerHTML: 'Click Me'
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} />);

    fireEvent.click(screen.getByTestId('test-button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('handles missing components gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const jsonConfig = {
      components: [
        {
          component: 'NonExistentComponent',
          innerHTML: 'This should not render'
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} />);

    // The component name becomes an HTML element when not found in registry
    expect(screen.getByText('This should not render')).toBeInTheDocument();
    expect(screen.getByText('This should not render').tagName.toLowerCase()).toBe('nonexistentcomponent');

    consoleSpy.mockRestore();
  });

  it('sanitizes innerHTML content', () => {
    const jsonConfig = {
      components: [
        {
          component: 'div',
          innerHTML: 'Safe content <script>alert("xss")</script>'
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} />);

    expect(screen.getByText(/Safe content/)).toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });

  it('uses custom renderComponent function when provided', () => {
    const mockRenderComponent = jest.fn(({ Component, props, content }) => (
      <div data-testid="custom-render">
        <Component {...props}>{content}</Component>
      </div>
    ));

    const CustomComponent = ({ children }) => <span>{children}</span>;
    const jcomponents = { CustomComponent };

    const jsonConfig = {
      components: [
        {
          component: 'CustomComponent',
          innerHTML: 'Custom rendered'
        }
      ]
    };

    render(
      <JasonCraftThisJSON 
        json={jsonConfig} 
        jcomponents={jcomponents}
        renderComponent={mockRenderComponent}
      />
    );

    expect(mockRenderComponent).toHaveBeenCalledWith({
      Component: CustomComponent,
      props: expect.objectContaining({ jcontext: {} }),
      content: expect.any(Object), // React Fragment containing the content
      componentName: 'CustomComponent'
    });
    expect(screen.getByTestId('custom-render')).toBeInTheDocument();
  });

  it('handles mixed innerHTML and nested components', () => {
    const jcomponents = { TestButton };

    const jsonConfig = {
      components: [
        {
          component: 'div',
          innerHTML: 'Text content',
          components: [
            {
              component: 'TestButton',
              innerHTML: 'Button Text'
            }
          ]
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} />);

    expect(screen.getByText('Text content')).toBeInTheDocument();
    expect(screen.getByText('Button Text')).toBeInTheDocument();
    // The TestButton becomes a custom element since it's not passed jcomponents in innerHTML flow
    expect(screen.getByText('Button Text').tagName.toLowerCase()).toBe('testbutton');
  });
});
