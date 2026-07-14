import Image from "next/image";
import Link from "next/link";

export default function EfLoginPage() {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-linear-to-b from-blossom-100 via-blossom-50 to-blossom-50 px-4 py-8 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blossom-200/40 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blossom-300/20 blur-3xl"
      />

      <div className="relative flex w-full max-w-lg flex-col items-center justify-center">
        <Link href="/" className="flex flex-col items-center gap-3">
          <Image
            src="/edible-flowers/logo.jpg"
            alt="Edible Blossoms by Sheena logo"
            width={96}
            height={96}
            className="h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-white sm:h-24 sm:w-24"
            priority
          />
          <span className="font-heading text-2xl font-semibold text-cocoa-800 sm:text-3xl">
            Edible Blossoms
          </span>
        </Link>

        <div className="mt-8 w-full text-center">
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Admin
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Sign in
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cocoa-600">
            Access the Edible Blossoms dashboard to manage orders, products, and
            inquiries.
          </p>
        </div>

        <form
          action=""
          className="mt-8 w-full rounded-2xl border border-blossom-200 bg-white p-6 shadow-md sm:p-10"
        >
          <div className="space-y-6">
            <div>
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
                autoComplete="current-password"
                required
                className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-3 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-blossom-500 py-3.5 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-8 flex w-full flex-col items-center gap-3 text-center text-sm text-cocoa-600">
          <Link
            href="/"
            className="font-accent font-medium text-cocoa-700 transition-colors hover:text-blossom-600"
          >
            Back to site
          </Link>
          <p>
            Need help?{" "}
            <Link
              href="/#contact"
              className="font-medium text-blossom-600 transition-colors hover:text-blossom-700"
            >
              Contact Sheena
            </Link>
          </p>
        </div>
      </div>
      <footer className="absolute w-full bottom-0 border-t border-blossom-200 bg-cocoa-800 py-6 text-blossom-100">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-base font-semibold">
            Edible Blossoms by Sheena
          </p>
          <p className="mt-1 text-xs text-blossom-200/80">
            &copy; {new Date().getFullYear()} Edible Blossoms. Cupcakes made
            with love.
          </p>
        </div>
      </footer>
    </div>
  );
}
