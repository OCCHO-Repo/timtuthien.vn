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
            navbar: '.navbar',
            metaDescription: 'meta[name="description"]',
            languageToggle: '.language-toggle',
            languageButtons: '.lang-btn',
            searchSelect: '.search-select',
            searchDropdown: '.search-dropdown',
            searchDropdownToggle: '.search-dropdown-toggle',
            searchDropdownValue: '.search-dropdown-value',
            searchDropdownMenu: '.search-dropdown-menu',
            searchDropdownOptions: '.search-dropdown-option'
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
        },
        language: {
            default: 'vi',
            storageKey: 'timtuthien.language'
        }
    };

    const ENGLISH_BUNDLE = {
        pageTitle: 'Find Charity - Give More Effectively',
        metaDescription: 'Find Charity helps you discover the most credible and effective charities aligned with your personal values.',
        htmlLang: 'en',
        aria: {
            announcementBar: 'Website announcement',
            homeLink: 'Find Charity homepage',
            languageToggle: 'Choose language',
            switchToVietnamese: 'Switch to Vietnamese',
            switchToEnglish: 'Switch to English'
        },
        announcement: {
            note: 'A new impact report is being updated. Follow to receive verified charity data.',
            button: 'Get updates'
        },
        logo: {
            main: 'Find',
            accent: 'Charity'
        },
        nav: {
            howItWorks: 'How It Works',
            topCharities: 'Top Charities',
            about: 'About',
            startGiving: 'Start Giving'
        },
        hero: {
            headlineHtml: 'Find the <span class="accent-text">most effective</span> charities for the causes you care about.',
            subheadline: 'Data-backed. Transparent. Personalized for you.',
            searchLabel: 'I care about...',
            searchOptions: {
                __placeholder: 'Select a cause',
                'clean-water': 'Clean water',
                education: 'Education',
                climate: 'Climate change',
                poverty: 'Poverty reduction',
                health: 'Global health',
                'animal-welfare': 'Animal welfare'
            },
            primaryButton: 'Find charities',
            secondaryButton: 'Take the quiz'
        },
        editorial: {
            text: 'Last year, Americans donated over 500 billion USD. But most donors do not know how effectively their money is used. Some organizations spend under 30% of their budgets on mission delivery. For the same goal - clean water, children\'s education, disease prevention - impact can vary by as much as 100x depending on which organization you choose. This problem is solvable.'
        },
        primaryComparison: {
            headline: 'Cost to Save One Life',
            source: 'Source: GiveWell, Charity Navigator, GuideStar (2024 data)',
            chartLabels: ['Cost per life saved', 'Program spending ratio', 'Transparency score'],
            barLegends: ['Average charity', 'Recommended by Find Charity']
        },
        mission: {
            headlineHtml: 'The era of blind giving is over. With comprehensive charity intelligence, Find Charity helps every dollar you give create <span class="highlight">the greatest possible impact</span>. We analyzed more than 150,000 nonprofits so you do not have to.',
            subtext: 'Introducing impact-first giving - a smarter way to change the world.'
        },
        donationComparison: {
            headline: 'Your 100 USD donation, two very different outcomes',
            columnTitles: ['Without Find Charity', 'With Find Charity'],
            stackLabels: ['62 USD Program', '28 USD Admin', '10 USD Fundraising', '93 USD Program', '5 USD Admin', '2 USD Fundraising'],
            stackTitles: ['Program: 62 USD', 'Admin: 28 USD', 'Fundraising: 10 USD', 'Program: 93 USD', 'Admin: 5 USD', 'Fundraising: 2 USD'],
            results: ['~0.3 lives impacted', '~2.7 lives impacted']
        },
        emotional: {
            headline: 'This is the most important shift in philanthropy in a generation. It puts power back in the hands of donors and pushes nonprofits to be accountable for real outcomes.',
            link: 'See how it works →'
        },
        table: {
            title: 'The Evidence Is in the Impact',
            subtitle: 'Compare Find Charity\'s top recommendations with familiar organizations',
            headers: ['Charity', 'Find Charity Score', 'Cost / impact unit', 'Transparency'],
            rowNames: ['Large Charity A', 'Large Charity B'],
            costs: ['3,500 USD / life saved', '750 USD / household improved', '18,000 USD / life saved', '45,000 USD / life saved'],
            disclaimer: 'Rankings based on public financial filings and independent impact evaluations'
        },
        faq: {
            title: 'Frequently Asked Questions',
            tabs: ['For Donors', 'For Organizations', 'Methodology'],
            questions: [
                'How does Find Charity score organizations?',
                'Is Find Charity free?',
                'Can I donate directly through Find Charity?',
                'How is this different from Charity Navigator?',
                'What causes does the platform cover?',
                'How often is the data updated?'
            ],
            answers: [
                'We aggregate data from GiveWell, Charity Navigator, GuideStar, ImpactMatters, and our internal research team. Scores are based on impact per dollar, transparency, financial health, leadership accountability, and measurable outcomes.',
                'It is 100% free for individual donors. We are funded by foundations and advanced tools for large organizations.',
                'Yes. You can donate directly to every organization in the database. 100% of your contribution goes to the charity; we do not take a cut.',
                'Charity Navigator mainly measures financial health. Find Charity goes further by measuring real-world impact per dollar - not just who runs well, but who creates the most value for the same cause.',
                'We cover 30+ causes: global health, poverty reduction, climate change, education, animal welfare, justice reform, disaster relief, mental health, and more.',
                'Charity scores are refreshed quarterly. Financial data is synced from IRS Form 990 filings and the latest available annual reports.'
            ]
        },
        cta: {
            headline: 'Your generosity deserves to create more impact.',
            button: 'Find the right charity',
            link: 'Or take the 2-minute quiz →',
            trust: 'Data from GiveWell • Charity Navigator • GuideStar • IRS Form 990 filings'
        },
        footer: {
            logo: 'Find Charity',
            links: ['About', 'Methodology', 'Privacy Policy', 'Contact', 'For Organizations'],
            copyright: '© 2026 Find Charity contributors. Open source under the MIT License.'
        }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const queryAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const getNode = (selector) => document.querySelector(selector);

    const readText = (selector) => {
        const node = getNode(selector);
        return node ? node.textContent.trim() : '';
    };

    const readHtml = (selector) => {
        const node = getNode(selector);
        return node ? node.innerHTML.trim() : '';
    };

    const readAttr = (selector, attribute) => {
        const node = getNode(selector);
        return node ? node.getAttribute(attribute) || '' : '';
    };

    const setText = (selector, value) => {
        const node = getNode(selector);
        if (node && typeof value === 'string') node.textContent = value;
    };

    const setHtml = (selector, value) => {
        const node = getNode(selector);
        if (node && typeof value === 'string') node.innerHTML = value;
    };

    const setAttr = (selector, attribute, value) => {
        const node = getNode(selector);
        if (node && typeof value === 'string') node.setAttribute(attribute, value);
    };

    const setTextList = (selector, values) => {
        const nodes = queryAll(selector);
        if (!Array.isArray(values) || !nodes.length) return;

        nodes.forEach((node, index) => {
            if (typeof values[index] === 'string') node.textContent = values[index];
        });
    };

    const setAttrList = (selector, attribute, values) => {
        const nodes = queryAll(selector);
        if (!Array.isArray(values) || !nodes.length) return;

        nodes.forEach((node, index) => {
            if (typeof values[index] === 'string') node.setAttribute(attribute, values[index]);
        });
    };

    const captureVietnameseBundle = () => {
        const searchOptions = {};
        queryAll(`${CONFIG.selectors.searchSelect} option`).forEach((option) => {
            const key = option.value || '__placeholder';
            searchOptions[key] = option.textContent.trim();
        });

        return {
            pageTitle: document.title,
            metaDescription: readAttr(CONFIG.selectors.metaDescription, 'content'),
            htmlLang: document.documentElement.lang || 'vi',
            aria: {
                announcementBar: readAttr('.announcement-bar', 'aria-label'),
                homeLink: readAttr('.logo', 'aria-label'),
                languageToggle: readAttr(CONFIG.selectors.languageToggle, 'aria-label') || 'Chọn ngôn ngữ',
                switchToVietnamese: 'Chuyển sang tiếng Việt',
                switchToEnglish: 'Chuyển sang tiếng Anh'
            },
            announcement: {
                note: readText('.announcement-note'),
                button: readText('.announcement-btn')
            },
            logo: {
                main: readText('.logo-main'),
                accent: readText('.logo-accent')
            },
            nav: {
                howItWorks: readText('.nav-links a[href="#how-it-works"]'),
                topCharities: readText('.nav-links a[href="#top-charities"]'),
                about: readText('.nav-links a[href="#about"]'),
                startGiving: readText('.nav-links a[href="#start-giving"]')
            },
            hero: {
                headlineHtml: readHtml('.hero-headline'),
                subheadline: readText('.hero-subheadline'),
                searchLabel: readText('.search-label'),
                searchOptions,
                primaryButton: readText('.hero-buttons .btn-primary'),
                secondaryButton: readText('.hero-buttons .btn-outline')
            },
            editorial: {
                text: readText('.editorial-text')
            },
            primaryComparison: {
                headline: readText('.comparison-section#how-it-works .comparison-header h2'),
                source: readText('.comparison-section#how-it-works .source-label'),
                chartLabels: queryAll('.comparison-section#how-it-works .chart-label').map((node) => node.textContent.trim()),
                barLegends: queryAll('.comparison-section#how-it-works .bar-legend').map((node) => node.textContent.trim())
            },
            mission: {
                headlineHtml: readHtml('.mission-text'),
                subtext: readText('.mission-subtext')
            },
            donationComparison: {
                headline: readText('.comparison-section.alt-bg .comparison-header h2'),
                columnTitles: queryAll('.impact-col h3').map((node) => node.textContent.trim()),
                stackLabels: queryAll('.impact-bar-stack .stack-segment span').map((node) => node.textContent.trim()),
                stackTitles: queryAll('.impact-bar-stack .stack-segment').map((node) => node.getAttribute('title') || ''),
                results: queryAll('.impact-result').map((node) => node.textContent.trim())
            },
            emotional: {
                headline: readText('.emotional-headline'),
                link: readText('.emotional-section .text-link')
            },
            table: {
                title: readText('.table-section .section-title'),
                subtitle: readText('.table-section .section-subtitle'),
                headers: [
                    readText('.comparison-table thead .charity-col'),
                    readText('.comparison-table thead .rating-col'),
                    readText('.comparison-table thead .cost-col'),
                    readText('.comparison-table thead .transparency-col')
                ],
                rowNames: queryAll('.comparison-table tbody tr.low-perform .charity-col').map((node) => node.textContent.trim()),
                costs: queryAll('.comparison-table tbody .cost-col').map((node) => node.textContent.trim()),
                disclaimer: readText('.disclaimer')
            },
            faq: {
                title: readText('.faq-section .section-title'),
                tabs: queryAll('.faq-tab').map((node) => node.textContent.trim()),
                questions: queryAll('.accordion-title').map((node) => node.textContent.trim()),
                answers: queryAll('.accordion-content p').map((node) => node.textContent.trim())
            },
            cta: {
                headline: readText('.cta-headline'),
                button: readText('.cta-content .btn.btn-primary.large'),
                link: readText('.cta-content .text-link'),
                trust: readText('.trust-badges p')
            },
            footer: {
                logo: readText('.footer-logo'),
                links: queryAll('.footer-links a').map((node) => node.textContent.trim()),
                copyright: readText('.copyright')
            }
        };
    };

    const LANGUAGE_BUNDLES = {
        vi: captureVietnameseBundle(),
        en: ENGLISH_BUNDLE
    };

    let searchDropdownController = null;

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

    const initCustomSearchSelect = () => {
        const dropdown = getNode(CONFIG.selectors.searchDropdown);
        const toggle = getNode(CONFIG.selectors.searchDropdownToggle);
        const valueNode = getNode(CONFIG.selectors.searchDropdownValue);
        const menu = getNode(CONFIG.selectors.searchDropdownMenu);
        const select = getNode(CONFIG.selectors.searchSelect);

        if (!dropdown || !toggle || !valueNode || !menu || !select) return null;

        const getOptions = () => Array.from(select.options);

        const getFallbackOption = () => getOptions().find((option) => !option.value) || getOptions()[0] || null;

        const getSelectedOption = () => {
            const selected = getOptions().find((option) => option.selected && option.value);
            return selected || getFallbackOption();
        };

        const closeMenu = () => {
            dropdown.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        };

        const updateDisplay = () => {
            const displayOption = getSelectedOption();
            valueNode.textContent = displayOption ? displayOption.textContent.trim() : '';
        };

        const buildMenu = () => {
            const selectedValue = select.value;
            menu.innerHTML = '';

            getOptions().forEach((option) => {
                if (!option.value) return;

                const item = document.createElement('button');
                item.type = 'button';
                item.className = 'search-dropdown-option';
                item.dataset.value = option.value;
                item.setAttribute('role', 'option');

                const isSelected = option.value === selectedValue;
                item.classList.toggle('is-selected', isSelected);
                item.setAttribute('aria-selected', String(isSelected));
                item.textContent = option.textContent.trim();

                item.addEventListener('click', () => {
                    select.value = option.value;
                    getOptions().forEach((opt) => {
                        opt.selected = opt.value === option.value;
                    });
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    closeMenu();
                    toggle.focus();
                });

                menu.appendChild(item);
            });
        };

        toggle.addEventListener('click', () => {
            if (dropdown.classList.contains('is-open')) {
                closeMenu();
                return;
            }
            openMenu();
        });

        toggle.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openMenu();
            const selectedItem = menu.querySelector('.search-dropdown-option.is-selected') || menu.querySelector('.search-dropdown-option');
            if (selectedItem) selectedItem.focus();
        });

        menu.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
                toggle.focus();
            }
        });

        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });

        select.addEventListener('change', () => {
            buildMenu();
            updateDisplay();
        });

        buildMenu();
        updateDisplay();

        return {
            refresh: () => {
                buildMenu();
                updateDisplay();
            }
        };
    };

    const syncOpenAccordionHeights = () => {
        queryAll(CONFIG.selectors.accordionItems).forEach((item) => {
            if (!item.classList.contains('active')) return;
            const content = item.querySelector('.accordion-content');
            if (content) content.style.maxHeight = `${content.scrollHeight}px`;
        });
    };

    const updateSearchOptions = (optionsMap) => {
        const select = getNode(CONFIG.selectors.searchSelect);
        if (!select || !optionsMap) return;

        queryAll('option', select).forEach((option) => {
            const key = option.value || '__placeholder';
            if (typeof optionsMap[key] === 'string') option.textContent = optionsMap[key];
        });

        if (searchDropdownController) {
            searchDropdownController.refresh();
        }
    };

    const markActiveLanguageButton = (language, bundle) => {
        const buttons = queryAll(CONFIG.selectors.languageButtons);
        if (!buttons.length) return;

        const toggle = getNode(CONFIG.selectors.languageToggle);
        if (toggle) {
            toggle.setAttribute('aria-label', bundle.aria.languageToggle);
            toggle.setAttribute('data-active-lang', language);
        }

        buttons.forEach((button) => {
            const isActive = button.dataset.lang === language;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));

            if (button.dataset.lang === 'vi') {
                button.setAttribute('aria-label', bundle.aria.switchToVietnamese);
            }

            if (button.dataset.lang === 'en') {
                button.setAttribute('aria-label', bundle.aria.switchToEnglish);
            }
        });
    };

    const applyLanguage = (language) => {
        const bundle = LANGUAGE_BUNDLES[language];
        if (!bundle) return;

        document.documentElement.lang = bundle.htmlLang;
        document.title = bundle.pageTitle;
        setAttr(CONFIG.selectors.metaDescription, 'content', bundle.metaDescription);

        setAttr('.announcement-bar', 'aria-label', bundle.aria.announcementBar);
        setAttr('.logo', 'aria-label', bundle.aria.homeLink);

        setText('.announcement-note', bundle.announcement.note);
        setText('.announcement-btn', bundle.announcement.button);

        setText('.logo-main', bundle.logo.main);
        setText('.logo-accent', bundle.logo.accent);

        setText('.nav-links a[href="#how-it-works"]', bundle.nav.howItWorks);
        setText('.nav-links a[href="#top-charities"]', bundle.nav.topCharities);
        setText('.nav-links a[href="#about"]', bundle.nav.about);
        setText('.nav-links a[href="#start-giving"]', bundle.nav.startGiving);

        setHtml('.hero-headline', bundle.hero.headlineHtml);
        setText('.hero-subheadline', bundle.hero.subheadline);
        setText('.search-label', bundle.hero.searchLabel);
        setAttr(CONFIG.selectors.searchDropdownToggle, 'aria-label', bundle.hero.searchLabel);
        updateSearchOptions(bundle.hero.searchOptions);
        setText('.hero-buttons .btn-primary', bundle.hero.primaryButton);
        setText('.hero-buttons .btn-outline', bundle.hero.secondaryButton);

        setText('.editorial-text', bundle.editorial.text);

        setText('.comparison-section#how-it-works .comparison-header h2', bundle.primaryComparison.headline);
        setText('.comparison-section#how-it-works .source-label', bundle.primaryComparison.source);
        setTextList('.comparison-section#how-it-works .chart-label', bundle.primaryComparison.chartLabels);
        setTextList('.comparison-section#how-it-works .bar-legend', bundle.primaryComparison.barLegends);

        setHtml('.mission-text', bundle.mission.headlineHtml);
        setText('.mission-subtext', bundle.mission.subtext);

        setText('.comparison-section.alt-bg .comparison-header h2', bundle.donationComparison.headline);
        setTextList('.impact-col h3', bundle.donationComparison.columnTitles);
        setTextList('.impact-bar-stack .stack-segment span', bundle.donationComparison.stackLabels);
        setAttrList('.impact-bar-stack .stack-segment', 'title', bundle.donationComparison.stackTitles);
        setTextList('.impact-result', bundle.donationComparison.results);

        setText('.emotional-headline', bundle.emotional.headline);
        setText('.emotional-section .text-link', bundle.emotional.link);

        setText('.table-section .section-title', bundle.table.title);
        setText('.table-section .section-subtitle', bundle.table.subtitle);
        setText('.comparison-table thead .charity-col', bundle.table.headers[0]);
        setText('.comparison-table thead .rating-col', bundle.table.headers[1]);
        setText('.comparison-table thead .cost-col', bundle.table.headers[2]);
        setText('.comparison-table thead .transparency-col', bundle.table.headers[3]);
        setTextList('.comparison-table tbody tr.low-perform .charity-col', bundle.table.rowNames);
        setTextList('.comparison-table tbody .cost-col', bundle.table.costs);
        setText('.disclaimer', bundle.table.disclaimer);

        setText('.faq-section .section-title', bundle.faq.title);
        setTextList('.faq-tab', bundle.faq.tabs);
        setTextList('.accordion-title', bundle.faq.questions);
        setTextList('.accordion-content p', bundle.faq.answers);

        setText('.cta-headline', bundle.cta.headline);
        setText('.cta-content .btn.btn-primary.large', bundle.cta.button);
        setText('.cta-content .text-link', bundle.cta.link);
        setText('.trust-badges p', bundle.cta.trust);

        setText('.footer-logo', bundle.footer.logo);
        setTextList('.footer-links a', bundle.footer.links);
        setText('.copyright', bundle.footer.copyright);

        markActiveLanguageButton(language, bundle);
        syncOpenAccordionHeights();
    };

    const getSavedLanguage = () => {
        try {
            const saved = window.localStorage.getItem(CONFIG.language.storageKey);
            return saved && Object.prototype.hasOwnProperty.call(LANGUAGE_BUNDLES, saved) ? saved : null;
        } catch (error) {
            return null;
        }
    };

    const getBrowserPreferredLanguage = () => {
        const rawLanguage = (window.navigator.language || '').toLowerCase();

        if (rawLanguage.startsWith('vi')) return 'vi';
        if (rawLanguage.startsWith('en')) return 'en';

        return CONFIG.language.default;
    };

    const saveLanguage = (language) => {
        try {
            window.localStorage.setItem(CONFIG.language.storageKey, language);
        } catch (error) {
            // Ignore blocked storage environments.
        }
    };

    const initLanguageToggle = () => {
        const buttons = queryAll(CONFIG.selectors.languageButtons);
        const savedLanguage = getSavedLanguage();
        let currentLanguage = savedLanguage || getBrowserPreferredLanguage();

        if (!Object.prototype.hasOwnProperty.call(LANGUAGE_BUNDLES, currentLanguage)) {
            currentLanguage = CONFIG.language.default;
        }

        applyLanguage(currentLanguage);

        if (!buttons.length) return;

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetLanguage = button.dataset.lang;
                if (!targetLanguage || targetLanguage === currentLanguage) return;
                if (!Object.prototype.hasOwnProperty.call(LANGUAGE_BUNDLES, targetLanguage)) return;

                currentLanguage = targetLanguage;
                applyLanguage(currentLanguage);
                saveLanguage(currentLanguage);
            });
        });
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

        window.addEventListener('resize', syncOpenAccordionHeights);
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

    searchDropdownController = initCustomSearchSelect();
    initLanguageToggle();
    initSectionReveal();
    initBarChartAnimations();
    initStackedBarAnimations();
    initAccordion();
    initFaqTabs();
    initSmoothScroll();
});
