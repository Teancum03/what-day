interface Props {
  descriptor: string
  day: string
}

function PageTitle({ descriptor, day }: Props) {
  return (
    <>
      <h1 className="mb-16 mt-2 text-center font-title text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
        {descriptor + ' '}
        <span className="mb-16 mt-2 font-header text-4xl tracking-tight md:ml-2 md:text-5xl xl:text-6xl">
          {day}
        </span>
      </h1>
    </>
  )
}

export default PageTitle
