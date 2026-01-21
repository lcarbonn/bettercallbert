<template>
  <div>
    <DomainCardsList :cards="cards"/>
    <UiScrollObserver :loading="loading" :has-more="hasMore" @load-more="loadMore"/>
  </div>
</template>

<script setup lang="ts">

  const id:number = Number(useRoute().params.id).valueOf()
  const cards = ref<ICard[]>([])

  // inital calls
  const filter = ref<Filter>()
  filter.value = {}
  filter.value.theme = id

  // scroll pagination management
  const loading = ref(false)
  const hasMore = ref(true)
  const pagination = ref<Pagination>({
    pageIndex : 0,
    pageSize : 15
  })

  // Loading data or more data
  const loadMore = async () => {
    if (loading.value || !hasMore.value) return
    
    loading.value = true
    
    try {
      // call scroll
      const response = await scrollCards(pagination.value, filter.value)
      cards.value.push(...response.results)
      pagination.value.pageIndex++

      // shall we stop scrolling ?
      if (response.next === null) {
        hasMore.value = false
      }
    } catch (error) {
      console.error('Error on loading cards:', error)
    } finally {
      loading.value = false
    }
  }

  // Initial load
  loadMore()

</script>