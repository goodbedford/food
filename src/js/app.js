"use strict";
console.log("I am here in app.js");

var $featureMenuLinks = $(".feature__menu__link");
var $features = $(".features");
var activate = activate;
var featureMenuHandler = featureMenuHandler;
var featureSideToggle = featureSideToggle;
var featureSideOff = featureSideOff;
var featureActiveLink = featureActiveLink;
var animationFade = animationFade;

activate();

function activate() {
  $featureMenuLinks.on("click", featureMenuHandler);
}

function featureMenuHandler(event) {
  console.log(event.type, "on", event.target);
  var dataType = $(this).data("link");
  // console.log("data",$(this).data("link") );
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
  }
  console.log("single", $features.find(".feature"));
  $prevFeature.removeClass("feature--active");
  $feature.addClass("feature--active");
  animationFade($feature, animations.fadeIn);

  console.log($feature);
}

function featureSideOff() {
  $features.each(function(index, feature) {
    // console.log("each", $(feature));
    $(feature).toggleClass("feature--active");
  })
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
