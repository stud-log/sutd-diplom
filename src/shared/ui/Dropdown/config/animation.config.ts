export const dropdownAnimationSettings = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5
    },
    display: "block"
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.5,
      delay: 0.3
    },
    transitionEnd: {
      display: "none"
    }
  }
};