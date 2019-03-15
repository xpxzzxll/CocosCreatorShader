const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/ShutterComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        _time: 0,
        time: {
            get() {
                return this._time;
            },
            set(val) {
                this._time = val;
                this.material.time = val;
            },
            visible: false
        },
    },
    onLoad() {
        this.Material = require('ShutterMaterial');
    },

    update(dt) {
        this.time += dt;
    },
});
