import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "../pages/Login";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useOutletContext: () => ({
      setUser: vi.fn(),
    }),
  };
});

describe("Register", () => {
  it("render text", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Lösenord/i)).toBeInTheDocument();
  });
});