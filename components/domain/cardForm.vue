<template>
    <b-card v-if="selectedCard"
            bg-variant="secondary"
            header-bg-variant="primary"
            img-bottom
            align="center">
        <b-card-body>
            <p hidden>{{ card.id }}</p>
            <b-container fluid>
                <b-row>
                    <b-col lg="12"
                           class="my-1">
                        <b-form-group label="Title"
                                      label-for="title"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <b-input-group size="sm">
                                <b-form-input id="title"
                                              v-model="selectedCard.title"
                                              trim
                                              :state="titleState"
                                              placeholder="Set the card title"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12"
                           class="my-1">
                        <b-form-group label="Image Source"
                                      label-for="src"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <b-input-group size="sm">
                                <b-form-input id="src"
                                              v-model="selectedCard.src"
                                              trim
                                              :state="srcState"
                                              placeholder="Set the card image src"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12"
                           class="my-1">
                        <b-form-group label="Image file"
                                      label-for="imageFile"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <b-input-group class="mb-0">
                                <b-form-file id="imageFile"
                                             v-model="imageFile"
                                             accept="image/png, image/jpeg"
                                             placeholder="Choose a file or drop it here..."
                                             drop-placeholder="Drop file here..."></b-form-file>
                                <b-input-group-append>
                                    <b-button id="uploadButton"
                                              variant="primary"
                                              :disabled="!Boolean(imageFile)"
                                              @click="uploadImageFile()">
                                        <b-icon icon="upload"></b-icon>
                                    </b-button>
                                    <b-tooltip target="uploadButton"
                                               triggers="hover">Upload file</b-tooltip>

                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12"
                           class="my-1">
                        <b-form-group label="Link"
                                      label-for="link"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <b-input-group size="sm">
                                <b-form-input id="link"
                                              v-model="selectedCard.link"
                                              trim
                                              placeholder="Set the card link"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12"
                           class="my-1">
                        <b-form-group label="Theme"
                                      label-for="idTheme"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <b-input-group size="sm">
                                <b-form-select id="idTheme"
                                               v-model="selectedCard.idTheme"
                                               :options="themeOptions">
                                    <template #first>
                                        <b-form-select-option :value="null"
                                                              disabled>-- Select a theme --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12"
                           class="my-1">
                        <b-button @click="saveCard"
                                  :disabled="!Boolean(srcState && titleState)"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Save"><b-icon icon="save" /></b-button>
                        <b-button @click="deleteCard"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Delete"><b-icon icon="trash" /></b-button>
                        <b-button @click="resetCard"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Reset"><b-icon icon="arrow-counterclockwise" /></b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12"
                           class="my-1">
                        <b-card v-if="card"
                                bg-variant="secondary"
                                text-variant="white"
                                header-bg-variant="primary"
                                img-bottom
                                align="center">
                            <template #header>
                                <small>{{ selectedCard.title }}</small>
                            </template>
                            <b-card-body>
                                <b-button v-if="selectedCard.link"
                                          :href="selectedCard.link"
                                          target="_blank"
                                          variant="primary">Jump to source</b-button>
                            </b-card-body>
                            <b-card-img v-if="imageUrl"
                                        :src="imageUrl"
                                        :alt="selectedCard.title"
                                        class="b-card-img"></b-card-img>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-card-body>
    </b-card>
</template>

<script>
import { BIcon, BIconUpload, BIconSave, BIconArrowCounterclockwise, BIconTrash } from 'bootstrap-vue'

export default {
    name: 'CardForm',

    components: {
        BIcon,
        BIconUpload,
        BIconSave,
        BIconArrowCounterclockwise,
        BIconTrash
    },

    props: {
        card: {
            type: Object,
            default: null
        },
        imageUrl: {
            type: String,
            default: null
        },
        themes: {
            type: Array,
            default: null
        },
        imagePath: {
            type: String,
            default: null
        }
    },
    data: () => ({
        selectedCard: null,
        imageFile: null
    }),
    watch: {
        // to copy card for mutation constraints
        card(newCard, oldCard) {
            if (!this.selectedCard && newCard) {
                this.selectedCard = JSON.parse(JSON.stringify(newCard))
            }
        },
        imagePath(newImg, oldImg) {
            this.selectedCard.src = newImg
        }
    },
    computed: {
        titleState() {
            return (this.selectedCard.title != null && this.selectedCard.title != "") ? true : false
        },
        srcState() {
            return (this.selectedCard.src != null && this.selectedCard.src != "") ? true : false
        },
        themeOptions() {
            return this.genThemeOptions(this.themes)
        }
    },
    methods: {
        saveCard() {
            this.$emit('saveCard', {
                "title": this.selectedCard.title,
                "src": this.selectedCard.src,
                "link": this.selectedCard.link,
                "idTheme": this.selectedCard.idTheme
            })
        },
        resetCard() {
            this.selectedCard.title = this.card.title
            this.selectedCard.link = this.card.link
            this.selectedCard.src = this.card.src
            this.selectedCard.idTheme = this.card.idTheme
            this.selectedCard.imageFile = this.card.imageFile
            this.$emit('resetImagePath')
        },
        deleteCard() {
            this.$bvModal.msgBoxConfirm('Really ?', {
                title: 'Delete Card',
                centered: true
            }).then(value => {
                if (value == true) this.$emit("deleteCard", this.selectedCard)
            })
        },
        uploadImageFile() {
            console.debug(this.imageFile.name)
            this.$emit("uploadImageFile", this.imageFile)
        },
        genThemeOptions(themes) {
            const opts = []
            if (themes) themes.forEach(theme => {
                opts.push(
                    { value: theme.id, text: theme.title }
                )
            })
            return opts
        }
    }
}
</script>

<style scoped>
.b-card-img {
    width: unset;
    max-height: 100vh;
    max-width: 100%;
}

@media (max-width: 400px) {
    .b-card-img {
        width: unset;
        max-height: 60vh;
        max-width: 100%;
    }
}
</style>
