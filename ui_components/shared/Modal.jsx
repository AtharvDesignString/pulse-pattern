import React, { Fragment, useRef, useCallback, FC } from "react";
import { useOnClickOutside, useResizeObserver } from "../../utils/hooks";

import { LazyMotion, domMax, m } from "framer-motion";

const Modal = ({ children, onToggleModal, width, height }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onToggleModal);

    const onResize = useCallback((target) => {
        if (ref.current) {
            ref.current.style.height = `${target.offsetHeight}px`;
        }
    }, []);

    const contentRef = useResizeObserver(onResize);

    return (
        <LazyMotion features={domMax}>
            <Fragment>
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="blur"
                />
                <m.div
                    initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.95 }}
                    animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
                    exit={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    ref={ref}
                    className="modal"
                    style={{ width, height }}
                >
                    <div ref={contentRef} className="modal__content">
                        {children}
                    </div>
                </m.div>
            </Fragment>
        </LazyMotion>
    );
};

export default Modal;
