<script setup lang="ts">

const props = defineProps({
    info: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="card">
        <h3 class="card__title">{{ info?.name ? 'Name: ' + info?.name : '' || info?.title  }}</h3>
        <p class="card__body">{{ info?.body }}</p>
        <slot></slot>
    </div>
</template>