"use client"
import { authClient } from "~/lib/auth-client"

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7d1630] to-[#a4a91b] text-white">
            <div className="pb-3 font-light">SignIn/SignUp:</div>

            <div>
                <button
                    onClick={async () => {

                        await authClient.signIn.social({ provider: "github" })


                    }}
                    className="gap-2 p-1 border rounded-sm font-light text-sm hover:cursor-pointer hover:text-gray-600 hover:border-gray-600"
                >Google SignIn</button>
            </div>
            <div className="pt-2">
                <button
                    onClick={async () => {

                        await authClient.signIn.social({ provider: "github" })

                    }}
                    className="gap-2 p-1 border rounded-sm font-light text-sm hover:cursor-pointer hover:text-gray-600 hover:border-gray-600"
                >GitHub SignIn</button>
            </div>
        </main>
    )
}