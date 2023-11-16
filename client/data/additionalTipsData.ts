const additionalTipsData: {
  [key: string]: {
    title: string
    tips: {
      [key: string]: string
    }
  }
} = {
  integrationVsUnitTesting: {
    title: 'Integration vs. Unit Testing',
    tips: {
      integration: `more realistic and can be resilient to refactors, 
      BUT can be harder to spot exactly where and error is coming from.`,
      unit: `for hard to reach corners of code (eg. database failing, 
        routes are calling the db code correctly) but they're very isolated, 
        and so can be brittle`,
      additional: `Most tests should be integration because they represent how 
      a user is interacting with your product.\n
      (Testing Front-end will mostly be integration)`,
    },
  },
  coverage: {
    title: 'Coverage',
    tips: {
      coverage: `npm test -- --coverage (or npx vitest --coverage)\n
      (aim for at least 80% across your codebase)`,
    },
  },
  describeTestAndTestIt: {
    title: `describe/test and test/it`,
    tips: {
      describeTest: `Use describe (or test) to group tests together.\n
      Use it (or test) to test one particular behavior.`,
    },
  },
  preferredWaysOfSelectingElements: {
    title: `Preferred Ways of Selecting Elements`,
    tips: {
      getByText: `getByText (or queryByText)`,
      getByRole: `getByRole (or queryByRole)`,
      getByTestId: `getByTestId (or queryByTestId)`,
      getByLabelText: `getByLabelText (or queryByLabelText)`,
      getByAltText: `getByAltText (or queryByAltText)`,
      getByDisplayValue: `getByDisplayValue (or queryByDisplayValue)`,
      getByPlaceholderText: `getByPlaceholderText (or queryByPlaceholderText)`,
      tip: `The more specific the selector, the more specific our errors will be when something doesn't work`,
      reference: `check out: https://testing-playground.com/,\n
      or use screen.logTestingPlaygroundURL()`,
    },
  },
  testingRealDataWithDates: {
    title: `Testing Real Data With Dates?`,
    tips: {
      options: `Leave out date property and just test the other properties of what we get back\n
      OR change to "date: expect.any(Number)"\n
      OR have your seeds contain an exact date\n
      OR vi.useFakeTimers and vi.setSystemTime()\n`,
    },
  },
  regularExpressions: {
    title: `Regular Expressions (regex)`,
    tips: {
      [`"this"`]: `--> for an exact match`,
      [`/this/`]: `--> for a match anywhere inside`,
      [`/this/i`]: `--> for a match anywhere inside but is not case sensitive`,
    },
  },
  toBeVsToEqual: {
    title: `toBe vs. toEqual`,
    tips: {
      codeSnippet: `
      let x = {z: true}\n
      let y = {z: true}\n\n
      
      expect(x).toBe(y) // false\n
      expect(x).toEqual(y) // true\n\n
      
      toEqual is better for objects, it evaluates to true or false\n
      toBe compares referential identity of values`,
    },
  },
  aRoughOutline: {
    title: `A Rough Outline`,
    tips: {
      1: `Nock out inital scope`,
      2: `RenderRoute`,
      3: `Wait for loading to go away`,
      4: `Make sure our request has been made, by expecting the initial scope to be done`,
      5: `Set up another scope for the request that's going to come in after the form is submitted`,
      6: `Mock out the user filling out the form and clicking submit`,
      7: `Wait for the loading message (eg. Adding your fruit) to be gone`,
      8: `Expect the second scope to be done`,
      9: `Expect to see the new fruit on the page`,
    },
  },
}

export default additionalTipsData
