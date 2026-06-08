"use client"

import * as React from "react"
import { RotateCw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTable } from "@/components/dashboard/user-management/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserColumns } from "@/components/dashboard/user-management/columns"

import { UserDialog } from "@/components/dashboard/user-management/user-dialog"
import { DeleteUserDialog } from "@/components/dashboard/user-management/delete-user-dialog"

import type { User } from "@/types/user"

const API_URL = "http://localhost:4000/api/v1/users"

export default function UserManagementPage() {
  const [data, setData] = React.useState<User[]>([])

  const [globalFilter, setGlobalFilter] = React.useState("")
  const [searchInput, setSearchInput] = React.useState("")

  const [loading, setLoading] = React.useState(false)

  const [open, setOpen] = React.useState(false)
  const [editUser, setEditUser] = React.useState<User | null>(null)

  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(5)
  const [totalPages, setTotalPages] = React.useState(1)
  const [totalUsers, setTotalUsers] = React.useState(0)

  const columns = React.useMemo(
    () =>
      getUserColumns(
        (user) => {
          setEditUser(user)
          setOpen(true)
        },
        (user) => {
          setSelectedUser(user)
          setDeleteOpen(true)
        }
      ),
    []
  )

  const fetchUsers = async () => {
  setLoading(true)

    try {
      const token = localStorage.getItem("authToken")

      const res = await fetch(
        `${API_URL}?page=${page}&limit=${pageSize}&search=${globalFilter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const json = await res.json()

      setTotalPages(json.totalPages || 1)
      setTotalUsers(json.total || 0)

      console.log("API RESPONSE:", json)

      const users = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json.users)
        ? json.users
        : Array.isArray(json)
        ? json
        : []

      const formattedUsers = users.map((user: any) => ({
        _id: user._id,
        id: user._id,
        name:
          `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        role: user.role || "user",
        status: user.isActive ? "active" : "inactive",
      }))

      setData(formattedUsers)
    } catch (error) {
      console.error("Fetch users error:", error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [page, pageSize, globalFilter])

  const handleSave = async (user: User) => {
    try {
      const payload = {
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ").slice(1).join(" ") || "User",
        email: user.email,
        role: user.role,
        isActive: user.status === "active",
      }

      if (user._id) {
        await fetch(`http://localhost:4000/api/v1/users/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        })
      }

      else {
        await fetch(`http://localhost:4000/api/v1/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        })
      }

      await fetchUsers()  
      setOpen(false)

    } catch (err) {
      console.error("Save error:", err)
    }
  }

  const handleDelete = async () => {
  if (!selectedUser) return

  try {
    const token = localStorage.getItem("authToken")

    await fetch(`${API_URL}/${selectedUser.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    fetchUsers()
    setDeleteOpen(false)

  } catch (error) {
    console.error("Delete user error:", error)
  }
}

  return (
    <div className="bg-[#f7f7f7] px-6 py-3 min-h-screen flex flex-col">

      <div className="mb-8">
        <h1
          style={{
            fontSize: "38px",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.5px",
            color: "#111111",
            margin: 0,
            padding: 0,
          }}
        >
          User Management
        </h1>
      </div>

      <div className="flex items-center justify-between mb-6">

        <form
          className="flex items-center"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              placeholder="Search for users"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
                setGlobalFilter(e.target.value)
              }}
              className="w-[320px] h-9 pl-10 rounded-r-none border-gray-300 bg-white focus-visible:ring-0"
            />
          </div>

          <Button
            type="button"
            className="h-9 rounded-l-none bg-[#e0a33a] hover:bg-[#cf952f] text-black font-semibold px-8"
          >
            Search
          </Button>
        </form>

        <div className="flex items-center gap-3">

          <Button
            onClick={() => {
              setEditUser(null)
              setOpen(true)
            }}
            className="h-9 px-4 bg-[#d81b60] hover:bg-[#c2185b] text-white font-semibold rounded-md"
          >
            Add User
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setGlobalFilter("")
              setSearchInput("")
              fetchUsers()
            }}
            className="h-9 w-11 p-0 border border-gray-300 bg-white"
          >
            <RotateCw className="h-4 w-4 text-gray-600" />
          </Button>

        </div>
      </div>

      {loading ? (
        <div className="space-y-3 p-6 bg-white">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[240px]" />
              <Skeleton className="h-8 w-[100px] rounded-full" />
              <Skeleton className="h-10 w-[160px]" />
            </div>
          ))}
        </div>
      ) : (
        <>

          <DataTable
            columns={columns}
            data={data}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalUsers={totalUsers}
            setPageSize={setPageSize}
            pageSize={pageSize}
          />

          <UserDialog
            open={open}
            onClose={() => setOpen(false)}
            onSave={handleSave}
            initialData={editUser}
          />

          <DeleteUserDialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}