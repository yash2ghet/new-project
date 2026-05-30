export type User = {
  _id?: string
  id?: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
}