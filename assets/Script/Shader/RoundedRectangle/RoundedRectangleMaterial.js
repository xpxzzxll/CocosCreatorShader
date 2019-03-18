const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'rounded-rectangle',
            override : true
        },

        radius: {
            set(val) {
                this._effect.setProperty('radius', val);
            },
        },
        w_divide_h : {
            set(val) {
                this._effect.setProperty('w_divide_h', val);
            },
        },

        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                uniform float radius;
                uniform float w_divide_h;
                varying vec2 uv0;
                void main() {
                    vec4 c = color * texture2D(texture, uv0);
                    vec2 uv = uv0 - vec2(0.5, 0.5);
                    uv *= vec2(w_divide_h, 1.0);
                    float rx = mod(abs(uv.x), 0.5 * w_divide_h - radius);
                    float ry = mod(abs(uv.y), 0.5 - radius);
                    float mx = step(0.5 * w_divide_h - radius, abs(uv.x));
                    float my = step(0.5 - radius, abs(uv.y));
                    float len = length(vec2(rx, ry));
                    float ml = step(radius, len);
                    float delta = len - radius;
                    if (len > radius && delta < 0.005) {
                        ml = smoothstep(0.0, 0.01, delta);
                    }
                    float alpha = 1.0 - mx * my * ml;
                    gl_FragColor = vec4(c.r, c.g, c.b, c.a * alpha);
                }
            `,
            override: true
        },
    },
    ctor() {
        this.uniform(
            'radius',
            renderer.PARAM_FLOAT,
            0.1
        );

        this.uniform(
            'w_divide_h',
            renderer.PARAM_FLOAT,
            1.0
        );
    },
});