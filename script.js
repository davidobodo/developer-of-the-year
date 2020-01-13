const box = document.querySelector('.pins')
const array = [...Array(36)];

const displayPins = () => {
    const container = array.map((arr, i) => {
        const number = i + 1;
        if (number <= 18) {
            if (number <= 9) {
                return `<span style='transform:translate(${200 + (i * 20)}px, ${number * 20}px) rotate(${90 + (number * 10)}deg) '></span>`
            } else {
                return `<span style='transform:translate(${540 - (number * 20)}px, ${number * 20}px) rotate(${90 + (number * 10)}deg) '></span>`
            }
        } else {
            if (number <= 27) {
                return `<span style='transform:translate(${540 - (number * 20)}px,${360 - ((number - 18) * 20)}px) rotate(${90 + (number * 10)}deg)'></span>`
            } else {
                return `<span style='transform:translate(${(number * 20) - 540}px, ${360 - ((number - 18) * 20)}px) rotate(${90 + (number * 10)}deg)'></span>`

            }
        }
    }).join('');

    box.innerHTML = container;
}
displayPins();

const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const DISPLACEMENT_VALUES = [50, 70, 50, 30,];
const ROTATION_ANGLE = [12, -12, -15, 15]


const elements = document.querySelectorAll('[data-depth]');

const handleMouseMove = (event) => {
    elements.forEach(o => {
        const { x, y, z } = computeDisplacement(event, o);
        updateStyle(o, x, y, z);
    })
};

const computeDisplacement = (event, element) => {
    const { clientX: mouseX, clientY: mouseY } = event;

    const displacementDepth = element.dataset.depth;
    const displacementValue = DISPLACEMENT_VALUES[Number(displacementDepth) - 1];
    const z = ROTATION_ANGLE[Number(displacementDepth) - 1];

    const x = mouseX * displacementValue / CLIENT_WIDTH;
    const y = mouseY * displacementValue / CLIENT_HEIGHT;

    return { x, y, z };
};

const updateStyle = (element, x, y, z) => {
    element.style.transform = `translate3d(${-x}px, ${-y}px, 0) rotate(${z}deg)`
}

document.addEventListener('mousemove', handleMouseMove);