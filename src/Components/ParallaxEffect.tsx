import { FC, useEffect } from 'react';

const ParallaxEffect: FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const top = window.pageYOffset;
            const layers = document.querySelectorAll('.parallax') as NodeListOf<HTMLElement>;
            layers.forEach(layer => {
                const speed = +layer.dataset.speed || 0;
                const yPos = -(top * speed / 100);
                layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
};

export default ParallaxEffect;
