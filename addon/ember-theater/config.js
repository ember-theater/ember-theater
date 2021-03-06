export default {
  priority: 0,
  globals: {
    classNames: ['et-paper', 'et-block'],
    transitionDuration: 200,
    transition: {
      duration: 250,
      effect: { opacity: 1 }
    },
    transitionIn: {
      duration: 250,
      effect: { opacity: [1, 0] }
    },
    transitionOut: {
      duration: 250,
      effect: { opacity: 0 }
    },
    keys: {
      accept: [' ', 'Enter'],
      cancel: ['Escape'],
      moveDown: ['ArrowDown', 's'],
      moveUp: ['ArrowUp', 'w']
    }
  },
  saveStateManager: {
    maxStatePoints: false
  },
  autosaveManager: {
    maxAutosaves: 3
  },
  menuBar: {
    load: {
      keys: {
        open: ['ctrl+l']
      }
    },
    reset: {
      keys: {
        open: ['ctrl+r']
      }
    },
    rewind: {
      keys: {
        open: ['ctrl+b']
      }
    },
    resize: {
      keys: {
        open: ['F11']
      }
    },
    save: {
      keys: {
        open: ['ctrl+s']
      }
    }
  },
  director: {
    scene: {
      transitionIn: {
        effect: { opacity: [1, 0] },
        duration: 250
      },
      transitionOut: {
        effect: { opacity: 0 },
        duration: 250
      }
    },
    menu: {
      menuUI: 'ember-theater/director/directable/menu/single-column'
    },
    text: {
      namePosition: 'left',
      textSpeed: 50,
      textTransitionRate: 15,
      textTransition: {
        opacity: 0,
        translateX: '10px',
        translateY: '-6px'
      }
    },
    positions: {
      center: {
        left: '50%'
      },
      centerLeft: {
        left: '35%'
      },
      centerRight: {
        left: '65%'
      },
      left: {
        left: '20%'
      },
      right: {
        left: '80%'
      },
      farLeft: {
        left: '5%'
      },
      farRight: {
        left: '95%'
      },
      offLeft: {
        left: '-30%'
      },
      offRight: {
        left: '130%'
      },
      nudgeLeft: {
        left: '-=5%'
      },
      nudgeRight: {
        left: '+=5%'
      },
      bottom: {
        bottom: 0
      },
      nudgeUp: {
        bottom: '+=5%'
      },
      nudgeDown: {
        bottom: '-=5%'
      },
      nudgeBack: {
        translateZ: '-=2vh'
      },
      nudgeForward: {
        translateZ: '+=2vh'
      }
    }
  }
};
