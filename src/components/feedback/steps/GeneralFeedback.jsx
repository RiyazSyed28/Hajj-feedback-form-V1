import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function GeneralFeedback() {
   

    return (

        <div className="space-y-8">

            <SectionHeader
                title="General Feedback"
                subtitle="Your overall opinion will help us improve future Hajj services."
            />

            {/* Question 20 */}

            <QuestionCard
                number="20"
                title="Food Facility"
            >

                <RatingQuestion
                    name="foodFacility"
                    label="Food Facility"
                />

                <RemarksQuestion
                    name="foodRemarks"
                />

            </QuestionCard>

            {/* Question 21 */}

            <QuestionCard
                number="21"
                title="Group Cooperation"
            >

                <RatingQuestion
                    name="groupCooperation"
                    label="Group Cooperation"
                />

                <RemarksQuestion
                    name="groupRemarks"
                />

            </QuestionCard>

            {/* Question 22 */}

            <QuestionCard
                number="22"
                title="Medical / Doctor Facility"
            >

                <RatingQuestion
                    name="medicalFacility"
                    label="Medical / Doctor Facility"
                />

                <RemarksQuestion
                    name="medicalRemarks"
                />

            </QuestionCard>

            {/* Question 23 */}

            <QuestionCard
                number="23"
                title="Any Other Observation"
            >

                <RemarksQuestion
                    name="otherObservation"
                    label="Any Other Observation"
                    maxWords={50}
                />

            </QuestionCard>

            {/* Question 24 */}

            <QuestionCard
                number="24"
                title="Message to Future Hajees"
            >

                <RemarksQuestion
                    name="futureMessage"
                    label="Message to Future Hajees"
                    maxWords={25}
                />

            </QuestionCard>

           

        </div>

    );

}