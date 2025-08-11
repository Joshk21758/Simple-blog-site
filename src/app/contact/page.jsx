import ContactForm from "@/components/ContactForm";
import { MdHeadsetMic } from "react-icons/md";

export default function Contact() {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: 45,
          marginTop: 13,
          marginBottom: 13,
          fontWeight: 700,
          marginRight: 30,
          fontFamily: "serif",
          marginLeft: -38,
        }}
      >
        Contact Us
      </p>
      <MdHeadsetMic size={65} className="fon-icon" />
      <ContactForm />
    </div>
  );
}
