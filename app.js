function countUp(elementId, target, duration) {
    return new Promise(resolve => {
        let count = 0;
        const element = document.getElementById(elementId);
        const countElement = element ? element.querySelector('.count') : null;
        const increment = target / duration;

        let observer;

        function updateCount() {
            count += increment;

            if (countElement) {
                countElement.innerText = Math.floor(count);
            }

            if (count < target) {
                requestAnimationFrame(updateCount);
            } else {
                observer.disconnect();
                resolve();
            }
        }

        observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCount();
            }
        });

        if (element) {
            observer.observe(element);
        } else {
            resolve(); // Если элемента нет, завершаем обещание
        }
    });
}

function animateText(elementId, text, duration) {
    return new Promise(resolve => {
        const element = document.getElementById(elementId);
        const textElement = document.getElementById(`${elementId}-text`);
        const totalFrames = duration / 16; // Assuming 60 frames per second
        const framesPerLetter = totalFrames / text.length;
        let currentFrame = 0;

        function updateText() {
            const lettersToShow = Math.ceil(currentFrame / framesPerLetter);
            textElement.innerText = text.slice(0, lettersToShow);

            if (currentFrame < totalFrames) {
                requestAnimationFrame(updateText);
                currentFrame++;
            } else {
                resolve();
            }
        }

        updateText();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    countUp('experience-1', 100000, 500);
    animateText('experience-3', 'Постоянное совершенствование', 3000);
});