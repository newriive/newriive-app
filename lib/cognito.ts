import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData)

export function signUpUser(
  email: string,
  password: string,
  attributes: {
    phone_number?: string
    name?: string
    given_name?: string
    family_name?: string
    birthdate?: string
    locale?: string
  } = {},
): Promise<any> {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ]
  if (attributes.phone_number)
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: attributes.phone_number,
      }),
    )
  if (attributes.name)
    attributeList.push(
      new CognitoUserAttribute({ Name: 'name', Value: attributes.name }),
    )
  if (attributes.given_name)
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: attributes.given_name,
      }),
    )
  if (attributes.family_name)
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: attributes.family_name,
      }),
    )
  if (attributes.birthdate)
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'birthdate',
        Value: attributes.birthdate,
      }),
    )
  if (attributes.locale)
    attributeList.push(
      new CognitoUserAttribute({ Name: 'locale', Value: attributes.locale }),
    )

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function confirmUserSignup(email: string, code: string): Promise<any> {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  })

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function signInUser(email: string, password: string): Promise<any> {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  })

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  })

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    })
  })
}

export function forgotPassword(email: string): Promise<any> {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  })
  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: resolve,
      onFailure: reject,
      inputVerificationCode: () => resolve(true),
    })
  })
}

export function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<any> {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  })
  return new Promise((resolve, reject) => {
    user.confirmPassword(code, newPassword, {
      onSuccess: resolve,
      onFailure: reject,
    })
  })
}
