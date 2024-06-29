import {FieldValues, UseFormRegister} from "react-hook-form";
import React from "react";
import UserTypeCard from "@/components/forms/sign-up/user-type-card";

type Props = {
    register: UseFormRegister<FieldValues>;
    userType: 'owner' | 'student';
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
};
const TypeSelectionForm = ({register, userType, setUserType}: Props) => {
    return (
        <>
            <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
            <p className="text-iridium md:text-sm">
                Tell us about yourself! What do you do? Let's tailor your
                <br/> experience so it suits you best.
            </p>
            <UserTypeCard
                value="owner"
                title="I own a business"
                text="Setting up my account for my company."
                register={register}
                userType={userType}
                setUserType={setUserType}
            />
            <UserTypeCard
                value="student"
                title="I am a student"
                text="Looking to learn about the tool."
                register={register}
                userType={userType}
                setUserType={setUserType}
            />
        </>
    );
};
export default TypeSelectionForm;
