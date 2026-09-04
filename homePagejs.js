/* ============================================================
   NAVIGATION
============================================================ */

const navLinks = document.getElementById('nav-links');


/* ============================================================
   PAGES
============================================================ */

const pages = [

    document.getElementById('contentHome'),

    document.getElementById('contentInteriorDesign'),

    document.getElementById('contentProductTechnology'),

    document.getElementById('contentPhotography'),

    document.getElementById('contentContact')

];


/* ============================================================
   TIMELINE
============================================================ */

const timelineItems =
    Array.from(
        document.querySelectorAll('.timeline-item')
    );


/* ============================================================
   STATE
============================================================ */

let currentIndex = 0;

let isAnimating = false;


/* ============================================================
   PAGE TRANSITION
============================================================ */

function goToPage(index) {

    /* --------------------------------
       Basic validation
    -------------------------------- */

    if (
        isAnimating ||
        index < 0 ||
        index >= pages.length ||
        index === currentIndex
    ) {
        return;
    }


    const activePage =
        pages[currentIndex];


    /* --------------------------------
       Check internal text scrolling
    -------------------------------- */

    const textScrollArea =
        activePage.querySelector(
            '.text-scroll-area'
        );


    if (textScrollArea) {

        const isAtBottom =
            textScrollArea.scrollHeight -
            textScrollArea.scrollTop -
            textScrollArea.clientHeight <= 10;


        const isAtTop =
            textScrollArea.scrollTop <= 10;


        /*
         * Moving forward:
         * Only allow page transition if
         * the text is already at the bottom.
         */

        if (
            index > currentIndex &&
            !isAtBottom
        ) {
            return;
        }


        /*
         * Moving backwards:
         * Only allow page transition if
         * the text is already at the top.
         */

        if (
            index < currentIndex &&
            !isAtTop
        ) {
            return;
        }

    }


    /* --------------------------------
       Start animation
    -------------------------------- */

    isAnimating = true;


    /* --------------------------------
       Hide current page
    -------------------------------- */

    pages[currentIndex]
        .classList
        .remove('active');


    /* --------------------------------
       Wait for transition
    -------------------------------- */

    setTimeout(() => {

        /* --------------------------------
           Show new page
        -------------------------------- */

        pages[index]
            .classList
            .add('active');


        /* --------------------------------
           Update timeline
        -------------------------------- */

        timelineItems[currentIndex]
            .classList
            .remove('active');


        timelineItems[index]
            .classList
            .add('active');


        /* --------------------------------
           Reset internal scrolling
        -------------------------------- */

        const newPage =
            pages[index];


        const newTextScrollArea =
            newPage.querySelector(
                '.text-scroll-area'
            );


        if (newTextScrollArea) {

            newTextScrollArea.scrollTop = 0;

        }


        /* --------------------------------
           Update current page
        -------------------------------- */

        currentIndex = index;


        /* --------------------------------
           Finish animation
        -------------------------------- */

        setTimeout(() => {

            isAnimating = false;

        }, 300);

    }, 300);

}


/* ============================================================
   MOUSE WHEEL
============================================================ */

window.addEventListener(
    'wheel',
    (e) => {

        /* --------------------------------
           Don't navigate while menu open
        -------------------------------- */

        if (
            navLinks &&
            navLinks.classList.contains('active')
        ) {
            return;
        }


        const activePage =
            pages[currentIndex];


        if (!activePage) {
            return;
        }


        /* --------------------------------
           Check for internal text area
        -------------------------------- */

        const textScrollArea =
            activePage.querySelector(
                '.text-scroll-area'
            );


        if (textScrollArea) {

            const isAtBottom =
                textScrollArea.scrollHeight -
                textScrollArea.scrollTop -
                textScrollArea.clientHeight <= 10;


            const isAtTop =
                textScrollArea.scrollTop <= 10;


            /* --------------------------------
               SCROLL DOWN
            -------------------------------- */

            if (e.deltaY > 0) {

                /*
                 * If the text isn't at the bottom,
                 * allow normal scrolling.
                 */

                if (!isAtBottom) {
                    return;
                }


                /*
                 * Text is at bottom,
                 * move to next page.
                 */

                goToPage(
                    currentIndex + 1
                );

                return;
            }


            /* --------------------------------
               SCROLL UP
            -------------------------------- */

            if (e.deltaY < 0) {

                /*
                 * If the text isn't at the top,
                 * allow normal scrolling.
                 */

                if (!isAtTop) {
                    return;
                }


                /*
                 * Text is at top,
                 * move to previous page.
                 */

                goToPage(
                    currentIndex - 1
                );

                return;
            }

        }


        /* --------------------------------
           NORMAL PAGE SCROLLING
        -------------------------------- */

        if (e.deltaY > 0) {

            goToPage(
                currentIndex + 1
            );

        }
        else if (e.deltaY < 0) {

            goToPage(
                currentIndex - 1
            );

        }

    },
    {
        passive: true
    }
);


/* ============================================================
   TOUCH
============================================================ */

let touchStartY = 0;


window.addEventListener(
    'touchstart',
    (e) => {

        if (!e.touches.length) {
            return;
        }


        touchStartY =
            e.touches[0].clientY;

    },
    {
        passive: true
    }
);


window.addEventListener(
    'touchend',
    (e) => {

        /* --------------------------------
           Don't navigate while menu open
        -------------------------------- */

        if (
            navLinks &&
            navLinks.classList.contains('active')
        ) {
            return;
        }


        if (!e.changedTouches.length) {
            return;
        }


        const touchEndY =
            e.changedTouches[0].clientY;


        const diff =
            touchStartY - touchEndY;


        /* --------------------------------
           Ignore small movements
        -------------------------------- */

        if (
            Math.abs(diff) <= 40
        ) {
            return;
        }


        /* --------------------------------
           Swipe UP
        -------------------------------- */

        if (diff > 0) {

            goToPage(
                currentIndex + 1
            );

        }


        /* --------------------------------
           Swipe DOWN
        -------------------------------- */

        else {

            goToPage(
                currentIndex - 1
            );

        }

    },
    {
        passive: true
    }
);


/* ============================================================
   TIMELINE CLICK
============================================================ */

timelineItems.forEach(
    (item) => {

        item.addEventListener(
            'click',
            () => {

                const index =
                    Number(
                        item.dataset.index
                    );


                goToPage(index);

            }
        );

    }
);