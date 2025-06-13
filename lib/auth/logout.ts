import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { getCurrentUser } from './cognito'

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData)

export function logoutUser() {
  const user = getCurrentUser()
  if (user) {
    user.signOut()
  }
}
