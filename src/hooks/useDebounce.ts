import { useState, useEffect, useCallback, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number): [T, () => void] {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancel = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return cancel;
    }, [value, delay, cancel]);

    return [debouncedValue, cancel];
}