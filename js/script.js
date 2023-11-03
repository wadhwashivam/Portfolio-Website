// toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            //active navbar links
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this 
        else {
            sec.classList.remove('show-animate');
        }
    });

    //sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}
//Read More button about section

function toggleIntro() {
    var intro = document.querySelector('.intro');
    var extendedIntro = document.querySelector('.extended-intro');
    var readMoreLink = document.getElementById('read-more-link');
  
    if (extendedIntro.style.display === 'none') {
      extendedIntro.style.display = 'block';
      intro.style.display = 'none';
      readMoreLink.innerHTML = 'Read Less'; // Update the text to "Read Less"
    } else {
      extendedIntro.style.display = 'none';
      intro.style.display = 'block';
      readMoreLink.innerHTML = 'Read More'; // Update the text to "Read More"
    }
  }
    
  