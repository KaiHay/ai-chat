"use client"
import { authClient } from "~/lib/auth-client"
export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7d1630] to-[#a4a91b] text-white">
            <div className="pb-3 font-light">SignIn/SignUp:</div>

            {/* <form className="flex items-center justify-center  flex-col">
                    <div className="font-light text-sm pb-1">Username</div>
                    <input name='username' className="flex-1 p-2 border rounded hover:cursor-pointer" />
                    <div className="font-light text-sm pb-1 pt-1">Password</div>
                    <input name='password' className="flex-1 p-2 border rounded hover:cursor-pointer" />

                    <div className="pt-2">
                        <button type="submit" className='p-1 border rounded-sm font-light text-sm hover:cursor-pointer hover:text-gray-600 hover:border-gray-600'>Submit</button>
                    </div>

                </form> */}
            <div>
                <button
                    onClick={() => {
                        try {
                            authClient.signIn.social({ provider: "github" })
                        } catch (err) {
                            console.log(err)
                        }
                    }}
                    className="gap-2 p-1 border rounded-sm font-light text-sm hover:cursor-pointer hover:text-gray-600 hover:border-gray-600"
                >Google SignIn</button>
            </div>
            <div className="pt-2">
                <button
                    onClick={() => {
                        try {
                            authClient.signIn.social({ provider: "github" })
                        } catch (err) {
                            console.log(err)
                        }
                    }}
                    className="gap-2 p-1 border rounded-sm font-light text-sm hover:cursor-pointer hover:text-gray-600 hover:border-gray-600"
                >GitHub SignIn</button>
            </div>
        </main>
    )
}