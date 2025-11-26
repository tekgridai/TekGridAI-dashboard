"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Database, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your preferences and security</p>
      </div>

      <div className="space-y-4 max-w-md">
        <Card className="bg-[#1a1a1a] border-[#481E14]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription className="text-gray-400">Manage alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-300">Email alerts for high-risk events</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-300">Weekly risk summary</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-gray-300">System maintenance alerts</span>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#481E14]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription className="text-gray-400">Password and security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-[#481E14] hover:bg-[#9B3922] text-white">Change Password</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#481E14]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Shield className="w-5 h-5" />
              Privacy
            </CardTitle>
            <CardDescription className="text-gray-400">Data and privacy controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-300">Share anonymized analytics</span>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#481E14]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Database className="w-5 h-5" />
              Data
            </CardTitle>
            <CardDescription className="text-gray-400">Export or delete your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-[#481E14] text-gray-300 hover:text-[#F2613F] bg-transparent"
            >
              Export Data
            </Button>
            <Button variant="outline" className="w-full border-red-700 text-red-400 hover:text-red-300 bg-transparent">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
