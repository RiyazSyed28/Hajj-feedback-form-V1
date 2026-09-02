import { useFormContext } from "react-hook-form";

import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import SelectQuestion from "../SelectQuestion";
import RadioQuestion from "../RadioQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function Arafat() {

    const { register } = useFormContext();

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 3 – Arafat & Muzdalifah"
                subtitle="Please share your experience during the journey and stay."
            />

            {/* Question 12 */}
            <QuestionCard
                number="12"
                title="Journey to Arafat"
            >

                <SelectQuestion
                    name="arafatTransport"
                    label="Transport"
                    options={[
                        "Train",
                        "Bus",
                        "Walk",
                        "Other"
                    ]}
                />

                <RadioQuestion
                    name="arafatCrowd"
                    label="Crowd"
                    options={[
                        "Good",
                        "Manageable",
                        "Difficult",
                        "Very Difficult"
                    ]}
                />

                <div>

                    <label className="font-semibold block mb-2">
                        Duration
                    </label>

                    <input
                        type="text"
                        {...register("arafatDuration")}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                        placeholder="Example: 2 Hours"
                    />

                </div>

                <RadioQuestion
                    name="arafatGuide"
                    label="Guide Available?"
                    options={[
                        "Yes",
                        "No"
                    ]}
                />

                <RemarksQuestion
                    name="arafatRemarks"
                />

            </QuestionCard>


            {/* Stay at Arafat */}
            <QuestionCard
                number="12A"
                title="Stay at Arafat"
            >

                <SelectQuestion
                    name="arafatStayTransport"
                    label="Transport Used"
                    options={[
                        "Train",
                        "Bus",
                        "Walk",
                        "Other"
                    ]}
                />

                <div>

                    <label className="font-semibold block mb-2">
                        Duration of Stay
                    </label>

                    <input
                        type="text"
                        {...register("arafatStayDuration")}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                        placeholder="Example: 6 Hours"
                    />

                </div>

                <RemarksQuestion
                    name="arafatStayRemarks"
                />

            </QuestionCard>


            {/* Question 13 */}
            <QuestionCard
                number="13"
                title="Arafat to Muzdalifah"
            >

                <SelectQuestion
                    name="muzdalifahTransport"
                    label="Transport"
                    options={[
                        "Train",
                        "Bus",
                        "Walk",
                        "Other"
                    ]}
                />

                <div>

                    <label className="font-semibold block mb-2">
                        Duration
                    </label>

                    <input
                        type="text"
                        {...register("muzdalifahDuration")}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                        placeholder="Example: 1 Hour"
                    />

                </div>

                <RemarksQuestion
                    name="muzdalifahJourneyRemarks"
                />

            </QuestionCard>


            {/* Question 14 */}
            <QuestionCard
                number="14"
                title="Stay at Muzdalifah"
            >

                <div>

                    <label className="font-semibold block mb-2">
                        Arrival Time
                    </label>

                    <input
                        type="time"
                        {...register("arrivalTime")}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                    />

                </div>

                <SelectQuestion
                    name="stayTransport"
                    label="Transport Used"
                    options={[
                        "Train",
                        "Bus",
                        "Walk",
                        "Other"
                    ]}
                />

                <RadioQuestion
                    name="spaceAvailability"
                    label="Space Availability"
                    options={[
                        "Excellent",
                        "Adequate",
                        "Limited",
                        "Poor"
                    ]}
                />

                <RemarksQuestion
                    name="stayRemarks"
                />

            </QuestionCard>

        </div>

    );
}