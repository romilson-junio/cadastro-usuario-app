import { User } from "./user"

export interface UserCreated extends User {
  email: string
  password: string
  passwordConfirmation: string
}
