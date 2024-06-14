import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import { userEvent } from '@testing-library/user-event';
import { describe, it } from 'vitest';

describe('Signup', () => {
  const renderComponent = () => {
    render(<Signup />);
    const user = userEvent.setup();

    return {
      user: user,
    };
  };
  it('should', async () => {
    const { user } = await renderComponent();
  });
});

