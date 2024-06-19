
import { render, screen } from '@testing-library/react'
import Org from './Org'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Org', () => {
const renderComponent = () => {
    render(
        <Org />
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
