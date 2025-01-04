<template>
    <div class="liveview-container">
        <canvas ref="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Liveview',
    props: {
        data: {
            type: Array,
            required: true,
        },
        options: {
            type: Object,
            default: () => {},
        },
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.drawCanvas();
        window.addEventListener('resize', this.resizeCanvas); // Resize on window resize
        this.resizeCanvas(); // Adjust on mount
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeCanvas);
    },
    watch: {
        data: 'drawCanvas',
    },
    computed: {
        canvasSettings() {
            return { ...this.defaultOptions, ...this.options };
        },
        canvasSize() {
            return {
                width: this.canvasSettings.cols * (this.canvasSettings.rectWidth + this.canvasSettings.padding),
                height: this.canvasSettings.rows * (this.canvasSettings.rectHeight + this.canvasSettings.padding),
            };
        },
    },
    data() {
        return {
            defaultOptions: {
                rectWidth: 10,
                rectHeight: 10,
                padding: 1,
                cols: 32,
                rows: 8,
            },
            canvas: null,
            ctx: null,
        };
    },
    methods: {
        drawCanvas() {
            const { rectWidth, rectHeight, padding, rows, cols } = this.canvasSettings;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#222';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const index = row * cols + col;
                    const color = this.data.length === 0 ? '#000' : '#' + this.data[index];
                    const x = col * (rectWidth + padding);
                    const y = row * (rectHeight + padding);

                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(x, y, rectWidth, rectHeight);
                }
            }
        },
        resizeCanvas() {
            const parentWidth = this.$el.offsetWidth;
            const parentHeight = this.$el.offsetHeight;

            const scaleWidth = parentWidth / this.canvasSize.width;
            const scaleHeight = parentHeight / this.canvasSize.height;

            // Adjust scale to respect both dimensions
            const scale = Math.min(scaleWidth, scaleHeight);

            // Apply scale to canvas dimensions
            this.canvas.style.width = `${this.canvasSize.width * scale}px`;
            this.canvas.style.height = `${this.canvasSize.height * scale}px`;
        },
    },
};
</script>

<style scoped>
.liveview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* max-width: 1000px; */
    height: 80%;
    background-color: #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin: auto; /* Center the container within the parent */
    box-sizing: border-box;
}

canvas {
    border: 2px solid gray;
    border-radius: 8px;
    display: block; /* Ensures the canvas stays centered */
    max-width: 100%; /* Ensure the canvas doesn't exceed container width */
    height: auto; /* Keep aspect ratio intact */
}
</style>
