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
displayPins()