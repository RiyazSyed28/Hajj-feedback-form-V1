export default function SectionHeader({
    title,
    subtitle
}) {

    return (

        <div className="mb-10">

            <h2 className="text-4xl font-bold text-green-800">

                {title}

            </h2>

            <p className="text-gray-600 mt-2">

                {subtitle}

            </p>

        </div>

    );

}