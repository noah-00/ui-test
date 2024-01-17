import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
const user = UserEvent.setup();

import Form from "./Form";

describe("From", () => {
  it("By default, the text box is empty", () => {
    render(<Form></Form>);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent("");
  });

  it("The text entered by user is submitted", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();
    render(<Form></Form>);
    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "Test Text");

    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);
    expect(alertSpy).toHaveBeenCalledWith("submitted: Test Text");
  });
});
