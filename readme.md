###REACT-GETSCREEN

This package provides a React higher order component which adds
some useful methods to your wrapped components in order to
get your screen width.
While you should solve your responsiveness issues with css,
sometimes you just need to render different components depending
on the display type.

######Install
```
npm install react-getscreen --save
```

######Example

```
import React, { Component } from 'react';
import {withGetScreen} from 'react-getscreen'

class Test extends Component {
  render() {
    if (this.props.isMobile()) return <div>Mobile</div>;
    if (this.props.isTablet()) return <div>Tablet</div>;
    return <div>Desktop</div>;
  }
}

export default withGetScreen(Test);
```

It supports an options object containing following props:
- mobileLimit - Max width for mobile display. default = 468
- tabletLimit - Max width for tablet display. default=768
- shouldListenOnResize - Boolean describing whether it should listen on screen resize. default=true

