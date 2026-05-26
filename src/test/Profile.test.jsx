import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  Navigate: () => <div>Navigate</div>,
  useOutletContext: () => ({
    user: {
      jwt: 'fake-jwt',
      user: {
        id: 1,
        username: 'Joppe',
        email: 'joppe@test.com'
      }
    },
    setUser: vi.fn()
  })
}));

describe('Profile', () => {

  it('renders profile information', () => {

    render(<Profile />);

    expect(
      screen.getByText(/konto för Joppe/i)
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue('joppe@test.com')
    ).toBeInTheDocument();

  });

});