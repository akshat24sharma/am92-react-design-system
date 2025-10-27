/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsButton component
 * 
 * Testing Strategy:
 * 1. Rendering - Tests for correct rendering of different button states and variants
 * 2. Interaction - Tests for user interactions (clicks, keyboard events)
 * 3. Props - Tests for proper prop handling
 * 4. Accessibility - Tests for keyboard navigation
 * 
 * @package @am92/react-design-system
 * @component DsButton
 */

import { describe, expect, it, vi } from "vitest";
import { DsButton } from "./DsButton.Component";
import { fireEvent, render, screen } from "@testing-library/react";
import { DsRemixIcon } from "../DsRemixIcon";
import userEvent from '@testing-library/user-event';


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

    it("should apply fullWidth class when fullWidth prop is true", () => {
    render(<DsButton fullWidth>Full Width Button</DsButton>);
    const button = screen.getByRole("button", { name: /Full Width Button/i });
    expect(button).toHaveClass("MuiButton-fullWidth");
  });

    it("should handle form submission", () => {
    const handleSubmit = vi.fn();
    render(
      <form onSubmit={handleSubmit}>
        <DsButton type="submit">Submit</DsButton>
      </form>
    );
    const button = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

 it("should handle Enter key press", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<DsButton onClick={handleClick}>Press me</DsButton>);
    const button = screen.getByRole("button", { name: /Press me/i });
    
    button.focus()
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

    it("should handle Space key press", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<DsButton onClick={handleClick}>Press me</DsButton>);
    const button = screen.getByRole("button", { name: /Press me/i });
    
    button.focus()
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
