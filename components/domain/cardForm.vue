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

    <!-- <form novalidate
          @submit.prevent>
        <md-card v-if="card">
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('title')">
                            <label for="title">Title</label>
                            <md-input name="title"
                                      id="title"
                                      v-model.trim="form.title"></md-input>
                            <md-icon>title</md-icon>
                            <span class="md-error"
                                  v-if="!$v.form.title.required">The title is required</span>
                            <span class="md-error"
                                  v-else-if="!$v.form.title.minlength">Invalid title</span>
                        </md-field>
                        <md-field :class="getValidationClass('src')">
                            <label for="src">Source</label>
                            <md-input name="src"
                                      id="src"
                                      v-model.trim="form.src"
                                      type="text"></md-input>
                            <md-icon>image</md-icon>
                            <span class="md-error"
                                  v-if="!$v.form.src.required">The src is required</span>
                        </md-field>
                        <md-field :class="getValidationClass('imageFile')">
                            <label for="imageFile">Upload Image</label>
                            <md-input :disabled="disableButton"
                                      type="file"
                                      accept="image/png, image/jpeg"
                                      name="imageFile"
                                      id="imageFile"
                                      v-model="form.imageFile"
                                      @change.prevent="selectImageFile($event.target.files)" />
                            <md-button class="md-icon-button"
                                       :disabled="file==null"
                                       @click="uploadImageFile()">
                                <md-icon>file_upload</md-icon>
                            </md-button>
                            <md-input type="hidden"
                                      v-model="imagePath"></md-input>
                        </md-field>
                        <md-field :class="getValidationClass('link')">
                            <label for="link">Link</label>
                            <md-input name="link"
                                      id="link"
                                      v-model.trim="form.link"></md-input>
                            <md-icon>link</md-icon>
                        </md-field>
                        <md-field :class="getValidationClass('idTheme')">
                            <label for="idTheme">Theme</label>
                            <md-select v-model="form.idTheme"
                                       name="idTheme"
                                       id="idTheme">
                                <md-option v-for="item in themes"
                                           :key="item.id"
                                           :value="item.id">{{ item.title }}</md-option>
                            </md-select>
                            <md-icon>book</md-icon>
                            <span class="md-error"
                                  v-if="!$v.form.idTheme.required">The Theme is required</span>
                        </md-field>
                        <md-button :disabled="disableButton"
                                   class="md-raised md-primary"
                                   type="submit"
                                   @click="saveCard">Save</md-button>
                        <md-button :disabled="disableButton"
                                   class="md-raised md-primary"
                                   type="submit"
                                   @click="resetCard">Cancel</md-button>
                        <md-dialog-confirm :md-active="showConfirm"
                                           md-title="Confirm card deletion?"
                                           md-content="This is your last chance!!!"
                                           md-confirm-text="Yes"
                                           md-cancel-text="No"
                                           @md-cancel="onCancel"
                                           @md-confirm="onConfirm" />
                        <md-button :disabled="disableButton"
                                   class="md-raised md-primary"
                                   @click="showConfirm = true">Delete</md-button>
                    </div>
                </div>
            </md-card-content>
            <md-divider></md-divider>
            
            <md-card-header>
                <span class="md-title">{{form.title}}</span>
            </md-card-header>
            <md-card-actions md-alignment="space-between">
                <md-button v-if="form.link"
                           :href="form.link"
                           target="_blank"
                           class="md-primary">Jump to source</md-button>
            </md-card-actions>
            <md-card-media>
                <img v-if="img"
                     :title="card.title"
                     :alt="card.title"
                     :src="img">
            </md-card-media>
        </md-card>
    </form> -->
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
        }
    },
    beforeUpdate() {
        if (this.imagePath != null) {
            this.form.src = this.imagePath
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
