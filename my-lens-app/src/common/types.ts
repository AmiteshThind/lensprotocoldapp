export interface WizzPost {
  category: string;
  description: string;
  media: File | null;
}

export interface WizzPostFormError {
  categoryError: string;
  descriptionError: string;
}
