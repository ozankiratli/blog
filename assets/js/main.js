
window.addEventListener('load', function() {
    // Start fade out 1.5 seconds after everything is loaded
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            fadeOutPreloader(preloader, 100); // 1500ms for fade-out
        }
    }, 500);   
});

window.addEventListener('resize', function() {
  var toggleButton = document.getElementById("menu-toggle"); 
  var menu = document.getElementById("primary-nav");
  const breakpointMedium = 768; 
  if (window.innerWidth >= breakpointMedium) { 
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

function fadeOutPreloader(element, duration) {
  opacity = 1;

  interval = setInterval(function() {
    if (opacity <= 0) {
      element.style.zIndex = 0;
      element.style.opacity = 0;
      element.style.filter = 'alpha(opacity = 0)';

      // Allow horizontal scroll
      document.documentElement.style.overflowY = 'auto';

      // Remove preloader div
      document.getElementById('preloader').remove();

      clearInterval(interval);
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
      element.style.filter = 'alpha(opacity = ' + opacity * 100 + ')';
    }
  }, duration);
}

//const breakpoints = {
//  medium: 768,  // Adjust this value to match your CSS breakpoint for medium screens
//};


document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("primary-nav");

  // Retrieve the CSS custom property for the medium breakpoint
  //const rootStyle = getComputedStyle(document.documentElement);
  const breakpointMedium = 768;
  //parseInt(rootStyle.getPropertyValue('--breakpoint-medium'), 10);
  
  function manageMenuDisplay() {
    if (window.innerWidth >= breakpointMedium) {
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
    if (window.innerWidth < breakpointMedium) {
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