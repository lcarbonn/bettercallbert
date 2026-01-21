<template>
  <div>
  <DomainCardCarousel :items="cards" :index="index" class="mt-2"/>
  <UTooltip v-if="loggedIn" title="Update Card">
    <UButton icon="streamline-color:pencil" class="mr-1" :to="'/form/'+id" size="sm"/>
  </UTooltip>
  </div>
</template>
<script setup lang="ts">

  const id:number = Number(useRoute().params.id).valueOf()
  const card = await getCard(id)

  const { loggedIn } = useUserSession()

  const cards = []
  let index = 0

  const prevId = card.id?card.id-1:0
  let prevCard
  try {
    prevCard = await getCard(prevId)
    cards.push(prevCard)
    index++
  } catch (error) {
    // no previous card 
  }

  cards.push(card)

  const nextId = card.id?card.id+1:0
  let nextCard
  try {
    nextCard = await getCard(nextId) 
    cards.push(nextCard)
  } catch (error) {
    // no next card 
  }

</script>
