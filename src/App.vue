<script setup lang="ts">
import LabelledCheckbox from "./components/LabelledCheckbox.vue";
import NumberInputGroup from "./components/NumberInputGroup.vue";

import { onMounted, ref } from "vue";

const themeOptions = ref(["dark", "light"]);
const theme = ref(localStorage.getItem("converter:theme"));

const useBinaryUnits = ref(true);
const useSeperators = ref(false);
const roundDown = ref(true);

const bytes = ref(0);
const kib = ref(0);
const mib = ref(0);
const gib = ref(0);
const tib = ref(0);
const pib = ref(0);

enum Unit {
  Bytes = 0,
  KiB = 1,
  MiB = 2,
  GiB = 3,
  TiB = 4,
  PiB = 5
}

onMounted(() => {
  updateTheme();
});

function browserInDarkMode() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateTheme() {
  const html = document.querySelector("html")!;

  if (theme.value == null) {
    localStorage.removeItem("converter:theme");

    if (browserInDarkMode()) {
      html.classList.add("dark-mode");
    } else {
      html.classList.remove("dark-mode");
    }
  } else {
    if (theme.value == "dark") {
      localStorage.setItem("converter:theme", "dark");
      html.classList.add("dark-mode")
    } else {
      localStorage.setItem("converter:theme", "light");
      html.classList.remove("dark-mode");
    }
  }
}

function handleInputChange(value: number | string | undefined, unit: Unit) {
  if (typeof value === "string") {
    value = parseInt(value);
  }

  if (value === undefined || isNaN(value))
    return;
  
  let mult = unit == Unit.Bytes ? 1 : Math.pow(useBinaryUnits ? 1024 : 1000, unit);
  bytes.value = value * mult;

  updateValuesByBytes();
}

function updateValuesByBytes() {
  let base = useBinaryUnits.value ? 1024 : 1000;
  kib.value = bytes.value / base;
  mib.value = kib.value / base;
  gib.value = mib.value / base;
  tib.value = gib.value / base;
  pib.value = tib.value / base;

  if (roundDown.value) {
    for (const ref of [kib, mib, gib, tib, pib]) {
      ref.value = Math.floor(ref.value);
    }
  }
}

</script>

<template>
  <div class="card flex flex-col-reverse md:flex-row gap-4 m-16 justify-center font-mono">
    <div class="card flex flex-col gap-4">
      <NumberInputGroup label="Bytes" v-model="bytes"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.Bytes)"
      />

      <NumberInputGroup :label="useBinaryUnits ? 'KiB' : 'kB'" v-model="kib"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.KiB)"
      />

      <NumberInputGroup :label="useBinaryUnits ? 'MiB' : 'MB'" v-model="mib"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.MiB)"
      />

      <NumberInputGroup :label="useBinaryUnits ? 'GiB' : 'GB'" v-model="gib"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.GiB)"
      />

      <NumberInputGroup :label="useBinaryUnits ? 'TiB' : 'TB'" v-model="tib"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.TiB)"
      />

      <NumberInputGroup :label="useBinaryUnits ? 'PiB' : 'PB'" v-model="pib"
        :useGrouping="useSeperators" @input="handleInputChange($event.value, Unit.PiB)"
      />

      <LabelledCheckbox label="Use binary units" v-model="useBinaryUnits" @change="updateValuesByBytes()" />
      <p class="text-slate-600">
        When turned on, the converter will use binary units (1 KiB = 1024 B) instead of SI
        units (1 kB = 1000 B).
      </p>

      <LabelledCheckbox label="Use seperators" v-model="useSeperators" />
      <p class="text-slate-600">
        When turned on, values will be displayed with seperators (e.g. 1,000,000 instead of
        1000000).
      </p>

      <LabelledCheckbox label="Round down / Display decimals" v-model="roundDown" @change="updateValuesByBytes()" />
      <p class="text-slate-600">
        If enabled, all values will be rounded down to the nearest integer.
      </p>

      <p>made with 💚 by <a class="text-primary hover:underline" href="https://ascpixi.dev">@ascpixi</a></p>
    </div>

    <div>
      <SelectButton
        v-model="theme"
        :options="themeOptions"
        optionLabel="value"
        aria-labelledby="custom"
        @change="updateTheme"
      >
        <template #option="slotProps">
            <i :class="slotProps.option == 'dark' ? 'pi pi-moon' : 'pi pi-sun'"></i>
        </template>
      </SelectButton>
    </div>
  </div>
</template>

