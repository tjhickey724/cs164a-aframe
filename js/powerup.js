console.log("loading powerup.js")
AFRAME.registerComponent('powerup', {
  schema: {
    target: {type: 'selector', default:"#hud"},
    value: {type: 'number', default:0},
    title: {type: 'string', default:"score"}
  },


  init: function() {
    const component = this
    this.health=10
    this.score=0
    this.collisionHandler = (e) => {
         console.log('just collided with something')
         component.otherBody = e.detail.body
    }
    this.el.addEventListener('collide', this.collisionHandler);
  },

  tick: function(uptime,delta) {
    const otherBody = this.otherBody
    this.otherBody = null

    if (otherBody) {

      console.log('in the tick function')
      console.dir(otherBody)
      const hud = this.data.target

      let elt = otherBody.el
      const eltHealth = parseInt(elt.getAttribute('health'))
      const eltScore = parseInt(elt.getAttribute('score'))

      if (eltHealth) {
        this.health+= eltHealth;
        hud.setAttribute('health',this.health)
      }

      if (eltScore) {
        this.score += eltScore;
        hud.setAttribute('score',this.score)
      }
      console.dir([eltHealth,eltScore,elt,this,hud])

      if (eltHealth || eltScore){
        console.log('removing elt from scene')
        console.dir(elt)
        console.log('parent is ')
        console.dir(elt.parentNode)
        otherBody.el.removeAttribute("dynamic-body");
        elt.parentNode.removeChild(elt)
        hud.setAttribute('text','value',
                 "Score:"
               + this.score
               + "  Health:"
               + this.health)

      }

    }
  }

});
