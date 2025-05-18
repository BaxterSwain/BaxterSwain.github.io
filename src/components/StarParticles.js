import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const StarParticles = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#0a0a0a" },
        fpsLimit: 60,
        particles: {
          number: {
            value: 1000,
            density: { enable: true, area: 800 }
          },
          color: { value: ["#00ffe7", "#66faff", "#cfffff", "#ffffff"] },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.2,
              sync: false
            }
          },
          size: {
            value: { min: 0.8, max: 2 },
            random: true
          },
          move: {
            enable: true,
            speed: { min: 0.1, max: 0.4 }, // slow layers
            direction: "none",
            outModes: { default: "out" },
            straight: false
          },
          zIndex: {
            value: { min: 0, max: 100 } // adds depth for parallax
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }
          },
          modes: {
            repulse: {
              distance: 10,
              duration: 0.4
            }
          }
        }
      }}
    />
  );
};

export default StarParticles;
