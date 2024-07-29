<template>
<div class="container">
    <div class="left-column">
        <h1>Merci pour la complétion</h1>
        <h2>Et la suite ?</h2>
        <p>Il n’y a plus qu’à être patient ! Vous serez recontacté dans les prochaines 48h pour analyser vos résultats et pour vous proposer des solutions.</p>
    </div>
    <div class="right-column">
        <img src="/Users/deni-kun/Documents/v2/plastik/src/assets/complete.png" alt="">
    </div>
</div>
</template>

<script setup>
</script>

<style scoped>

.container {
    display: flex;
    width: auto;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.right-column {
    width: 66.67vw ;
    background: linear-gradient(135deg, #e3b0ff, #a1c4fd);
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-column {
    width: 33.33vw;
    background-color: #ffffff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

h2{
    text-align: justify;
}

p{
    text-align: justify;
}

img {
    max-width: 100%;
    height: auto;
}
</style>