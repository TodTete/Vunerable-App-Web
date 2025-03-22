import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Vulnerable Blog Application</h1>
      <p className="text-center mb-8 text-muted-foreground">
        A deliberately vulnerable application for security testing purposes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">User Features</h2>
          <ul className="space-y-2 mb-6">
            <li>• Insecure login/registration</li>
            <li>• Vulnerable profile management</li>
            <li>• Unprotected user data</li>
          </ul>
          <Link href="/login">
            <Button className="w-full">Login / Register</Button>
          </Link>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Blog Features</h2>
          <ul className="space-y-2 mb-6">
            <li>• SQL injectable search</li>
            <li>• XSS vulnerable comments</li>
            <li>• Insecure file uploads</li>
          </ul>
          <Link href="/posts">
            <Button className="w-full" variant="outline">
              Browse Posts
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-medium mb-4">Security Testing Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="border rounded p-4">
            <p className="font-semibold">SAST</p>
            <p className="text-sm text-muted-foreground">Code vulnerabilities</p>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold">DAST</p>
            <p className="text-sm text-muted-foreground">Runtime vulnerabilities</p>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold">IAST</p>
            <p className="text-sm text-muted-foreground">Interactive testing</p>
          </div>
          <div className="border rounded p-4">
            <p className="font-semibold">RASP</p>
            <p className="text-sm text-muted-foreground">Runtime protection</p>
          </div>
        </div>
      </div>
    </div>
  )
}

