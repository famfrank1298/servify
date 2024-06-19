
import { render, screen } from '@testing-library/react'
import OrganizationSignup from './OrganizationSignup'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('OrganizationSignup', () => {
const renderComponent = () => {
    render(
        <OrganizationSignup />
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
