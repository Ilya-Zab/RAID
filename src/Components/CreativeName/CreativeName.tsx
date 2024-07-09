import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setCreativeName } from "@/store/slice/creativeSlice";

const CreativeName = ({ nextStep, creativeImage }) =>
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
            nextStep();
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
                <input type="text" value={value} onChange={handlerChange} className={styles.input} placeholder={'Enter Your Nickname'} />
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