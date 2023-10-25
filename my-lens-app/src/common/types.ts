export interface WizzPost {
  category: string;
  description: string;
  media: File | null;
}

export interface WizzPostFormError {
  categoryError: string;
  descriptionError: string;
}

export interface WizzComment {
  text: string;
  publicationId: string;
}

export interface WizzCommentError {
  textError: string;
}
