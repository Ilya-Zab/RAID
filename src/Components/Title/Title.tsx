import * as React from 'react';
import styles from './styles.module.scss';

const Title = () => {

    return (
        <div className={'container'}>
            <h1 className={styles.title__title}>
                It&rsquo;ll never be the<br/>
                same once you
                <span className='text-gradient'> play<br/>Raid</span>
                . Show how you<br/>
                do it and
                <span className='text-gradient'> win prizes!</span>
            </h1>
        </div>
    )
}
export default Title;