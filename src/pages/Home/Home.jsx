import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import Statistics from "../../components/home/Statistics";
import Services from "../../components/home/Services";
import Timeline from "../../components/home/Timeline";
import Gallery from "../../components/home/Gallery";
import Contact from "../../components/home/Contact";

function Home() {
    return (
        <>
            <Hero />
            <About />
            <Statistics />
            <Services />
            <Timeline />
            <Gallery />
            <Contact />
        </>
    );
}

export default Home;