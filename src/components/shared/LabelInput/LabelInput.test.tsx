
import { render, screen } from '@testing-library/react'
import LabelInput from './LabelInput'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest';

describe('LabelInput', () => {
const renderComponent = () => {
    render(
        <LabelInput />
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
