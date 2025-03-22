import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function POST(request: Request, { params }) {
  try {
    const postId = params.id
    const { content, userId } = await request.json()

    // VULNERABLE: No input validation or sanitization for XSS

    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "vulnerable_blog",
    })

    // VULNERABLE: Direct SQL injection vulnerability
    // DO NOT use this in production - this is intentionally vulnerable
    const query = `INSERT INTO comments (post_id, user_id, content, created_at) 
                  VALUES (${postId}, ${userId}, '${content}', NOW())`

    const [result] = await connection.execute(query)

    // Get the inserted comment
    const commentId = result.insertId
    const [commentRows] = await connection.execute(`SELECT * FROM comments WHERE id = ${commentId}`)
    await connection.end()

    if (Array.isArray(commentRows) && commentRows.length > 0) {
      return NextResponse.json({
        success: true,
        comment: commentRows[0],
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to create comment",
      })
    }
  } catch (error) {
    console.error("Comment creation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while adding the comment",
      },
      { status: 500 },
    )
  }
}

