<template>
    <div class="container">
        <div class="product__cart">
            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>
        </div> 
        <product @changeTitle="changeTitle" :premium="premium" @addToCart="updateCart" @selectedProduct="prod" :testTitle="testTitleGetter" />
        
    </div>
       
</template>

<script>
import Product from "@/components/Product"

export default {
    components:{
        Product
    },
    data() {
        return {
            premium: true,
            cart: 0,
            testTitle:"title"
        }
    },
    methods: {
        updateCart() {
            this.cart++
        },
        prod(item) {
            console.log(item)
        },
        changeTitle(newTitle){
            this.testTitle = newTitle
        }
    },
    computed: {
        testTitleGetter(){
            return this.testTitle + "23819"
        }
    }
}
</script>

<style>
.product {
    display: flex;
    justify-content: center;
}
.product > div {
    margin: 20px 50px;
}
.product__variant{
    width: 100%;
    height: 20px;
}
</style>