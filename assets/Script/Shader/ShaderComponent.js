cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        executeInEditMode: true,
        disallowMultiple: true,
        requireComponent: cc.RenderComponent,
    },
    properties: {
    },

    onLoad () {},
    onDisable () {
        let rc = this.getComponent(cc.RenderComponent);
        rc._material = null;
        rc._activateMaterial();
    }
});
