import {UploadClient} from "@uploadcare/upload-client";
import {useTheme} from "next-themes";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordProps, ChangePasswordSchema} from "@/schemas/auth.schema";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {onUpdatePassword} from "@/actions/settings";

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useThemeMode = () => {
    const {setTheme, theme} = useTheme();
    return {
        setTheme,
        theme,
    }
}

export const useChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ChangePasswordProps>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: "onChange",
    })
    const {toast} = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const onChangePassword = handleSubmit(async (values) => {
        try {
           setLoading(true);
           const updated = await onUpdatePassword(values.password);
           if (updated) {
               reset();
               setLoading(false);
               toast({
                     title: "Success",
                     description: updated.message,
               })
           }
        } catch (e) {
            console.log(e);
        }
    })

    return {
        register,
        errors,
        onChangePassword,
        loading,
    }
}