import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGSAPAnimations = () => {
  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      ".animate-fade-in-up",
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      }
    );

    // Hero Background Parallax
    const hero = document.querySelector(".hero-bg-zoom");

    if (hero) {
      gsap.to(hero, {
        backgroundPositionY: "30%",
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Counter Animation
    document.querySelectorAll(".stat-number").forEach((item) => {
      const target = Number(item.dataset.value);

      if (!target) return;

      const counter = {
        value: 0,
      };

      gsap.to(counter, {
        value: target,
        duration: 2,

        ease: "power3.out",

        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },

        onUpdate: () => {
          item.textContent = Math.floor(counter.value);
        },
      });
    });

    // Card Tilt
    const cards = document.querySelectorAll(".card-premium");

    cards.forEach((card) => {
      const move = (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (rect.height / 2 - y) / 12;
        const rotateY = (x - rect.width / 2) / 12;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
        });
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });

    // Magnetic Buttons
    const buttons = document.querySelectorAll(".btn-animated");

    buttons.forEach((button) => {
      const move = (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
        });
      };

      const leave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
        });
      };

      button.addEventListener("mousemove", move);
      button.addEventListener("mouseleave", leave);

      return () => {
        button.removeEventListener("mousemove", move);
        button.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

export default useGSAPAnimations;