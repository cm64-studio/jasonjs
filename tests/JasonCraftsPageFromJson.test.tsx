// tests/JasonCraftsPageFromJson.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { JasonCraftsPageFromJson } from '../src';
import '@testing-library/jest-dom';
import { JPageConfig } from '../src/Jason'; // Assuming you export PageConfig from Jason.tsx

describe('JasonCraftsPageFromJson', () => {
  it('renders components based on JSON config', () => {
    const jsonConfig: JPageConfig = { // Explicitly typing jsonConfig as PageConfig
      components: [
        {
          component: 'div',
          type: 'JTag', // Ensuring type is explicitly "JTag" or "JComponent"
          attributes: { className: 'test-class' },
          components: [
            {
              component: 'span',
              type: 'JTag', // Ensuring type is explicitly "JTag"
              attributes: {},
              components: [
                {
                  component: 'textNode', // Assuming you handle textNode as a special case in your implementation
                  type: 'JTag', // "textNode" type needs to align with your ComponentBlueprint handling. If "textNode" is not a valid type, you'll need to adjust your implementation to support it or use a different approach for text content.
                  attributes: {
                    'text': 'Test Content'
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    render(<JasonCraftsPageFromJson json={jsonConfig} />);
    
    // Check if the content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
