import React, { useEffect, useState, useRef } from "react";

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            {/* Outer Neumorphic Container */}
            <div className="p-8 rounded-2xl bg-gray-200 shadow-[12px_12px_24px_#bebebe,-12px_-12px_24px_#ffffff] flex flex-col items-center">
                {/* Display */}
                <div className="text-6xl sm:text-8xl font-bold p-6 mb-8 bg-gray-200 rounded-lg shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
                    {formatTime()}
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    {/* Green Button */}
                    <button
                        onClick={start}
                        className="py-2 px-6 font-bold rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                    >
                        Start
                    </button>
                    {/* Red Button */}
                    <button
                        onClick={stop}
                        className="py-2 px-6 font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Stop
                    </button>
                    {/* Blue Button */}
                    <button
                        onClick={reset}
                        className="py-2 px-6 font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
