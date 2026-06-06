import { useRef } from "react";

function Addition() {
  const aboutRef = useRef(null); // This is pointing to AboutUs div ref
  const contactRef = useRef(null); // This is pointing to ContactUs div ref

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <h2>Scroll Example with useRef</h2>
      <button onClick={scrollToAbout}> AboutUs</button>
      <button onClick={scrollToContact}> ContactUs</button>

      <div>
        <h3>🏠 Home Section</h3>
        <p>Scroll down using buttons...</p>
      </div>

      <div ref={aboutRef}>
        <h3>ℹ️ About Section</h3>
        <p>This is the About section.</p>
      </div>

      <div ref={contactRef}>
        <h3>📞 Contact Section</h3>
        <p>This is the Contact section.</p>
      </div>
    </>
  );
}
export default Addition;
