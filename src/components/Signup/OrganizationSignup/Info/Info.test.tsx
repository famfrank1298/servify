
import { render, screen } from '@testing-library/react'
import Info from './Info'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('Info', () => {
const renderComponent = () => {
    render(
        <Info />
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
