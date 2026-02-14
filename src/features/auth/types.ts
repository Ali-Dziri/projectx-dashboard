export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  csrfToken: string;
}
