"use client";

import { login } from "@/dal/auth/signup";
import { useActionState } from "react";

export default function EfSignupForm() {
  const [state, loginAction, isPending] = useActionState(login, undefined);

  return (
    <form
      action={loginAction}
      className="mt-8 w-full rounded-2xl border border-blossom-200 bg-white p-6 shadow-md sm:p-10"
    >
      <div className="space-y-6">
        <div className="mb-0">
          {/* <div className=""> */}
          <label
            htmlFor="username"
            className="block font-accent text-sm font-medium text-cocoa-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            required
            className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-3 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
            placeholder="Enter your username"
          />
        </div>
        {state?.errors?.username && (
          <div className="mt-2">
            <p className="m-0 text-xs text-pink-500">
              {state?.errors?.username}
            </p>
          </div>
        )}

        <div className="mb-0 my-6">
          <label
            htmlFor="password"
            className="block font-accent text-sm font-medium text-cocoa-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-3 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
            placeholder="Enter your password"
          />
        </div>
        {state?.errors?.password && (
          <div className="mt-2">
            {state?.errors?.password.map((err: string, _: number) => (
              <p key={_} className="mb-0 text-xs text-pink-500">
                {err}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="my-6 w-full rounded-full bg-blossom-500 py-3.5 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
