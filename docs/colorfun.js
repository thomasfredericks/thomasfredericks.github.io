<script>
    function rotateHue(hslString, degreesToAdd) {
      const match = hslString.match(/hsl\(\s*(\d+),\s*([\d.]+%)\s*,\s*([\d.]+%)\s*\)/);
      if (!match) return null;

      let [_, h, s, l] = match;
      h = (parseInt(h) + degreesToAdd) % 360;
      if (h < 0) h += 360; // in case of negative values

      return `hsl(${h}, ${s}, ${l})`;
    }

    function getRandomHslCss() {
      const c = getRandomHslObject();
      return hslObjectToCss(c);
    }

    function hslObjectToCss(c) {
      return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
    }

    function getRandomHslObject() {
      const h = Math.floor(Math.random() * 360);
      const s = Math.floor(Math.random() * 30) + 70;
      const l = Math.floor(Math.random() * 20) + 40;

      return { h: h, s: s, l: l };
    }

    function getRandomDelay(min = 2000, max = 8000) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function animateText() {
      //let c = rotateHue(document.body.style.backgroundColor, 180);
      //document.querySelector('.content').style.color = c;
      document.querySelector('.content').style.color = getRandomHslCss();
      setTimeout(animateText, getRandomDelay(4000, 12000));
    }

    function animateLinks() {
      //const c = getRandomColor();
      document.querySelectorAll('a').forEach(link => {
        link.style.color = getRandomHslCss(); // c;// 
      });
      setTimeout(animateLinks, getRandomDelay(4000, 12000));
    }

    /*
    function animateBackground() {
      
      document.body.style.backgroundColor = getRandomHslCss ();
      setTimeout(animateBackground, getRandomDelay(4000, 10000));

    } 
*/


    let positionX = 0;
    let colorHsLCssArray = [getRandomHslCss(), getRandomHslCss(), getRandomHslCss()];

    function setBackgroundGradient() {
      colorHsLCssArray[0] = colorHsLCssArray[1];
      colorHsLCssArray[1] = colorHsLCssArray[2];
      colorHsLCssArray[2] = getRandomHslCss();
      // console.log(`linear-gradient(90deg, ${colorHsLCssArray[0]}, ${colorHsLCssArray[1]}, ${colorHsLCssArray[2]})`);
      document.body.style.background = `
 linear-gradient(90deg, ${colorHsLCssArray[0]}, ${colorHsLCssArray[1]}, ${colorHsLCssArray[2]})
  0% 0% / 300% 100% 
  no-repeat
`;
    }

    function animateBackground() {
      // Move background from left to right

      if (positionX >= 75) {
        setBackgroundGradient();
        //document.body.style.background = `linear-gradient(90deg, ${colorHsLCssArray[0]}, ${colorHsLCssArray[1]}, ${colorHsLCssArray[2]})`;
        //document.body.style.backgroundSize = `300% 300%`;

        positionX = 0;

      }



      document.body.style.backgroundPosition = `${positionX}% 0%`;
      positionX += 0.1;
      /*
      // Handle gradient blending
      const now = Date.now();
      blendProgress = (now - lastColorChange) / COLOR_FADE_DURATION;

      if (blendProgress >= 1) {
        color1 = nextColor1;
        color2 = nextColor2;
        nextColor1 = getRandomHslArray();
        nextColor2 = getRandomHslArray();
        lastColorChange = now;
        blendProgress = 0;
      }

      const blended1 = blendHsl(color1, nextColor1, blendProgress);
      const blended2 = blendHsl(color2, nextColor2, blendProgress);

      
*/
      requestAnimationFrame(animateBackground);
    }

    // Kick off the animations
    //setBackgroundGradient();

    //animateBackground();
    //animateText();
    //animateLinks();
  </script>