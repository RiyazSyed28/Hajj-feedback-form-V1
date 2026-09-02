import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RadioQuestion from "../RadioQuestion";
import RatingQuestion from "../RatingQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function Health() {

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 7 – Health"
                subtitle="Share your health experience during Hajj."
            />

            {/* Question 18 */}

            <QuestionCard
                number="18"
                title="Walking During Hajj"
            >

                <RadioQuestion
                    name="walkingPractice"
                    label="Did walking practice before Hajj help?"
                    options={[
                        "Yes",
                        "No"
                    ]}
                
                />

            </QuestionCard>

            {/* Question 19 */}

            <QuestionCard
                number="19"
                title="Your Health Experience"
            >

                <RatingQuestion
                    name="healthExperience"
                    label="Overall Health Experience"
                />

                <RemarksQuestion
                    name="healthRemarks"
                />

            </QuestionCard>

        </div>

    );

}