
import { render, screen } from '@testing-library/react'
import Register from './Register'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Register', () => {
const renderComponent = () => {
    render(
        <Register />
    )
    const user = userEvent.setup()

    return {
        user: user,
    }
}
it('should', async () => {
    const {user} = await renderComponent()
})

})
