import { useFormContext } from "react-hook-form";
import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import RadioQuestion from "../RadioQuestion";
import SelectQuestion from "../SelectQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function DhulHijjah() {

    const { register } = useFormContext();

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 4 – 10th to 13th Dhul Hijjah"
                subtitle="Please provide your feedback on the rituals performed during these days."
            />

            {/* Question 15 */}

            <QuestionCard
                number="15"
                title="Tawaf Al-Ziyarah"
            >

                <RatingQuestion
                    name="tawafRating"
                    label="Overall Experience"
                />

                <SelectQuestion
                    name="tawafCrowd"
                    label="Crowd Level"
                    options={[
                        "Low",
                        "Moderate",
                        "Heavy",
                        "Very Heavy"
                    ]}
                 
                />

                <RemarksQuestion
                    name="tawafRemarks"
                />

            </QuestionCard>

            {/* Question 16 */}

            <QuestionCard
                number="16"
                title="Halaq (Head Shaving)"
            >

                <RatingQuestion
                    name="halaqRating"
                    label="Overall Experience"
                />

                <SelectQuestion
                    name="halaqDuration"
                    label="Duration"
                    options={[
                        "Less than 1 Hour",
                        "1-2 Hours",
                        "More than 2 Hours"
                    ]}
                 
                />

                <RemarksQuestion
                    name="halaqRemarks"
                />

            </QuestionCard>

            {/* Question 17 */}

            <QuestionCard
                number="17"
                title="Jamarat (Big Shaitan)"
            >

                <RatingQuestion
                    name="jamaratRating"
                    label="Overall Experience"
                />

                <SelectQuestion
                    name="jamaratCrowd"
                    label="Crowd Level"
                    options={[
                        "Low",
                        "Moderate",
                        "Heavy",
                        "Very Heavy"
                    ]}
                  
                />

                <RemarksQuestion
                    name="jamaratRemarks"
                />

            </QuestionCard>

            {/* Question 18 */}

            <QuestionCard
                number="18"
                title="Qurbani Arrangement"
            >

                <RatingQuestion
                    name="qurbaniRating"
                    label="Overall Experience"
                />

                <RadioQuestion
                    name="qurbaniCompleted"
                    label="Qurbani Completed?"
                    options={[
                        "Yes",
                        "No"
                    ]}
                 
                />

                <RemarksQuestion
                    name="qurbaniRemarks"
                />

            </QuestionCard>

        </div>

    );

}