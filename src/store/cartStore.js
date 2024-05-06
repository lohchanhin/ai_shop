// store/cartStore.js
import { ref } from 'vue';

export const cart = ref([]);

export function useCartStore() {
    function addToCart(item) {
        const existingItem = cart.value.find(product => product.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.value.push({ ...item, quantity: item.quantity });
        }
    }

    function removeFromCart(id) {
        const index = cart.value.findIndex(product => product.id === id);
        if (index !== -1) {
            cart.value.splice(index, 1);
        }
    }

    function clearCart() {
        cart.value = [];
    }

    return { cart, addToCart, removeFromCart, clearCart };
}
