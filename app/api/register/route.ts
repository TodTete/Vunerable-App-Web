import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function POST(request: Request) {
  try {
    const { username, password, email, fullName } = await request.json()

    // VULNERABLE: No input validation or sanitization

    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "vulnerable_blog",
    })

    // VULNERABLE: Direct SQL injection vulnerability
    // DO NOT use this in production - this is intentionally vulnerable
    const query = `INSERT INTO users (username, password, email, full_name) 
                  VALUES ('${username}', '${password}', '${email}', '${fullName}')`

    const [result] = await connection.execute(query)

    // VULNERABLE: No proper error handling for duplicate users

    // Get the inserted user
    const userId = result.insertId
    const [userRows] = await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
    await connection.end()

    if (Array.isArray(userRows) && userRows.length > 0) {
      const user = userRows[0]

      // VULNERABLE: Returning sensitive information
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          // VULNERABLE: Returning password in plain text
          password: user.password,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to create user",
      })
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 },
    )
  }
}

