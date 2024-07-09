import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { FC, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setCreativeName } from "@/store/slice/creativeSlice";
import { z } from "zod";
import { frame } from "@/types/slices/creativeSlice";

const CreativeNameSchema = z.object({
    nextStep: z.function().args(z.any()).returns(z.void()),
    creativeImage: frame,
});

type CreativeNameProps = z.infer<typeof CreativeNameSchema>;

const CreativeName: FC<CreativeNameProps> = ({ nextStep, creativeImage }) =>
{
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const handlerChange = (e) =>
    {
        setValue(e.target.value);
        dispatch(setCreativeName(e.target.value));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (value.trim())
        {
            nextStep(event);
        }
    };

    return (
        <Box className={styles.wrapper}>
            <Image
                src={creativeImage.frameUrl}
                alt={"Creatvie"}
                width={340}
                height={605}
                className={styles.img}
            />
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    <input type="text" value={value} onChange={handlerChange} className={styles.input}
                        placeholder={'Enter Your Nickname'} />
                    <hr />
                </label>
                <Button
                    type="button"
                    variant="contained"
                    disabled={!value.trim()}
                    className={`btn-second btn-second-next`}
                    onClick={nextStep}>
                    Next
                </Button>
            </form>
        </Box>
    )
}
export default CreativeName;