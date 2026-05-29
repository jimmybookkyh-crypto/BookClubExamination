import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Start from "../pages/Start";

describe("Start component", () => {
  it("render test", () => {
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );

    expect(screen.getByText(/Välkommen!/i)).toBeInTheDocument();
  });
});