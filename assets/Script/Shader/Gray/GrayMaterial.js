const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'gray',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                varying vec2 uv0;
                void main() {
                    vec4 c = texture2D(texture, uv0);
                    vec3 rgb = vec3(dot(c.rgb, vec3(0.3, 0.59, 0.11)));
                    gl_FragColor = vec4(rgb.r, rgb.g, rgb.b, c.a);
                }
            `,
            override: true
        },
    },
});
