document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Fade In)
    const sections = document.querySelectorAll('section');

    const sectionObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        sectionObserver.observe(section);
    });

    // 2. Bar Chart Animations (Width)
    const bars = document.querySelectorAll('.bar[data-width]');

    // Initialize width to 0
    bars.forEach(bar => {
        bar.style.width = '0';
    });

    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                // Small delay to let the section fade in first
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => barObserver.observe(bar));

    // 3. Stacked Bar Animations (Height)
    const stackSegments = document.querySelectorAll('.stack-segment[data-height]');
    const stackContainers = document.querySelectorAll('.impact-bar-stack');

    // Initialize height to 0
    stackSegments.forEach(segment => {
        // Store original transition to restore later if needed, but CSS has it.
        // We'll set inline transition here to be sure.
        segment.style.height = '0';
        segment.style.transition = 'height 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    const stackObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const segments = container.querySelectorAll('.stack-segment');

                segments.forEach((segment, index) => {
                    const height = segment.getAttribute('data-height');
                    // Stagger animations slightly
                    setTimeout(() => {
                        segment.style.height = height;
                    }, index * 100 + 200);
                });

                observer.unobserve(container);
            }
        });
    }, { threshold: 0.2 });

    stackContainers.forEach(container => stackObserver.observe(container));

    // 4. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            // Close other items (optional - accordion behavior)
            // const allItems = document.querySelectorAll('.accordion-item');
            // allItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.accordion-content').style.maxHeight = null;
            //     }
            // });

            // Toggle current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 5. FAQ Tabs
    const tabs = document.querySelectorAll('.faq-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // In a real app, this would filter the FAQ items. 
            // For this demo, we'll just simulate a switch (or do nothing as content is static/generic)
            // If content was specific to tabs, we'd toggle visibility here.
        });
    });

    // 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
