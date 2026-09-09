'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { DeferredMount } from '@/components/ui/DeferredMount';
import { HeroVisual } from "@/components/sections/HeroVisual";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import { SocialCorner } from '@/components/layout/SocialCorner';
import { EveCompanionDock } from '@/components/ui/EveCompanionDock';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MetricCTAHijack = () => {
    return (
        <>
            <StatsSection showOnly="top" />
            <section className="relative">
                {/* Layer 1: The Blog/Book Slider (Sticky) */}
                <div className="sticky top-0 z-0 overflow-hidden">
                    <StatsSection showOnly="bottom" />
                </div>

                {/* Layer 2: The CTA Section (Slides Over) */}
                <div className="relative z-20 bg-background dark:bg-black">
                    <div className="absolute top-0 left-0 w-full h-10 dark:shadow-[0_-50px_150px_rgba(0,0,0,0.8)] -z-10" />

                    <div className="h-[10vh]" />
                    <CTASection />
                    <div className="h-20" />
                </div>
            </section>
        </>
    );
};

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoadingExit, setIsInitialLoadingExit] = useState(false);
    const [skipAnimation, setSkipAnimation] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setSkipAnimation(true);
            setIsLoading(false);
        }

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;
        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const isReadyToAnimate = isLoading ? isInitialLoadingExit : true;

    useEffect(() => {
        if (isReadyToAnimate) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isReadyToAnimate]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => {
        setIsInitialLoadingExit(true);
    };

    return (
        <>
            <Navbar />
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main
                initial={skipAnimation ? false : { opacity: 0, y: 40 }}
                animate={skipAnimation ? { opacity: 1, y: 0 } : (isReadyToAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
                transition={{
                    duration: skipAnimation ? 0 : 1.4,
                    ease: skipAnimation ? "linear" : [0.16, 1, 0.3, 1],
                    opacity: { duration: skipAnimation ? 0 : 0.8 }
                }}
                className="relative overflow-x-clip will-change-transform will-change-opacity bg-[#030712]"
            >
                <HeroVisual isExiting={isReadyToAnimate} />

                <DeferredMount>
                    <AboutSection />
                    <MetricCTAHijack />
                    <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
                    <EveCompanionDock />
                </DeferredMount>
            </motion.main>
        </>
    );
}
