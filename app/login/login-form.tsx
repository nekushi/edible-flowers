"use client";

import { login } from "@/dal/auth/login";

import { useActionState, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ApiResponse } from "../z-landing-page-contents/types";

export type TypeUserLoginWithId = {
  id: string;
  username: string;
  password: string;
};

export type TypeUserLogin = Omit<TypeUserLoginWithId, "id">;

export default function EfLoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [loginForm, setLoginForm] = useState<TypeUserLogin>({
    username: "",
    password: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleLoginFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(loginForm);
  };

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const params = new URLSearchParams({
      username: loginForm.username,
      password: loginForm.password,
    });

    console.log(params.toString());

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(`/api/v1/auth/login?${params.toString()}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to login.");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          if (data.type === "success") {
            router.push("/v1/dashboard");
          }

          return data;
        })(),
        {
          pending: "Loggin in...",
          success: {
            render({ data }: { data: { message: string } }) {
              return data.message;
            },
          },
          error: {
            render({ data }: { data: Error }) {
              return data.message;
            },
          },
        },
      );
    } catch (error) {
      console.log(`$ERROR: ${error}`);
    } finally {
      setLoginForm((prev) => ({
        ...prev,
        ...loginForm,
        username: "",
        password: "",
      }));

      formRef.current?.reset();
      setIsPending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleLoginFormSubmit}
      className="mt-8 w-full rounded-2xl border border-blossom-200 bg-white p-6 shadow-md sm:p-10"
    >
      <div className="space-y-6">
        <div className="">
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
            defaultValue={loginForm.username}
            onChange={handleLoginFormChange}
            autoComplete="username"
            required
            className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-3 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
            placeholder="Enter your username"
          />
        </div>

        <div>
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
            defaultValue={loginForm.password}
            onChange={handleLoginFormChange}
            autoComplete="current-password"
            required
            className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-3 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`${isPending && "bg-blossom-100"} w-full rounded-full bg-blossom-500 py-3.5 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg`}
          // className={`w-full rounded-full bg-blossom-500 py-3.5 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg`}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
