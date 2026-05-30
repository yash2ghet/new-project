"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteUserDialog({ open, onClose, onConfirm }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border border-gray-200 text-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-[#111111]">Delete User?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            This action cannot be undone. This will permanently delete the user account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-[#d81b60] hover:bg-[#c2185b] text-white font-semibold"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}