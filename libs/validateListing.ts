import { SellFormData } from "@/app/components/SellForm";


export type ValidationErrors = Partial<
  Record<keyof SellFormData, string>
>;


export 
function validateSellForm(
  data: SellFormData
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  }

  if (!Number.isFinite(data.price) || data.price <= 0) {
    errors.price = "Enter a valid price";
  }

  if (!data.category) {
    errors.category = "Category is required";
  }

  if (!Number.isInteger(data.stock) || data.stock < 0) {
    errors.stock = "Enter a valid stock quantity";
  }

  return errors;
}
