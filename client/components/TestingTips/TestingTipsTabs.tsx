import '@radix-ui/themes/styles.css'
import * as Accordion from '@radix-ui/react-accordion'
import * as Tabs from '@radix-ui/react-tabs'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import React, { Ref } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { TestingTip } from '@models/testingTips'
import { getTips } from '@/apis/testingTipsApi'
import { camelToTitle } from '@/lib/utils'
import YoutubeEmbed from '@/components/YoutubeEmbed'

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
export function TestingTipsTabs() {
  const {
    data: tips,
    isLoading,
    error,
  } = useQuery<TestingTip[]>({        
    queryKey: ['tips'],
    queryFn: getTips,
  })

  if (error instanceof Error) {
    return <p>Error: unable to load Testing Tips</p>
  }

  if (!tips || isLoading) {
    return <p>Loading Testing Tips...</p>
  }

  return (
    <div className="m-auto xl:w-3/4">
      <Tabs.Root
        defaultValue="tab1"
        className="TabsRoot"
        orientation="vertical"
      >
        <Accordion.Root
          className="AccordionRoot"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <Accordion.Item className="AccordionItem" value="item-1">
            <AccordionTrigger>Select Your Tip</AccordionTrigger>
            <AccordionContent>
              <Tabs.List
                className="TabsList"
                aria-label="Select your the tips you want to see."
              >
                {tips.map((tip) => (
                  <Tabs.Trigger
                    className="TabsTrigger"
                    key={tip.id}
                    value={`tab${tip.id}`}
                    aria-label={tip.title}
                  >
                    {tip.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {tips.map((tip) => (
                <Tabs.Content
                  className="TabsContent"
                  key={tip.id}
                  value={`tab${tip.id}`}
                >
                  <h1 className="mb-8 mt-2 text-center font-header text-xl tracking-tight md:text-3xl xl:text-4xl">
                    {tip.title}
                  </h1>
                  {Object.keys(tip).map(
                    (key, index) =>
                      key != 'id' &&
                      key != 'title' && (
                        <div key={index} className="mb-8">
                          <h2 className="mb-8 mt-2 whitespace-nowrap text-center font-title text-xl font-bold tracking-tight md:text-xl xl:text-2xl">
                            {camelToTitle(key)}
                          </h2>
                          <ul>
                            {tip[key as keyof TestingTip]
                              .toString()
                              .split(';')
                              .map((item, index) => (
                                <li key={index} className="md:mx-6">
                                  {key == 'codeFromClass' ? (
                                    <Link to={item}>
                                      <p className="Text">{item}</p>
                                    </Link>
                                  ) : key == 'linkToLecture' ? (
                                    <YoutubeEmbed url={item} />
                                  ) : (
                                    <p className="Text">{item}</p>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )
                  )}
                </Tabs.Content>
              ))}
            </AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
      </Tabs.Root>
    </div>
  )
}
