import React from 'react'
import * as Form from '@radix-ui/react-form'
// import './styles.css'; Add new css file??
import '@/styles/tailwind.css'

const AddProjectIdea = () => (
  <Form.Root className="FormRoot">
    <Form.Field className="FormField" name="email">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Form.Label className="FormLabel">Idea:</Form.Label>
             </div>
      <Form.Control asChild>
        <input className="Input" type="email" required />
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="question">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Form.Label className="FormLabel">Description:</Form.Label>
      </div>
      <Form.Control asChild>
        <textarea className="Textarea" required />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className="Button" style={{ marginTop: 10 }}>
        Submit
      </button>
    </Form.Submit>
  </Form.Root>
)

export default AddProjectIdea
