"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { User, Mail, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUserProfile(displayName)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account information</p>
      </div>

      <Card className="bg-[#1a1a1a] border-[#481E14] max-w-md">
        <CardHeader>
          <CardTitle className="text-[#F2613F]">Account Details</CardTitle>
          <CardDescription className="text-gray-400">Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Display Name
            </label>
            {isEditing ? (
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-[#0C0C0C] border-[#481E14] text-white"
              />
            ) : (
              <p className="bg-[#0C0C0C] border border-[#481E14] rounded px-3 py-2 text-gray-300">
                {displayName || "Not set"}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <p className="bg-[#0C0C0C] border border-[#481E14] rounded px-3 py-2 text-gray-500">{user?.email}</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              Account Created
            </label>
            <p className="text-gray-400 text-sm">
              {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
            </p>
          </div>

          <div className="pt-4 space-y-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="w-full bg-[#F2613F] hover:bg-[#9B3922] text-white">
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-[#F2613F] hover:bg-[#9B3922] text-white"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="w-full border-[#481E14] text-gray-300 hover:text-[#F2613F]"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
