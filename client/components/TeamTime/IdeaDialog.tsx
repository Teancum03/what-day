import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { getIdeas } from '@/apis/teamTimeApi'
import '@/styles/tailwind.css'

interface Props {
  idea: string
  description: string
}
const IdeaDialog = (props: Props) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="ButtonIdea violet"> {props.idea} </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">{props.idea}</Dialog.Title>
        <Dialog.Description className="DialogDescription"></Dialog.Description>
        <fieldset className="Fieldset">
          <p>{props.description}</p>
        </fieldset>
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        ></div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default IdeaDialog
