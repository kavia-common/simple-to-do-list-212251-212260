import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders retro todo title", () => {
  render(<App />);
  expect(screen.getByText(/retro to-do/i)).toBeInTheDocument();
});

test("can see new task input", () => {
  render(<App />);
  expect(screen.getByLabelText(/new task/i)).toBeInTheDocument();
});
