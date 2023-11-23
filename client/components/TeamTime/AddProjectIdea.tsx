import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'
// import './styles.css'; Add new css file??
import '@/styles/tailwind.css'
import { TeamTime } from '@models/teamTime'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addIdea } from '@/apis/teamTimeApi'

const initialFormData = {
  idea: '',
  description: '',
  author: '',
}

const AddProjectIdea = () => {
  const [form, setForm] = useState<TeamTime>(initialFormData as TeamTime)

  const queryClient = useQueryClient()

  const addIdeaMutation = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
    },
  })

  function handlesubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addIdeaMutation.mutate(form)
    setForm(initialFormData as TeamTime)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Form.Root onSubmit={handlesubmit} className="FormRoot">
      <Form.Field onChange={handleChange} className="FormField" name="email">
        <div // add handle change to others!!! or figure this out
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
}

export default AddProjectIdea
