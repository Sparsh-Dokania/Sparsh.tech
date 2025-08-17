export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <p>© {new Date().getFullYear()} Sparsh Dokania</p>
        <div className="flex gap-6">
          <a href="https://github.com/yourusername" target="_blank" className="hover:text-blue-400">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-blue-400">LinkedIn</a>
          <a href="mailto:your@email.com" className="hover:text-blue-400">Email</a>
        </div>
      </div>
    </footer>
  );
}
