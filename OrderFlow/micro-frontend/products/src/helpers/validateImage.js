export const validateImage = (file) => {
  return new Promise((resolve, reject) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const { type, size } = file;

    // Check if the file type is allowed
    if (!allowedTypes.includes(type)) {
      reject(
        "Invalid file type. Please upload a valid image (JPEG, PNG, or GIF)."
      );
      return;
    }

    // Create an Image object to check dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check image dimensions
      const minWidth = 500;
      const maxWidth = 10000;
      const minHeight = 500;
      const maxHeight = 10000;

      if (
        img.width < minWidth ||
        img.width > maxWidth ||
        img.height < minHeight ||
        img.height > maxHeight
      ) {
        reject(
          "Invalid image dimensions. Please upload an image between 500px and 10,000px on each side."
        );
      } else {
        // Check file size
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (size > maxSize) {
          reject("Invalid file size. Please upload an image lower than 5MB.");
        } else {
          resolve("Image is valid.");
        }
      }
    };

    img.onerror = () => {
      reject("Error loading image. Please try again.");
    };
  });
};
