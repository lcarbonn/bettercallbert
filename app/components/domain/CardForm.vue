<template>
  <div>
    <UPageCard
      variant="subtle"
      >
      <template #title>
        <UTooltip title="Back to Card">
          <UButton icon="streamline-color:xrp-circle-flat" class="mr-1" :to="'/card/'+card.id" size="sm"/>
        </UTooltip>
        {{ card.title }}
      </template>
      <template #description>
        <UPageGrid class="lg:grid-cols-3">
          <UFormField label="Title" required :error="titleState">
            <UInput id="title" v-model="card.title" placeholder="Set the card title" class="w-full"/>
          </UFormField>
          <UFormField label="Theme" required>
            <USelect id="theme" v-model="card.theme" :items="themeOptions" placeholder="-- Select a theme --" class="w-full"/>
          </UFormField>
          <UFormField label="Link Url" :error="linkState">
            <UInput id="link" v-model="card.link" placeholder="Set the card link" class="w-full"/>
          </UFormField>
          <UFormField label="Image Url" :error="srcState">
            <UInput id="src" v-model="card.src" class="w-full"/>
          </UFormField>
          <UFileUpload
            v-model="file"
            interactive
            accept="image/*"
            label="Drop your image here"
            position="inside"
            layout="list"
            @update:modelValue="uploadImage"
            />
          <UFormField label="Image">
            <UInput id="image" disabled v-model="card.imageName" class="w-full"/>
          </UFormField>
        </UPageGrid>          
      </template>
      <template #footer>
        <UTooltip title="Save Card">
          <UButton icon="streamline-color:floppy-disk-flat" class="mr-1" @click="updateCard" size="sm"/>
        </UTooltip>
        <UTooltip title="Delete Card">
          <UButton icon="streamline-color:recycle-bin-2-flat"  class="mr-1" @click="deleteCard" size="sm"/>
        </UTooltip>
        <UTooltip title="Reset changes">
          <UButton icon="streamline-color:arrow-reload-vertical-1"  class="mr-1" @click="resetCard" size="sm"/>
        </UTooltip>
      </template>
    </UPageCard>
    <DomainCard :card="card" :to="card.link" target="_blank"></DomainCard>
    <UiSimpleModal
      :open="modalDelete"
      title="Delete card"
      description="Really ?"
      @on-ok="confirmDelete"/>

  </div>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
      themes:ITheme[]
  }>()

  // local refs
  const modalDelete = ref(new ModalShow())
  const file = ref<File|null|undefined>(null)

  // form states
  const titleState = computed(() => {
    return (props.card.title == null || props.card.title =="")
  })
  const linkState = computed(() => {
    if(props.card) {
      if(props.card.link==null || props.card.link=="") return false
      return (props.card.link.indexOf('http')>-1) ? false : true
    }
  })
  const srcState = computed(() => {
    if(props.card) {
      if(props.card.src==null || props.card.src=="") return false
      return (props.card.src.indexOf('http')>-1) ? false : true
    }
  })

  // options
  const themeOptions = computed(() => {
    if(props.themes) return getThemeOptions(props.themes)
  })

  // emits declaration
  const emit = defineEmits(['updateCard', 'deleteCard', 'resetCard', 'uploadImage'])

  // methods
  const updateCard = () => {
    emit('updateCard')
  }
  const deleteCard = () => {
    modalDelete.value.show = !modalDelete.value.show
  }
  const confirmDelete = () => {
    emit('deleteCard')
  }
  const resetCard = () => {
    emit('resetCard')
  }
  const uploadImage = () => {
    emit('uploadImage', file.value)
  }

</script>
