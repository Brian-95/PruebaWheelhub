import type { Translations } from '../types'

export const en: Translations = {
  wizard: {
    next: 'Next',
    back: 'Back',
    welcome: 'Test FrontEnd Wheel Hub',
    step1: {
      title: 'Step 1',
      description: 'This wizard will guide you through the account creation process.',
      terms: 'Confirm that you are of legal age and accept the processing of your data according to the current data protection policy.'
    },
    step2: {
      title: 'Create your user',
      username: 'Username',
      password: 'Password',
      repeatPassword: 'Repeat password',
      hint: 'Password hint',
      hintOptional: '(optional)',
      passwordStrength: {
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        veryStrong: 'Very strong'
      },
      validation: {
        required: 'This field is required',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordMaxLength: 'Password cannot be longer than 24 characters',
        passwordNumber: 'Password must contain at least one number',
        passwordUppercase: 'Password must contain at least one uppercase letter',
        passwordConfirmRequired: 'Please repeat your password',
        passwordsNotMatch: 'Passwords do not match',
        hintMaxLength: 'Hint cannot be longer than 60 characters'
      }
    },
    step3: {
      title: 'Account created successfully!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      backToStart: 'Back to start'
    }
  }
} 