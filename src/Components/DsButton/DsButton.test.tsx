import { describe, expect, it, vi } from "vitest";
import { DsButton } from "./DsButton.Component";
import { fireEvent, render, screen } from "@testing-library/react";
import { DsRemixIcon } from "../DsRemixIcon";

describe("Button Component", () => {
  it("should render as disabled state", () => {
    render(<DsButton disabled>Disabled Button</DsButton>);
    const button = screen.getByRole("button", { name: /Disabled Button/i });
    expect(button).toBeInTheDocument();
  });

  it.each([
    ["small", "MuiButton-sizeSmall"],
    ["medium", "MuiButton-sizeMedium"],
    ["large", "MuiButton-sizeLarge"],
  ])("renders correct class for size=%s", (size, expectedClass) => {
    render(<DsButton size={size as any}>Test</DsButton>);
    const button = screen.getByRole("button", { name: /test/i });
    expect(button).toHaveClass(expectedClass);
  });

  it("should handle onClick events", () => {
    const handleClick = vi.fn();
    render(<DsButton onClick={handleClick}>Click me</DsButton>);
    const button = screen.getByRole("button", { name: /Click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render button as secondary color", () => {
    render(<DsButton color="secondary">Secondary Button</DsButton>);
    const button = screen.getByRole("button", { name: /Secondary Button/i });
    expect(button).toHaveClass("MuiButton-colorSecondary");
  });

  it("should render button as text variant", () => {
    render(
      <DsButton variant="text" color="secondary">
        Text Button
      </DsButton>
    );
    const button = screen.getByRole("button", { name: /Text Button/i });
    expect(button).toHaveClass(
      "MuiButton-text",
      "MuiButton-textSecondary",
      "MuiButton-colorSecondary"
    );
  });

  it("should render button with start and end icons", () => {
    render(
      <DsButton
        startIcon={
          <DsRemixIcon data-testId="start-icon" className="ri-add-fill" />
        }
        endIcon={<DsRemixIcon data-testId="end-icon" className="ri-add-fill" />}
      >
        Icons
      </DsButton>
    );
    const button = screen.getByRole("button", { name: /Icons/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("start-icon")).toHaveClass("ri-add-fill");
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toHaveClass("ri-add-fill");
  });
});
