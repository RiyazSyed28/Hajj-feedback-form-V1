import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import RemarksQuestion from "../RemarksQuestion";

export default function ReturnJourney() {

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 6 – Return Journey"
                subtitle="Please rate your return journey from Jeddah to India."
            />

            {/* Question 17 */}

            <QuestionCard
                number="17"
                title="Jeddah Airport"
            >

                <RatingQuestion
                    name="jeddahAirport"
                    label="Overall Experience"
                />

                <RemarksQuestion
                    name="jeddahAirportRemarks"
                />

            </QuestionCard>

            {/* Question 17A */}

            <QuestionCard
                number="17A"
                title="Arrival in India – Immigration"
            >

                <RatingQuestion
                    name="immigration"
                    label="Immigration Experience"
                />

                <RemarksQuestion
                    name="immigrationRemarks"
                />

            </QuestionCard>

            {/* Question 17B */}

            <QuestionCard
                number="17B"
                title="Arrival in India – Customs"
            >

                <RatingQuestion
                    name="customs"
                    label="Customs Experience"
                />

                <RemarksQuestion
                    name="customsRemarks"
                />

            </QuestionCard>

        </div>

    );

}