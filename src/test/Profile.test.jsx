import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import userEvent from '@testing-library/user-event';

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
  it('kan ändra email-fältet', async () => {

    const user = userEvent.setup();
    render(<Profile />);
    const emailInput = screen.getByDisplayValue('joppe@test.com');

    await user.clear(emailInput);
    await user.type(emailInput, 'ny@test.com');

    expect(emailInput).toHaveValue('ny@test.com');

  });

  it('visar dialogruta för att avsluta konto', async () => {

    const user = userEvent.setup();
    render(<Profile />);

    await user.click(
      screen.getByRole('button', {
        name: /avsluta konto/i
      })
    );

    expect(
      screen.getByText(/bekräfta borttagning/i)
    ).toBeInTheDocument();

  });
});