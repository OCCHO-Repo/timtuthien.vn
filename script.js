document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        selectors: {
            sections: 'section',
            bars: '.bar[data-width]',
            stackContainers: '.impact-bar-stack',
            stackSegments: '.stack-segment[data-height]',
            accordionItems: '.accordion-item',
            accordionHeaders: '.accordion-header',
            tabs: '.faq-tab',
            anchors: 'a[href^="#"]',
            navbar: '.navbar'
        },
        reveal: {
            threshold: 0.15,
            rootMargin: '0px'
        },
        barAnimation: {
            threshold: 0.5,
            delayMs: 180
        },
        stackAnimation: {
            threshold: 0.2,
            baseDelayMs: 180,
            staggerMs: 90
        },
        accordion: {
            singleOpen: false
        }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const queryAll = (selector) => Array.from(document.querySelectorAll(selector));

    const observeOnce = (elements, options, onVisible) => {
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                onVisible(entry.target);
                observer.unobserve(entry.target);
            });
        }, options);

        elements.forEach((element) => observer.observe(element));
    };

    const initSectionReveal = () => {
        const sections = queryAll(CONFIG.selectors.sections);
        if (!sections.length) return;

        sections.forEach((section) => section.classList.add('fade-in-section'));

        if (prefersReducedMotion) {
            sections.forEach((section) => section.classList.add('is-visible'));
            return;
        }

        observeOnce(
            sections,
            {
                root: null,
                threshold: CONFIG.reveal.threshold,
                rootMargin: CONFIG.reveal.rootMargin
            },
            (section) => section.classList.add('is-visible')
        );
    };

    const initBarChartAnimations = () => {
        const bars = queryAll(CONFIG.selectors.bars);
        if (!bars.length) return;

        if (prefersReducedMotion) {
            bars.forEach((bar) => {
                bar.style.width = bar.dataset.width || '100%';
            });
            return;
        }

        bars.forEach((bar) => {
            bar.style.width = '0';
        });

        observeOnce(
            bars,
            { threshold: CONFIG.barAnimation.threshold },
            (bar) => {
                const width = bar.dataset.width || '100%';
                window.setTimeout(() => {
                    bar.style.width = width;
                }, CONFIG.barAnimation.delayMs);
            }
        );
    };

    const initStackedBarAnimations = () => {
        const stackContainers = queryAll(CONFIG.selectors.stackContainers);
        const stackSegments = queryAll(CONFIG.selectors.stackSegments);

        if (!stackContainers.length || !stackSegments.length) return;

        if (prefersReducedMotion) {
            stackSegments.forEach((segment) => {
                segment.style.height = segment.dataset.height || '0';
            });
            return;
        }

        stackSegments.forEach((segment) => {
            segment.style.height = '0';
            segment.style.transition = 'height 1.15s cubic-bezier(0.22, 1, 0.36, 1)';
        });

        observeOnce(
            stackContainers,
            { threshold: CONFIG.stackAnimation.threshold },
            (container) => {
                const segments = queryAll(CONFIG.selectors.stackSegments).filter((segment) => container.contains(segment));

                segments.forEach((segment, index) => {
                    const delay = CONFIG.stackAnimation.baseDelayMs + index * CONFIG.stackAnimation.staggerMs;
                    window.setTimeout(() => {
                        segment.style.height = segment.dataset.height || '0';
                    }, delay);
                });
            }
        );
    };

    const closeAccordionItem = (item) => {
        const content = item.querySelector('.accordion-content');
        if (!content) return;
        item.classList.remove('active');
        content.style.maxHeight = null;
    };

    const openAccordionItem = (item) => {
        const content = item.querySelector('.accordion-content');
        if (!content) return;
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
    };

    const initAccordion = () => {
        const items = queryAll(CONFIG.selectors.accordionItems);
        const headers = queryAll(CONFIG.selectors.accordionHeaders);

        if (!items.length || !headers.length) return;

        headers.forEach((header) => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion-item');
                if (!item) return;

                const isOpen = item.classList.contains('active');

                if (CONFIG.accordion.singleOpen) {
                    items.forEach((otherItem) => {
                        if (otherItem !== item) closeAccordionItem(otherItem);
                    });
                }

                if (isOpen) {
                    closeAccordionItem(item);
                } else {
                    openAccordionItem(item);
                }
            });
        });

        window.addEventListener('resize', () => {
            items.forEach((item) => {
                if (!item.classList.contains('active')) return;
                const content = item.querySelector('.accordion-content');
                if (content) content.style.maxHeight = `${content.scrollHeight}px`;
            });
        });
    };

    const initFaqTabs = () => {
        const tabs = queryAll(CONFIG.selectors.tabs);
        if (!tabs.length) return;

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((item) => item.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    };

    const initSmoothScroll = () => {
        const anchors = queryAll(CONFIG.selectors.anchors);
        if (!anchors.length) return;

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                event.preventDefault();

                const navbar = document.querySelector(CONFIG.selectors.navbar);
                const offset = navbar ? navbar.offsetHeight + 12 : 0;
                const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    };

    initSectionReveal();
    initBarChartAnimations();
    initStackedBarAnimations();
    initAccordion();
    initFaqTabs();
    initSmoothScroll();
});
