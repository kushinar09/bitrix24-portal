"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

const PHONE_TYPES = ["WORK", "MOBILE", "FAX", "HOME", "PAGER", "MAILING", "OTHER"]
const EMAIL_TYPES = ["WORK", "HOME", "MAILING", "OTHER"]
const WEBSITE_TYPES = ["WORK", "HOME", "FACEBOOK", "VK", "LIVEJOURNAL", "TWITTER", "OTHER"]

export default function AddEditDialog({ open, onOpenChange, item, onSave }) {
  const [deletedItems, setDeletedItems] = useState({
    phones: [],
    emails: [],
    websites: [],
  })
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phones: [{ id: -1, type: "WORK", value: "" }],
    emails: [{ id: -1, type: "WORK", value: "" }],
    websites: [{ id: -1, type: "WORK", value: "" }],
    addressId: -1,
    addressStreet: "",
    addressCity: "",
    addressRegion: "",
    bankName: "",
    bankAccount: "",
  })

  useEffect(() => {
    setDeletedItems({ phones: [], emails: [], websites: [] })

    if (item) {
      setFormData({
        ...item,
        phones:
          item.phones?.length > 0
            ? item.phones.map((p) => ({ ...p, id: p.id || -1 }))
            : [{ id: -1, type: "WORK", value: "" }],
        emails:
          item.emails?.length > 0
            ? item.emails.map((e) => ({ ...e, id: e.id || -1 }))
            : [{ id: -1, type: "WORK", value: "" }],
        websites:
          item.websites?.length > 0
            ? item.websites.map((w) => ({ ...w, id: w.id || -1 }))
            : [{ id: -1, type: "WORK", value: "" }],
      })
    } else {
      setFormData({
        fname: "",
        lname: "",
        phones: [{ id: -1, type: "WORK", value: "" }],
        emails: [{ id: -1, type: "WORK", value: "" }],
        websites: [{ id: -1, type: "WORK", value: "" }],
        addressId: -1,
        addressStreet: "",
        addressCity: "",
        addressRegion: "",
        bankName: "",
        bankAccount: "",
      })
    }
  }, [item, open])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayItemChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addArrayItem = (arrayName, defaultType) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { id: -1, type: defaultType, value: "" }],
    }))
  }

  const removeArrayItem = (arrayName, index) => {
    const itemToRemove = formData[arrayName][index]

    // If item has existing id (not -1), add to deleted list
    if (itemToRemove.id && itemToRemove.id !== -1) {
      setDeletedItems((prev) => ({
        ...prev,
        [arrayName]: [...prev[arrayName], itemToRemove.id],
      }))
    }

    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Filter out empty values
    const cleanedData = {
      ...formData,
      phones: formData.phones.filter((item) => item.value.trim() !== ""),
      emails: formData.emails.filter((item) => item.value.trim() !== ""),
      websites: formData.websites.filter((item) => item.value.trim() !== "")
    }

    onSave(cleanedData, deletedItems)
  }

  const renderArraySection = (title, arrayName, types, placeholder) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {formData[arrayName].map((item, index) => (
          <div
            key={item.id !== -1 ? `${arrayName}-${item.id}` : `${arrayName}-new-${index}`}
            className="flex gap-2 items-end"
          >
            <div className="flex-1">
              <Label className="text-xs">Giá trị</Label>
              <Input
                value={item.value}
                onChange={(e) => handleArrayItemChange(arrayName, index, "value", e.target.value)}
                placeholder={placeholder}
              />
            </div>
            <div className="w-32">
              <Label className="text-xs">Loại</Label>
              <Select
                value={item.type}
                onValueChange={(value) => handleArrayItemChange(arrayName, index, "type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem(arrayName, index)}
              disabled={formData[arrayName].length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem(arrayName, types[0])}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm {title.toLowerCase()}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Chỉnh sửa liên hệ" : "Thêm liên hệ mới"}</DialogTitle>
          <DialogDescription>{item ? "Cập nhật thông tin liên hệ" : "Nhập thông tin liên hệ mới"}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">Tên *</Label>
                  <Input
                    id="fname"
                    value={formData.fname}
                    onChange={(e) => handleChange("fname", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Họ</Label>
                  <Input id="lname" value={formData.lname} onChange={(e) => handleChange("lname", e.target.value)} />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressStreet">Địa chỉ</Label>
                  <Input
                    id="addressStreet"
                    value={formData.addressStreet}
                    onChange={(e) => handleChange("addressStreet", e.target.value)}
                    placeholder="Số nhà, đường"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressRegion">Xã/Phường</Label>
                  <Input
                    id="addressRegion"
                    value={formData.addressRegion}
                    onChange={(e) => handleChange("addressRegion", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressCity">Tỉnh/Thành phố</Label>
                  <Input
                    id="addressCity"
                    value={formData.addressCity}
                    onChange={(e) => handleChange("addressCity", e.target.value)}
                  />
                </div>
              </div>

              {/* Bank Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Tên ngân hàng</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Số tài khoản</Label>
                  <Input
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => handleChange("bankAccount", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Arrays */}
            <div className="grid grid-cols-1 gap-4">
              {renderArraySection("Số điện thoại", "phones", PHONE_TYPES, "0909123456")}
              {renderArraySection("Email", "emails", EMAIL_TYPES, "example@email.com")}
              {renderArraySection("Website", "websites", WEBSITE_TYPES, "https://example.com")}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">{item ? "Cập nhật" : "Thêm mới"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
