const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import { Button } from "./";
describe("<Button />", () => {
  it("should render the button with text 'carregar mais posts'", () => {
    render(<Button text="carregar mais posts" />);

    const button = screen.getByRole("button", { name: /carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function button click", () => {
    const fn = jest.fn();
    render(<Button text="carregar mais posts" onClick={fn} />);

    const button = screen.getByRole("button", {
      name: /carregar mais posts/i,
    });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<Button text="carregar mais posts" disabled={true} />);
    const button = screen.getByRole("button", {
      name: /carregar mais posts/i,
    });
    expect(button).toBeDisabled();
  });

  it("should be enable when disabled is false", () => {
    render(<Button text="carregar mais posts" disabled={false} />);
    const button = screen.getByRole("button", {
      name: /carregar mais posts/i,
    });
    expect(button).toBeEnabled();
  });
});
