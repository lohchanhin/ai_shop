<template>
    <div class="shop-container">
        <div class="filter-area">
            <h3>筛选条件</h3>
            <input type="text" v-model="filterText" placeholder="输入关键字" @input="updateDisplay">
        </div>
        <div class="display-area">
            <div v-for="item in filteredItems" :key="item.id" class="card" @click="openModal(item)">
                <h4>{{ item.title }}</h4>
                <!-- 显示第一张图片，如果存在 -->
                <img :src="item.images[0]" :alt="`图片-${item.title}`" class="product-image">
                <p>{{ item.description }}</p>
            </div>
            <div v-if="selectedItem" class="modal" @click.self="closeModal">
                <div class="modal-content">
                    <div class="slider" ref="slider" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag"
                        @mouseleave="endDrag">
                        <div class="images-container" :style="{ transform: `translateX(${offsetX}px)` }">
                            <img v-for="image in selectedItem.images" :src="image" :key="image"
                                class="product-inside-image">
                        </div>
                    </div>
                    <div class="product-details">
                        <h4 class="product-title">{{ selectedItem.title }}</h4>
                        <div class="detail">
                            <strong>参数：</strong><span>{{ selectedItem.params }}</span>
                        </div>
                        <div class="detail description">
                            <strong>描述：</strong><span>{{ selectedItem.description }}</span>
                        </div>
                        <div class="detail price">
                            <strong>价格：</strong><span>{{ selectedItem.price }}</span>
                        </div>
                        <div class="quantity">
                            <label for="quantity">数量:</label>
                            <input type="number" id="quantity" v-model="quantity" min="1" class="quantity-input">
                        </div>
                        <div class="buttons">
                            <button class="purchase-button" @click="purchase(selectedItem)">确认购买</button>
                            <button class="close-button" @click="closeModal">关闭</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShopComponent',
    data() {
        return {
            filterText: '',
            items: [
                {
                    id: 1,
                    title: '商品A',
                    description: '描述A',
                    params: '参数1',
                    price: '¥100',
                    baseImageName: 'productA',
                    imageCount: 3
                },
                // 可以添加更多商品...
            ],
            selectedItem: null,
            quantity: 1,
            startX: 0,
            currentX: 0,
            offsetX: 0,
            dragging: false,
            velocity: 0,
            lastTime: 0,
            frame: null,
            totalWidth: 0,
            sliderWidth: 0,
            friction: 0.92, // 摩擦系数，用于调节惯性滚动时的速度衰减
            inertiaActive: false // 标志位，指示是否正在进行惯性滚动
        };
    },
    computed: {
        filteredItems() {
            return this.items.map(item => ({
                ...item,
                images: this.generateImagePaths(item.baseImageName, item.imageCount)
            })).filter(item => item.title.toLowerCase().includes(this.filterText.toLowerCase()));
        }
    },
    methods: {
        generateImagePaths(baseName, count) {
            return Array.from({ length: count }, (_, i) => require(`@/assets/images/${baseName}-${i + 1}.jpg`));
        },
        openModal(item) {
            this.selectedItem = item;
            this.calculateTotalWidth(item);
        },
        calculateTotalWidth(item) {
            if (item && item.images) {
                this.totalWidth = item.images.length * this.sliderWidth;
            }
        },
        closeModal() {
            this.selectedItem = null;
        },
        purchase(item) {
            console.log(`Purchased ${this.quantity} of ${item.title}`);
            this.closeModal();
        },
        updateSliderWidth() {
            const slider = this.$refs.slider;
            if (slider) {
                this.sliderWidth = slider.clientWidth;
                if (this.selectedItem) {
                    this.calculateTotalWidth(this.selectedItem);
                }
            }
        },
        startDrag(event) {
            if (this.frame) {
                cancelAnimationFrame(this.frame);
            }
            this.dragging = true;
            this.startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            this.currentX = this.startX;
            this.velocity = 0;
            this.lastTime = Date.now();
            event.preventDefault(); // 防止默认事件，如页面滚动
        },
        onDrag(event) {
            if (this.dragging) {
                let clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
                const deltaX = clientX - this.currentX;
                this.currentX = clientX;
                const tentativeOffsetX = this.offsetX + deltaX;
                const maxOffset = -(this.totalWidth - this.sliderWidth);
                this.offsetX = Math.max(maxOffset, Math.min(0, tentativeOffsetX));
                this.velocity = (1000 * deltaX / (Date.now() - this.lastTime));
                this.lastTime = Date.now();
                this.frame = requestAnimationFrame(this.applyInertia);
                event.preventDefault();
            }
        },
        endDrag() {
            this.dragging = false;
            this.frame = requestAnimationFrame(this.applyInertia);
        },
        applyInertia() {
            if (Math.abs(this.velocity) > 10 && !this.dragging) {
                this.offsetX += this.velocity / 60;
                this.velocity *= 0.95;
                this.frame = requestAnimationFrame(this.applyInertia);
            } else {
                this.adjustBounds(true);
                cancelAnimationFrame(this.frame);
                this.frame = null;
                this.velocity = 0;
            }
        },
        adjustBounds(snapBack = false) {
            const minOffset = -(this.totalWidth - this.sliderWidth);
            this.offsetX = snapBack ? Math.max(minOffset, Math.min(0, this.offsetX)) : this.offsetX;
        },
    },
    mounted() {
        this.updateSliderWidth();
        window.addEventListener('resize', this.updateSliderWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateSliderWidth);
    }
}
</script>


<style scoped>
.product-image {
    width: 100%;
    /* 或其他尺寸，根据您的设计需要调整 */
    height: auto;
    /* 保持图片的纵横比 */
    margin-bottom: 10px;
    /* 如需要，添加一些外边距 */
}

.shop-container {
    display: flex;
    min-height: 100vh;
}

.filter-area {
    flex: 1;
    background-color: #f0f0f0;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
}

.display-area {
    flex: 3;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.filter-area h3,
.filter-area input {
    height: fit-content;
    margin: auto;
}

.card {
    border: 1px solid #ccc;
    margin: 2rem;
    padding: 10px;
    width: 200px;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    height: fit-content;
}

.card:hover {
    transform: scale(1.05);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 50vw;
    height: 50vh;
    display: flex;
}

.slider {
    overflow: auto;
    position: relative;
    cursor: grab;
}

.images-container {
    display: flex;
    transition: transform 0.3s ease-out;
    will-change: transform;
}

.product-inside-image {
    flex-shrink: 0;
    /* 确保图片在flex容器中不被压缩 */
    width: 100%;
    /* 图片宽度自动调整以填满其容器宽度 */
    height: auto;
    /* 高度自动调整以保持图片的原始纵横比 */
    pointer-events: none;
    /* 禁用图片的默认拖拽行为 */
}



.product-details {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    /* 控制最大宽度 */
    margin: auto;
    text-align: left;
}

.product-title {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
}

.detail {
    margin-bottom: 10px;
    font-size: 16px;
    color: #666;
}

.detail strong {
    color: #333;
    font-weight: bold;
}

.description {
    color: #444;
}

.price {
    font-size: 18px;
    color: #228B22;
    /* 价格使用绿色字体 */
}

.quantity {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.quantity label {
    margin-right: 10px;
    font-size: 16px;
}

.quantity-input {
    width: 60px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.purchase-button,
.close-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    outline: none;
}

.purchase-button {
    background-color: #4CAF50;
    /* 绿色 */
}

.close-button {
    background-color: #f44336;
    /* 红色 */
}

.purchase-button:hover {
    background-color: #45a049;
}

.close-button:hover {
    background-color: #d32f2f;
}
</style>
