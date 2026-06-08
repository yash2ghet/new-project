"use client"

import * as React from "react"
import { getUserColumns } from "@/components/dashboard/user-management/columns"
import { DataTable } from "@/components/dashboard/user-management/data-table"
import { UserDialog } from "@/components/dashboard/user-management/user-dialog"
import { DeleteUserDialog } from "@/components/dashboard/user-management/delete-user-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCw, Search } from "lucide-react"

import type { User } from "@/types/user"

export default function UserManagementPage() {

  const [data, setData] = React.useState<User[]>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [searchInput, setSearchInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const [open, setOpen] = React.useState(false)
  const [editUser, setEditUser] = React.useState<User | null>(null)

  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

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
      const res = await fetch("http://localhost:4000/api/v1/users")

      const json = await res.json()

      console.log(json)

      setData(json.data || json)
    } catch (error) {
      console.error("Fetch users error:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  const handleSave = async (user: User) => {
    if (user.id) {
      await fetch(`http://localhost:4000/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
    } else {
      await fetch(`http://localhost:4000/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
    }

    await fetchUsers()

    setOpen(false)
  }

  const handleDelete = async () => {
    if (!selectedUser) return
    await fetch(`/api/v1/users/${selectedUser._id}`, {
      method: "DELETE",
    })
    setDeleteOpen(false)
    fetchUsers()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalFilter(searchInput)
  }

  return (
    <div className="w-full min-h-screen bg-white p-8 text-left block">

      <div className="w-full mb-6 block text-left">
        <h1 className="text-3xl font-bold tracking-tight text-black !text-[#111111] antialiased m-0 p-0 block">
          User Management
        </h1>
      </div>

      <div className="w-full flex items-center justify-between gap-4 mb-6">

        <form 
          onSubmit={handleSearchSubmit} 
          className="flex items-center gap-0 border border-gray-300 rounded bg-white w-full max-w-sm overflow-hidden h-10 shadow-sm"
        >
          <div className="flex items-center pl-3 flex-1 bg-white">
            <Search className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
            <Input
              type="text"
              placeholder="Search for users"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-0 shadow-none bg-transparent h-full w-full text-sm text-black p-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button
            type="submit"
            className="h-full bg-[#e5a93c] hover:bg-[#d4982b] text-black font-semibold rounded-none px-5 text-sm shrink-0 border-0 shadow-none transition-colors"
          >
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => {
              setEditUser(null)
              setOpen(true)
            }}
            className="h-10 bg-[#d81b60] hover:bg-[#c2185b] text-white font-semibold rounded px-5 text-sm shadow-sm border-0 transition-colors"
          >
            Add User
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={fetchUsers}
            className="h-10 w-10 border border-gray-300 rounded p-0 text-gray-600 bg-white hover:bg-gray-50 shadow-sm flex items-center justify-center transition-colors"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center text-sm font-medium text-gray-500 bg-white">
            Loading...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            page={1}
            setPage={() => {}}
            pageSize={5}
            setPageSize={() => {}}
            totalPages={1}
            totalUsers={data.length}
          />
        )}
      </div>

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

    </div>
  )
}