<template>
    <form novalidate
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
                            <span class="md-error"
                                  v-if="!$v.form.src.required">The src is required</span>
                        </md-field>
                        <md-field :class="getValidationClass('link')">
                            <label for="link">Link</label>
                            <md-input name="link"
                                      id="link"
                                      v-model.trim="form.link"></md-input>
                        </md-field>
                        <md-field :class="getValidationClass('idTheme')">
                            <label for="idTheme">Theme</label>
                            <md-select disabled
                                       v-model="form.idTheme"
                                       name="idTheme"
                                       id="idTheme">
                                <md-option v-for="item in themes"
                                           :key="item.id"
                                           :value="item.id">{{ item.title }}</md-option>
                            </md-select>
                            <span class="md-error"
                                  v-if="!$v.form.idTheme.required">The Theme is required</span>
                        </md-field>
                        <md-button class="md-raised md-primary"
                                   type="submit"
                                   @click="saveCard">Save</md-button>
                        <md-button class="md-raised md-primary"
                                   type="submit"
                                   @click="resetCard">Cancel</md-button>
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
                <img v-if="src"
                     :title="card.title"
                     :alt="card.title"
                     :src="src">
            </md-card-media>
        </md-card>
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
            idTheme: null,
            link: null,
            // isRotate: null,
        },
        firstLoad: true
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
            idTheme: {
                required
            },
            link: {
            },
        }
    },
    mounted() {
        this.$store.dispatch("themes/getThemes")
    },
    beforeUpdate() {
        if (this.firstLoad) {
            this.resetCard()
            this.firstLoad = false
        }
    },
    computed: {
        themes() {
            return this.$store.getters['themes/themes']
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
                    "link": this.form.link,
                    "idTheme": this.form.idTheme
                })
            }
        },
        resetCard() {
            this.form.title = this.card.title;
            this.form.link = this.card.link;
            this.form.src = this.card.src;
            this.form.idTheme = this.card.idTheme;
        }
    }
}
</script>
