"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function CountUp({ end, duration = 1.5, delay = 0.8 }: { end: number, duration?: number, delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const target = ref.current;
    if (!target) return;

    // Set initial value immediately to avoid blank state
    target.innerText = "0";

    const counter = { value: 0 };
    gsap.to(counter, {
      value: end,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      onUpdate: () => {
        target.innerText = Math.round(counter.value).toLocaleString();
      }
    });
  }, { dependencies: [end, duration, delay] });

  return <span ref={ref}>0</span>;
}