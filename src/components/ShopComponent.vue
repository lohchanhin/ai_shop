<template>
    <div class="shop-container">
        <div class="filter-area">
            <h3>筛选条件</h3>
            <input type="text" v-model="filterText" placeholder="输入关键字" @input="updateDisplay">
        </div>
        <div class="display-area">
            <div v-for="item in filteredItems" :key="item.id" class="card" @click="openModal(item)">
                <h4>{{ item.title }}</h4>
                <img :src="item.images[0]" :alt="`图片-${item.title}`" class="product-image">
                <p>{{ item.description }}</p>
            </div>
        </div>
        <div v-if="selectedItem" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item" v-for="(img, index) in selectedItem.images"
                            :class="{ 'active': index === 0 }" :key="index">
                            <img class="d-block w-100" :src="img" :alt="`Slide ${index + 1}`">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
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
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'ShopComponent',
    setup() {
        const filterText = ref('');
        const items = ref([
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
        ]);
        const selectedItem = ref(null);
        const quantity = ref(1);
        const cart = ref([]);

        const filteredItems = computed(() => {
            return items.value.map(item => ({
                ...item,
                images: generateImagePaths(item.baseImageName, item.imageCount)
            })).filter(item => item.title.toLowerCase().includes(filterText.value.toLowerCase()));
        });

        function generateImagePaths(baseName, count) {
            let images = [];
            for (let i = 1; i <= count; i++) {
                images.push(`/images/${baseName}-${i}.jpg`);
            }
            return images;
        }

        function openModal(item) {
            selectedItem.value = { ...item, images: generateImagePaths(item.baseImageName, item.imageCount) };
        }

        function closeModal() {
            selectedItem.value = null;
        }

        function addToCart(item) {
            const existingItem = cart.value.find(product => product.id === item.id);
            if (existingItem) {
                existingItem.quantity += quantity.value;
            } else {
                cart.value.push({ ...item, quantity: quantity.value });
            }
            console.log(`Purchased ${quantity.value} of ${item.title}`);
            closeModal();
        }

        return {
            filterText,
            items,
            selectedItem,
            quantity,
            cart,
            filteredItems,
            openModal,
            closeModal,
            addToCart
        };
    }
}
</script>






<style scoped>
#carouselExampleControls {
    width: 50%;
    height: 100%;
}


.carousel-inner {
    height: 100%;
}

.carousel-item img {
    width: 100%;
    /* 确保图片宽度总是填满容器 */
    height: 700px;
    /* 设定一个固定高度或使用百分比 */
    object-fit: cover;
    /* 覆盖整个容器，可能会裁剪图片 */
    object-position: center;
    /* 图片居中显示 */

}


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
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-wrap: wrap;
}

.slider {
    overflow: hidden;
    position: relative;
    width: 100%;
    /* 例如，可以设为600px或100%根据父容器 */
    height: 500px;
    /* 也可以调整为适合的高度 */
}

.images-container {
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: translateX(0%);
    /* 初始化位置 */
    height: 200px;
    /* 容器高度，确保与.slider一致 */
}

.product-inside-image {
    width: 200px;
    /* 图片宽度与.slider相同 */
    height: 200px;
    /* 图片高度与.slider相同 */
    object-fit: cover;
    /* 确保图片覆盖整个区域 */
    flex-shrink: 0;
    /* 防止flex布局缩放图片 */
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 1rem;
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
