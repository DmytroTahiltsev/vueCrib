<template>
    <div class="product">
        <div class="product__image">
            <img :src="image" alt="img">
        </div>
        <div class="product__info">
            <h2>{{ title }}</h2>
            <p>{{ product.info.body }}</p>
            <p v-if="product.variants[this.product.selectedVariant].inventory > 10">In stock</p>
            <p v-else-if="product.variants[this.product.selectedVariant].inventory <= 10 && product.variants[this.product.selectedVariant].inventory > 0">Almost sold out</p>
            <p v-else>Out of stock</p>
            <ul>
                <li v-for="detail in product.info.details" :key="detail">
                    {{detail}}
                </li>
            </ul>
            <div>
                Shipping: {{ shipping }}
            </div>
            <div class="product__variants" style="marginTop: 10px; border: 1px solid black">
                <div 
                    class="product__variant" 
                    v-for="(variant, index) in product.variants" 
                    :key="variant.id"
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)"
                    >
                </div>
            </div>
            <button @click="addToCart" :disabled="!(product.variants[this.product.selectedVariant].inventory > 0)" >Add to cart</button>
        </div>
        <div class="test" :title="testTitle">
            <button @click="changeTitle">change title</button>
            <input type="text" v-model="divTitle">
        </div>

    </div>
</template>

<script>
export default {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
        testTitle: {
            type: String
        }
    },
    data(){
        return {
            divTitle: "",
            product: {
                selectedVariant: 0,
                info: {
                    brand: 'Apple',
                    title: 'product1',
                    body: 'description 1',
                    details: ["good thing", "80% better", "not dirty"]
                },
                variants: [
                    {
                        inventory: 5,
                        variantId: 555,
                        variantColor: 'purple',
                        image: 'https://lh3.googleusercontent.com/proxy/n3igr7Msu9p2_v9Lgwf1TCmoI7DPcxo5Ca2yxyz5r4xoGoctsg-lgs6ccCSmDj_hteADop98xOapiBOSCTaq-oG4Wp29eLZeMgPYap1JS4U8'
                    },
                    {
                        inventory: 1,
                        variantId: 556,
                        variantColor: 'green',
                        image: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg'
                    }
                ],
            },

        }
    },
    methods: {
        addToCart() {
            this.$emit('addToCart')
            this.product.variants[this.product.selectedVariant].inventory--
            this.$emit('selectedProduct', this.product.variants[this.product.selectedVariant])
        },
        updateProduct(index) {
            this.product.selectedVariant = index
        },
        changeTitle(){
            this.$emit('changeTitle', this.divTitle)
        }
    },
    computed: {
        title() {
            return this.product.info.brand + " " + this.product.info.title
        },
        image() {
            return this.product.variants[this.product.selectedVariant].image
        },
        shipping() {
            if(this.premium){
                return "free"
            }
            return "2.99$"
        },
        /*inStock() {
            if(this.)
        }*/
    }
}
</script>

<style>
.test{
    width: 200px;
    height: 50px;
    background-color:red ;
}
</style>