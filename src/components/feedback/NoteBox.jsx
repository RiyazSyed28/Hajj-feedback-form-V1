export default function NoteBox({ children }) {

    return (

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4">

            <p className="text-amber-800 font-medium">

                {children}

            </p>

        </div>

    );

}