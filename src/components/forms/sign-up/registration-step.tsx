'use client'

import {useFormContext} from "react-hook-form";
import {useAuthContextHook} from "@/context/use-auth-context";
import {useState} from "react";
import TypeSelectionForm from "@/components/forms/sign-up/type-selection-form";
import dynamic from "next/dynamic";
import {Spinner} from "@/components/spinner";

//calling this component only when it is required dynamically for performance
const DetailForm = dynamic(() => import('./account-details-form'), {
    ssr: false,
    // @ts-ignore
    loading: Spinner
})

type Props = {};
const RegistrationFormStep = (props: Props) => {

    const {
        register,
        formState: { errors },
        setValue
    } = useFormContext();
    const {currentStep} = useAuthContextHook();

    //OTP
    const [onOTP, setOnOTP] = useState<string>("");
    const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner');

    setValue('otp', onOTP);

    switch (currentStep) {
        case 1:
            return (
                <TypeSelectionForm
                    register={register}
                    userType={onUserType}
                    setUserType={setOnUserType}
                />
            )
        case 2:
            return <DetailForm
                errors={errors}
                register={register}
            />
        case 3:
            // return <OTPForm
            //     onOTP={onOTP}
            //     setOTP={setOnOTP}
            // />
    }

    return (
        <div>RegistrationFormStep</div>
    );
};
export default RegistrationFormStep;
