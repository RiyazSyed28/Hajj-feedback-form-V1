import { motion } from "framer-motion";
import { FaUsers, FaMosque, FaGlobe, FaStar } from "react-icons/fa";

const stats = [
  {
    number: "50,000+",
    label: "Pilgrims Served",
    icon: <FaUsers size={35} />,
  },
  {
    number: "25+",
    label: "Years Experience",
    icon: <FaMosque size={35} />,
  },
  {
    number: "30+",
    label: "Training Centers",
    icon: <FaGlobe size={35} />,
  },
  {
    number: "98%",
    label: "Positive Feedback",
    icon: <FaStar size={35} />,
  },
];

function Statistics() {
  return (
    <section className="bg-green-800 py-20 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: .7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * .15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-5 text-yellow-400">
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold mb-2">
                {item.number}
              </h2>

              <p className="text-lg">
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Statistics;