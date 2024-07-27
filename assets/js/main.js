
window.addEventListener('load', function() {
    // Start fade out 1.5 seconds after everything is loaded
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            fadeOutPreloader(preloader, 100); // 1500ms for fade-out
        }
    }, 500);   
});


function fadeOutPreloader(element, duration) {
  opacity = 1;

  interval = setInterval(function() {
    if (opacity <= 0) {
      element.style.zIndex = 0;
      element.style.opacity = 0;
      //element.style.filter = 'alpha(opacity = 0)';

      // Allow horizontal scroll
      document.documentElement.style.overflowY = 'auto';

      // Remove preloader div
      document.getElementById('preloader').remove();

      clearInterval(interval);
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
      //element.style.filter = 'alpha(opacity = ' + opacity * 100 + ')';
    }
  }, duration);
}

  const root = getComputedStyle(document.documentElement);
  const smallScreen = parseInt(root.getPropertyValue('--breakpoint-small'), 10);
  const mediumScreen = parseInt(root.getPropertyValue('--breakpoint-medium'), 10);
  const largeScreen = parseInt(root.getPropertyValue('--breakpoint-large'), 10);
  const xlargeScreen = parseInt(root.getPropertyValue('--breakpoint-xlarge'), 10);

const breakpoints = {
  small: smallScreen,
  medium: mediumScreen,
  large: largeScreen,
  xlarge: xlargeScreen,  
};

window.addEventListener('resize', function() {
  var toggleButton = document.getElementById("menu-toggle"); 
  var menu = document.getElementById("primary-nav");

  if (window.innerWidth >= breakpoints.medium) { 
    menu.style.display = 'flex'; 
    menu.classList.add("js-menu-is-open"); 
    toggleButton.classList.remove("active"); 
  } else { 
    if (!menu.classList.contains("js-menu-is-open")) { 
      menu.style.display = 'none'; 
    } 
    toggleButton.classList.remove("active"); 
  } 
});

document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("primary-nav");
  
  function manageMenuDisplay() {
    if (window.innerWidth >= breakpoints.medium) {
      menu.style.display = 'flex'; 
      menu.classList.add("js-menu-is-open"); 
      menu.style.height = 'auto'; 
      toggleButton.classList.remove("active"); 
    } else {
      menu.style.display = 'none'; //
      menu.classList.remove("js-menu-is-open"); //
      toggleButton.classList.remove("active"); //
    }
  }

  function toggleMenu() {
    if (window.innerWidth < breakpoints.medium) {
      menu.classList.toggle("js-menu-is-open");
      if (menu.classList.contains("js-menu-is-open")) {
        toggleButton.classList.add("active"); //
        menu.style.display = 'flex'; //
        menu.style.animation = 'fadeInSlideDown 0.5s ease forwards';
      } else {
        toggleButton.classList.remove("active"); //
        menu.style.animation = 'fadeInSlideUp 0.5s ease forwards';
        
        menu.addEventListener('animationend', function handler() { //
          if (!menu.classList.contains("js-menu-is-open")) { //
            menu.style.display = 'none'; //
          } //
          menu.style.removeProperty('animation'); //
          menu.removeEventListener('animationend', handler); //
        }); //
      }
    }
  }

  toggleButton.addEventListener("click", toggleMenu);
  menu.addEventListener("click",toggleMenu);
  window.addEventListener('resize', manageMenuDisplay);
  window.addEventListener('orientationchange', manageMenuDisplay);  //
  manageMenuDisplay();

  $("a").smoothScroll();

  $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif']").attr("data-lity", "");
});