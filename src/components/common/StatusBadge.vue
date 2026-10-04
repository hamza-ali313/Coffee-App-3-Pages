<script setup>
defineProps({ status: { type: String, default: 'available' } })
</script>
<template><span class="badge">{{ status }}</span></template>
<style lang="scss" scoped>
.badge {
    display: inline-block;
    padding: .1rem .7rem;
    border-radius: 6px;
    background-color: $c-tan;
    color: $c-white;
    font-size: .68rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>
