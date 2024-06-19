
import { render, screen } from '@testing-library/react'
import SignupButton from './SignupButton'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('SignupButton', () => {
const renderComponent = () => {
    render(
        <SignupButton />
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
