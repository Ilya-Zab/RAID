import {Box, Button} from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import {useState} from "react";

const CreativeName = ({nextStep, creativeImage }) =>{
    const [value, setValue] = useState("");
    const handlerChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            nextStep();
        }
    };

    return (
        <Box className={styles.wrapper}>
            <Image
                src={creativeImage.frameUrl}
                alt={""}
                width={340}
                height={605}
                className={styles.img}
            />
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    <input type="text" value={value} onChange={handlerChange} className={styles.input}
                           placeholder={'Enter Your Nickname'}/>
                    <hr/>
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