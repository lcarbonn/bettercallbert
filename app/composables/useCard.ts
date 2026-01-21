/**
 * Get all cards
 * @returns Cards
 */
export const scrollCards = async (pagination:Pagination, filter?:Filter) :Promise<IBaserowListResponse>=> {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/?user_field_names=true`;
  const queryBase = {
      page: pagination.pageIndex?pagination.pageIndex+1:1,
      size: pagination.pageSize?pagination.pageSize:100,
      order_by: '+Theme,+Id',
    }
    const queryFilters = new BaserowFilterBuilder()
    if(filter) {
      queryFilters.add("Title", "contains", filter.title)
      queryFilters.add("Theme", "link_row_has", filter.theme)
    }
  
  const query = Object.assign({}, queryBase, queryFilters.toJSON())
  const responseData = await $api(endpoint, {
    method: "GET",
    query: query
  });
  const respList = responseData as IBaserowListResponse
  const cards:ICard[] = []
  respList.results.forEach(raw => {
    const card = new Card(raw)
    cards.push(card)
  })
  respList.results = cards
  return respList
}

/**
 * get the card
 */
export const getCard = async (id:number) :Promise<ICard> => {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/${id}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"GET",
      });
  const item = new Card(raw)

  return item
}

/**
 * Update the card
 */
export const updateCard = async (card:ICard) :Promise<ICard> => {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/${card.id}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"PATCH",
        body: JSON.stringify(card.toRaw())
      });
  const item = new Card(raw)

  return item
}

/**
 * Delete the card
 */
export const deleteCard = async (id:number) :Promise<void> => {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/${id}/`
  const raw = await $api(endpoint, {
        method:"DELETE",
      });
  return
}

/**
 * Create thecard
 */
export const createCard = async (card:ICard) :Promise<ICard> => {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"POST",
        body:JSON.stringify(card.toRaw()),
      });
  const item = new Card(raw)
  return item
}
