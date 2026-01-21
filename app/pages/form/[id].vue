<template>
  <div>
    <DomainCardForm 
      v-if="card"
        :card="card"
        :themes="themes"
        class="mt-2"
        @update-card="callUpdateCard"
        @delete-card="callDeleteCard"
        @reset-card="resetCard"
        @upload-image="uploadImage"
    />
    <UTooltip title="Back to Card">
      <UButton icon="streamline-color:xrp-circle-flat" class="mr-1" :to="'/card/'+id" size="sm"/>
    </UTooltip>
  </div>
</template>
<script setup lang="ts">

  // middleware
  definePageMeta({
    middleware: 'auth'
  })

  const { uploadFileToTable } = useCardFileUpload()

  const id:number = Number(useRoute().params.id).valueOf()
  const card = ref<ICard>()
  card.value = await getCard(id)
  const themes = ref()
  themes.value = await getThemes()


  const callUpdateCard = async () => {
    if(!card.value) return
    await updateCard(card.value)
    messageToSnack("Card updated")
  }
  const callDeleteCard = async () => {
    if(!card.value?.id) return
    await deleteCard(card.value.id)
    messageToSnack("Card deleteCard")
    await navigateTo('/')
  }
  const resetCard = async () => {
    card.value = await getCard(id)
    messageToSnack("Card reset")
  }

  const uploadImage = async (file:File|null|undefined) => {
    // console.log("file:", file?.name)
    if(file && card.value?.id) {
      const resp = await uploadFileToTable(file, card.value.id)
      card.value = resp
      messageToSnack("Image uploaded")
    }
  }

</script>
