<template>
    <div class="cart-container">
      <div class="cart-items" style="width: 30%;">
        <h2>购物篮信息</h2>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.name }} - {{ item.quantity }} x {{ item.price }}
            <button @click="removeItem(item.id)">移除</button>
          </li>
        </ul>
      </div>
      <div class="cart-summary" style="width: 70%;">
        <h2>账单信息</h2>
        <p>总计: {{ total }}</p>
        <button @click="checkout">结算</button>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, computed } from 'vue';
  
  export default {
    name: 'CartComponent',
    setup() {
      const cartStore = inject('cartStore');
      const { cart, removeFromCart, clearCart } = cartStore;
  
      const total = computed(() => {
        return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
      });
  
      function removeItem(id) {
        removeFromCart(id);
      }
  
      function checkout() {
        console.log('结算', total.value);
        alert('结算成功！');
        clearCart();
      }
  
      return {
        cart: cart,
        total,
        removeItem,
        checkout
      };
    }
  }
  </script>
  



<style scoped>
.cart-container {
    display: flex;
    width: 100%;
    height: auto;
}

.cart-items {
    padding: 20px;
    background-color: #f9f9f9;
    /* 轻灰色背景 */
    border-right: 2px solid #ececec;
    /* 右侧边框分隔 */
}

.cart-summary {
    padding: 20px;
    background-color: #fff;
    /* 白色背景 */
}

ul {
    padding: 0;
}

li {
    list-style: none;
    margin-bottom: 10px;
}
</style>
