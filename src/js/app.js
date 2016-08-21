"use strict";
console.log("I am here in app.js");
// var $featureMenu = $(".feature_menu");
var $featureMenuLinks = $(".feature__menu__link");
var $features = $(".features");
var $adBtn = $(".ads__button");
var activate = activate;
var featureMenuHandler = featureMenuHandler;
var featureSideToggle = featureSideToggle;
var featureSideOff = featureSideOff;
var featureActiveLink = featureActiveLink;
var animationFade = animationFade;
var featureAnimationOn = featureAnimationOn;
var clearFeatureTimer = clearFeatureTimer;
var startFeatureTimer = startFeatureTimer;
var closeAd = closeAd;
activate();

function activate() {
  var timer = {
    timer: featureAnimationOn()
  };
  $featureMenuLinks.on("click", featureMenuHandler);
  $features.on("mouseenter", timer, clearFeatureTimer);
  $features.on("mouseleave", timer, startFeatureTimer);

  $adBtn.on("click", closeAd);
}

function closeAd(event) {
  $(this).parent(".ads").css("display", "none");

}

function featureMenuHandler(event) {
  // console.log(event.type, "on", event.target);
  var dataType = $(this).data("link");
  switch (dataType) {
    case "tastemakers-feature":
      console.log("clicked tastemakers", dataType);
      featureSideToggle(dataType);
      featureActiveLink(dataType);
      break;
    case "blog-feature":
      console.log("clicked blog", dataType);
      featureSideToggle(dataType);
      featureActiveLink(dataType);

      break;
    case "a-list-feature":
      console.log("clicked a-list");
      featureSideToggle(dataType);
      featureActiveLink(dataType);

      break;
    case "contribute-feature":
      console.log("clicked contribute");
      featureSideToggle(dataType);
      featureActiveLink(dataType);

      break;
  }
}

function featureSideToggle(type) {
  var $feature = $features.find("#" + type);
  var $prevFeature = $features.find(".feature--active");
  var animations = {
    fadeIn: "ani-fade-in"
  };
  $prevFeature.removeClass("feature--active");
  $feature.addClass("feature--active");
  animationFade($feature, animations.fadeIn);
}

function featureSideOff() {
  $features.each(function(index, feature) {
    // console.log("each", $(feature));
    $(feature).toggleClass("feature--active");
  });
}
// adds active link style to current feature link
// removes active link style from all other feature links
function featureActiveLink(type) {
  var $preLink = $(".feature__menu__link--active");
  var link = $(".feature__menu__link[data-link=" + type + "]");
  $(link).addClass("feature__menu__link--active");
  $preLink.removeClass("feature__menu__link--active");
}

// adds fade in animation to current feature img
// removes fade in animation from all other feature imgs
function animationFade(feature, animationType) {
  var img = feature.find(".feature__img-container");
  var imgs = $(".feature__img-container");
  imgs.removeClass(animationType);
  img.addClass(animationType);
}

function featureAnimationOn(event) {
  var startTimer = setInterval(startAnimation, 3000);
  return startTimer;
}

function startAnimation() {
  var len = $featureMenuLinks.length - 1;
  $featureMenuLinks.each(function(index, link) {
    var $link = $(link);
    if ($link.hasClass("feature__menu__link--active") &&
      index === len) {
      setTimeout(function() {
        // console.log("clickeeed", $($featureMenuLinks[0]))
        $($featureMenuLinks[0]).trigger("click");
      }, 1000);
    } else if ($link.hasClass("feature__menu__link--active")) {
      setTimeout(function() {
        $($featureMenuLinks[index + 1]).trigger("click");
        // console.log("clickdd", $($featureMenuLinks[index + 1]));
      }, 1000);
    }
  })
}

function clearFeatureTimer(event) {
  // console.log("mouse enter");
  clearInterval(event.data.timer);
}

function startFeatureTimer(event) {
  // console.log("mouse leave");
  event.data.timer = featureAnimationOn();
}
