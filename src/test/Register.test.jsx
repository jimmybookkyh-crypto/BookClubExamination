import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Register from "../pages/Register";

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
        <Register />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Användarnamn/i)).toBeInTheDocument();
  });
});