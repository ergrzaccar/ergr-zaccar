import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the institutional home prototype', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'La maîtrise du terrain au service du développement rural durable.',
      }),
    ).toBeInTheDocument()
  })
})
