import React from 'react';
import * as constants from './LockFocusOutside.constants';

type TFocusableElement = Element & {
    focus(): void;
};

export const LockFocusOutside: React.FC = ({ children }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const focusableElements =
        React.useRef<NodeListOf<TFocusableElement> | null>(null);

    React.useEffect(() => {
        const wrapper = wrapperRef.current!;
        if (!wrapper) return;

        const updateFocusableElements = () => {
            focusableElements.current = wrapper.querySelectorAll(
                constants.FOCUSABLE_ELEMENTS,
            );
        };
        updateFocusableElements();

        const observer = new MutationObserver(updateFocusableElements);
        observer.observe(wrapper, { childList: true });

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const { current: elements } = focusableElements;

            if (!elements || e.key !== 'Tab') return;

            const {
                length,
                0: firstElement,
                [length - 1]: lastElement,
            } = elements;

            if (length === 1) {
                return;
            }

            const { activeElement } = document;

            if (!e.shiftKey && activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
                return;
            }

            if (e.shiftKey && activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return <div ref={wrapperRef}>{children}</div>;
};
