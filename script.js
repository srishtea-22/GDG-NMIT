const eventContainer = document.querySelector('.event-container');
const eventControlsContainer = document.querySelector('.event-controls');
const eventControls = ['left', 'right'];
const eventItems = document.querySelectorAll('.event-item');

class Carousel {

    constructor(container, items, controls){
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateEvent(){
        this.carouselArray.forEach(el => {
            el.classList.remove('event-item-1');
            el.classList.remove('event-item-2');
            el.classList.remove('event-item-3');
            el.classList.remove('event-item-4');
            el.classList.remove('event-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`event-item-${i + 1}`);
        });
    }

    setCurrentState(direction){
        if (direction.className == 'event-controls-left'){
            this.carouselArray.unshift(this.carouselArray.pop());
        }
        else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateEvent();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            eventControlsContainer.appendChild(document.createElement('button')).className = `event-controls-${control}`;
            document.querySelector(`.event-controls-${control}`);
        });
    }

    useControls(){
        const triggers = [...eventControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarousel = new Carousel(eventContainer, eventItems, eventControls);

exampleCarousel.setControls();
exampleCarousel.useControls();

eventItems.forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = item.dataset.link;
    });
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        document.body.classList.add('scrolling');

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });

        setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 1000); 
    });
});