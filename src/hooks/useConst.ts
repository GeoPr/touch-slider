import { useState } from 'react';

export function useConst<R>(callback: () => R): R {
    const [state] = useState(callback);
    return state;
}
