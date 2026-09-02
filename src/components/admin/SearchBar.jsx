import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
                type="text"
                placeholder="Search by Name, Cover Number or Travel Agency..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>
    );
}