import { FC } from 'react'
import { ThemeProvider } from '~/contexts/ThemeContext'
import { Nav, Text, Form } from '@components'
import '~/styles/App.scss'

const App: FC = () => {
  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
  };

  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      helperText: "We'll never share your email"
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    }
  ];

  return (
    <ThemeProvider>
      <div className="app">
        <Nav />
        <main className="main-content">
          <div className="form-demo">
            <Text as="h1" variant="display" size="3xl" weight="bold" className="demo-title">
              Form Component Demo
            </Text>

            <div className="demo-section">
              <Text variant="display" size="xl" weight="semibold" className="section-title">
                Sign Up Form
              </Text>
              
              <div className="form-example">
                <Form
                  fields={fields}
                  onSubmit={handleSubmit}
                  title="Create an Account"
                  description="Fill in your details to get started"
                  submitText="Sign Up"
                  variant="outlined"
                  size="md"
                />
              </div>
            </div>

            <div className="demo-section">
              <Text variant="display" size="xl" weight="semibold" className="section-title">
                Form Variants
              </Text>
              
              {/* Filled Variant */}
              <div className="form-example">
                <Form
                  fields={fields.slice(0, 2)} // Just username and email
                  onSubmit={handleSubmit}
                  title="Newsletter Signup"
                  description="Stay updated with our latest news"
                  submitText="Subscribe"
                  variant="filled"
                  size="sm"
                  submitButtonVariant="secondary"
                />
              </div>

              {/* Loading State */}
              <div className="form-example">
                <Form
                  fields={[
                    {
                      name: 'feedback',
                      label: 'Feedback',
                      type: 'text',
                      placeholder: 'Tell us what you think',
                      required: true
                    }
                  ]}
                  onSubmit={handleSubmit}
                  title="Quick Feedback"
                  submitText="Send Feedback"
                  variant="outlined"
                  size="lg"
                  submitButtonVariant="success"
                  isLoading={false}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App