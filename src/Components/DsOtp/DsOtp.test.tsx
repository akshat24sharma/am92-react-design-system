/**
 * @vitest-environment jsdom
 *
 * Test suite for DsOtp component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Component Functionality - OTP input behavior and interactions
 * 6. Event Handling - User interactions and event handlers
 * 7. Form Integration - OTP behavior in forms
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Real-world Scenarios - Common usage patterns
 * 11. Ref and Imperative Handle - Component ref API testing
 * 12. Theme Testing - Cross-theme compatibility
 * 13. Snapshot Testing - Visual regression prevention across all states and themes
 *
 * @package @am92/react-design-system
 * @component DsOtp
 */

import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { DsOtp } from "./DsOtp.Component";
import { DsOtpRef } from "./DsOtp.Types";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import { DsButton } from "../DsButton";
import { DsStack } from "../DsStack";
import { DsPaper } from "../DsPaper";
import { createRef } from "react";

describe("DsOtp Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsOtp onComplete={() => {}} />);

      // Should render 6 OTP inputs by default
      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(6);

      inputs.forEach((input) => {
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "tel");
      });
    });

    it("should render with custom length", () => {
      render(<DsOtp onComplete={() => {}} length={4} />);

      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(4);
    });

    it("should render with label", () => {
      render(<DsOtp onComplete={() => {}} label="Enter OTP" />);

      const label = screen.getByText("Enter OTP");
      expect(label).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      render(
        <DsOtp
          onComplete={() => {}}
          helperText="Enter the 6-digit code sent to your phone"
        />
      );

      const helperText = screen.getByText((content, element) => {
        return content.includes("Enter the 6-digit code sent to your phone");
      });
      expect(helperText).toBeInTheDocument();
    });

    it("should render without optional props", () => {
      render(<DsOtp onComplete={() => {}} />);

      expect(screen.queryByText("Optional Label")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Optional Helper Text")
      ).not.toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and display custom name", () => {
      render(<DsOtp onComplete={() => {}} name="verification-code" />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute("name", `verification-code.${index}`);
      });
    });

    it("should use fallback values when props are not provided", () => {
      render(<DsOtp onComplete={() => {}} />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute("name", `otp.${index}`);
      });
    });

    it("should accept initial OTP value", () => {
      render(<DsOtp onComplete={() => {}} initialOtp="123" />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");
      expect(inputs[3]).toHaveValue("");
      expect(inputs[4]).toHaveValue("");
      expect(inputs[5]).toHaveValue("");
    });

    it("should truncate initial OTP to length", () => {
      render(<DsOtp onComplete={() => {}} initialOtp="123456789" length={4} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      expect(inputs).toHaveLength(4);
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");
      expect(inputs[3]).toHaveValue("4");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in disabled state", () => {
      render(<DsOtp onComplete={() => {}} disabled />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it("should render in error state", () => {
      render(<DsOtp onComplete={() => {}} error />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("should render in success state", () => {
      render(<DsOtp onComplete={() => {}} success />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toBeInTheDocument();
        const inputBase = input.closest(".MuiInputBase-root");
        expect(inputBase).toHaveClass("MuiInputBase-colorSuccess");
      });
    });

    it("should handle state combinations", () => {
      render(<DsOtp onComplete={() => {}} disabled error />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
        expect(input).toHaveAttribute("aria-invalid", "true");
      });
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes to text fields", () => {
      render(<DsOtp onComplete={() => {}} />);

      const formControls = document.querySelectorAll(".MuiFormControl-root");
      expect(formControls.length).toBeGreaterThan(0);

      formControls.forEach((field) => {
        expect(field).toHaveClass("MuiFormControl-root");
      });
    });

    it("should apply OTP variant", () => {
      render(<DsOtp onComplete={() => {}} />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        const inputBase = input.closest(".MuiInputBase-root");
        expect(inputBase).toHaveAttribute("ds-variant", "otp");
      });
    });

    it("should apply error classes when in error state", () => {
      render(<DsOtp onComplete={() => {}} error />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        const inputBase = input.closest(".MuiInputBase-root");
        expect(inputBase).toHaveClass("Mui-error");
      });
    });

    it("should apply disabled classes when disabled", () => {
      render(<DsOtp onComplete={() => {}} disabled />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        const inputBase = input.closest(".MuiInputBase-root");
        expect(inputBase).toHaveClass("Mui-disabled");
      });
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY TESTS
  // ============================
  describe("Component Functionality", () => {
    it("should handle single digit input", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      await user.type(inputs[0], "1");
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveFocus();
    });

    it("should filter non-numeric input", async () => {
      render(<DsOtp onComplete={() => {}} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      await user.type(inputs[0], "a");
      expect(inputs[0]).toHaveValue("");

      await user.type(inputs[0], "1a2b3");
      expect(inputs[0]).toHaveValue("1");
    });

    it("should handle backspace navigation", async () => {
      render(<DsOtp onComplete={() => {}} initialOtp="123" />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      // Focus on third input, clear it, then press backspace
      inputs[2].focus();
      await user.clear(inputs[2]);
      await user.keyboard("{Backspace}");
      expect(inputs[1]).toHaveFocus();
    });

    it("should call onComplete when OTP is filled", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} length={3} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      await user.type(inputs[0], "1");
      await user.type(inputs[1], "2");
      await user.type(inputs[2], "3");

      expect(onComplete).toHaveBeenCalledWith("123");
    });

    it("should handle paste functionality", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} length={4} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      // Simulate paste event with clipboardData
      const clipboardData = {
        getData: vi.fn().mockReturnValue("1234"),
      };

      fireEvent.paste(inputs[0], {
        clipboardData,
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith("1234");
      });
    });

    it("should handle paste with non-numeric characters", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} length={3} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      const clipboardData = {
        getData: vi.fn().mockReturnValue("1a2b3c4d"),
      };

      fireEvent.paste(inputs[0], {
        clipboardData,
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith("123");
      });
    });

    it("should handle autoFocus", () => {
      render(<DsOtp onComplete={() => {}} autoFocus />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      expect(inputs[0]).toHaveFocus();
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle onChange events", async () => {
      const handleChange = vi.fn();
      render(<DsOtp onComplete={() => {}} onChange={handleChange} />);

      const inputs = screen.getAllByRole("textbox");

      await user.type(inputs[0], "1");
      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle onKeyDown events", async () => {
      const handleKeyDown = vi.fn();
      render(<DsOtp onComplete={() => {}} onKeyDown={handleKeyDown} />);

      const inputs = screen.getAllByRole("textbox");

      inputs[0].focus();
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("should handle onFocus events", async () => {
      const handleFocus = vi.fn();
      render(<DsOtp onComplete={() => {}} onFocus={handleFocus} />);

      const inputs = screen.getAllByRole("textbox");

      await user.click(inputs[0]);
      expect(handleFocus).toHaveBeenCalled();
    });

    it("should handle onPaste events and check return of onComplete", async () => {
      const handlePaste = vi.fn();
      const handleComplete = vi.fn();
      render(<DsOtp onComplete={handleComplete} onPaste={handlePaste} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      const clipboardData = {
        getData: vi.fn().mockReturnValue("123456"),
      };

      fireEvent.paste(inputs[0], {
        clipboardData,
      });

      expect(handlePaste).toHaveBeenCalled();

      const completedValue = handleComplete.mock.calls[0][0];
      expect(completedValue).toBe("123456");
      // Verify all inputs are filled
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");
      expect(inputs[3]).toHaveValue("4");
      expect(inputs[4]).toHaveValue("5");
      expect(inputs[5]).toHaveValue("6");
    });

    it("should select text on focus", async () => {
      render(<DsOtp onComplete={() => {}} initialOtp="123456" />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      await user.click(inputs[0]);

      // Check if text is selected (selection start should be 0, end should be value length)
      expect(inputs[0].selectionStart).toBe(0);
      expect(inputs[0].selectionEnd).toBe(1);
    });
  });

  // ============================
  // FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should work within form element", () => {
      render(
        <form>
          <DsOtp onComplete={() => {}} name="otp-field" />
        </form>
      );

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute("name", `otp-field.${index}`);
      });
    });

    it("should work with controlled components pattern", async () => {
      let otpValue = "";
      const handleComplete = vi.fn((value) => {
        otpValue = value;
      });

      const { rerender } = render(
        <DsOtp onComplete={handleComplete} initialOtp={otpValue} length={3} />
      );

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      await user.type(inputs[0], "1");
      await user.type(inputs[1], "2");
      await user.type(inputs[2], "3");

      expect(handleComplete).toHaveBeenCalledWith("123");

      rerender(
        <DsOtp onComplete={handleComplete} initialOtp="123" length={3} />
      );
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");
    });

    it("should handle form submission scenarios", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const handleComplete = vi.fn();

      render(
        <form onSubmit={handleSubmit}>
          <DsOtp onComplete={handleComplete} length={3} />
          <DsButton type="submit">Submit</DsButton>
        </form>
      );

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      const submitButton = screen.getByRole("button", { name: /submit/i });

      await user.type(inputs[0], "1");
      await user.type(inputs[1], "2");
      await user.type(inputs[2], "3");

      expect(handleComplete).toHaveBeenCalledWith("123");

      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<DsOtp onComplete={() => {}} label="Enter OTP Code" />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("aria-invalid");
        expect(input).toHaveAttribute("type", "tel");
      });
    });

    it("should support keyboard navigation", async () => {
      render(
        <DsBox>
          <DsOtp onComplete={() => {}} length={3} />
          <DsButton>Next</DsButton>
        </DsBox>
      );

      const inputs = screen.getAllByRole("textbox");
      const button = screen.getByRole("button", { name: /next/i });

      await user.click(inputs[0]);
      expect(inputs[0]).toHaveFocus();

      await user.keyboard("1");
      expect(inputs[1]).toHaveFocus();

      await user.keyboard("2");
      expect(inputs[2]).toHaveFocus();

      await user.tab();
      expect(button).toHaveFocus();

      await user.tab({ shift: true });
      expect(inputs[2]).toHaveFocus();
    });

    it("should have proper aria-describedby relationships", () => {
      render(
        <DsOtp
          onComplete={() => {}}
          helperText="Enter the verification code"
          error
        />
      );

      const inputs = screen.getAllByRole("textbox");
      const helperText = screen.getByText((content, element) => {
        return content.includes("Enter the verification code");
      });

      inputs.forEach((input) => {
        expect(input).toHaveAttribute("aria-invalid");
      });
      expect(helperText).toBeInTheDocument();
    });

    it("should handle aria-invalid for error state", () => {
      render(<DsOtp onComplete={() => {}} error />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("aria-invalid", "true");
      });
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null/undefined values gracefully", () => {
      render(<DsOtp onComplete={() => {}} initialOtp={undefined as any} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("should handle zero length", () => {
      render(<DsOtp onComplete={() => {}} length={0} />);

      const inputs = screen.queryAllByRole("textbox");
      expect(inputs).toHaveLength(0);
    });

    it("should handle large length values", () => {
      render(<DsOtp onComplete={() => {}} length={20} />);

      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(20);
    });

    it("should handle special paste scenarios", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} length={6} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      // Empty paste
      const emptyClipboardData = {
        getData: vi.fn().mockReturnValue(""),
      };

      fireEvent.paste(inputs[0], {
        clipboardData: emptyClipboardData,
      });
      expect(onComplete).not.toHaveBeenCalled();

      // Very long paste (should be truncated)
      const longClipboardData = {
        getData: vi.fn().mockReturnValue("123456789012345"),
      };

      fireEvent.paste(inputs[0], {
        clipboardData: longClipboardData,
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith("123456");
      });
    });

    it("should handle rapid input changes", async () => {
      const onComplete = vi.fn();
      render(<DsOtp onComplete={onComplete} length={3} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      // Rapidly type multiple characters in succession
      await user.type(inputs[0], "123");

      // Only first character should be in first input
      expect(inputs[0]).toHaveValue("1");
      expect(onComplete).toHaveBeenCalledWith("123");
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should handle phone verification flow", async () => {
      const onComplete = vi.fn();
      const onResend = vi.fn();

      render(
        <DsPaper sx={{ p: 3, maxWidth: 400 }}>
          <DsTypography variant="bodyBoldLarge" gutterBottom>
            Phone Verification
          </DsTypography>
          <DsTypography variant="bodyRegularSmall" gutterBottom>
            Enter the 6-digit code sent to your phone
          </DsTypography>
          <DsOtp
            onComplete={onComplete}
            length={6}
            label="Verification Code"
            helperText="Code expires in 5 minutes"
            autoFocus
          />
          <DsStack direction="row" spacing={2} sx={{ mt: 2 }}>
            <DsButton variant="contained" color="primary">
              Verify
            </DsButton>
            <DsButton variant="text" onClick={onResend}>
              Resend Code
            </DsButton>
          </DsStack>
        </DsPaper>
      );

      expect(screen.getByText("Phone Verification")).toBeInTheDocument();
      expect(
        screen.getByText("Enter the 6-digit code sent to your phone")
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) =>
          content.includes("Code expires in 5 minutes")
        )
      ).toBeInTheDocument();

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      expect(inputs[0]).toHaveFocus();

      // Type complete OTP
      await user.type(inputs[0], "1");
      await user.type(inputs[1], "2");
      await user.type(inputs[2], "3");
      await user.type(inputs[3], "4");
      await user.type(inputs[4], "5");
      await user.type(inputs[5], "6");

      expect(onComplete).toHaveBeenCalledWith("123456");

      const resendButton = screen.getByRole("button", { name: /resend/i });
      await user.click(resendButton);
      expect(onResend).toHaveBeenCalled();
    });

    it("should handle two-factor authentication scenario", async () => {
      const onComplete = vi.fn();

      render(
        <DsBox
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 400,
          }}
        >
          <DsTypography variant="bodyBoldLarge">
            Two-Factor Authentication
          </DsTypography>
          <DsTypography variant="bodyRegularSmall">
            Enter the code from your authenticator app
          </DsTypography>
          <DsOtp
            onComplete={onComplete}
            length={6}
            label="Authentication Code"
            name="auth-code"
            error={false}
            helperText="Enter the 6-digit code from your app"
          />
          <DsButton variant="contained" fullWidth>
            Continue
          </DsButton>
        </DsBox>
      );

      expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
      expect(
        screen.getByText("Enter the code from your authenticator app")
      ).toBeInTheDocument();

      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(6);

      // Simulate paste from clipboard
      const clipboardData = {
        getData: vi.fn().mockReturnValue("987654"),
      };

      fireEvent.paste(inputs[0], {
        clipboardData,
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith("987654");
      });
    });

    it("should handle error recovery flow", async () => {
      const onComplete = vi.fn();
      let hasError = true;

      const { rerender } = render(
        <DsOtp
          onComplete={onComplete}
          length={4}
          label="PIN Code"
          error={hasError}
          helperText={
            hasError
              ? "Invalid PIN. Please try again."
              : "Enter your 4-digit PIN"
          }
        />
      );

      expect(
        screen.getByText((content) =>
          content.includes("Invalid PIN. Please try again.")
        )
      ).toBeInTheDocument();

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("aria-invalid", "true");
      });

      // User enters correct PIN
      await user.type(inputs[0], "1");
      await user.type(inputs[1], "2");
      await user.type(inputs[2], "3");
      await user.type(inputs[3], "4");

      expect(onComplete).toHaveBeenCalledWith("1234");

      // Simulate error being cleared
      hasError = false;
      rerender(
        <DsOtp
          onComplete={onComplete}
          length={4}
          label="PIN Code"
          error={hasError}
          helperText={
            hasError
              ? "Invalid PIN. Please try again."
              : "Enter your 4-digit PIN"
          }
        />
      );

      expect(
        screen.getByText((content) =>
          content.includes("Enter your 4-digit PIN")
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Invalid PIN. Please try again.")
      ).not.toBeInTheDocument();
    });
  });

  // ============================
  // REF AND IMPERATIVE HANDLE TESTS
  // ============================
  describe("Ref and Imperative Handle", () => {
    it("should expose resetOtpValues method", async () => {
      const ref = createRef<DsOtpRef>();
      const onComplete = vi.fn();

      render(<DsOtp ref={ref} onComplete={onComplete} initialOtp="123456" />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

      // Verify initial values
      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
      expect(inputs[2]).toHaveValue("3");

      // Reset values using ref
      ref.current?.resetOtpValues();

      await waitFor(() => {
        inputs.forEach((input) => {
          expect(input).toHaveValue("");
        });
      });
    });

    it("should expose domNode reference", () => {
      const ref = createRef<DsOtpRef>();

      render(<DsOtp ref={ref} onComplete={() => {}} />);

      expect(ref.current?.domNode).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.domNode).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should render consistently across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsOtp
            onComplete={() => {}}
            data-testid={`otp-${colorScheme}`}
            label="Verification Code"
            helperText="Enter the code sent to your device"
          />
        ),
        (container, colorScheme) => {
          const otp = container.querySelector(
            `[data-testid="otp-${colorScheme}"]`
          );
          expect(otp).toBeInTheDocument();

          const inputs = container.querySelectorAll('input[type="tel"]');
          expect(inputs.length).toBeGreaterThan(0);

          inputs.forEach((input) => {
            const inputBase = input.closest(".MuiInputBase-root");
            expect(inputBase).toBeInTheDocument();
          });
        }
      );
    });

    it("should render correctly across all color schemes with proper theme hex colors", () => {
      // Theme-specific expectations mapping for input colors
      const themeExpectations = {
        light: {
          expectedColor: PALETTE.primaryWhite,
        },
        dark: {
          expectedColor: PALETTE.primaryBlack,
        },
        highContrast: {
          expectedColor: PALETTE.primaryBlack,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = render(
          <DsOtp
            onComplete={() => {}}
            label="Verification Code"
            helperText="Enter verification code"
          />,
          { colorScheme }
        );

        // Verify basic rendering
        const inputs = container.querySelectorAll('input[type="tel"]');
        expect(inputs.length).toBeGreaterThan(0);

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Verify computed styles reference the correct CSS custom properties
        inputs.forEach((input) => {
          const inputBase = input.closest(".MuiInputBase-root") as HTMLElement;

          if (inputBase) {
            const computedStyles = getComputedStyle(inputBase);
            const background = computedStyles.background;
            expect(background).toBe("var(--ds-colour-surfacePrimary)");

            // In test environment, CSS custom properties may not resolve, so check for the actual theme color
            const actualcolor = schemeData?.ds?.colour?.surfacePrimary;
            const expectedColor = expectations.expectedColor;
            // Verify that the theme color matches expectations
            expect(actualcolor).toBe(expectedColor);
          }
        });

        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsOtp onComplete={() => {}} />);

      expect(container.firstChild).toMatchSnapshot("otp-default");
    });

    it("should match snapshot with custom length", () => {
      const { container } = render(<DsOtp onComplete={() => {}} length={4} />);

      expect(container.firstChild).toMatchSnapshot("otp-length-4");
    });

    it("should match snapshot with label and helper text", () => {
      const { container } = render(
        <DsOtp
          onComplete={() => {}}
          label="Verification Code"
          helperText="Enter the 6-digit code sent to your device"
        />
      );

      expect(container.firstChild).toMatchSnapshot("otp-with-label-helper");
    });

    it("should match snapshot with initial OTP value", () => {
      const { container } = render(
        <DsOtp onComplete={() => {}} initialOtp="123456" />
      );

      expect(container.firstChild).toMatchSnapshot("otp-with-initial-value");
    });

    it("should match snapshots with different states", () => {
      const states = [
        { props: { disabled: true }, name: "disabled" },
        { props: { error: true }, name: "error" },
        { props: { success: true }, name: "success" },
        { props: { disabled: true, error: true }, name: "disabled-error" },
      ];

      states.forEach(({ props, name }) => {
        const { container, unmount } = render(
          <DsOtp onComplete={() => {}} {...props} />
        );
        expect(container.firstChild).toMatchSnapshot(`otp-state-${name}`);
        unmount();
      });
    });

    it("should match snapshots with different colors", () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
      ];

      colors.forEach((color) => {
        const { container, unmount } = render(
          <DsOtp onComplete={() => {}} color={color as any} />
        );
        expect(container.firstChild).toMatchSnapshot(`otp-color-${color}`);
        unmount();
      });
    });

    it("should match snapshot with ds-variant otp", () => {
      const { container } = render(<DsOtp onComplete={() => {}} />);

      // Verify ds-variant attribute is present in snapshot
      const inputBases = container.querySelectorAll(".MuiInputBase-root");
      inputBases.forEach((inputBase) => {
        expect(inputBase).toHaveAttribute("ds-variant", "otp");
      });

      expect(container.firstChild).toMatchSnapshot("otp-ds-variant");
    });

    it("should match snapshot with custom name attribute", () => {
      const { container } = render(
        <DsOtp onComplete={() => {}} name="verification-code" />
      );

      expect(container.firstChild).toMatchSnapshot("otp-custom-name");
    });

    it("should match snapshot with autoFocus", () => {
      const { container } = render(<DsOtp onComplete={() => {}} autoFocus />);

      expect(container.firstChild).toMatchSnapshot("otp-auto-focus");
    });

    it("should match snapshots across all themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = render(
          <DsOtp
            onComplete={() => {}}
            label="Verification Code"
            helperText="Enter verification code"
          />,
          { colorScheme }
        );

        expect(container.firstChild).toMatchSnapshot(
          `otp-theme-${colorScheme}`
        );
        unmount();
      });
    });

    it("should match snapshot with success state across themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = render(
          <DsOtp
            success
            onComplete={() => {}}
            label="Success OTP"
            helperText="OTP in success state"
          />,
          { colorScheme }
        );

        expect(container.firstChild).toMatchSnapshot(
          `otp-success-theme-${colorScheme}`
        );
        unmount();
      });
    });

    it("should match snapshot with error state and helper text", () => {
      const { container } = render(
        <DsOtp
          onComplete={() => {}}
          error
          label="PIN Code"
          helperText="Invalid PIN. Please try again."
        />
      );

      expect(container.firstChild).toMatchSnapshot("otp-error-with-helper");
    });

    it("should match snapshot with different lengths", () => {
      const lengths = [3, 4, 5, 6, 8];

      lengths.forEach((length) => {
        const { container, unmount } = render(
          <DsOtp onComplete={() => {}} length={length} />
        );
        expect(container.firstChild).toMatchSnapshot(`otp-length-${length}`);
        unmount();
      });
    });

    it("should match snapshot in form context", () => {
      const { container } = render(
        <form>
          <DsOtp
            onComplete={() => {}}
            name="otp-field"
            label="Form OTP"
            helperText="Enter OTP in form"
          />
        </form>
      );

      expect(container.firstChild).toMatchSnapshot("otp-in-form");
    });

    it("should match snapshot with real-world phone verification scenario", () => {
      const { container } = render(
        <DsPaper sx={{ p: 3, maxWidth: 400 }}>
          <DsTypography variant="bodyBoldLarge" gutterBottom>
            Phone Verification
          </DsTypography>
          <DsTypography variant="bodyRegularSmall" gutterBottom>
            Enter the 6-digit code sent to your phone
          </DsTypography>
          <DsOtp
            onComplete={() => {}}
            length={6}
            label="Verification Code"
            helperText="Code expires in 5 minutes"
            autoFocus
          />
          <DsStack direction="row" spacing={2} sx={{ mt: 2 }}>
            <DsButton variant="contained" color="primary">
              Verify
            </DsButton>
            <DsButton variant="text">Resend Code</DsButton>
          </DsStack>
        </DsPaper>
      );

      expect(container.firstChild).toMatchSnapshot(
        "otp-phone-verification-scenario"
      );
    });

    it("should match snapshot with 2FA authentication scenario", () => {
      const { container } = render(
        <DsBox
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 400,
          }}
        >
          <DsTypography variant="bodyBoldLarge">
            Two-Factor Authentication
          </DsTypography>
          <DsTypography variant="bodyRegularSmall">
            Enter the code from your authenticator app
          </DsTypography>
          <DsOtp
            onComplete={() => {}}
            length={6}
            label="Authentication Code"
            name="auth-code"
            helperText="Enter the 6-digit code from your app"
          />
          <DsButton variant="contained" fullWidth>
            Continue
          </DsButton>
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot(
        "otp-2fa-authentication-scenario"
      );
    });
  });
});
