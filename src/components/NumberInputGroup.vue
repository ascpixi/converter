<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber';

const props = defineProps<{
  label: string;
  modelValue: number;
  useGrouping: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [number | string | undefined],
  "input": [InputNumberInputEvent]
}>();

const onInput = (event: InputNumberInputEvent) => {
  emit("update:modelValue", event.value);
  emit("input", event);
};
</script>

<template>
  <div class="flex-auto flex-row flex items-center gap-4">
    <span class="h-min">{{ props.label }}</span>
    <InputNumber fluid
      :modelValue="props.modelValue"
      :useGrouping="props.useGrouping"
      @input="onInput"
    />
  </div>
</template>
