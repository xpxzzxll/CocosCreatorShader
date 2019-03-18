const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'rounded-rectangle',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {
                    float radius = 0.1;
                    float w_divide_h = 2.0;

                    float dis = 0.5 - radius;
                    vec4 c = color * texture2D(texture, uv0);
                    vec2 uv = uv0 - vec2(0.5, 0.5); 
                    float rx = mod(abs(uv.x), dis);
                    float ry = mod(abs(uv.y), dis);
                    float mx = step(dis, abs(uv.x));
                    float my = step(dis, abs(uv.y));
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
});