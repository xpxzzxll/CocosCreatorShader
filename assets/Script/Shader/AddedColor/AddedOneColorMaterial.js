const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
/**
 * 因为项目中的美术, 总是喜欢在ps中蒙一层灰色半透明的蒙版, 而全透明的区域又不允许出现灰色
 * 放到项目中就很难通过set color(乘以一个颜色) 或者 叠加一个灰色的sprite实现(全透明区域也会有灰色)
 * 只针对 src_alpha, one_minus_src_alpha生效
 */
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'added-one-color',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                uniform lowp vec4 added;
                void main() {
                    vec4 dst = color * texture2D(texture, uv0);
                    if (dst.a > 0.0) {
                        gl_FragColor = vec4(vec3(added) * added.a + vec3(dst) * (1.0 - added.a), dst.a);
                    }else {
                        gl_FragColor = dst;
                    }
                }
            `,
            override: true
        },

        _addedcolor: {
            default: new cc.Color(255, 255, 255, 255)
        },
        AddedColor: {
            get() {
                return this._addedcolor;
            },
            set(val) {
                if (!val.equals(this._addedcolor)) {
                    this._addedcolor = val;
                    var color = {};
                    color.r = val.r / 255;
                    color.g = val.g / 255;
                    color.b = val.b / 255;
                    color.a = val.a / 255;
                    this._effect.setProperty('added', color);
                }
            }
        },
    },

    ctor() {
        this.uniform(
            'added',
            renderer.PARAM_COLOR4,
            {r:1, g:1, b:1, a:1}
        );
    },
});