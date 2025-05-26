"use client" // Make this component to client component
import { useEffect, useState } from "react";

export default function Home() {

  const [koreanTime, setKoreanTime] = useState('') // State to hold the current Korean time string
  const [cambodianTime, setCambodianTime] = useState('') // State to hold the current Cambodian time string
  const [displayText, setDisplayText] = useState('')  // State to hold the currently displayed text (for typing effect)
  const [titles, setTitles] = useState<string[]>([]) // Array to hold the time strings to be typed
  const [titleIndex, setTitleIndex] = useState(0) // Index of the current title in the 'titles' array
  const [charIndex, setCharIndex] = useState(0) // Index of the current character being typed
  const [isDeleting, setIsDeleting] = useState(false) // Flag to indicate if we are currently deleting text
  const typingDelay = 200 // Delay for typing animation (milliseconds)
  const deletingDelay = 100 // Delay for deleting animation (milliseconds)
  const pauseDelay = 2000 // Delay before moving to the next title (milliseconds)
  const nextTitleDelay = 1000 // Delay before starting to type the next title (milliseconds)

  // Function to format the time for a given time zone
  const formatTime = (timeZone: string, locale: string = 'en-US'): string => {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      // hour12: 'false',
    })
    return formatter.format(now)
  }

  // useEffect hook to update the Korean and Cambodian times
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the state with the current Korean time
      setKoreanTime(`한국 시간: ${formatTime('Asia/Seoul', 'ko-KR')}`);
      // Update the state with the current Cambodian time
      setCambodianTime(`캄보디아 시간: ${formatTime('Asia/Phnom_Penh', 'en-KH')}`);
      // Update the titles array with the latest time strings
      setTitles([`한국 시간: ${formatTime('Asia/Seoul', 'ko-KR')}`, `캄보디아 시간: ${formatTime('Asia/Phnom_Penh', 'en-KH')}`]);
    }, 1000); // Update every 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect hook to handle the typing effect
  useEffect(() => {
    // If there are titles to type
    if (titles.length > 0) {
      const timer = setTimeout(() => {
        const currentTitle = titles[titleIndex];

        // If we are deleting
        if (isDeleting) {
          // Remove the last character from the displayed text
          setDisplayText(currentTitle.substring(0, charIndex - 1));
          // Decrement the character index
          setCharIndex((prevIndex) => prevIndex - 1);
          // Set the delay for the next character deletion
          setTimeout(typeEffect, deletingDelay);
        } else {
          // Add the next character to the displayed text
          setDisplayText(currentTitle.substring(0, charIndex + 1));
          // Increment the character index
          setCharIndex((prevIndex) => prevIndex + 1);
          // Set the delay for the next character typing
          setTimeout(typeEffect, typingDelay);
        }

        // If typing is complete
        if (!isDeleting && charIndex === currentTitle.length) {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
        // If deleting is complete
        else if (isDeleting && charIndex === 0) {
          // Stop deleting
          setIsDeleting(false);
          // Move to the next title
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          // Set a delay before typing the next title
          setTimeout(typeEffect, nextTitleDelay);
        }
      }, isDeleting ? deletingDelay : typingDelay); // Initial delay based on whether we are deleting or typing

      // Clean up the timeout if the component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
    // Run this effect whenever the 'titles' array or the 'isDeleting', 'charIndex', 'titleIndex' states change
  }, [titles, isDeleting, charIndex, titleIndex]);

  // Function to initiate the typing effect (called after a short delay on component mount)
  const typeEffect = () => {
    // The main typing logic is handled in the useEffect hook above
  };

  // useEffect to start the typing effect after the initial times are loaded
  useEffect(() => {
    // Set the initial titles after a short delay to ensure the times are fetched
    const initialDelay = setTimeout(() => {
      setTitles([`한국 시간: ${formatTime('Asia/Seoul', 'ko-KR')}`, `캄보디아 시간: ${formatTime('Asia/Phnom_Penh', 'en-KH')}`]);
      // Start the typing effect indirectly through the useEffect that depends on 'titles'
    }, 500);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <h2 className="display-4 fw-semibold mb-4">
              <span className="typing-text">{displayText}</span>
            </h2>
            {/* <div className="time-display">Current Korean Time: {koreanTime}</div>
            <div className="time-display">Current Cambodian Time: {cambodianTime}</div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
