
import { render, screen } from '@testing-library/react'
import VolunteerSignup from './VolunteerSignup'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('VolunteerSignup', () => {
const renderComponent = () => {
    render(
        <VolunteerSignup />
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
