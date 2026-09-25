/* =========================================
   P001 — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("active");
        });

    }


    /* =====================================
       STAGGERED REVEAL
    ===================================== */

    const revealGroups = [
        ".skill-card",
        ".achievement-item",
        ".project-list-item"
    ];

    revealGroups.forEach((selector) => {

        const items = document.querySelectorAll(selector);

        items.forEach((item, index) => {

            item.style.transitionDelay = `${index * 0.08}s`;

        });

    });


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");


        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );


            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "ph-list",
                    !isOpen
                );

                icon.classList.toggle(
                    "ph-x",
                    isOpen
                );

            }

        });


        /* Close menu when navigation link is clicked */

        const mobileNavLinks = mainNav.querySelectorAll("a");

        mobileNavLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );


                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("ph-x");
                    icon.classList.add("ph-list");

                }

            });

        });

    }


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const navLinks = document.querySelectorAll(
        ".main-nav .nav-link"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if (
        navLinks.length &&
        sections.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );

                    });

                });

            },
            {
                threshold: 0.25,
                rootMargin: "-20% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {
                return;
            }


            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !subject.value.trim() ||
                !message.value.trim()
            ) {
                return;
            }


            const button = contactForm.querySelector(
                ".contact-submit"
            );

            if (!button) {
                return;
            }


            const buttonText = button.querySelector("span");

            if (!buttonText) {
                return;
            }


            const originalText = buttonText.textContent;

            buttonText.textContent = "Message Ready ✓";

            button.disabled = true;


            setTimeout(() => {

                buttonText.textContent = originalText;

                button.disabled = false;

            }, 2200);

        });

    }


    /* =====================================
       IMAGE LOADING
    ===================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        if (image.complete) {
            image.classList.add("loaded");
        }

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

    });


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});