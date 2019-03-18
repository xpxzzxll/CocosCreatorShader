const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/RoundedRectangleComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        radius: {
            default: 0.1,
            type: 'Float',
            range: [0, 0.5, 0.01],
            slide: true,
            notify: function () {
                this._updateRadius();
            }
        },
    },
    onLoad() {
        this.Material = require('RoundedRectangleMaterial');
    },

    onEnable() {
        //TODO:
        //有一个BUG, 这个组件在两个节点上, 表现为第一次设置的值
        ShaderComponent.prototype.onEnable.call(this);

        this.material.w_divide_h = this.node.width / this.node.height;
        this.material.radius = this.radius;
    },

    _updateRadius () {
        if (!CC_EDITOR) {
            this.material.radius = this.radius;
        }
    }
});
