// tests/JasonCraftThisJSON.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import JasonCraftThisJSON, { JasonJSON } from '../src/Jason';
import '@testing-library/jest-dom';

describe('JasonCraftThisJSON', () => {
  it('renders components based on JSON config', () => {
    const jsonConfig: JasonJSON = {
      components: [
        {
          component: 'div',
          type: 'JTag',
          attributes: { className: 'test-class' },
          components: [
            {
              component: 'span',
              type: 'JTag',
              attributes: {},
              innerHTML: 'Test Content'
            }
          ]
        }
      ]
    };

    render(<JasonCraftThisJSON json={jsonConfig} />);

    expect(screen.getByText('Test Content')).toBeInTheDocument();


  });
});
