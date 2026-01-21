<template>
  <UPageCard
    variant="subtle"
    :class="bgColor">
    <template #title>
      <UTooltip v-if="loggedIn" title="Update Card">
        <UButton icon="streamline-color:pencil" class="mr-1" :to="'/form/'+card.id" size="sm"/>
      </UTooltip>
      <span>{{ card.title }}</span>
    </template>
    <template #description>
      <NuxtLink :to="to" target="_blank">
        <img v-if="card.image" :src="card.image" :alt="card.title"/>
        <img v-else-if="card.src" :src="card.src" :alt="card.title"/>
      </NuxtLink>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
  // props
  const props = defineProps<{
      card:ICard;
      to?:string
  }>()

  const { loggedIn } = useUserSession()
  
  const bgColor = computed (() => {
    return getBgColor(props.card.color)
  })

</script>
