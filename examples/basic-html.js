// Basic HTML Elements Example
import React from 'react';
import JasonCraftThisJSON from '@cm64/jasonjs';

const BasicHTMLExample = () => {
  const jsonConfig = {
    components: [
      {
        component: "div",
        attributes: { className: "container" },
        components: [
          {
            component: "h1",
            innerHTML: "Welcome to JasonJS!"
          },
          {
            component: "p",
            innerHTML: "This is a simple example using basic HTML elements."
          },
          {
            component: "ul",
            components: [
              {
                component: "li",
                innerHTML: "First item"
              },
              {
                component: "li",
                innerHTML: "Second item"
              },
              {
                component: "li",
                innerHTML: "Third item"
              }
            ]
          },
          {
            component: "form",
            attributes: { className: "contact-form" },
            components: [
              {
                component: "input",
                attributes: { 
                  type: "text",
                  placeholder: "Your name",
                  name: "name"
                }
              },
              {
                component: "input",
                attributes: { 
                  type: "email",
                  placeholder: "Your email",
                  name: "email"
                }
              },
              {
                component: "textarea",
                attributes: { 
                  placeholder: "Your message",
                  name: "message",
                  rows: 4
                }
              },
              {
                component: "button",
                attributes: { type: "submit" },
                innerHTML: "Send Message"
              }
            ]
          }
        ]
      }
    ]
  };

  return <JasonCraftThisJSON json={jsonConfig} />;
};

export default BasicHTMLExample;