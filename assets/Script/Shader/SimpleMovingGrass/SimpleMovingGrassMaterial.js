const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'simple-moving-grass',
            override : true
        },
        u_time: {
            set(val) {
                this._effect.setProperty('u_time', val);
            },
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                const float speed = 2.0;
                const float bendFactor = 0.2;
                uniform float u_time;
                void main() {
                    float height = 1.0 - uv0.y;
                    float offset = pow(height, 2.5);
                    offset *= (sin(u_time * speed) * bendFactor);
                    gl_FragColor = texture2D(texture, fract(vec2(uv0.x + offset, uv0.y)));
                }
            `,
            override: true
        },
    },
    ctor() {
        this.uniform(
            'u_time',
            renderer.PARAM_FLOAT,
            0
        );
    },
});