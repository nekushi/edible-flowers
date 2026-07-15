export default function FooterSection() {
  return (
    <footer className="border-t border-blossom-200 bg-cocoa-800 py-8 text-blossom-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-heading text-lg font-semibold">
          Edible Blossoms by Sheena
        </p>
        <p className="text-center text-sm text-blossom-200/80">
          &copy; {new Date().getFullYear()} Edible Blossoms. Cupcakes made with
          love.
        </p>
      </div>
    </footer>
  );
}
