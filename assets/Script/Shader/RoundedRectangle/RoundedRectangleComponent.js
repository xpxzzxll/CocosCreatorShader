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
        //这个组件有很多限制
        //1.不能作用于纹理来自于纹理集的Sprite, 因为计算的是整个张纹理
        //2. 来自同一个非纹理集的纹理的两个Sprite, uniform设置不同的值,后渲染的表现错误.因为会参与批渲染合并,除非主动打破批渲染合并.
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
