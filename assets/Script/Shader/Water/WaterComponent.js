const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/WaterComponent',
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
        resolution: {
            set(val) {
                this.material.resolution = val;
            }
        }
    },
    onLoad() {
        this.Material = require('WaterMaterial');
    },

    onEnable () {
        this._super();

        this.resolution = cc.v2(this.material.texture.width, this.material.texture.height);
    },

    update(dt) {
        if (this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    },
});
