"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    bio: "",
    website: "",
    avatar: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      // Redirect to login if not logged in
      router.push("/login")
      return
    }

    const userData = JSON.parse(userJson)
    setUser(userData)

    // Pre-fill profile data
    setProfileData({
      fullName: userData.fullName || "",
      email: userData.email || "",
      bio: userData.bio || "Web security enthusiast and developer.",
      website: userData.website || "https://example.com",
      avatar: userData.avatar || "",
    })
  }, [router])

  // VULNERABLE: Updates profile without proper validation
  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {
      // In a real app, this would call a vulnerable API endpoint
      // For demo purposes, we're just updating localStorage

      // VULNERABLE: No validation of input data
      const updatedUser = {
        ...user,
        ...profileData,
      }

      // VULNERABLE: Storing sensitive data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      alert("Profile updated successfully")
    } catch (error) {
      console.error("Profile update error:", error)
      alert("Failed to update profile")
    }
  }

  // VULNERABLE: File upload without proper validation
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // VULNERABLE: No validation of file type or size

    // Create a FileReader to read the file
    const reader = new FileReader()
    reader.onload = (event) => {
      // VULNERABLE: Directly using the file data without validation
      setProfileData({
        ...profileData,
        avatar: event.target.result,
      })
    }
    reader.readAsDataURL(file)
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and settings</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  {profileData.avatar ? (
                    <AvatarImage src={profileData.avatar} alt={profileData.fullName} />
                  ) : (
                    <AvatarFallback>{profileData.fullName?.[0] || user.username?.[0] || "?"}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer text-sm text-primary">
                    Change avatar
                  </Label>
                  <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>

        {/* IDOR vulnerability hint */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
          <p className="font-medium">Security Testing Hint:</p>
          <p>Try accessing other user profiles by manipulating URL parameters (IDOR vulnerability).</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={user.username} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Change Password</Button>
          </CardFooter>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

