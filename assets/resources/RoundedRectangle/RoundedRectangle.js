cc.Class({
    extends: cc.Component,

    properties: {
        radius: {
            default: 0.1,
            type: cc.Float,
            range: [0, 0.5, 0.01],
            slide: true,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rc = this.node.getComponent(cc.RenderComponent);
    },

    start () {
        this.rc.getMaterial(0).setProperty('radius', this.radius);
    },

    // update (dt) {},
});
