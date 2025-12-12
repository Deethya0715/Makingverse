import { useState } from "react";

const sampleCards = [
  {
    id: 1,
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150/0000FF",
      "https://via.placeholder.com/150/FF0000",
    ],
    title: "Card Title One",
    authors: "Author A, Author B",
    description:
      "This is a short description of the paper or topic shown in the card.",
    links: ["DOI", "PDF", "Video", "Page"],
  },
  {
    id: 2,
    images: [
      "https://via.placeholder.com/150/FFFF00",
      "https://via.placeholder.com/150/00FFFF",
      "https://via.placeholder.com/150/FF00FF",
    ],
    title: "Card Title Two",
    authors: "Author C, Author D",
    description:
      "Another description for the second card, summarizing the content.",
    links: ["DOI", "PDF", "Video", "Page"],
  },
];

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-beige-100 min-h-screen font-sans text-gray-900">
      <nav className="flex justify-between items-center p-6 bg-white shadow">
        <div className="font-bold text-xl">Logo</div>
        <ul className="flex space-x-8">
          <li className="hover:text-brown-700 cursor-pointer">Research</li>
          <li className="hover:text-brown-700 cursor-pointer">Team</li>
          <li className="hover:text-brown-700 cursor-pointer">Contact</li>
        </ul>
      </nav>

      <header className="text-center py-20 bg-beige-100">
        <h1 className="text-4xl font-semibold mb-4">
          Your first line of headline
        </h1>
        <h2 className="text-2xl mb-8">A second line follows here</h2>
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        {sampleCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm"
          >
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {card.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Card ${card.id} image ${idx + 1}`}
                  className="w-32 h-20 object-cover rounded"
                />
              ))}
            </div>

            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-sm italic mb-4">{card.authors}</p>
            <p className="mb-6">{card.description}</p>

            <div className="flex space-x-3 flex-wrap">
              {card.links.map((link, idx) => (
                <button
                  key={idx}
                  className="bg-brown-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-brown-700 transition"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}