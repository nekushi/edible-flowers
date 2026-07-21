import { FormState, SignupFormSchema } from "@/lib/definition";

// export async function signup(formData: FormData) {
// export async function login(state: FormState, formData: FormData): Promise<void> {
export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get("username");
  console.log(username);
  const password = formData.get("password");
  console.log(password);

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
}
