const modelSection = document.getElementById("modelSection");
const model = document.getElementById("model");
const modelText = document.getElementById("modelText");

let rotation = 0;
let scrollCount = 0;

let modelActive = false;


// =========================================================
// DETECT WHEN MODEL SECTION IS IN VIEW
// =========================================================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && entry.intersectionRatio > 0.8) {

                modelActive = true;

            } else {

                modelActive = false;

            }

        });

    },
    {
        threshold: [0, 0.8, 1]
    }
);

observer.observe(modelSection);


// =========================================================
// SCROLL
// =========================================================

window.addEventListener("wheel", (event) => {

    // Only run when the model section is active
    if (!modelActive) {
        return;
    }


    // =====================================================
    // ROTATE MODEL
    // =====================================================

    if (event.deltaY > 0) {

        rotation += 10;

    } else {

        rotation -= 10;

    }

    model.cameraOrbit =
        `${rotation}deg 75deg 105%`;


    // =====================================================
    // COUNT SCROLLS
    // =====================================================

    if (event.deltaY > 0) {

        scrollCount++;

    } else {

        scrollCount--;

    }


    // Prevent going below zero
    if (scrollCount < 0) {
        scrollCount = 0;
    }


    console.log("Scroll count:", scrollCount);


    // =====================================================
    // SCROLL 10
    // =====================================================

    if (scrollCount === 10) {

        modelText.innerHTML = "THE FUTURE OF DESIGN";

        modelText.classList.remove("right");
        modelText.classList.add("visible");

    }


    // =====================================================
    // SCROLL 11
    // =====================================================

    if (scrollCount === 11) {

        modelText.classList.remove("visible");

    }


    // =====================================================
    // SCROLL 12
    // =====================================================

    if (scrollCount === 12) {

        modelText.innerHTML = "ENGINEERED FOR PERFORMANCE";

        modelText.classList.add("right");
        modelText.classList.add("visible");

    }

});