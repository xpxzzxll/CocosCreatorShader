const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'circular-bead',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {
                    vec4 c = color * texture2D(texture, uv0);
                    vec2 uv = uv0 - vec2(0.5, 0.5); 
                    float rx = mod(abs(uv.x), 0.4);
                    float ry = mod(abs(uv.y), 0.4);
                    float mx = step(0.4, abs(uv.x));
                    float my = step(0.4, abs(uv.y));
                    float ml = step(0.1, length(vec2(rx, ry)));
                    float alpha = 1.0 - mx * my * ml;
                    gl_FragColor = vec4(c.r, c.g, c.b, c.a * alpha);
                }
            `,
            override: true
        },
    },
});