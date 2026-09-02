import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import SelectQuestion from "../SelectQuestion";
import RemarksQuestion from "../RemarksQuestion";
import YesNoQuestion from "../YesNoQuestion";
import { useFormContext } from "react-hook-form";

export default function Departure() {

    const { watch } = useFormContext();

    const wudu = watch("gate40Wudu");

    return (

        <div className="space-y-8">

            {/* Section Header */}

            <div className="mb-10">

                <h2 className="text-4xl font-bold text-green-800">

                    Section 1 – Arrival & Umrah

                </h2>

                <p className="text-gray-600 mt-2">

                    Please answer all questions based on your experience.

                </p>

            </div>

            {/* Q1 */}

            <QuestionCard
                number="1"
                title="Experience in Bangalore Haj Bhavan"
            >

                <RatingQuestion
                    name="bhavanRating"
                    label="Overall Experience"
                />

                <RemarksQuestion
                    name="bhavanRemarks"
                />

            </QuestionCard>

            {/* Q2 */}

            <QuestionCard
                number="2"
                title="Bangalore to Jeddah Flight"
            >

                <RatingQuestion
                    name="flightRating"
                    label="Flight Experience"
                />

                <SelectQuestion
                    name="flightDelay"
                    label="Flight Delay"
                    options={[
                        "On Time",
                        "Less than 1 Hour",
                        "1–3 Hours",
                        "More than 3 Hours",
                    ]}
                />

                <RemarksQuestion
                    name="flightRemarks"
                />

            </QuestionCard>

            {/* Q3 */}

            <QuestionCard
                number="3"
                title="Baggage Delivery at Jeddah / Aziziyah"
            >

                <RatingQuestion
                    name="baggageRating"
                    label="Overall Experience"
                />

                <SelectQuestion
                    name="waitingTime"
                    label="Waiting Time"
                    options={[
                        "Less than 30 Minutes",
                        "30–60 Minutes",
                        "1–2 Hours",
                        "More than 2 Hours",
                    ]}
                />

                <RemarksQuestion
                    name="baggageRemarks"
                />

            </QuestionCard>

            {/* Q4 */}

            <QuestionCard
                number="4"
                title="Accommodation at Aziziyah"
            >

                <RatingQuestion
                    name="aziziyahAccommodation"
                    label="Accommodation"
                />

                <SelectQuestion
                    name="personsPerRoom"
                    label="Persons Per Room"
                    options={[
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "More than 6",
                    ]}
                />

                <RatingQuestion
                    name="roomCleanliness"
                    label="Room Cleanliness"
                />

                <RemarksQuestion
                    name="roomRemarks"
                />

            </QuestionCard>

            {/* Q5 */}

            <QuestionCard
                number="5"
                title="Umrah Experience"
            >

                <RatingQuestion
                    name="umrahRating"
                    label="Overall Experience"
                />

                <SelectQuestion
                    name="crowdLevel"
                    label="Crowd Level"
                    options={[
                        "Low",
                        "Moderate",
                        "Heavy",
                        "Very Heavy",
                    ]}
                />

                <RemarksQuestion
                    name="umrahRemarks"
                />

            </QuestionCard>

            {/* Q6 */}

            <QuestionCard
                number="6"
                title="Wudu Facility (Gate 40)"
            >

                <YesNoQuestion
                    name="gate40Wudu"
                    label="Did you use Gate 40 Wudu Facility?"
                />

                {wudu === "Yes" && (

                    <>

                        <div className="mt-6">

                            <RatingQuestion
                                name="wuduRating"
                                label="Rate the Wudu Facility"
                            />

                        </div>

                        <RemarksQuestion
                            name="wuduRemarks"
                        />

                    </>

                )}

            </QuestionCard>

        </div>

    );

}