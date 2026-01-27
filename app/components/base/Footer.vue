<template>
  <div class="fixed pt-2 bottom-0 left-0 right-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
    <USeparator type="dashed" color="primary"
      :avatar="{
        src: '/icon-64x64.png'
      }"/>
    <UFooter class="text-xs md:text-base">Copyright © {{year}} - Agilisé à Toulouse, France - V{{appVersion}}</UFooter>
   </div>
</template>

<script setup>
  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
  const year = new Date().getFullYear()
</script>
