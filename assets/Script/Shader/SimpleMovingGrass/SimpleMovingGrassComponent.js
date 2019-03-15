const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/SimpleMovingGrassComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        _time : 0,
        time: {
            get() {
                return this._time;
            },
            set(val) {
                this._time = val;
                this.material.u_time = val;
            },
            visible: false
        },
    },
    onLoad() {
        this.Material = require('SimpleMovingGrassMaterial');
    },

    update(dt) {
        this.time += dt;
    },
});
