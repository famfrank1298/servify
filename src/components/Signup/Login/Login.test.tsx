
import { render, screen } from '@testing-library/react'
import Login from './Login'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Login', () => {
const renderComponent = () => {
    render(
        <Login />
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
