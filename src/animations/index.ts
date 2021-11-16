function translate(direction: 'X' | 'Y', distance: string): string {
  return `translate${direction}(${distance}px)`
}

const animationMap = {
  'fadeInDown': {
    start: translate('Y', '-35'),
    end: translate('Y', '0')
  },
  'fadeInUp': {
    start: translate('Y', '35'),
    end: translate('Y', '0')
  },
  'fadeInLeft': {
    start: translate('X', '-35'),
    end: translate('X', '0')
  },
  'fadeInRight': {
    start: translate('X', '35'),
    end: translate('X', '0')
  }
}

export default animationMap