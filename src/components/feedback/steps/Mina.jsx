import { useFormContext } from "react-hook-form";
import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import RadioQuestion from "../RadioQuestion";
import SelectQuestion from "../SelectQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function Mina() {

    const { register } = useFormContext();

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 2 – Mina"
                subtitle="Please share your experience during your stay at Mina."
            />

            {/* Question 7 */}

            <QuestionCard
                number="7"
                title="Journey to Mina"
            >

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="font-semibold block mb-2">
                            Duration (Hours)
                        </label>

                        <input
                            type="number"
                            {...register("minaJourneyDuration", {
                               
                            })}
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                            placeholder="Enter Duration"
                        />

                    </div>

                    <RadioQuestion
                        label="Reached On Time?"
                        name="minaOnTime"
                        options={[
                            "Yes",
                            "No",
                        ]}
                      
                    />

                </div>

                <SelectQuestion
                    label="Travel Mode"
                    name="minaTravelMode"
                    options={[
                        "Bus",
                        "Walk",
                        "Self",
                        "Other",
                    ]}
                  
                />

                <RemarksQuestion
                    name="minaJourneyRemarks"
                />

            </QuestionCard>

            {/* Question 8 */}

            <QuestionCard
                number="8"
                title="Mina Tent Accommodation"
            >

                <RatingQuestion
                    name="minaTentAccommodation"
                    label="Rate Tent Accommodation"
                />

                <RemarksQuestion
                    name="minaTentRemarks"
                />

            </QuestionCard>

            {/* Question 9 */}

            <QuestionCard
                number="9"
                title="Mina Toilet"
            >

                <RatingQuestion
                    name="minaToiletRating"
                    label="Toilet Cleanliness"
                />

                <RadioQuestion
                    label="Guide Available?"
                    name="minaGuideAvailable"
                    options={[
                        "Yes",
                        "No",
                    ]}
                   
                />

                <RemarksQuestion
                    name="minaToiletRemarks"
                />

            </QuestionCard>

            {/* Question 10 */}

            <QuestionCard
                number="10"
                title="Food Access in Mina"
            >

                <RatingQuestion
                    name="minaFoodRating"
                    label="Food Quality"
                />

                <div>

                    <label className="font-semibold block mb-2">
                        Waiting Time (Minutes)
                    </label>

                    <input
                        type="number"
                        {...register("minaFoodWaiting")}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                        placeholder="Enter Waiting Time"
                    />

                </div>

                <RemarksQuestion
                    name="minaFoodRemarks"
                />

            </QuestionCard>

            {/* Question 11 */}

            <QuestionCard
                number="11"
                title="General Behaviour Inside Mina Tent"
            >

                <RatingQuestion
                    name="minaBehaviour"
                    label="Overall Behaviour"
                />

                <RemarksQuestion
                    name="minaBehaviourRemarks"
                />

            </QuestionCard>

        </div>

    );

}