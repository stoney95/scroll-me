import { RefObject, useEffect } from "react";
import { Type } from "typescript";

function useAnimation<T>(ref: RefObject<T>, animation: (obj: T) => void) {
    useEffect(() => {
        const object = ref.current;
        if (object === null) return;

        animation(object);
    }, [ref])
}

export default useAnimation;