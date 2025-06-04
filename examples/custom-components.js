// Custom React Components Example
import React, { useState } from 'react';
import JasonCraftThisJSON from '@cm64/jasonjs';

// Custom Button Component
const Button = ({ children, onClick, variant = 'primary', disabled = false, jcontext }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant}`}
    style={{
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
      color: 'white'
    }}
  >
    {children}
  </button>
);

// Custom Card Component
const Card = ({ title, children, jcontext }) => (
  <div 
    className="card"
    style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}
  >
    {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
    <div className="card-content">{children}</div>
  </div>
);

// Custom Alert Component
const Alert = ({ type = 'info', children, jcontext }) => {
  const colors = {
    info: '#d1ecf1',
    success: '#d4edda',
    warning: '#fff3cd',
    error: '#f8d7da'
  };

  return (
    <div 
      className={`alert alert-${type}`}
      style={{
        padding: '15px',
        marginBottom: '20px',
        border: '1px solid transparent',
        borderRadius: '4px',
        backgroundColor: colors[type]
      }}
    >
      {children}
    </div>
  );
};

// Custom User Profile Component
const UserProfile = ({ jcontext }) => {
  const user = jcontext?.user || {};
  
  return (
    <div 
      className="user-profile"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}
    >
      <div 
        className="avatar"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px'
        }}
      >
        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{user.name || 'Unknown User'}</div>
        <div style={{ fontSize: '0.9em', color: '#6c757d' }}>{user.email || 'No email'}</div>
      </div>
    </div>
  );
};

const CustomComponentsExample = () => {
  const [message, setMessage] = useState('');

  // Register our custom components
  const jcomponents = {
    Button,
    Card,
    Alert,
    UserProfile
  };

  // Context data to share across components
  const jcontext = {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    theme: 'light'
  };

  const handleButtonClick = (buttonType) => {
    setMessage(`You clicked the ${buttonType} button!`);
  };

  const jsonConfig = {
    components: [
      {
        component: "div",
        attributes: { className: "app" },
        components: [
          {
            component: "Card",
            attributes: { title: "User Dashboard" },
            components: [
              {
                component: "UserProfile"
              },
              {
                component: "Alert",
                attributes: { type: "info" },
                innerHTML: "Welcome to your dashboard! Here you can manage your account and preferences."
              }
            ]
          },
          {
            component: "Card",
            attributes: { title: "Actions" },
            components: [
              {
                component: "Button",
                attributes: { 
                  variant: "primary",
                  onClick: () => handleButtonClick('Primary')
                },
                innerHTML: "Primary Action"
              },
              {
                component: "div",
                attributes: { style: { margin: '10px 0' } }
              },
              {
                component: "Button",
                attributes: { 
                  variant: "secondary",
                  onClick: () => handleButtonClick('Secondary')
                },
                innerHTML: "Secondary Action"
              },
              {
                component: "div",
                attributes: { style: { margin: '10px 0' } }
              },
              {
                component: "Button",
                attributes: { 
                  variant: "primary",
                  disabled: true
                },
                innerHTML: "Disabled Button"
              }
            ]
          },
          message && {
            component: "Alert",
            attributes: { type: "success" },
            innerHTML: message
          }
        ].filter(Boolean)
      }
    ]
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Custom Components Example</h1>
      <JasonCraftThisJSON 
        json={jsonConfig} 
        jcomponents={jcomponents}
        jcontext={jcontext}
      />
    </div>
  );
};

export default CustomComponentsExample;