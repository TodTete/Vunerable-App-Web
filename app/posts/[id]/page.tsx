"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for a single post
const MOCK_POST = {
  id: 1,
  title: "Introduction to Web Security",
  content: `
    <h2>Understanding Web Security</h2>
    <p>Web security is essential for protecting your applications from various attacks. This post covers the basics of web security and common vulnerabilities.</p>
    
    <h3>Common Vulnerabilities</h3>
    <ul>
      <li>SQL Injection</li>
      <li>Cross-Site Scripting (XSS)</li>
      <li>Cross-Site Request Forgery (CSRF)</li>
      <li>Insecure Direct Object References</li>
      <li>Security Misconfiguration</li>
    </ul>
    
    <p>Understanding these vulnerabilities is the first step in securing your web applications.</p>
  `,
  author: "admin",
  date: "2023-03-15",
  comments: [
    {
      id: 1,
      author: "securityExpert",
      content: "Great introduction! I would also add that regular security audits are essential.",
      date: "2023-03-16",
    },
    {
      id: 2,
      author: "newbie",
      content: "Thanks for this post! I'm just getting started with web security.",
      date: "2023-03-17",
    },
  ],
}

export default function PostPage() {
  const params = useParams()
  const postId = params.id

  const [post, setPost] = useState(MOCK_POST)
  const [newComment, setNewComment] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const userJson = localStorage.getItem("user")
    if (userJson) {
      const user = JSON.parse(userJson)
      setIsLoggedIn(true)
      setCurrentUser(user)
    }

    // In a real app, we would fetch the post from the API
    // This would be vulnerable to SQL injection in the post retrieval endpoint
    // For demo purposes, we're just using mock data
  }, [postId])

  // VULNERABLE: Adds comment without sanitizing input (XSS vulnerability)
  const handleAddComment = () => {
    if (!newComment.trim()) return

    if (!isLoggedIn) {
      alert("You must be logged in to comment")
      return
    }

    // Create new comment with unsanitized content (XSS vulnerability)
    const comment = {
      id: post.comments.length + 1,
      author: currentUser?.username || "anonymous",
      content: newComment, // VULNERABLE: No sanitization
      date: new Date().toISOString().split("T")[0],
    }

    // Update post with new comment
    setPost({
      ...post,
      comments: [...post.comments, comment],
    })

    // Clear comment input
    setNewComment("")
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">
          By {post.author} • {post.date}
        </div>

        {/* VULNERABLE: Directly rendering HTML content (XSS vulnerability) */}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* XSS vulnerability hint */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
        <p className="font-medium">Security Testing Hint:</p>
        <p>
          Try adding a comment with JavaScript code like:{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">{`<script>alert('XSS')</script>`}</code>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments ({post.comments.length})</h2>

        {post.comments.map((comment) => (
          <Card key={comment.id} className="mb-4">
            <CardHeader className="py-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{comment.author}</div>
                  <div className="text-xs text-muted-foreground">{comment.date}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-3">
              {/* VULNERABLE: Directly rendering comment content (XSS vulnerability) */}
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </CardContent>
          </Card>
        ))}

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
          {isLoggedIn ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddComment}>Post Comment</Button>
            </div>
          ) : (
            <div className="p-4 border rounded-md bg-muted">
              <p>
                Please{" "}
                <a href="/login" className="text-primary font-medium">
                  login
                </a>{" "}
                to add a comment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

