
import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Contact', () => {
const renderComponent = () => {
    render(
        <Contact />
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
