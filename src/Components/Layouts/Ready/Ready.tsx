import * as React from 'react';
import styles from './styles.module.scss';
import {Box} from '@mui/material';
import {RegistrationForm} from "@/Components/Forms/RegistrationForm";

const Ready = () => {
    return (
       <Box className={styles.ready}>
           <Box className={styles.container}>
               <Box className={styles.ready__title__wrapper}>
                   <h2 className={styles.ready__title}>
                       Ready to go?
                   </h2>
               </Box>
               <Box className={`subtract-box subtract-box_big ${styles.ready__forms}`}>
                  <Box>
                      <RegistrationForm />
                      <RegistrationForm />
                  </Box>
               </Box>
           </Box>
       </Box>
    )
}
export default Ready;