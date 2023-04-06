import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { PostCardPropsMock } from "./mock";

const props = PostCardPropsMock;

describe("<PostCard />", () => {
  it("should render postCard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: /title 1/i })).toHaveAttribute(
      "src",
      "img/img.png"
    );
    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/body 1/i)).toBeInTheDocument();
  });
});
