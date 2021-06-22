
/**
 * 因为项目中的美术, 总是喜欢在ps中蒙一层灰色半透明的蒙版, 而全透明的区域又不允许出现灰色
 * 放到项目中就很难通过set color(乘以一个颜色) 或者 叠加一个灰色的sprite实现(全透明区域也会有灰色)
 * 只针对 src_alpha, one_minus_src_alpha生效
 */
cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },

    properties: {
        AddedColor: {
            default: cc.Color.WHITE
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rc = this.node.getComponent(cc.RenderComponent);
    },

    start () {
        this.rc.getMaterial(0).setProperty('addedColor', cc.v4(
            this.AddedColor.r / 255, 
            this.AddedColor.g / 255, 
            this.AddedColor.b / 255, 
            this.AddedColor.a / 255));
    },

    // update (dt) {},
});
