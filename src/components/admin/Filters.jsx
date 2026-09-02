export default function Filters({

    gender,
    setGender,

    age,
    setAge,

    education,
    setEducation

}) {

    return (

        <div className="grid md:grid-cols-3 gap-4">

            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border rounded-lg p-3"
            >
                <option value="">All Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>

            <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border rounded-lg p-3"
            >
                <option value="">All Age Groups</option>

                <option>Below 40</option>

                <option>40-50</option>

                <option>51-60</option>

                <option>Above 60</option>

            </select>

            <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="border rounded-lg p-3"
            >
                <option value="">All Education</option>

                <option>SSLC</option>

                <option>PUC</option>

                <option>Degree</option>

                <option>Professional</option>

                <option>Other</option>

            </select>

        </div>

    );

}