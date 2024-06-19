
import { render, screen } from '@testing-library/react'
import Profile from './Profile'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Profile', () => {
const renderComponent = () => {
    render(
        <Profile />
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
