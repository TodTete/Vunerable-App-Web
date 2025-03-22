-- This is the SQL script to set up the database for the vulnerable blog application
-- DO NOT use this in production - this is intentionally vulnerable

-- Create the database
CREATE DATABASE IF NOT EXISTS vulnerable_blog;
USE vulnerable_blog;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Intentionally storing passwords in plain text
  email VARCHAR(100) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  bio TEXT,
  website VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', 'admin123', 'admin@example.com', 'Admin User', 'admin'),
('securityExpert', 'password123', 'security@example.com', 'Security Expert', 'user'),
('webDeveloper', 'webdev2023', 'developer@example.com', 'Web Developer', 'user'),
('newbie', 'newbie456', 'newbie@example.com', 'New User', 'user');

-- Insert sample posts
INSERT INTO posts (title, content, user_id) VALUES
('Introduction to Web Security', '<h2>Understanding Web Security</h2><p>Web security is essential for protecting your applications from various attacks. This post covers the basics of web security and common vulnerabilities.</p><h3>Common Vulnerabilities</h3><ul><li>SQL Injection</li><li>Cross-Site Scripting (XSS)</li><li>Cross-Site Request Forgery (CSRF)</li><li>Insecure Direct Object References</li><li>Security Misconfiguration</li></ul><p>Understanding these vulnerabilities is the first step in securing your web applications.</p>', 1),
('SQL Injection Basics', '<h2>What is SQL Injection?</h2><p>SQL injection is a code injection technique that exploits vulnerabilities in applications that interact with databases. Attackers can insert malicious SQL statements that can read, modify, or delete data from your database.</p><h3>Common SQL Injection Techniques</h3><ul><li>Union-based SQL injection</li><li>Error-based SQL injection</li><li>Blind SQL injection</li></ul><p>Always validate and sanitize user input to prevent SQL injection attacks.</p>', 2),
('Cross-Site Scripting (XSS) Explained', '<h2>Understanding XSS</h2><p>XSS attacks occur when an attacker injects malicious scripts into content from trusted websites. These scripts can steal cookies, session tokens, or other sensitive information.</p><h3>Types of XSS Attacks</h3><ul><li>Stored XSS</li><li>Reflected XSS</li><li>DOM-based XSS</li></ul><p>Always sanitize user input and use Content Security Policy (CSP) to mitigate XSS attacks.</p>', 3),
('CSRF Protection Strategies', '<h2>What is CSRF?</h2><p>Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users to submit unwanted requests to a web application. This can lead to unauthorized actions being performed on behalf of the user.</p><h3>CSRF Protection Methods</h3><ul><li>Anti-CSRF tokens</li><li>Same-site cookies</li><li>Custom request headers</li></ul><p>Implementing these protections can significantly reduce the risk of CSRF attacks.</p>', 2),
('Secure Authentication Practices', '<h2>Authentication Security</h2><p>Implementing secure authentication is crucial for protecting user accounts and sensitive data. Poor authentication can lead to account takeovers and data breaches.</p><h3>Best Practices</h3><ul><li>Use strong password policies</li><li>Implement multi-factor authentication</li><li>Secure session management</li><li>Rate limiting login attempts</li></ul><p>Following these practices can significantly improve your authentication security.</p>', 1);

-- Insert sample comments
INSERT INTO comments (post_id, user_id, content, created_at) VALUES
(1, 2, 'Great introduction! I would also add that regular security audits are essential.', '2023-03-16 10:15:00'),
(1, 4, 'Thanks for this post! I\'m just getting started with web security.', '2023-03-17 14:30:00'),
(2, 3, 'SQL injection is still one of the most common vulnerabilities. Always use parameterized queries!', '2023-03-21 09:45:00'),
(2, 4, 'I found a great tool for testing SQL injection vulnerabilities. Check out SQLmap.', '2023-03-22 16:20:00'),
(3, 2, 'XSS is often underestimated. Don\'t forget about sanitizing output as well as input!', '2023-03-26 11:10:00'),
(4, 3, 'CSRF tokens should be unique per session and per request for maximum security.', '2023-04-02 13:25:00'),
(5, 4, 'I recently implemented 2FA for my application and it was easier than I expected.', '2023-04-06 15:40:00');

