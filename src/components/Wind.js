import React, {Component} from 'react';

export class Wind extends Component {

    render() {
        const {speed, direction} = this.props;

        // Rotate and scale the arrow
        // TODO: Scaling
        const arrowStyle = {
            transform: 'rotate(' + (direction + 180) + 'deg) scale('+(1)+')'
        };

        // Get the compass direction of the wind
        // Copied from https://stackoverflow.com/a/25867068
        var val = Math.floor((direction / 22.5) + 0.5);
        var directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        var directionString = directions[(val % 16)];

        // Get the wind description based on the Beaufort scale
        var beaufortDescriptions = ["calm", "light air", "light breeze", "gentle breeze", "moderate breeze", "fresh breeze", "strong breeze",
                                    "high wind", "gale", "strong gale", "storm", "violent storm", "hurricane"];
        var beaufortSpeeds = [1, 3, 7, 12, 18, 24, 31, 38, 46, 54, 63, 72]
        var beaufortNumber = 0;
        for (let s of beaufortSpeeds)
            if (speed >= s)
                beaufortNumber++;
        var description = beaufortDescriptions[beaufortNumber];

        return (
            <div>
                <div>Wind:</div>
                <div>{Math.round(speed)} mph {directionString} ({description})</div>
                {typeof(direction) === "undefined" ? null : <span className="fas fa-arrow-up" style={arrowStyle} title={direction + " degrees"}></span>}

            </div>
        );
    }
}

export default Wind;