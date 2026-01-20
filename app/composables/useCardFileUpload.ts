/**
 * Use Card file upload
 */
export const useCardFileUpload = () => {

  /**
   * Téléverse un fichier vers Baserow
   * @param file - Le fichier à téléverser
   * @returns L'objet fichier Baserow avec l'URL et les métadonnées
   */
  const uploadFile = async (file: File) => {

    const { $api } = useNuxtApp();

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await $api('/api/user-files/upload-file/', {
        method: 'POST',
        body: formData
      })

      return response
    } catch (error) {
      console.error('Erreur lors du téléversement vers Baserow:', error)
      throw error
    }
  }

  const uploadFileToTable = async (file:File, cardId?:number) :Promise<ICard> => {

    const config = useRuntimeConfig();
    const CARD_TABLE_ID = config.public.tableCard;
    const { $api } = useNuxtApp();

    const endpoint = cardId?`/api/database/rows/table/${CARD_TABLE_ID}/${cardId}/?user_field_names=true`:`/api/database/rows/table/${CARD_TABLE_ID}/?user_field_names=true`;
    const method = cardId?"PATCH":"POST"
    const uploadedFile = await uploadFile(file)
    const card = {
      Image: [
        uploadedFile
      ]
    }

    const raw = await $api(endpoint, {
          method:method,
          body:JSON.stringify(card),
        });
    const item = new Card(raw)
    return item
  }

 return {
    uploadFile,
    uploadFileToTable,
  }
}