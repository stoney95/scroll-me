import { RefObject, useEffect, useRef } from "react";
import { Type } from "typescript";

function useAnimation<T>(ref: RefObject<T>, animation: (obj: T) => void) {
    const didAnimate = useRef(false);
    useEffect(() => {
        const object = ref.current;
        if (object === null) return;
        if (didAnimate.current) return;

        didAnimate.current = true;
        animation(object);
    }, [ref])
}

export default useAnimation;