import { act } from '@testing-library/react'

import { createRenderer } from '@/test/createRenderer'
import { Button } from '@/components/button'

describe('<Button />', () => {
  const { render } = createRenderer()

  describe('prop: children', () => {
    it('should renders children', () => {
      const { getByTestId } = render(<Button>Click Me!</Button>)
      expect(getByTestId('root')).toHaveTextContent('Click Me!')

      const button = getByTestId('root')
      act(() => {
        button.focus()
      })
    })
  })
})
