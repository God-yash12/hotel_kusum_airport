import { useEffect, useState } from "react";


 const UseFadeIn =  (delay: number = 0) => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout (() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isVisible;
}

export default UseFadeIn;