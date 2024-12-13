
$(document).ready(function () {
  $(".sidebar_main .siderbar_item").click(function () {
    $(".siderbar_item").removeClass("active");
    $(this).addClass("active");
  });
});

$(document).ready(function () {
  $(".siderbar_item .btn_submenu").click(function (e) {
    e.preventDefault();
    $(this).closest('.siderbar_item').find('.sub-menu').toggleClass('show');
    $(this).closest('.siderbar_item').toggleClass('active');
  });
});
//
$(document).ready(function () {
  $(".btn_sidebar").click(function () {
    $(".sidebar_main").toggleClass("show");
  })
})

$(document).ready(function () {
  $(".btn_sidebar_pc").click(function () {
    $(".sidebar_main").toggleClass("hide");
    $(".main_section").toggleClass("hide");
  })
})


// slect option and search 
function toggleDropdown(dropdownId) {
  const dropdownList = document.getElementById(dropdownId);
  dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
}

function filterOptions(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toLowerCase();
  const options = document.querySelectorAll(`#${dropdownId} .dropdown-option`);

  options.forEach(option => {
    const text = option.textContent.toLowerCase();
    option.style.display = text.includes(filter) ? 'flex' : 'none';
  });

  // Show dropdown if there are matching options
  const dropdownList = document.getElementById(dropdownId);
  dropdownList.style.display = [...options].some(option => option.style.display === 'flex') ? 'block' : 'none';
}

function selectOption(option, imageSrc, inputId, imageId) {
  const input = document.getElementById(inputId);
  input.value = option; // Set the input value to the selected option
  const currencyImage = document.getElementById(imageId);
  currencyImage.src = imageSrc; // Set the image source
  currencyImage.style.display = 'inline'; // Show the image
  document.getElementById(`dropdownList${inputId.charAt(inputId.length - 1)}`).style.display = 'none'; // Hide the dropdown
}

// Close the dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.matches('.custom-dropdown input')) {
    const dropdownLists = document.querySelectorAll('.dropdown-options');
    dropdownLists.forEach(list => list.style.display = 'none');
  }
};


var swiper = new Swiper(".g_cat_slider", {

  slidesPerView: "9",
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".cat1_nxt",
    prevEl: ".cat1_prev",
  },
});

var swiper = new Swiper(".g_cat_slider1", {

  slidesPerView: "9",
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".cat2_nxt",
    prevEl: ".cat2_prev",
  },
});


var swiper = new Swiper(".bannerSlider", {
  pagination: {
    el: ".swiper-pagination",
  },
  loop: true,
  autoplay: {
    delay: 3000,
  }
});


new Swiper(".game_slier_1", {
  loop: true,
  freeMode: true,
  spaceBetween: 10,
  grabCursor: true,
  slidesPerView: "5",
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: true,
  },
  freeMode: true,
  speed: 3000,
  freeModeMomentum: false,
  pagination: false,
  navigation: false,
  breakpoints: {
    991: {
      spaceBetween: 10,
      slidesPerView: 16,
    },
    768: {
      spaceBetween: 10,
      slidesPerView: 12,
    },
    576: {
      spaceBetween: 10,
      slidesPerView: 9,
    },
  },
});

// ============= Password show hide ============

