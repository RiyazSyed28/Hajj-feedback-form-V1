import SectionHeader from "../SectionHeader";
import QuestionCard from "../QuestionCard";
import RatingQuestion from "../RatingQuestion";
import RadioQuestion from "../RadioQuestion";
import RemarksQuestion from "../RemarksQuestion";
import NoteBox from "../NoteBox";

export default function Madinah() {

    return (

        <div className="space-y-8">

            <SectionHeader
                title="Section 5 – Madinah"
                subtitle="Share your experience during your stay in Madinah."
            />

            <QuestionCard
                number="16"
                title="Journey to Madinah"
            >

                <RatingQuestion
                    name="madinahRating"
                    label="Overall Experience"
                />

                <div className="grid md:grid-cols-2 gap-6">

                    <RadioQuestion
                        name="riyazulJannah"
                        label="Did you pray in Riyazul Jannah?"
                        options={[
                            "Yes",
                            "No"
                        ]}
                      
                    />

                    <RadioQuestion
                        name="nusukApp"
                        label="Did you use the Nusuk App?"
                        options={[
                            "Yes",
                            "No"
                        ]}
                       
                    />

                </div>

                <NoteBox>
                    Do not make any negative comment on Madinah below.
                </NoteBox>

                <RemarksQuestion
                    name="madinahRemarks"
                />

            </QuestionCard>

        </div>

    );

}