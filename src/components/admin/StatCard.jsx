export default function StatCard({

    title,
    value,
    icon,
    color = "bg-blue-600"

}) {

    return (

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center justify-between">

            <div>

                <p className="text-gray-500 text-sm font-medium">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {value}
                </h2>

            </div>

            <div
                className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl`}
            >
                {icon}
            </div>

        </div>

    );

}