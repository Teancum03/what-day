import '@radix-ui/themes/styles.css'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import React, { Ref } from 'react'
import classNames from 'classnames'

import additionalTipsData from '@/data/additionalTipsData'

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: AccordionProps,
    forwardedRef: Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: AccordionProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={classNames('AccordionContent', className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
)

AccordionContent.displayName = 'AccordionContent'

export function AdditionalTips() {
  if (!additionalTipsData) {
    return <div>Loading...</div>
  }

  return (
    <div className="m-auto xl:w-3/4">
      <Accordion.Root
        className="AccordionRoot"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <AccordionTrigger>Additional Tips</AccordionTrigger>
          <AccordionContent>
            {Object.keys(additionalTipsData).map((key, index) => (
              <div key={index} className="mb-8">
                <h1 className="mb-8 mt-2 text-center font-title text-xl font-bold tracking-tight md:text-3xl xl:text-4xl">
                  {additionalTipsData[key].title}
                </h1>
                <ul className="md:mx-6">
                  {Object.keys(additionalTipsData[key].tips).map(
                    (keyName, index) =>
                      keyName === 'codeSnippet' ? (
                        <pre key={index} className="leading-none">
                          <code>{additionalTipsData[key].tips[keyName]}</code>
                        </pre>
                      ) : keyName === 'coverage' ||
                        keyName === 'describeTest' ? (
                        <li key={index}>
                          {additionalTipsData[key].tips[keyName]}
                        </li>
                      ) : keyName === 'options' ? (
                        <li key={index}>
                          <ul>
                            {additionalTipsData[key].tips[keyName]
                              .split('\n')
                              .map((option, index) => (
                                <li key={index}>{option}</li>
                              ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={index}>
                          <strong>
                            {keyName.charAt(0).toUpperCase() + keyName.slice(1)}
                            :
                          </strong>{' '}
                          {additionalTipsData[key].tips[keyName]}
                        </li>
                      )
                  )}
                </ul>
              </div>
            ))}
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}
