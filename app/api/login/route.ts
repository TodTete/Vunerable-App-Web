import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "vulnerable_blog",
    })

    // VULNERABLE: Direct SQL injection vulnerability
    // DO NOT use this in production - this is intentionally vulnerable
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`

    const [rows] = await connection.execute(query)
    await connection.end()

    // Check if user exists
    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0]

      // VULNERABLE: Returning sensitive information
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          // VULNERABLE: Returning password hash
          passwordHash: user.password,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
      })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}

