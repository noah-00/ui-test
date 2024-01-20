import { render, screen, waitFor } from "@testing-library/react";
import AsyncComponent from "./AsyncComponent";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("the async function is executed when user click button", async () => {
    render(<AsyncComponent />);
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      {
        interval: 50,
        timeout: 3000,
      }
    );
  });
});
