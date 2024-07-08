import {UploadClient} from "@uploadcare/upload-client";
import {useTheme} from "next-themes";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordProps, ChangePasswordSchema} from "@/schemas/auth.schema";

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
        register
    } = useForm<ChangePasswordProps>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: "onChange",
    })
}