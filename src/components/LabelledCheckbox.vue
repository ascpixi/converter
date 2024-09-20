<script setup lang="ts">
const model = defineModel<boolean>();
const props = defineProps<{
  label: string;
}>();

const emit = defineEmits(['update:modelValue', "change"]);
</script>

<template>
  <div class="flex-auto flex-row flex items-center gap-4">
    <Checkbox v-model="model" :binary="true" @change="emit('change')" />
    <span class="h-min">{{ props.label }}</span>
  </div>
</template>
