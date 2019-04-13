console.log("loading powerup.js")
AFRAME.registerComponent('powerup', {
  schema: {
    target: {type: 'selector', default:"#hud"},
    value: {type: 'number', default:0},
    title: {type: 'string', default:"score"}
  },


  init: function() {
    const component = this
    this.collisionHandler = (e) => {
         component.otherBody = e.detail.body
    }
    this.el.addEventListener('collide', this.collisionHandler);
  },

  tick: function(uptime,delta) {
    const otherBody = this.otherBody
    this.otherBody = null

    if (otherBody) {
      const hud = this.data.target
      let health = parseInt(hud.getAttribute('health'))
      let score = parseInt(hud.getAttribute('score'))


      let elt = otherBody.el
      const eltHealth = parseInt(elt.getAttribute('health'))
      const eltScore = parseInt(elt.getAttribute('score'))

      if (eltHealth) {
        health+= eltHealth;
        hud.setAttribute('health',health)
      }

      if (eltScore) {
        score += eltScore;
        hud.setAttribute('score',score)
      }

      if (eltHealth || eltScore){
        otherBody.el.removeAttribute("dynamic-body");
        elt.parentNode.removeChild(elt)
        hud.setAttribute('text','value',"Score:"+score+"  Health:"+health)
      }

    }
  }

});
