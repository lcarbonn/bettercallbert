<template>
    <form novalidate
          @submit.prevent>

        <md-card v-if="card">
            <md-card-header>
                <span class="md-title">{{mdTitle}}</span>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('title')">
                            <label for="title">Title</label>
                            <md-input name="title"
                                      id="title"
                                      v-model.trim="mdTitle"></md-input>
                            <span class="md-error"
                                  v-if="!$v.form.title.required">The title is required</span>
                            <span class="md-error"
                                  v-else-if="!$v.form.title.minlength">Invalid title</span>
                        </md-field>
                        <md-field :class="getValidationClass('src')">
                            <label for="src">Source</label>
                            <md-input name="src"
                                      id="src"
                                      v-model.trim="mdSrc"
                                      type="text"></md-input>
                            <span class="md-error"
                                  v-if="!$v.form.src.required">The src is required</span>
                        </md-field>
                        <md-field :class="getValidationClass('link')">
                            <label for="link">Link</label>
                            <md-input name="link"
                                      id="link"
                                      v-model.trim="mdLink"></md-input>
                        </md-field>
                        <md-button class="md-raised md-primary"
                                   type="submit"
                                   @click="saveCard">Save</md-button>
                        <md-button class="md-raised md-primary"
                                   type="submit"
                                   @click="cancelCard">Cancel</md-button>
                    </div>
                </div>
            </md-card-content>
            <md-card-media>
                <img :title="card.title"
                     :alt="card.title"
                     :src="src">
            </md-card-media>
        </md-card>
        <md-snackbar :md-active.sync="showSnackbar">
            <span>{{ error }}</span>
        </md-snackbar>
    </form>
</template>

<script>

import { validationMixin } from 'vuelidate'
import {
    required,
    minLength
} from 'vuelidate/lib/validators'

export default {
    name: 'CardForm',
    mixins: [validationMixin],

    props: {
        card: {
            type: Object,
            default: null
        },
        src: {
            type: String,
            default: null
        }
    },
    data: () => ({
        form: {
            title: null,
            src: null,
            // idTheme: null,
            link: null,
            // isRotate: null,
        },
        error: '',
        showSnackbar: false,
        lastCard: null
    }),
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(3)
            },
            src: {
                required,
                minLength: minLength(3)
            },
            link: {
            }
        }
    },
    updated() {
        this.lastCard = this.card
    },
    computed: {
        // due to unmutable props, new v-model for validation
        mdTitle: {
            get() {
                this.$v.form.title.$model = this.card.title
                return this.card.title
            },
            set(value) {
                this.card.title = value
                this.form.title = value
                this.$v.form.title.$touch()
            }
        },
        mdLink: {
            get() {
                this.$v.form.link.$model = this.card.link
                return this.card.link
            },
            set(value) {
                this.form.link = value
                this.$v.form.link.$touch()
            }
        },
        mdSrc: {
            get() {
                this.$v.form.src.$model = this.src
                return this.src
            },
            set(value) {
                this.form.src = value
                this.$v.form.src.$touch()
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        saveCard() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.$emit('saveCard', {
                    "title": this.form.title,
                    "src": this.form.src,
                    "link": this.form.link
                })
            }
        },
        cancelCard() {
            this.mdTitle = this.lastCard.title;
            this.mdLink = this.lastCard.link;
            this.mdSrc = this.src;
            // this.$store.dispatch("cards/setCard", this.card);
            // this.$store.dispatch("cards/setSrc", this.src);
        }
    }
}
</script>
