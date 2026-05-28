import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GetOneBook from "../pages/GetOneBook";

vi.mock("react-router", () => ({
  useParams: () => ({
    documentId: "1",
  }),
  useNavigate: () => vi.fn(),
  useOutletContext: () => ({
    user: null,
  }),
}));

vi.mock("../utils/useFetch", () => ({
  default: () => [
    {
      title: "Harry Potter",
      author: {
        firstName: "J.K.",
        lastName: "Rowling",
      },
      genre: {
        name: "Fantasi",
      },
      year: 1995,
      description: [
        {
          children: [
            {
              text: "Trollkarlar på Hogwarts",
            },
          ],
        },
      ],
    },
    false,
  ],
}));

describe("GetOneBook", () => {
  it("render text", async () => {
    render(<GetOneBook />);

    expect(
      await screen.getByRole("heading", {
        name: /Recensioner/i,
      }),
    ).toBeInTheDocument();
  });
});
