<template>
  <UPageGrid class="mt-2">
    <DomainCard v-for="card in cards" :card="card" :to="'/card/'+card.id"/>
  </UPageGrid>
</template>

<script setup lang="ts">
  // props
  const props = defineProps<{
      cards:Array<ICard>|undefined;
  }>()
</script>
