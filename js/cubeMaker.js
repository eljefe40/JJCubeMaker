/**
 * Created by jeff on 10/12/16.
 */




var wheel = {

    const: radianDegrees = 57.29577951308232,


    buildDial: function (faces, faceWidth, radius, container) {

    //    $('.dialWrapper').remove();

        var $container = $(container);

        // calculate the height of the face - we know the zOffset
        var face = wheel.calcChord(radius, faces);

        // create the container wrapper for this dial
        var cubeWrapper = document.createElement("div");
        $(cubeWrapper).addClass("cubeWrapper");

        // create the element that holds the faces
        var cube = document.createElement("div");
        $(cube).addClass("cube");

        var faceOffset = face.zOffset;
        var faceHeight = face.chord;

        var faceAngle = 0;
        var faceRotate = 360 / faces;

        //------------------------- make the faces and append them to the dial div--------------------------------

        for (var faceNumber = 0; faceNumber < faces; faceNumber++) {
            var faceDiv = document.createElement("div");
            faceAngle = faceNumber * faceRotate;

            $(faceDiv).addClass("face");

            $(faceDiv).css({
                "transform": " translateY(" + -faceHeight / 2 + "px) rotateX(" + faceAngle + "deg) translateZ(" + faceOffset + "px) translateX(-"+faceWidth/2+"px)",
                "height": faceHeight + 'px',
                "width": faceWidth + 'px'
            });

            $(cube).append(faceDiv);
            // move the whole dial in Z axis so the front face is at the screen
            $(cube).css({
               // "transform": "  rotateX(" + 0 + "deg) translateX(-"+faceWidth/2+"px)"
                "transform": "  rotateX(" + 0 + "deg)"
            });



        }

        // put the dial globalObject into a wrapper
        $(cubeWrapper).append(cube);

        // put it in the DOM -lets return it to the caller and let it put it in the DOM...todo
        $container.append(cubeWrapper);

    },

    rollDial: function (offset, rX, rY, rZ) {
        $('.dial').css({
            //"transform": " translateZ(-" + offset + "px)  rotateY(" + rY + "deg) rotateX(" + rX + "deg) rotateZ(" + rZ + "deg)"
            "transform": "rotateX(" + rX + "deg)"
        });
    },

    rollDialX: function (dialElement, angle) {
        $(dialElement).css({
           "transform":" rotateX(" + angle + "deg)"
        });
    },

    calcOffset: function (chord, sides) {

        var wedgeAngleRadians = (180 / sides) / radianDegrees;
        var offset = (chord / 2) / Math.tan(wedgeAngleRadians);

        // return the offset of the face from the axis of rotation
        return offset;
    },

    calcChord: function (radius, sides) {

        var radiansPerHalfWedge = (180 / sides) / radianDegrees;
        var chord = (Math.sin(radiansPerHalfWedge) * radius) * 2;
        var zOffset = Math.cos(radiansPerHalfWedge) * radius;

        // return the size for the chord (face size)
        return {chord: chord, zOffset: zOffset};

    }

};
