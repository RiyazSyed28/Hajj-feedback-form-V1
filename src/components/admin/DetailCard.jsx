export default function DetailCard({ title, children }) {

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="border-b px-6 py-4">

                <h2 className="text-xl font-bold text-[#0F4C81]">

                    {title}

                </h2>

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>

    );

}