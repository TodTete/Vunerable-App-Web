import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "vulnerable_blog",
    })

    // VULNERABLE: Direct SQL injection vulnerability
    // DO NOT use this in production - this is intentionally vulnerable
    const sqlQuery = `SELECT * FROM posts WHERE title LIKE '%${query}%' OR content LIKE '%${query}%'`

    const [rows] = await connection.execute(sqlQuery)
    await connection.end()

    return NextResponse.json({
      success: true,
      posts: rows,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during search",
      },
      { status: 500 },
    )
  }
}

