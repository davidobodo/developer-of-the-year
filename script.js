// const box = document.querySelector('.nominees__pins')
// const array = [...Array(40)];

// const displayPins = () => {
//     const container = array.map((arr, i) => {
//         const number = i + 1;
//         if (number <= 20) {
//             if (number <= 10) {
//                 return `<span style='transform:translate(${120 + (number * 12)}px, ${number * 12}px) rotate(${90 + (number * 9)}deg) '></span>`
//             } else {
//                 return `<span style='transform:translate(${120 + ((20 - number) * 12)}px, ${number * 12}px) rotate(${90 + (number * 9)}deg) '></span>`
//             }
//         } else {
//             if (number <= 30) {
//                 return `<span style='transform:translate(${(30 - number) * 12}px, ${240 - ((number - 20) * 12)}px) rotate(${90 + (number * 9)}deg)'></span>`
//             } else {
//                 return `<span style='transform:translate(${(number - 30) * 12}px, ${240 - ((number - 20) * 12)}px) rotate(${90 + (number * 9)}deg)'></span>`

//             }
//         }
//     }).join('');

//     box.innerHTML = container;
// }

// displayPins()

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
    element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${z}deg)`
}

document.addEventListener('mousemove', handleMouseMove);