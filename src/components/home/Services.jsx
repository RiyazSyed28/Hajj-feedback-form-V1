import { motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaBookOpen,
  FaHotel,
  FaHeartbeat,
  FaUserShield,
  FaClipboardCheck,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBookOpen size={42} />,
    title: "Pre-Hajj Training",
    desc: "Comprehensive orientation covering rituals, travel guidelines, safety, and preparation.",
  },
  {
    icon: <FaPlaneDeparture size={42} />,
    title: "Travel Assistance",
    desc: "Support for departure, flights, baggage handling, and travel coordination.",
  },
  {
    icon: <FaHotel size={42} />,
    title: "Accommodation",
    desc: "Comfortable accommodation management in Makkah, Mina, and Madinah.",
  },
  {
    icon: <FaHeartbeat size={42} />,
    title: "Medical Support",
    desc: "Dedicated healthcare services and emergency assistance during pilgrimage.",
  },
  {
    icon: <FaUserShield size={42} />,
    title: "Pilgrim Safety",
    desc: "Guidance and safety measures throughout the pilgrimage journey.",
  },
  {
    icon: <FaClipboardCheck size={42} />,
    title: "Feedback & Improvement",
    desc: "Collecting structured feedback to improve future Hajj experiences.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800">
            Our Services
          </h2>

          <p className="text-gray-600 mt-4">
            Supporting pilgrims before, during, and after Hajj.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {services.map((service, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-green-700 mb-5">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.desc}
              </p>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
}