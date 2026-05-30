"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { User } from "@/types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  open: boolean
  onClose: () => void
  onSave: (user: User) => void | Promise<void>
  initialData?: User | null
}

export function UserDialog({ open, onClose, onSave, initialData }: Props) {
  const [form, setForm] = React.useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "user",
    status: "active",
  })

  React.useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      })
    } else {
      setForm({
        name: "",
        email: "",
        role: "user",
        status: "active",
      })
    }
  }, [initialData, open])

  const handleChange = (key: keyof Omit<User, "id">, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    onSave({ ...(form as User), _id: initialData?._id, id: initialData?.id, })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border border-gray-200 shadow-lg text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold" style={{color: "#111111"}}>
            {initialData ? "Edit User" : "Create User"}
          </DialogTitle>

          <DialogDescription>
              Manage user information here.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              Name
            </Label>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-10 border-gray-300 text-black focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              Email
            </Label>
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-10 border-gray-300 text-black focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              Role
            </Label>

            <Select
              value={form.role}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger className="w-full h-10 border-gray-300">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-500">
              User Status
            </Label>

            <Select
              value={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="w-full h-10 border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="bg-[#d81b60] hover:bg-[#c2185b] text-white font-semibold px-5 h-10"
          >
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}