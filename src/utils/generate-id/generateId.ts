import { ID } from 'src/types';

export function generateId(): ID {
    const [id] = window.crypto.getRandomValues(new Uint32Array(1));
    return id;
}
