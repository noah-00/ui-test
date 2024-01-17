import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("button is rendering", () => {
    render(<Button label="button" onClick={() => alert("click")}></Button>);

    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("button");
  });
});
