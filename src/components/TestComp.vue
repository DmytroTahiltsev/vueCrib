<template>
    <div style="display:none">
        <div class="a" v-for="item in data">
            <span>{{item}}</span>
        </div>
        <div>
            <input v-model="modelValue" @input="updateInput" type="text">
            <button @click="addItem">add</button>
        </div>
    </div>
 
</template>

<script>
export default {
    props: {
        data: {
            type: Array
        },
        modelValue: {
            type: [String, Number]
        }
    },
    methods: {
        addItem() {
            this.$emit("addTest", 58)
        },
        updateInput(event){
            this.$emit("update:modelValue", event.target.value)
        }
    }
}
</script>

<style>
.a{
    background-color: red;
    margin-top: 3px;
}
</style>