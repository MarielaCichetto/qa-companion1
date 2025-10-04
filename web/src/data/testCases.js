export const testCasesSeed = [
  {
    id: 'TC-001',
    title: 'Login with valid credentials',
    status: 'Passed',
    testSet: 'Authentication',
    userStory: 'US-101 Login',
    steps: ['Navigate to login', 'Enter valid credentials', 'Click login'],
    expectedResult: 'User is redirected to dashboard'
  },
  {
    id: 'TC-002',
    title: 'Login with invalid password',
    status: 'Failed',
    testSet: 'Authentication',
    userStory: 'US-101 Login',
    steps: ['Navigate to login', 'Enter invalid password', 'Click login'],
    expectedResult: 'User sees error message'
  }
];
