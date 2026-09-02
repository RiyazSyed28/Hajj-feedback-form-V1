import { motion } from "framer-motion";
import { FaMosque, FaUsers, FaHandsHelping } from "react-icons/fa";

const features = [
  {
    icon: <FaMosque size={38} />,
    title: "Pilgrim Guidance",
    desc: "Comprehensive guidance and support throughout the Hajj journey.",
  },
  {
    icon: <FaUsers size={38} />,
    title: "Training Programs",
    desc: "Professional orientation and practical training before departure.",
  },
  {
    icon: <FaHandsHelping size={38} />,
    title: "Continuous Improvement",
    desc: "Collecting feedback to improve future Hajj services.",
  },
];

function About() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-5">
            About Karnataka State Haj Committee
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-8 text-lg">
            Karnataka State Haj Committee is committed to providing every Haj
            pilgrim with quality services, transparent administration,
            systematic training, and continuous improvements based on structured
            feedback collected after every pilgrimage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * .2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-2xl p-8 shadow hover:shadow-xl transition"
            >
              <div className="text-green-700 mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
}

export default About;