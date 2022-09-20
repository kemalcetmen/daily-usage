import { useState, useEffect } from 'react';

const DoubleClickHook = (actionSimpleClick:any, actionDoubleClick:any, delay = 350)=> {
    const [click, setClick] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (click === 1) actionSimpleClick();
            setClick(0);
        }, delay);
        if (click === 2) actionDoubleClick();
        return () => clearTimeout(timer);
    }, [click]);

    return () => setClick(prev => prev + 1);
}
export default DoubleClickHook