
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
  var menu = document.getElementById("primary-nav");
  if (window.innerWidth >= breakpoints.medium) {
    menu.style.display = 'flex'; // Ensure the menu is always visible
  } else {
    menu.style.display = 'none'; // Optional: Hide the menu when below medium size
    menu.classList.remove("js-menu-is-open"); // Reset toggle state
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

const breakpoints = {
  medium: 768,  // Adjust this value to match your CSS breakpoint for medium screens
};


document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("primary-nav");

  // Retrieve the CSS custom property for the medium breakpoint
  //const rootStyle = getComputedStyle(document.documentElement);
  const breakpointMedium = 768;
  //parseInt(rootStyle.getPropertyValue('--breakpoint-medium'), 10);
  
  // Function to manage menu visibility based on window width
  function manageMenuDisplay() {
    if (window.innerWidth >= breakpointMedium) {
      menu.style.display = 'flex'; // Always show the nav on medium and larger screens
      menu.classList.add("js-menu-is-open"); // Ensure it's always considered 'open' in desktop mode
      menu.style.height = 'auto'; // Only necessary height
      toggleButton.classList.remove("active"); // Ensure toggle button is not in active state
    } else {
      menu.style.display = menu.classList.contains("js-menu-is-open") ? 'flex' : 'none';
    }
  }


function toggleMenu() {
    if (window.innerWidth < breakpointMedium) {
      if (menu.classList.contains("js-menu-is-open")) {
        menu.style.animation = 'fadeInSlideUp 0.5s ease forwards';
        menu.addEventListener('animationend', function handler() {
          menu.classList.remove("js-menu-is-open");
          menu.style.display = 'none';
          menu.style.removeProperty('animation'); // Remove the animation to avoid affecting subsequent toggles
          menu.removeEventListener('animationend', handler); // Clean up the event listener
          toggleButton.classList.toggle("active");
        });
      } else {
        menu.style.display = 'flex'; // Show the menu before starting animation
        menu.classList.add("js-menu-is-open");
        menu.style.animation = 'fadeInSlideDown 0.5s ease forwards';
        toggleButton.classList.toggle("active");
      }
    }
  }
  toggleButton.addEventListener("click", toggleMenu);
  window.addEventListener('resize', manageMenuDisplay);
  manageMenuDisplay();

  $("a").smoothScroll({ offset: -20 });

  $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif']").attr("data-lity", "");
});