import { Box } from '@mui/material';
import styles from './styles.module.scss';
import useDeepAR from '@/hooks/useDeepAR';
import { useEffect, useState } from 'react';
import { downloadFile } from '@/utils/downloadFile';
import { EffectItem, EffectPicker } from './EffectPicker';
import useCreativeRecorder from '@/hooks/useCreativeRecorder';

const effects: EffectItem[] = [
    {
        name: "orc",
        src: 'PICKER1.png',
        url: "effects/MASK_1.deepar"
    },
    {
        name: "skelet",
        src: 'PICKER2.png',
        url: "effects/MASK_1.deepar"
    },
];

const orcEffects: EffectItem[] = [
    {
        name: "Orc + tatoo",
        src: 'PICKER7.png',
        url: "effects/ORC_BG+TATOO.deepar"
    },
    {
        name: "Orc + EYES",
        src: 'PICKER8.png',
        url: "effects/ORC_BG+EYES.deepar"
    },
    {
        name: "Orc + orc head",
        src: 'PICKER3.png',
        url: "effects/ORC_BG+ORC_HEAD.deepar"
    },
    {
        name: "Orc + skeleton head",
        src: 'PICKER4.png',
        url: "effects/ORC_BG+SKELETON_HEAD.deepar"
    },
]

const skeletEffects: EffectItem[] = [
    {
        name: "Skeleton + tatoo",
        src: 'PICKER7.png',
        url: "/effects/MASK+TEXT.deepar"
    },
    {
        name: "Skeleton + eyes",
        src: 'PICKER8.png',
        url: "/effects/EYES+TEXT.deepar"
    },
    {
        name: "Skeleton + orc head",
        src: 'PICKER3.png',
        url: "/effects/ORC_HEAD+TEXT.deepar"
    },
    {
        name: "Skeleton + skeleton head",
        src: 'PICKER4.png',
        url: "/effects/SKELETON_HEAD+TEXT.deepar"
    },
]

export const CreativeRecorderPhoto = () =>
{
    const deepAR = useDeepAR("#deepar-screen", "effects/ORC_BG+TATOO.deepar");
    const creativeRecorder = useCreativeRecorder({ deepAR });
    const [isInited, setIsInited] = useState<boolean>(false);
    const [currentEffects, setCurrentEffects] = useState<EffectItem[]>(orcEffects);

    useEffect(() =>
    {
        initializeCreativeRecorder();

        return () =>
        {
            if (deepAR && isInited) deepAR.shutdown();

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInited, deepAR]);


    async function initializeCreativeRecorder()
    {

        const videoGrants = await creativeRecorder.getPermissions();

        setIsInited(videoGrants);
    }


    useEffect(() =>
    {
        return () =>
        {
            if (deepAR && isInited) deepAR.shutdown();

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleClick()
    {
        const dataUrl = await deepAR.takeScreenshot();
        console.log('Before Blob', dataUrl);
        const blob = convertDataUrlToBlob(dataUrl);
        console.log('After Blob', blob);
        downloadFile(blob, "photo.png");
    }

    function firstEffectChange(effect: EffectItem)
    {
        if (effect.name === 'orc')
        {
            setCurrentEffects(orcEffects);
        } else if (effect.name === 'skelet')
        {
            setCurrentEffects(skeletEffects);
        }
    }

    function handleEffectChange(effect: EffectItem)
    {
        deepAR?.switchEffect(effect.url);
    }

    return (
        <Box className={styles.CreativeRecorder}>
            <Box className={styles.CreativeRecorder__recorder} id="deepar-screen" />
            <Box className={styles.CreativeRecorder__buttons}>
                <EffectPicker
                    effects={currentEffects}
                    onEffectChange={handleEffectChange}
                    orientation={'vertical'}
                />
                <EffectPicker
                    effects={effects}
                    onEffectChange={firstEffectChange}
                    orientation={'horizontal'}
                    radioName={'effects'}
                />
                <button
                    onClick={handleClick}
                    className={`${styles.button} ${styles['button-stop']} ${styles['button-photo']}`}
                >
                    <span />
                </button>
            </Box>
        </Box>)
}

function convertDataUrlToBlob(dataUrl: string): Blob
{
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--)
    {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}
