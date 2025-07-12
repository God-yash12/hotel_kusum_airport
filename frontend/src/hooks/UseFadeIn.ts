import { useEffect, useState } from "react";

const UseFadeIn = (delay: number = 0) => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return {
        isVisible,
        // Animation styles
        fadeInStyles: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`
        }
    };
};

export default UseFadeIn;