<template>
    <div class="detail"
         v-if="card">
        <div class="navigate">
            <span v-if="previousId"
                  class="paginate">
                <nuxt-link :to="'/cards/'+previousId">Prev.</nuxt-link>
            </span>
            <span v-if="!previousId"
                  class="paginate">&nbsp;&nbsp;</span>
            <span v-if="nextId"
                  class="paginate">
                <nuxt-link :to="'/cards/'+nextId">Next</nuxt-link>
            </span>
            <span v-if="nextId==null"
                  class="paginate">&nbsp;&nbsp;</span>
        </div>
        <div v-if="card"
             class="cardItem"
             :class="color">
            <span>{{card.title}}</span>
            <img v-if="src"
                 class="image"
                 :alt="card.title"
                 :title="card.title"
                 :class="{ rotate: card.isRotate }"
                 :src="src" />
            <span v-if="card.link"><a :href="card.link"
                   target="_blank">Jump to source</a></span>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        card: {
            type: Object,
            default: null
        },
        nextId: {
            type: String,
            default: null
        },
        previousId: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: ""
        },
        src: {
            type: String,
            default: null
        }
    },
}

</script>

<style scoped>
.detail {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    color: grey;
}

.navigate {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.cardItem {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 1px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    color: white;
    width: 100%;
}

.themeone {
    background-color: rgb(245, 150, 126);
}
.themetwo {
    background-color: rgb(103, 200, 198);
}
.themethree {
    background-color: rgb(178, 209, 127);
}

.theme:hover {
    background-color: white;
    color: black;
}

.image {
    padding: 10px;
    max-width: 100%;
    object-fit: contain;
}

.rotate {
    transform: rotate(90deg);
}

.paginate {
    padding: 5px;
}

a {
    font-size: 1rem;
    letter-spacing: 0px;
    text-decoration: none !important;
    color: grey;
}

a:hover {
    color: white;
}

/* Medium screens */
@media all and (max-width: 800px) {
    .rotate {
        width: 70%;
        transform: rotate(90deg);
    }
}
</style>
