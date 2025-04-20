import SignupForm from "./signup-form"

export const metadata = {
  title: "Sign Up | Moover",
  description: "Create a new Moover account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <SignupForm />
    </div>
  )
}
