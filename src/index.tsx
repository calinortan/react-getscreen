import * as React from 'react';

export interface withGetScreenOptions {
  mobileLimit: Number,
  tabletLimit: Number,
  shouldListenOnResize?: Boolean
}

export const defaultOptions: withGetScreenOptions = {
  mobileLimit: 468,
  tabletLimit: 768,
  shouldListenOnResize: true
}
export interface withGetScreenState {
  currentSize: ScreenType
}

export enum ScreenType {
  MOBILE,
  TABLET,
  DESKTOP
}

export function withGetScreen<T>(WrappedComp: React.ComponentClass<T>, options = defaultOptions): React.ComponentClass {
  return class extends React.Component<T, withGetScreenState> {
    constructor() {
      super();
      this.state = {
        currentSize: this.getSize(window.innerWidth)
      }
    }
    componentDidMount() {
      if (options.shouldListenOnResize) {
        window.addEventListener('resize', this.onResize);
      }
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
      const newSize = this.getSize(window.innerWidth);
      if (newSize !== this.state.currentSize) {
        this.setState({
          currentSize: newSize
        });
      }
    }

    getSize(size: Number): ScreenType {
      if (size <= options.mobileLimit) {
        return ScreenType.MOBILE;
      } else if (size >= options.tabletLimit) {
        return ScreenType.DESKTOP;
      } else {
        return ScreenType.TABLET;
      }
    }

    isMobile = () => {
      return this.state.currentSize === ScreenType.MOBILE;
    }
    isTablet = () => {
      return this.state.currentSize === ScreenType.TABLET;
    }
    isDesktop = () => {
      return this.state.currentSize === ScreenType.DESKTOP;
    }
    render() {
      const detectMethods = {
        isMobile: this.isMobile,
        isTablet: this.isTablet,
        isDesktop: this.isDesktop
      }
      return <WrappedComp
        {...detectMethods}
        {...this.props}
      />
    }
  }
}