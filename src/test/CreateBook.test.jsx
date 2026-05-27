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
  it("renderar formuläret", () => {     // testar att komponenten renderas
    renderComponent();

    expect(screen.getByText("Lägg till en ny bok")).toBeInTheDocument();
  });

  it("skriva i titel fältet", async () => { // testar att man kan skriva i titel fältet och att det uppdateras korrekt
    const user = userEvent.setup();   
    renderComponent();

    const titleInput = screen.getByPlaceholderText("Titel");
    await user.type(titleInput, "Mio min Mio");

    expect(titleInput).toHaveValue("Mio min Mio");
  });

  it("visar fält för ny författare", async () => { // testar att användaren kan välja att lägga till en ny författare och att fältet för det visas
    const user = userEvent.setup();

    renderComponent();

    const select = screen.getByRole("combobox", {
      name: /författare/i,
    });

    await user.selectOptions(select, "__new__");

    expect(
      screen.getByRole("textbox", { name: /förnamn/i })
    ).toBeInTheDocument();
  });
});