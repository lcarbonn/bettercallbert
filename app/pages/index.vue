<template>
  <div>
    <DomainCardsList :cards="cards"/>
    <UiScrollObserver :loading="loading" :has-more="hasMore" @load-more="loadMore"/>
  </div>    
</template>

<script setup lang="ts">

  // list of cards
  const cards = ref<ICard[]>([])

  // filter management
  const filter = ref<Filter>()
  const searchText = useSearchText()
  filter.value = {}
  filter.value.title = searchText.value?searchText.value:undefined

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

  // listening to search card
  watch(() => searchText.value, async (text) => {
    // reset cards, pagination and scroll
    pagination.value.pageIndex = 0
    hasMore.value = true
    cards.value = []
    // add filter on title
    filter.value = {}
    filter.value.title = text
    loadMore()
  })

</script>