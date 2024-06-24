import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import { ModeToggle } from '@/components/ModeToggle';
import { it, describe, expect } from 'vitest';

describe('NavBar', () => {
  it('renders the Nav component with all its elements', () => {
    render(<Nav />);
    render;

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const titleLink = screen.getByRole('link', { name: /Servify/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');

    // const modeToggle = screen.getByText('ModeToggle');
    // expect(modeToggle).toBeInTheDocument();

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /ABOUT/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/');

    const leaderboardLink = screen.getByRole('link', { name: /LEADERBOARD/i });
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute('href', '/');

    const profileLink = screen.getByRole('link', { name: /PROFILE/i });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/');
  });
});
