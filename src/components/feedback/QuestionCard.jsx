function QuestionCard({ number, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>

        <h3 className="text-2xl font-semibold text-green-800">
          {title}
        </h3>

      </div>

      <div className="space-y-6">
        {children}
      </div>

    </div>
  );
}

export default QuestionCard;