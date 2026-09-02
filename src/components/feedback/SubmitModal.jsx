import { motion, AnimatePresence } from "framer-motion";

export default function SubmitModal({
    open,
    onCancel,
    onConfirm,
    loading,
}) {

    return (

        <AnimatePresence>

            {open && (

                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >

                    <motion.div
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                            y: 30
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            scale: 0.8,
                            opacity: 0
                        }}
                        transition={{ duration: .25 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg"
                    >

                        <h2 className="text-3xl font-bold text-green-800 mb-4">

                            Submit Feedback?

                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8">

                            Please make sure all information is correct.

                            <br /><br />

                            After submission you will not be able to edit your feedback.

                        </p>

                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-3 rounded-xl border hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={loading}
                                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-60"
                            >

                                {loading
                                    ? "Submitting..."
                                    : "Submit Feedback"}

                            </button>

                        </div>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}