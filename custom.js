/* global $, jQuery, WOW, google */

/* jQuery Pre loader
  -----------------------------------------------*/
var $ = window.$
var jQuery = window.jQuery

$(document).ready(() => {
  $(".preloader").delay(500).fadeOut(1000)
})

/* Google Map
-----------------------------------------------*/
var map = ""
var center
var google = window.google

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-32.30824485972376, -58.085438061628736),
    scrollwheel: false,
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)

  google.maps.event.addDomListener(map, "idle", () => {
    calculateCenter()
  })

  google.maps.event.addDomListener(window, "resize", () => {
    map.setCenter(center)
  })
}

function calculateCenter() {
  center = map.getCenter()
}

function loadGoogleMap() {
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=initialize"
  document.body.appendChild(script)
}

$(document).ready(() => {
  if (document.getElementById("map-canvas")) {
    loadGoogleMap()
  }
})

/* Isotope Portfolio
-----------------------------------------------*/
$(document).ready(($) => {
  if ($(".iso-box-wrapper").length > 0) {
    var $container = $(".iso-box-wrapper"),
      $imgs = $(".iso-box img")

    $container.imagesLoaded(() => {
      $container.isotope({
        layoutMode: "fitRows",
        itemSelector: ".iso-box",
      })

      $imgs.load(() => {
        $container.isotope("reLayout")
      })
    })

    $(".filter-wrapper li a").click(function () {
      var $this = $(this),
        filterValue = $this.attr("data-filter")

      $container.isotope({
        filter: filterValue,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      })

      if ($this.hasClass("selected")) {
        return false
      }

      var filter_wrapper = $this.closest(".filter-wrapper")
      filter_wrapper.find(".selected").removeClass("selected")
      $this.addClass("selected")

      return false
    })
  }
})

/* Navigation Bar
  -----------------------------------------------*/
$(document).ready(() => {
  ;(() => {
    var docElem = document.documentElement,
      didScroll = false,
      stickynav = 50
    document.querySelector(".nav-container")

    function init() {
      window.addEventListener(
        "scroll",
        () => {
          if (!didScroll) {
            didScroll = true
            setTimeout(scrollPage, 50)
          }
        },
        false,
      )
    }

    function scrollPage() {
      var sy = scrollY()
      if (sy >= stickynav) {
        $(".nav-container").addClass("sticky")
      } else {
        $(".nav-container").removeClass("sticky")
      }
      didScroll = false
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop
    }
    init()
  })()
})

$(document).ready(() => {
  $(".menu-container").each(function (index) {
    $(this).find(".circle").data("menu-link", index)
    $(this).find(".list-menu").clone().appendTo("body").data("menu-link", index)
  })

  $(".menu-container .circle").click(function () {
    var menuLink = $(this).data("menu-link")
    $("body")
      .find(".list-menu")
      .filter(function () {
        return $(this).data("menu-link") === menuLink
      })
      .toggleClass("reveal-modal")
  })

  $("body")
    .find(".close-iframe")
    .click(function () {
      $(this).closest(".list-menu").toggleClass("reveal-modal")
    })

  /* wow initialization
  -------------------------------*/
  var WOW = window.WOW
  if (WOW) {
    new WOW({ mobile: false }).init()
  }
})
