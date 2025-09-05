import React from 'react'
import { SocialButton, SocialButtonProps } from './SocialButton'

export { SocialButton }
export type { SocialButtonProps }

// Convenience wrapper components
export const GitHubSignInButton = (props: Omit<SocialButtonProps, 'provider'>) =>
  React.createElement(SocialButton, { provider: 'github', ...props })

export const GoogleSignInButton = (props: Omit<SocialButtonProps, 'provider'>) =>
  React.createElement(SocialButton, { provider: 'google', ...props })
