function NavigationButtons({
    step,
    totalSteps,
    next,
    previous,
    onSubmit,
}) {
    return (
        <div className="flex justify-between mt-12">

            <button
                type="button"
                onClick={previous}
                disabled={step === 1}
                className="px-6 py-3 rounded-lg bg-gray-300 disabled:opacity-40"
            >
                Previous
            </button>

            {step === totalSteps ? (

                <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl"
                >
                    Submit
                </button>

            ) : (
                <button
                    type="button"
                    onClick={next}
                    className="px-8 py-3 rounded-lg bg-green-700 text-white cursor-pointer"
                >
                    Next
                </button>
            )}

        </div>
    );
}

export default NavigationButtons;