"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from 'lucide-react'
import AddEditDialog from "./add-edit-dialog"
import DeleteDialog from "./delete-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createContact, deleteContact, getContacts, updateContact } from "../../lib/api"

export default function CrudSection() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        setError(null)
        const contacts = await getContacts()
        setData(contacts)
      } catch (err) {
        setError("Không thể tải danh sách liên hệ. Vui lòng thử lại.")
        console.error("Error fetching contacts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const handleAdd = () => {
    setEditingItem(null)
    setIsAddEditOpen(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsAddEditOpen(true)
  }

  const handleDelete = (item) => {
    setDeletingItem(item)
    setIsDeleteOpen(true)
  }

  const refreshData = async () => {
    try {
      const contacts = await getContacts()
      setData(contacts)
    } catch (err) {
      console.error("Error refreshing contacts:", err)
    }
  }

  const handleSave = async (formData, deletedItems) => {
    try {
      setIsSaving(true)
      if (editingItem) {
        // Update existing contact
        await updateContact({ ...formData, id: editingItem.id }, deletedItems)
        setMessage({ type: "success", text: "Cập nhật liên hệ thành công!" })
      } else {
        // Create new contact
        await createContact(formData)
        setMessage({ type: "success", text: "Thêm liên hệ thành công!" })
      }

      setIsAddEditOpen(false)
      setEditingItem(null)

      // Refresh data from server
      await refreshData()

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error) {
      setMessage({ type: "error", text: `Lỗi: ${error.message}` })
      setTimeout(() => setMessage({ type: "", text: "" }), 5000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      setIsSaving(true)
      await deleteContact(deletingItem.id)
      setIsDeleteOpen(false)
      setDeletingItem(null)

      // Refresh data from server
      await refreshData()

      setMessage({ type: "success", text: "Xóa liên hệ thành công!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 2000)
    } catch (error) {
      setMessage({ type: "error", text: `Lỗi khi xóa: ${error.message}` })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const renderMultipleItems = (items, type) => {
    if (!items || items.length === 0) return "-"

    return (
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="truncate" title={item.value}>
              {type === "website" && item.value ? (
                <a
                  href={item.value.startsWith("http") ? item.value : `https://${item.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </div>
            <Badge variant="secondary" className="text-xs w-fit">
              {item.type}
            </Badge>
          </div>
        ))}
      </div>
    )
  }

  const getFullAddress = (item) => {
    const parts = [item.addressStreet, item.addressCity, item.addressRegion].filter(Boolean)
    return parts.join(", ")
  }

  const getFullName = (item) => {
    const parts = [item.fname, item.lname].filter(Boolean)
    return parts.join(" ")
  }

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Danh sách liên hệ</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Ngân hàng</TableHead>
                <TableHead>Số tài khoản</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      <span className="ml-2">Đang tải...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-red-600">
                      <p>{error}</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                        Thử lại
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <p className="text-gray-500">Chưa có liên hệ nào</p>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[150px] truncate" title={getFullName(item)}>
                      {getFullName(item)}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={getFullAddress(item)}>
                      {getFullAddress(item)}
                    </TableCell>
                    <TableCell className="max-w-[180px]">{renderMultipleItems(item.phones, "phone")}</TableCell>
                    <TableCell className="max-w-[180px]">{renderMultipleItems(item.emails, "email")}</TableCell>
                    <TableCell className="max-w-[180px]">{renderMultipleItems(item.websites, "website")}</TableCell>
                    <TableCell className="max-w-[120px] truncate" title={item.bankName}>
                      {item.bankName}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate" title={item.bankAccount}>
                      {item.bankAccount}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {isSaving && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg border">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium">Đang xử lý...</span>
          </div>
        </div>
      )}
      {message.text && (
        <div className="px-6 pb-4">
          <Alert className={message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
            <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.text}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <AddEditDialog
        open={isAddEditOpen}
        onOpenChange={setIsAddEditOpen}
        item={editingItem}
        onSave={handleSave}
        isLoading={isSaving}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        item={deletingItem}
        onConfirm={handleConfirmDelete}
        isLoading={isSaving}
      />
    </Card>
  )
}