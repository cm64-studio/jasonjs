// tests/JasonCraftThisJSON.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import JasonCraftThisJSON from '../src/Jason';
import '@testing-library/jest-dom';

describe('JasonCraftThisJSON', () => {
  it('renders components based on JSON config', () => {
    const jsonConfig = {
      components: [
        {
          component: 'div',
          attributes: { className: 'test-class' },
          components: [
            {
              component: 'span',
              attributes: {},
              innerHTML: 'Test Content'
            }
          ]
        }
      ]
    };

    const testDataContext = {
      params: 'Test Title',
      data: [{
        title: 'Test Content'
        
      }]
    };

    render(<JasonCraftThisJSON json={jsonConfig} jcontext={testDataContext} jcomponents={{}}/>);

    expect(screen.getByText('Test Content')).toBeInTheDocument();


  });
});
