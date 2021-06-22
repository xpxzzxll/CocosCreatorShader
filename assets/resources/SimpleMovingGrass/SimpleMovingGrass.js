cc.Class({
    extends: cc.Component,

    properties: {
        _time: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rc = this.node.getComponent(cc.RenderComponent);
    },

    start () {

    },

    update (dt) {
        this.rc.getMaterial(0).setProperty('Time', this._time);
        if (this._time > 65535) {
            this._time = 0;
        }
        this._time += dt;
    },
});
