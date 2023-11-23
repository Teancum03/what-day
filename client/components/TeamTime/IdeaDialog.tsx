import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import '@/styles/tailwind.css'
import DisplayAuthor from '../DisplayAuthor'

interface Props {
  idea: string
  description: string
  author: string
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
        <Dialog.Description className="DialogDescription">
          {' '}
          <fieldset className="Fieldset">
            <p>{props.description}</p>
            <DisplayAuthor name={props.author} />
          </fieldset>
        </Dialog.Description>
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
