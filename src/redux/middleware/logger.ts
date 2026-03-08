import type { Middleware } from '@reduxjs/toolkit';

const logger:Middleware = (store) => {
    return (next: (action: unknown) => unknown) => (action: unknown) => {
        const groupTitle = (typeof action === 'object' && action !== null && 'type' in action)
            ? (action as { type: string }).type
            : 'UNKNOWN_ACTION';

        console.group(groupTitle);
        console.info('dispatching', action);
        const result = next(action);
        console.log('next state', store.getState());
        console.groupEnd();
        return result; 
    };
};

export default logger;
