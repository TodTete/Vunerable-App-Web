"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "Introduction to Web Security",
    content: "Web security is essential for protecting your applications from various attacks...",
    author: "admin",
    date: "2023-03-15",
    comments: 5,
  },
  {
    id: 2,
    title: "SQL Injection Basics",
    content: "SQL injection is a code injection technique that exploits vulnerabilities in applications...",
    author: "securityExpert",
    date: "2023-03-20",
    comments: 8,
  },
  {
    id: 3,
    title: "Cross-Site Scripting (XSS) Explained",
    content: "XSS attacks occur when an attacker injects malicious scripts into content from trusted websites...",
    author: "webDeveloper",
    date: "2023-03-25",
    comments: 3,
  },
  {
    id: 4,
    title: "CSRF Protection Strategies",
    content:
      "Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users to submit unwanted requests...",
    author: "securityExpert",
    date: "2023-04-01",
    comments: 2,
  },
  {
    id: 5,
    title: "Secure Authentication Practices",
    content: "Implementing secure authentication is crucial for protecting user accounts and sensitive data...",
    author: "admin",
    date: "2023-04-05",
    comments: 6,
  },
]

export default function PostsPage() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)

    // In a real app, we would fetch posts from the API
    // This would be vulnerable to SQL injection in the search endpoint
  }, [])

  // VULNERABLE: Simulated search function that would be vulnerable to SQL injection
  const handleSearch = async () => {
    try {
      // In a real app, this would call a vulnerable API endpoint
      // For demo purposes, we're just filtering the mock data
      if (searchTerm) {
        // This simulates a SQL injection vulnerability by allowing special search terms
        if (searchTerm.includes("' OR '1'='1")) {
          // Simulating SQL injection success - returns all posts
          setPosts(MOCK_POSTS)
        } else {
          // Normal search
          const filtered = MOCK_POSTS.filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.content.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          setPosts(filtered)
        }
      } else {
        setPosts(MOCK_POSTS)
      }
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>

          {isLoggedIn && (
            <Link href="/posts/new">
              <Button variant="outline">New Post</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Vulnerable search hint */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
        <p className="font-medium">Security Testing Hint:</p>
        <p>
          Try searching with SQL injection patterns like:{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">{`' OR '1'='1`}</code>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  By {post.author} • {post.date}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">{post.comments} comments</div>
              </CardFooter>
            </Card>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

