import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'
// import './styles.css'; Add new css file??
import '@/styles/tailwind.css'
import { TeamTime } from '@models/teamTime'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addIdea } from '@/apis/teamTimeApi'
import { User } from '@models/user'

const initialFormData = {
  idea: '',
  description: '',
  author: '',
}

const AddProjectIdea = ({ user }: { user: User }) => {
  const [form, setForm] = useState<TeamTime>(initialFormData as TeamTime)

  const queryClient = useQueryClient()

  const addIdeaMutation = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
    },
  })

  function handlesubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    addIdeaMutation.mutate({ ...form, author: user.longName })
    setForm(initialFormData as TeamTime)
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField" name="idea">
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
          <input
            className="Input"
            name="idea"
            onChange={handleChange}
            value={form.idea}
            type="text"
            required
          />
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
          <textarea
            className="Textarea"
            name="description"
            onChange={handleChange}
            value={form.description}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className="Button"
          onClick={handlesubmit}
          type="submit"
          style={{ marginTop: 10 }}
        >
          Submit
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

export default AddProjectIdea
