function simulateClick(elem) {
    var rect = elem.getBoundingClientRect(), // holds all position- and size-properties of element
        topEnter = rect.top,
        leftEnter = rect.left, // coordinates of elements topLeft corner
        topMid = topEnter + rect.height / 2,
        leftMid = topEnter + rect.width / 2, // coordinates of elements center
        ddelay = (rect.height + rect.width) * 2, // delay depends on elements size
        ducInit = {bubbles: true, clientX: leftMid, clientY: topMid}, // create init object
        // set up the four events, the first with enter-coordinates,
        mover = new MouseEvent('mouseover', {bubbles: true, clientX: leftEnter, clientY: topEnter}),
        // the other with center-coordinates
        mdown = new MouseEvent('mousedown', ducInit),
        mup = new MouseEvent('mouseup', ducInit),
        mclick = new MouseEvent('click', ducInit);
    // trigger mouseover = enter element at toLeft corner
    elem.dispatchEvent(mover);
    // trigger mousedown  with delay to simulate move-time to center
    window.setTimeout(function() {elem.dispatchEvent(mdown)}, ddelay);
    // trigger mouseup and click with a bit longer delay
    // to simulate time between pressing/releasing the button
    window.setTimeout(function() {
        elem.dispatchEvent(mup); elem.dispatchEvent(mclick);
    }, ddelay * 1.2);
}

