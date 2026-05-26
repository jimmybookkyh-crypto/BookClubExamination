import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { vi, describe, it, expect } from "vitest";
import CreateBook from "../pages/CreateBook";

vi.mock("../utils/useFetch", () => ({
  default: () => [
    [{ documentId: "1", firstName: "Astrid", lastName: "Lindgren" }],
    [{ documentId: "2", name: "Fantasy" }],
    false,
  ],
}));
vi.mock("../utils/checkBookTitle", () => ({
  default: vi.fn().mockResolvedValue(false)
}));
vi.mock("../utils/uploadImage", () => ({
  default: vi.fn()
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <CreateBook />
    </MemoryRouter>
  );

describe("CreateBook", () => {
  it("renderar formuläret", () => {
    renderComponent();
    expect(screen.getByText("Lägg till en ny bok")).toBeInTheDocument();
  });
});