import { render, screen } from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<TextInput/>", () => {
  it("shouldhave a value of serachValue", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={"testando"} />);
    const input = screen.getByPlaceholderText(/Pesquise o card/i);
    expect(input.value).toBe("testando");
  });

  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/Pesquise o card/i);

    const value = "O valor";

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
});
