import { useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {

    // using a new dialog ref and imperative handle makes this component
    // more independent as the open handle is now called which then calls
    // the showModal() which is related to the dialog element.
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    // exposing the open() method which detaches specific element methods
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    // createPortal will place the first parameter jsx code into the element in the second parameter!
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
                </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong>.
                </p>
            <form method='dialog' onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}

// in older versions of React you can forward refs so you need to..
// note that the ref prop is now an additional parameter

// import { forwardRef } from "react";

// const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
//     // ...code
// })

// export default ResultModal;