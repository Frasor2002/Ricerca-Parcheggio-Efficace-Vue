<script setup>
import { onMounted, ref } from 'vue';
import { responseFeedback, errorFeedback, fetch_get_feedback} from '../states/feedback.js'
    
const token = ref(null);

onMounted(() => {
        token.value = localStorage.getItem('token');
        if (token.value){
            fetch_get_feedback(token.value);
        }
    });

</script>

<template>
    <h1 class="d-flex justify-center">I miei feedback:</h1>
    <div v-if="token" class="Feedback">
        <div v-if="errorFeedback" class="d-flex justify-center"><h2> {{ errorFeedback }}</h2></div>
        <div v-else-if="!responseFeedback" class="d-flex justify-center ma-10"><v-progress-circular indeterminate></v-progress-circular></div>
        <div v-else class=" justify-center">
            <div v-for="p in responseFeedback.value" :key="p._id" class="d-flex justify-center">
                <router-link v-if="p._id !== undefined" :to="{name: 'dettaglipark', params: {parcheggioId: p.parcheggioId}}" style="text-decoration: none; color: inherit;">
                <v-card variant="outlined" flat class="pa-6 ma-2" >
                    <h3>Rating:</h3>
                    <v-rating readonly
                    v-model="p.rating"
                    active-color="blue"
                    color="orange-lighten-1"
                    ></v-rating>
                    <p>Parcheggio: {{ p.nomeParcheggio }}</p>
                    <p>Da: {{ p.utenteMail }}</p>
                    <p> {{ p.testoFeedback }}</p>
                </v-card>
                </router-link>
            </div>
        </div>    
    </div>
    <div v-else class="d-flex justify-center"><h2>Effettua il login per accedere alla risorsa.</h2></div>
</template>
