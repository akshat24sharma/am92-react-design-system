/**
 * @vitest-environment jsdom
 *
 * Test suite for DsFileUploader component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the file uploader component with different variants and configurations.
 * 2. Props Validation - Ensure proper handling and validation of props including name, accept, multiple, contentType, and size validation props.
 * 3. Component States - Test various states of the component (disabled, error, empty, with files) and state combinations.
 * 4. MUI Styling - Validate Material-UI specific styling and class application for Stack, InputLabel, and DropZone components.
 * 5. File Upload Functionality - Test core file selection, drag & drop functionality, file validation, and upload state management.
 * 6. Event Handling - Simulate user interactions including file selection, drag events, delete actions, preview, and download operations.
 * 7. Form Integration - Test integration with HTML forms, controlled/uncontrolled components, and form submission scenarios.
 * 8. Accessibility - Check ARIA attributes, screen reader compatibility, and keyboard navigation support for file upload operations.
 * 9. Edge Cases - Handle unusual scenarios like null values, very large files, special characters in filenames, and unicode support.
 * 10. Real-world Scenarios - Test common usage patterns like document uploads, image galleries, profile pictures, and multi-file workflows.
 * 11. Theme Testing - Assess component rendering across different themes (light, dark, high contrast) with proper color integration.
 * 12. Snapshot Testing - Perform visual regression testing for key component states, variants, and custom slot configurations.
 *
 * @package @am92/react-design-system
 * @component DsFileUploader
 */

import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsFileUploader } from "./DsFileUploader.Component";
import { CONTENT_TYPE, VARIANT, ERROR_CODES } from "./DsFileUploader.Types";
import type { TFile } from "./DsFileUploader.Types";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsBox } from "../DsBox";
import { DsButton } from "../DsButton";

describe("DsFileUploader", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Clear any mocks
    vi.clearAllMocks();
  });

  // Mock file objects for testing
  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(["test content"], name, { type });
    Object.defineProperty(file, "size", { value: size, writable: false });
    return file;
  };

  const createMockTFile = (
    name: string,
    size: number,
    type: string,
    contentType: keyof typeof CONTENT_TYPE = "FILE"
  ): TFile<"FILE"> => ({
    name,
    size,
    type,
    content: createMockFile(name, size, type),
    id: `test-id-${name}`,
  });

  // 1. Core Rendering Tests
  describe("Core Rendering", () => {
    it("should render with required props", () => {
      const handleChange = vi.fn();
      const { container } = render(
        <DsFileUploader name="test-file-uploader" onChange={handleChange} />
      );
      // Check for file input element
      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("type", "file");
    });

    it("should render with default title and description", () => {
      const handleChange = vi.fn();
      const { container } = render(
        <DsFileUploader name="test-file-uploader" onChange={handleChange} />
      );
      const title = screen.getByText("Upload document");
      const description = screen.getByText(
        "Click to browse or drop here to upload"
      );
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("should render with default multiple attribute", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader name="test-file-uploader" onChange={handleChange} />
      );
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("multiple");
    });

    it("should render with single file mode when multiple is false", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader
          name="test-file-uploader"
          onChange={handleChange}
          multiple={false}
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).not.toHaveAttribute("multiple");
    });
  });

  // 2. Props Validation Tests
  describe("Props Validation", () => {
    it("should accept custom accept attribute", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader
          name="image-uploader"
          onChange={handleChange}
          accept="image/png,image/jpeg"
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute("accept", "image/png,image/jpeg");
    });

    it("should use default accept value when not provided", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader name="default-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute("accept", "*");
    });

    it("should render with compressed variant", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader
          name="compressed-uploader"
          onChange={handleChange}
          variant={VARIANT.COMPRESSED}
        />
      );
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      //check for compressed variant icon class
      const compressedIcon = container.querySelector(".ri-upload-line");
      expect(compressedIcon).toBeInTheDocument();
    });

    it("should render with full variant", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader
          name="full-variant-uploader"
          onChange={handleChange}
          variant={VARIANT.FULL}
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();

      // Check for the full variant icon class
      const uploadIcon = container.querySelector(".ri-upload-cloud-2-line");
      expect(uploadIcon).toBeInTheDocument();
      expect(uploadIcon).toHaveClass("ri-upload-cloud-2-line");
    });

    it("should render with custom icon using slotProps", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader
          name="custom-icon-uploader"
          onChange={handleChange}
          slotProps={{
            DropZone: {
              IconProps: {
                className: "ri-bank-line",
              },
            },
          }}
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();

      // Check for the custom icon class
      const customIcon = container.querySelector(".ri-bank-line");
      expect(customIcon).toBeInTheDocument();
      expect(customIcon).toHaveClass("ri-bank-line");
    });
  });

  // 3. Component States
  describe("Component States", () => {
    it("should handle controlled component with value prop", () => {
      const handleChange = vi.fn();
      const mockFiles = [createMockTFile("test.txt", 1000, "text/plain")];

      render(
        <DsFileUploader
          name="controlled-uploader"
          onChange={handleChange}
          value={mockFiles}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
          }}
        />
      );

      // Should show selected files segment when value is provided
      expect(screen.getByTestId("selected-segment")).toBeInTheDocument();
    });

    it("should handle empty state correctly", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader
          name="empty-uploader"
          onChange={handleChange}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
            UploadedItemSegment: ({ children }) => (
              <DsBox data-testid="uploaded-segment">{children}</DsBox>
            ),
          }}
        />
      );

      // Should not show any file segments when empty
      expect(screen.queryByTestId("selected-segment")).not.toBeInTheDocument();
      expect(screen.queryByTestId("uploaded-segment")).not.toBeInTheDocument();
    });
  });

  // 4. MUI Styling Tests
  describe("MUI Styling", () => {
    it("should apply DsStack root classes", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader name="styled-uploader" onChange={handleChange} />
      );

      const stackElement = container.querySelector(".MuiStack-root");
      expect(stackElement).toBeInTheDocument();
      expect(stackElement).toHaveClass("MuiStack-root");
    });

    it("should apply MuiInputBase classes to file input", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader name="input-base-uploader" onChange={handleChange} />
      );

      // Check for MuiInputBase-root class
      const inputBaseRoot = container.querySelector(".MuiInputBase-root");
      expect(inputBaseRoot).toBeInTheDocument();
      expect(inputBaseRoot).toHaveClass("MuiInputBase-root");
      expect(inputBaseRoot).toHaveClass("MuiInput-root");
      expect(inputBaseRoot).toHaveClass("MuiInputBase-colorPrimary");

      // Check for MuiInputBase-input class
      const inputBaseInput = container.querySelector(".MuiInputBase-input");
      expect(inputBaseInput).toBeInTheDocument();
      expect(inputBaseInput).toHaveClass("MuiInputBase-input");
      expect(inputBaseInput).toHaveClass("MuiInput-input");

      // Verify it's the file input element
      expect(inputBaseInput).toHaveAttribute("type", "file");
    });
  });

  // 5. Component Functionality Tests
  describe("Component Functionality", () => {
    it("should call onChange when files are selected", async () => {
      const handleChange = vi.fn();
      const mockFile = createMockFile("test.txt", 1000, "text/plain");
      const { container } = render(
        <DsFileUploader name="functional-uploader" onChange={handleChange} />
      );
      const fileInput = container.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      // Mock file selection
      Object.defineProperty(fileInput, "files", {
        value: [mockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "functional-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: "test.txt",
              size: 1000,
              type: "text/plain",
            }),
          ])
        );
      });
    });

    it("should call onError when invalid files are selected", async () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      const largeMockFile = createMockFile("large.txt", 10000000, "text/plain"); // 10MB

      render(
        <DsFileUploader
          name="error-uploader"
          onChange={handleChange}
          onError={handleError}
          maxSize={5000000} // 5MB limit
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [largeMockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          "error-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              errorCode: ERROR_CODES.MAX_FILE_SIZE_EXCEEDED,
            }),
          ])
        );
      });
    });

    it("should handle file type validation", async () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      const invalidFile = createMockFile(
        "test.exe",
        1000,
        "application/x-msdownload"
      );

      render(
        <DsFileUploader
          name="type-validator"
          onChange={handleChange}
          onError={handleError}
          accept="image/*"
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [invalidFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          "type-validator",
          expect.arrayContaining([
            expect.objectContaining({
              errorCode: ERROR_CODES.INVALID_FILE_TYPE,
            }),
          ])
        );
      });
    });

    it("should handle minimum file size validation", async () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      const smallFile = createMockFile("tiny.txt", 50, "text/plain");

      render(
        <DsFileUploader
          name="min-size-validator"
          onChange={handleChange}
          onError={handleError}
          minSize={100}
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [smallFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          "min-size-validator",
          expect.arrayContaining([
            expect.objectContaining({
              errorCode: ERROR_CODES.FILE_SIZE_BELOW_MIN,
            }),
          ])
        );
      });
    });

    it("should handle canDeleteFile async validation", async () => {
      const handleChange = vi.fn();
      const handleDelete = vi.fn();
      const canDeleteFile = vi.fn().mockResolvedValue(false); // Deny delete
      const mockFile = createMockTFile("protected.txt", 1000, "text/plain");

      render(
        <DsFileUploader
          name="delete-validator"
          onChange={handleChange}
          onDelete={handleDelete}
          canDeleteFile={canDeleteFile}
          value={[mockFile]}
          slots={{
            SelectedItemSegment: ({ children, onDelete }) => (
              <DsBox data-testid="selected-segment">
                {children}
                <DsButton
                  data-testid="delete-btn"
                  onClick={() => onDelete?.("delete-validator", mockFile)}
                >
                  Delete
                </DsButton>
              </DsBox>
            ),
          }}
        />
      );

      const deleteButton = screen.getByTestId("delete-btn");
      await user.click(deleteButton);

      await waitFor(() => {
        expect(canDeleteFile).toHaveBeenCalledWith(
          "delete-validator",
          mockFile
        );
      });

      // onDelete should not be called when canDeleteFile returns false
      expect(handleDelete).not.toHaveBeenCalled();
    });

    it("should verify file names when multiple files are selected", async () => {
      const handleChange = vi.fn();
      const mockFiles = [
        createMockFile("document1.pdf", 2000, "application/pdf"),
        createMockFile("image1.jpg", 1500, "image/jpeg"),
        createMockFile(
          "spreadsheet1.xlsx",
          3000,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ),
      ];

      render(
        <DsFileUploader
          name="file-name-checker"
          onChange={handleChange}
          multiple={true}
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      // Mock multiple file selection
      Object.defineProperty(fileInput, "files", {
        value: mockFiles,
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "file-name-checker",
          expect.arrayContaining([
            expect.objectContaining({
              name: "document1.pdf",
              size: 2000,
              type: "application/pdf",
            }),
            expect.objectContaining({
              name: "image1.jpg",
              size: 1500,
              type: "image/jpeg",
            }),
            expect.objectContaining({
              name: "spreadsheet1.xlsx",
              size: 3000,
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
          ])
        );
      });

      // Verify all file names are correctly passed
      const changeCall = handleChange.mock.calls[0];
      const [uploaderName, files] = changeCall;

      expect(uploaderName).toBe("file-name-checker");
      expect(files).toHaveLength(3);

      const fileNames = files.map((file: any) => file.name).sort();
      expect(fileNames).toEqual([
        "document1.pdf",
        "image1.jpg",
        "spreadsheet1.xlsx",
      ]);
    });
  });

  // 6. Event Handling Tests
  describe("Event Handling", () => {
    it("should handle drag and drop events", async () => {
      const handleChange = vi.fn();
      const mockFile = createMockFile("dropped.txt", 1000, "text/plain");

      render(
        <DsFileUploader name="drag-drop-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      // Create a drop event
      const dropEvent = new Event("drop", { bubbles: true });
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: {
          files: [mockFile],
        },
      });

      fireEvent(fileInput, dropEvent);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "drag-drop-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: "dropped.txt",
              size: 1000,
              type: "text/plain",
            }),
          ])
        );
      });
    });

    it("should handle drag over events", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader name="drag-over-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      const dragOverEvent = new Event("dragover", { bubbles: true });
      const preventDefaultSpy = vi.spyOn(dragOverEvent, "preventDefault");

      fireEvent(fileInput, dragOverEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should handle onPreview callback", async () => {
      const handleChange = vi.fn();
      const handlePreview = vi.fn();
      const mockFile = createMockTFile("preview.jpg", 2000, "image/jpeg");

      render(
        <DsFileUploader
          name="preview-uploader"
          onChange={handleChange}
          onPreview={handlePreview}
          value={[mockFile]}
          slots={{
            SelectedItemSegment: ({ children, onPreview }) => (
              <DsBox data-testid="selected-segment">
                {children}
                <DsButton
                  data-testid="preview-btn"
                  onClick={() => onPreview?.("preview-uploader", mockFile)}
                >
                  Preview
                </DsButton>
              </DsBox>
            ),
          }}
        />
      );

      const previewButton = screen.getByTestId("preview-btn");
      await user.click(previewButton);

      expect(handlePreview).toHaveBeenCalledWith("preview-uploader", mockFile);
    });

    it("should handle onDownload callback", async () => {
      const handleChange = vi.fn();
      const handleDownload = vi.fn();
      const mockFile = createMockTFile("download.pdf", 3000, "application/pdf");

      render(
        <DsFileUploader
          name="download-uploader"
          onChange={handleChange}
          onDownload={handleDownload}
          uploadedValue={[mockFile]}
          slots={{
            UploadedItemSegment: ({ children, onDownload }) => (
              <DsBox data-testid="uploaded-segment">
                {children}
                <DsButton
                  data-testid="download-btn"
                  onClick={() => onDownload?.("download-uploader", mockFile)}
                >
                  Download
                </DsButton>
              </DsBox>
            ),
          }}
        />
      );

      const downloadButton = screen.getByTestId("download-btn");
      await user.click(downloadButton);

      expect(handleDownload).toHaveBeenCalledWith(
        "download-uploader",
        mockFile
      );
    });
  });

  // 7. Form Integration Tests
  describe("Form Integration", () => {
    it("should work within a form element and handle form submission", async () => {
      const handleChange = vi.fn();
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const files = formData.getAll("form-file-uploader");
        return files;
      });

      render(
        <form onSubmit={handleSubmit}>
          <DsFileUploader name="form-file-uploader" onChange={handleChange} />
          <DsButton type="submit">Submit</DsButton>
        </form>
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: "Submit" });
      const mockFile = createMockFile("form-test.pdf", 2000, "application/pdf");

      // Verify form structure
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("type", "file");
      expect(submitButton).toBeInTheDocument();

      // Upload a file
      Object.defineProperty(fileInput, "files", {
        value: [mockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "form-file-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: "form-test.pdf",
            }),
          ])
        );
      });

      // Submit the form
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(HTMLFormElement),
          type: "submit",
        })
      );
    });

    it("should handle controlled component updates", () => {
      const handleChange = vi.fn();
      const mockFiles = [createMockTFile("controlled.txt", 1000, "text/plain")];

      const { rerender } = render(
        <DsFileUploader
          name="controlled-uploader"
          onChange={handleChange}
          value={[]}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
          }}
        />
      );

      expect(screen.queryByTestId("selected-segment")).not.toBeInTheDocument();

      rerender(
        <DsFileUploader
          name="controlled-uploader"
          onChange={handleChange}
          value={mockFiles}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
          }}
        />
      );

      expect(screen.getByTestId("selected-segment")).toBeInTheDocument();
    });

    it("should handle form reset", async () => {
      const handleChange = vi.fn();

      render(
        <form>
          <DsFileUploader name="reset-uploader" onChange={handleChange} />
          <button type="reset">Reset</button>
        </form>
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      const form = document.querySelector("form") as HTMLFormElement;
      const resetButton = screen.getByRole("button", { name: "Reset" });
      const mockFile = createMockFile(
        "test-reset.pdf",
        1500,
        "application/pdf"
      );

      // First, add a file to the input
      Object.defineProperty(fileInput, "files", {
        value: [mockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "reset-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: "test-reset.pdf",
            }),
          ])
        );
      });

      // Verify file was added
      expect(fileInput.files).toHaveLength(1);

      // Reset the form using the reset button
      await user.click(resetButton);

      // Verify the input value is cleared after reset
      // Note: In test environment, form.reset() clears the value but not the mocked files property
      expect(fileInput.value).toBe("");

      // Also test programmatic reset
      form.reset();
      expect(fileInput.value).toBe("");
    });
  });

  // 8. Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper input element for screen readers", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader name="accessible-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("type", "file");
    });

    it("should support keyboard navigation", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader name="keyboard-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      fileInput.focus();
      expect(fileInput).toHaveFocus();
    });

    it("should handle file type restrictions for accessibility", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader
          name="restricted-uploader"
          onChange={handleChange}
          accept="image/*"
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute("accept", "image/*");
    });
  });

  // 9. Edge Cases Tests
  describe("Edge Cases", () => {
    it("should handle null/undefined values gracefully", () => {
      const handleChange = vi.fn();

      render(
        <DsFileUploader
          name="null-value-uploader"
          onChange={handleChange}
          value={null}
        />
      );

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
    });

    it("should handle very large file names", () => {
      const handleChange = vi.fn();
      const longFileName = "a".repeat(255) + ".txt";
      const mockFile = createMockTFile(longFileName, 1000, "text/plain");

      render(
        <DsFileUploader
          name="long-name-uploader"
          onChange={handleChange}
          value={[mockFile]}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
          }}
        />
      );

      expect(screen.getByTestId("selected-segment")).toBeInTheDocument();
    });

    it("should handle special characters in file names", async () => {
      const handleChange = vi.fn();
      const specialFileName = "test-file!@#$%^&*()_+.txt";
      const mockFile = createMockFile(specialFileName, 1000, "text/plain");

      render(
        <DsFileUploader name="special-chars-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [mockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "special-chars-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: specialFileName,
            }),
          ])
        );
      });
    });

    it("should handle unicode characters in file names", async () => {
      const handleChange = vi.fn();
      const unicodeFileName = "测试文件-🌟-ñáéíóú.txt";
      const mockFile = createMockFile(unicodeFileName, 1000, "text/plain");

      render(
        <DsFileUploader name="unicode-uploader" onChange={handleChange} />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [mockFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "unicode-uploader",
          expect.arrayContaining([
            expect.objectContaining({
              name: unicodeFileName,
            }),
          ])
        );
      });
    });
  });

  // 10. Real-world Scenarios Tests
  describe("Real-world Scenarios", () => {
    it("should handle multiple file upload scenario", async () => {
      const handleChange = vi.fn();
      const files = [
        createMockFile("document1.pdf", 2000, "application/pdf"),
        createMockFile("image1.jpg", 3000, "image/jpeg"),
        createMockFile(
          "spreadsheet1.xlsx",
          4000,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ),
      ];

      render(
        <DsFileUploader
          name="multi-file-uploader"
          onChange={handleChange}
          multiple={true}
          accept="application/pdf,image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: files,
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "multi-file-uploader",
          expect.arrayContaining([
            expect.objectContaining({ name: "document1.pdf" }),
            expect.objectContaining({ name: "image1.jpg" }),
            expect.objectContaining({ name: "spreadsheet1.xlsx" }),
          ])
        );
      });
    });

    it("should handle profile picture upload scenario", async () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      const profileImage = createMockFile("profile.jpg", 1500000, "image/jpeg"); // 1.5MB

      render(
        <DsFileUploader
          name="profile-uploader"
          onChange={handleChange}
          onError={handleError}
          multiple={false}
          accept="image/*"
          maxSize={2000000} // 2MB limit
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [profileImage],
        writable: false,
      });

      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "profile-uploader",
          expect.objectContaining({
            name: "profile.jpg",
            size: 1500000,
            type: "image/jpeg",
          })
        );
      });

      expect(handleError).not.toHaveBeenCalled();
    });

    it("should handle file replacement in single file mode", async () => {
      const handleChange = vi.fn();
      const handleDelete = vi.fn();
      const existingFile = createMockTFile(
        "old-resume.pdf",
        2000,
        "application/pdf"
      );
      const newFile = createMockFile("new-resume.pdf", 2500, "application/pdf");

      render(
        <DsFileUploader
          name="resume-uploader"
          onChange={handleChange}
          onDelete={handleDelete}
          multiple={false}
          uploadedValue={existingFile}
        />
      );

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      Object.defineProperty(fileInput, "files", {
        value: [newFile],
        writable: false,
      });

      fireEvent.change(fileInput);

      // Should call onDelete for the existing file when replacing
      await waitFor(() => {
        expect(handleDelete).toHaveBeenCalledWith(
          "resume-uploader",
          existingFile
        );
      });

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(
          "resume-uploader",
          expect.objectContaining({
            name: "new-resume.pdf",
          })
        );
      });
    });
  });

  // 11. Theme Testing Tests
  describe("Theme Testing", () => {
    it("should use correct colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ["light", "dark", "highContrast"] as const;
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
        const { container } = render(
          <DsFileUploader
            name={`color-test-uploader-${colorScheme}`}
            onChange={vi.fn()}
          />,
          { colorScheme }
        );
        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];
        // Test InputLabel uses proper theme colors
        const inputLabel = container.querySelector(".MuiInputBase-root");
        expect(inputLabel).toBeInTheDocument();
        const computedStyle = getComputedStyle(inputLabel!);
        expect(computedStyle.background).toBe(
          `var(--ds-colour-surfacePrimary)`
        );

        const actualcolor = schemeData?.ds?.colour?.surfacePrimary;

        expect(actualcolor).toBe(expectations.expectedColor);
      });
    });
  });

  // 12. Snapshot Testing Tests
  describe("Snapshot Testing", () => {
    it("should match snapshot with default props", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader name="snapshot-default" onChange={handleChange} />
      );

      expect(container.firstChild).toMatchSnapshot("file-uploader-default");
    });

    it("should match snapshot with all props", () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      const handleDelete = vi.fn();
      const handlePreview = vi.fn();
      const handleDownload = vi.fn();
      const mockFiles = [createMockTFile("snapshot.txt", 1000, "text/plain")];

      const { container } = render(
        <DsFileUploader
          name="snapshot-full"
          onChange={handleChange}
          onError={handleError}
          onDelete={handleDelete}
          onPreview={handlePreview}
          onDownload={handleDownload}
          value={mockFiles}
          uploadedValue={mockFiles}
          multiple={true}
          accept="text/*"
          minSize={100}
          maxSize={10000}
          contentType={CONTENT_TYPE.FILE}
          variant={VARIANT.FULL}
          InputLabelProps={{
            children: "Full Featured File Uploader",
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot("file-uploader-full-props");
    });

    it("should match snapshot in single file mode", () => {
      const handleChange = vi.fn();
      const mockFile = createMockTFile(
        "single-file.pdf",
        2000,
        "application/pdf"
      );

      const { container } = render(
        <DsFileUploader
          name="snapshot-single"
          onChange={handleChange}
          multiple={false}
          value={mockFile}
          variant={VARIANT.COMPRESSED}
          slots={{
            SelectedItemSegment: ({ children }) => (
              <DsBox data-testid="selected-segment">{children}</DsBox>
            ),
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot("file-uploader-single-file");
    });

    it("should match snapshot with custom slotProps", () => {
      const handleChange = vi.fn();

      const { container } = render(
        <DsFileUploader
          name="snapshot-slot-props"
          onChange={handleChange}
          InputLabelProps={{
            children: "Custom Styled Uploader",
            sx: { fontWeight: "bold" },
          }}
          slotProps={{
            DropZone: {
              title: "Drop your files here",
              description: "Supports PDF, DOC, and image files",
              sx: { border: "2px dashed" },
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot(
        "file-uploader-custom-slot-props"
      );
    });

    it("should match snapshot across all variants", () => {
      const handleChange = vi.fn();
      const variants = [VARIANT.FULL, VARIANT.COMPRESSED] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <DsFileUploader
            name={`snapshot-variant-${variant}`}
            onChange={handleChange}
            variant={variant}
            InputLabelProps={{
              children: `${variant} Variant Uploader`,
            }}
          />
        );

        expect(container.firstChild).toMatchSnapshot(
          `file-uploader-variant-${variant.toLowerCase()}`
        );
      });
    });

    it("should match snapshot with error states", () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();

      const { container } = render(
        <DsFileUploader
          name="snapshot-error"
          onChange={handleChange}
          onError={handleError}
          maxSize={1000} // Small limit to trigger errors
          accept="image/*"
          InputLabelProps={{
            children: "Restricted File Uploader",
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot(
        "file-uploader-with-restrictions"
      );
    });
  });
});
