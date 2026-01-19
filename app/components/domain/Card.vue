<template>
  <UPageCard
    :title="card.title"
    :to="to"
    variant="subtle"
    :class="bgColor">
    <img v-if="card.image" :src="card.image" :alt="card.title"/>
    <img v-else :src="card.src" :alt="card.title"/>
  </UPageCard>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
      to:string|undefined
  }>()

  const bgColor = computed (() => {
    return getBgColor(props.card.color)
  })

</script>
