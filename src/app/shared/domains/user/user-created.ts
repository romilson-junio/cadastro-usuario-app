import { User } from "./user"

export interface UserCreated extends User {
  password: string
  passwordConfirmation: string
}
