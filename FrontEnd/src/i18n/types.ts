export interface WizardTranslations {
  next: string
  back: string
  welcome: string
  step1: {
    title: string
    description: string
    terms: string
  }
  step2: {
    title: string
    username: string
    password: string
    repeatPassword: string
    hint: string
    hintOptional: string
    passwordStrength: {
      weak: string
      medium: string
      strong: string
      veryStrong: string
    }
    validation: {
      required: string
      usernameRequired: string
      passwordRequired: string
      passwordMinLength: string
      passwordMaxLength: string
      passwordNumber: string
      passwordUppercase: string
      passwordConfirmRequired: string
      passwordsNotMatch: string
      hintMaxLength: string
    }
  }
  step3: {
    title: string
    description: string
    backToStart: string
  }
}

export interface Translations {
  wizard: WizardTranslations
} 