const CLIENT_WIDTH = document.documentElement.clientWidth;
const CLIENT_HEIGHT = document.documentElement.clientHeight;
const DISPLACEMENT_VALUES = [50, 70, 50, 30,];
const ROTATION_ANGLE = [12, -12, -15, 15]


const elements = document.querySelectorAll('[data-depth]');

const handleMoveImages = (event) => {
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

document.addEventListener('mousemove', handleMoveImages);

//=======================================================
//circle
//=======================================================
const count = 40;
let radius = 130;
const list = new Array(count).fill(null);

const getPositionValues = (index) => {
    const increment = 360 / count;
    const angle = index * increment;
    const hypotenuse = radius;
    const useInvertedFormula = Math.ceil(angle / 90) % 2;
    const normalizedAngle = !!useInvertedFormula ? 90 - (angle % 90) : angle % 90;
    let x;
    let y;
    if (normalizedAngle % 90 === 0) {
        x = Math.sin(normalizedAngle * (Math.PI / 180)) * hypotenuse;
    } else {
        x = Math.cos(normalizedAngle * (Math.PI / 180)) * hypotenuse;
    }
    y = Math.sqrt(Math.pow(radius, 2) - Math.pow(x, 2));
    const quadrant = angle % 90 === 0 ? Math.ceil(angle / 90) + 1 : Math.ceil(angle / 90);
    let top;
    let left;
    switch (quadrant) {
        case 1:
        case 2:
            left = radius + x;
            break;
        case 3:
        case 4:
            left = radius - x;
            break;
    }
    switch (quadrant) {
        case 1:
        case 4:
            top = radius - y;
            break;
        case 2:
        case 3:
            top = radius + y;
            break;
    }
    return { angle, top, left }
}
const container = document.querySelector('.nominee__pins')
const myCircle = list.map((item, i) => getPositionValues(i))
    .map(({ top, left, angle }) => {
        return `<div class="ball" style="transform: rotate(${angle}deg); top: ${top}px; left: ${left}px"></div>`
    })
    .join(' ');
container.innerHTML = myCircle;


//==========================================================
//nominees hover effect
//==========================================================
const nominees = document.querySelector('.nominees');

const handleMoveNomineesText = (event) => {
    const { offsetX: x, offsetY: y } = event
    event.stopPropagation();
}

nominees.addEventListener('mousemove', handleMoveNomineesText)





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







