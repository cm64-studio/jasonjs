// Event Handlers Example
import React, { useState } from 'react';
import JasonCraftThisJSON from '@cm64/jasonjs';

// Interactive Counter Component
const Counter = ({ initialValue = 0, jcontext }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Counter: {count}</h3>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Increment
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Decrement
      </button>
      <button 
        onClick={() => setCount(initialValue)}
        style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Reset
      </button>
    </div>
  );
};

// Interactive Form Component
const DynamicForm = ({ onSubmit, jcontext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
        <textarea
          value={formData.message}
          onChange={handleChange('message')}
          rows={4}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <button 
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Submit
      </button>
    </form>
  );
};

// Toggle Component
const Toggle = ({ label, onChange, jcontext }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <span style={{ marginRight: '10px' }}>{label}:</span>
      <button
        onClick={handleToggle}
        style={{
          padding: '5px 10px',
          backgroundColor: isOn ? '#28a745' : '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

const EventHandlersExample = () => {
  const [notifications, setNotifications] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState([]);

  // Custom components registry
  const jcomponents = {
    Counter,
    DynamicForm,
    Toggle
  };

  // Event handlers
  const handleFormSubmit = (formData) => {
    setFormSubmissions(prev => [...prev, { ...formData, timestamp: new Date().toLocaleTimeString() }]);
    setNotifications(prev => [...prev, `Form submitted by ${formData.name || 'Anonymous'}`]);
  };

  const handleToggleChange = (label) => (value) => {
    setNotifications(prev => [...prev, `${label} toggled ${value ? 'ON' : 'OFF'}`]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const clearSubmissions = () => {
    setFormSubmissions([]);
  };

  const jsonConfig = {
    components: [
      {
        component: "div",
        attributes: { style: { maxWidth: '800px', margin: '0 auto', padding: '20px' } },
        components: [
          {
            component: "h1",
            innerHTML: "Event Handlers Example"
          },
          {
            component: "div",
            attributes: { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' } },
            components: [
              {
                component: "div",
                components: [
                  {
                    component: "h2",
                    innerHTML: "Interactive Counter"
                  },
                  {
                    component: "Counter",
                    attributes: { initialValue: 10 }
                  }
                ]
              },
              {
                component: "div",
                components: [
                  {
                    component: "h2",
                    innerHTML: "Toggle Controls"
                  },
                  {
                    component: "Toggle",
                    attributes: { 
                      label: "Dark Mode",
                      onChange: handleToggleChange('Dark Mode')
                    }
                  },
                  {
                    component: "Toggle",
                    attributes: { 
                      label: "Notifications",
                      onChange: handleToggleChange('Notifications')
                    }
                  },
                  {
                    component: "Toggle",
                    attributes: { 
                      label: "Auto Save",
                      onChange: handleToggleChange('Auto Save')
                    }
                  }
                ]
              }
            ]
          },
          {
            component: "h2",
            innerHTML: "Dynamic Form"
          },
          {
            component: "DynamicForm",
            attributes: { onSubmit: handleFormSubmit }
          },
          notifications.length > 0 && {
            component: "div",
            attributes: { style: { marginTop: '20px' } },
            components: [
              {
                component: "div",
                attributes: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                components: [
                  {
                    component: "h3",
                    innerHTML: "Notifications"
                  },
                  {
                    component: "button",
                    attributes: { 
                      onClick: clearNotifications,
                      style: { padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }
                    },
                    innerHTML: "Clear"
                  }
                ]
              },
              {
                component: "ul",
                attributes: { style: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' } },
                components: notifications.map((notification, index) => ({
                  component: "li",
                  attributes: { key: index },
                  innerHTML: notification
                }))
              }
            ]
          },
          formSubmissions.length > 0 && {
            component: "div",
            attributes: { style: { marginTop: '20px' } },
            components: [
              {
                component: "div",
                attributes: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                components: [
                  {
                    component: "h3",
                    innerHTML: "Form Submissions"
                  },
                  {
                    component: "button",
                    attributes: { 
                      onClick: clearSubmissions,
                      style: { padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }
                    },
                    innerHTML: "Clear"
                  }
                ]
              },
              {
                component: "div",
                attributes: { style: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' } },
                components: formSubmissions.map((submission, index) => ({
                  component: "div",
                  attributes: { 
                    key: index,
                    style: { marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }
                  },
                  components: [
                    {
                      component: "strong",
                      innerHTML: `Submission ${index + 1} (${submission.timestamp})`
                    },
                    {
                      component: "p",
                      innerHTML: `Name: ${submission.name}`
                    },
                    {
                      component: "p",
                      innerHTML: `Email: ${submission.email}`
                    },
                    {
                      component: "p",
                      innerHTML: `Message: ${submission.message}`
                    }
                  ]
                }))
              }
            ]
          }
        ].filter(Boolean)
      }
    ]
  };

  return <JasonCraftThisJSON json={jsonConfig} jcomponents={jcomponents} />;
};

export default EventHandlersExample;