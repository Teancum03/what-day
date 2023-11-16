/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('testing_tips').del()
  await knex('testing_tips').insert([
    {
      id: 1,
      title: 'Server-Side Routes',
      what_we_test: `The status code recieved from the server (eg 200 or 404);
      The body from the response;
      The headers (meta information, like the location for a redirrect)`,
      things_to_remember: `These tests will be async`,
      extra_installs: `supertest (to fake a request to our server);
      testing-library/dom`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week2/mon-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=kN3VqzLCWFQ',
    },
    {
      id: 2,
      title: 'DOM Testing',
      what_we_test: `What appears in our DOM when we make requests to our server;
      Is what we're serving rendering what we want? This includes semantics for accessibility`,
      things_to_remember: `A testing utility file could be useful for you render function so that you don't have to write it out every time`,
      extra_installs: `jsdom;
      testing-library/dom;
      supertest`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week2/tue-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=OM3GM9Z8KBw',
    },
    {
      id: 3,
      title: 'Mock Data',
      what_we_test: `Testing our functions using vi.mock, so that even if our data changes we can see whether or not our db functions are working when our server responds to a request;
      We can test our data functions separately from our routes;
      That our functions return and what they do without having them actually interact with our data;
      We can do integration testing on our routes, server, and data functions!`,
      things_to_remember: `When using vi.mock the mock path has to match the import path exactly;
      hen asserting a specific file path for a function to have been called with, import * as Path from 'node:path/posix';
      We can mockRejectedValue too;
      Check out the test-utils file in the code-from-class!`,
      extra_installs: `supertest;
      testing-library/dom`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week2/wed-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=n-ox5oNuurE',
    },
    {
      id: 4,
      title: 'Testing Databases',
      what_we_test: `Setting up a testing environment in memory to test our database functions;
      Testing our db functions are having the effect that we expect`,
      things_to_remember: `Use beforeEach, beforeAll, afterEach, afterAll to setup and tear down the test environment ( for things like migrating/seeding data, and destroying the connection);
      Factor out the connection information into a separate file (if not already done) so that we can easily access it from the different environments`,
      extra_installs: `None!`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week3/mon-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=bJL5H_T2EKw',
    },
    {
      id: 5,
      title: 'S-Side Routes + Databases',
      what_we_test: `Server side routes with databases by mocking out the db functions (intergration and unit testing);
      Query the DOM of our routes when databases are involved;
      Different scenarios (success and failure);
      Testing if our routes are calling our db functions correctly`,
      things_to_remember: `Import the db functions and mock them in your test - the mock filepath will exactly match the import path (eg. vi.mock'./db/db.js');
      We can do both integration and unit testing with this method`,
      extra_installs: `supertest;
      testing-library/dom;
      jsdom;
      testing-library/jest-dom;`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week3/tue-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=tjQbZ7If7vk',
    },
    {
      id: 6,
      title: 'React Basics',
      what_we_test: `Properties of the DOM that don't change (using a fake DOM);
      Our DOM as a user would use it;
      Our components are rendering as we expect when we mount them;
      We can unit test components individually or have a more integrative tests that render our whole app`,
      things_to_remember: `Tell vitest we're using the jest-dom environment by putting this at the top of your file //@vitest-environment jsdom;
      Requires some manual setup (in a test-setup file) to make vitest work with these libraries which were created for jest -> boilerplate in code from class includes: 
      - beforeEach(cleanup)
      - import matchers from ''@testing-library/jest-dom/matchers
      - expect.extend(matchers)`,
      extra_installs: `testing-library/react;
      testing-library/jest-dom;
      jsdom;`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week4/mon-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=auo00w0Jlco',
    },
    {
      id: 7,
      title: 'React State & User Events',
      what_we_test: `Results after user interactions with our components;`,
      things_to_remember: `Setup a user object for our fake user;
      Select elements by their accessible names;
      Select buttons by there accessible name (the name that is displayed to the user);
      Inputs should have labels which match the id on the input;
      Use the test-setup file (to make vitest work with these libraries);
      You'll need to await user events`,
      extra_installs: `testing-library/user-event;
      testing-library/jest-dom;
      testing-library/react`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week4/tue-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=vnIAlVfpw24',
    },
    {
      id: 8,
      title: 'Client-side Routes',
      what_we_test: `Our client-side react routes, by using createMemoryRouter from react-router-dom;
      Our components that use things like links, and useParams`,
      things_to_remember: `You can create a test setup file for your render function if you're planning to test multiple routes!`,
      extra_installs: `testing-library/react;
      testing-library/jest-dom/matchers`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week4/wed-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=H1uOXw-kYjg',
    },
    {
      id: 9,
      title: 'API Routes',
      what_we_test: `API endpoints;
      Server-side routes with real database similar to what we did in week 3 (integration);
      Server-side routes with fake database to give more control to simulate scenarios (unit test, for things like error handling)`,
      things_to_remember: `Real data?: Use beforeEach, beforeAll, afterEach, afterAll to setup and tear down the test environment ( like migrating/seeding data, and destroying the connection);
      Fake data: error when using mockImplementation about the return not matching? Change your db functions to async so that they return a promise;
      Try using mockResolvedValue and mockRejectedValue;
      If you're testing error handling use vi.spyOn so you don't have a copy of a big error message in your test`,
      extra_installs: `supertest`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week5/mon-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=gOkjNmVSNxw',
    },
    {
      id: 10,
      title: 'React Components and APIs',
      what_we_test: `React components that are using apiClient functions (consuming an API);
      apiClient functions (mock);
      Network/server response (nock)`,
      things_to_remember: `findBy is async (will return a promise) and keep trying until it finds what it's looking for (similar to waitFor);
      Call for mockImplementation needs to happen before you mount anything (ie before render(<App/>);
      Nocking out the scope should also happen before we mount (because it's part of arranging our test);
      Nock requests only happen once, use multiple when needing to make another request (ie. after a user makes changes);
      We can also put our nock into a beforeEach but this will affect testing the sad (failed) case;
      Use nock.disableNetConnect() if the network request is expensive, dangerous, or messy to prevent any request that is not nocked out by us;
      Make sure your nocked response is the same shape as your response body`,
      extra_installs: `testing-library/react;
      nock (to mock things out at the network level);
      testing-library/jest-dom/matchers (setup);
      testing-library/jest-dom/vitest (setup)`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week5/wed-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=czlhvqgFSvA',
    },
    {
      id: 11,
      title: 'React Query',
      what_we_test: `React Query or network connected components, by using nock to mock what network calls these tests are trying to make;
      What that component is rendering based on the different conditions: error, isLoading, and when we DO get our data back (happy case)`,
      things_to_remember: `Utilize a test setup file (also make sure the vite config is pointing to that file!);
      Wrap the memory router in QueryClientProvider;
      Add some extra config for the queryClient to stop it from retrying the request when testing error scenarios, as well as to not log the errors in our tests  ** new version of react query (v5) works a little differently - we don't config the logger **;
      Two options: Network/server response (nock), apiClient functions (mock);
      Use things like, waitFor and waitForElementToBeRemoved e.g when we are waiting for the loading state to be over;
      Make sure you're faked out response is the same shape as you're response body`,
      extra_installs: `testing-library/react (v4);
      testing-library/react/pure (v5);
      testing-library/jest-dom/matchers;
      testing-library/jest-dom/vitest;
      @tanstack/react-query
      nock`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week6/mon-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=ornWU8Df42c',
    },
    {
      id: 12,
      title: 'React Mutations',
      what_we_test: `A page that uses mutations;
      Mounting as much of the app as we can, mock out our HTTP requests, interacting with our page and obverse things the user would be able to observe to indicate those things have changed;
      Showing the initial state of the page, the page after a user interaction, and the page shows error handling if something goes wrong`,
      things_to_remember: `These tests will be async;
      Utilize a testing utils file that renders our routes for testing (including wrapping our routes in a Query Client Provider) and setup a testing user - return both user and screen (the result of render) so that we have one bundled setup we can use for our tests;
      Include //@vitest-environment jsdom at the top of your testing file;
      Narrow down scope for searching for an element to one specific parent element (useful for forms, scope down to a form to interact with it's inputs and buttons etc);
      Expect the scope being done as part of your tests for each case, as well as your other assertions;
      Check your mocked reply is correct by running your app, opening Dev Tools and viewing the request being made in the Network tab;
      Similar to Wed Week 5 testing, we need to make another scope for our POST before the user interactions, as a scope interceptor - the POST request needs to match exactly what the user interactions are submitting (confirm your reply;
      The Payload in Dev Tools is what the user is sending through when the form is submitted, and the Response is our reply.;
      Check the 'A Rough Outline' section in 'Additional Tips' for an outline of this workflow;
      This is Gerard's lecture of the same content;
      (Don't forget /pure at the end of your @testing-library/react import)`,
      extra_installs: `testing-library/react (v4);
      '@testing-library/react/pure' (v5);
      '@testing-library/user-event';
      '@testing-library/jest-dom/matchers;
      '@testing-library/jest-dom/vitest;
      '@tanstack/react-query';
      nock (to mock things out at the network level)`,
      code_from_class:
        'https://github.com/manaia-2023/code-from-class/tree/main/week7/tue-pm',
      link_to_lecture: 'https://www.youtube.com/watch?v=nMYLAIEgagQ',
    },
  ])
}
