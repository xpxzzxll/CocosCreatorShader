const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    name: 'cc.RoundedRectangleMaterial',
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
                    float u,v;
                    if (w_divide_h >= 1.0) {
                        uv *= vec2(w_divide_h, 1.0);
                        u = 0.5 * w_divide_h - radius;
                        v = 0.5 - radius;
                    }else {
                        uv *= vec2(1.0, 1.0 / w_divide_h);
                        u = 0.5 - radius;
                        v = 0.5 / w_divide_h - radius;
                    }
                    float ax = step(u, abs(uv.x));
                    float ay = step(v, abs(uv.y));
                    float al = 0.0;
                    if (abs(uv.x) >= u && abs(uv.y) >= v) {
                        float rx = abs(uv.x) - u;
                        float ry = abs(uv.y) - v;
                        float len = length(vec2(rx, ry));
                        al = step(radius, len);
                        float delta = len - radius;
                        if (len > radius && delta < 0.005) {
                            al = smoothstep(0.0, 0.01, delta);
                        }
                    }
                    float alpha = 1.0 - ax * ay * al;
                    gl_FragColor = vec4(c.r, c.g, c.b, c.a * alpha);
                }
            `,
            override: true
        },
    },
    ctor(batch) {
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

    init(batch) {
        if (false == batch) {
            this.name = 'rounded-rectangle' + Math.random().toFixed(6);
        }
        ShaderMaterial.prototype.init.call(this);
    }
});