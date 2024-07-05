import {Box, Button} from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";

const CreativeName = ({nextStep}) =>{
    return (
        <Box>
            <Image
                src={'/images/user.png'}
                alt={""}
                width={340}
                height={605}
                className={styles.img}
            />
            <form className={styles.form}>
                <input type="text" className={styles.input} placeholder={'Enter Your Nickname'}/>
                <Button
                    type="submit"
                    variant="contained"
                    className={`btn-second btn-second-next`}
                    onClick={nextStep}>
                    Next
                </Button>
            </form>
        </Box>
    )
}
export default CreativeName;