<template>
    <carousel :slides="slides" :interval="3000" controls indicators></carousel>
  </template>
  
  <script>
  import Carousel from '/Users/deni-kun/Documents/v2/plastik/src/components/carousel/Carousel.vue';
  export default{
    name:"App",
    components: {Carousel},
    data: ()=>({
      slides : [
        {image: "https://picsum.photos/id/1032/900/400",
          header: "Mesurer la vision produit",
          paragraph: "La vision correspond à la raison d'être d'un produit, grâce à laquelle on sait identifier qui sont les clients ainsi que leurs besoins."
        },
        {image: "https://picsum.photos/id/1033/900/400",
          header: "Collaborer en Équipe",
          paragraph:"Collaborer en équipe correspond à la transparence, la confiance et la collaboration dans le travail entre les membres d'une équipe."
        },
        {image: "https://picsum.photos/id/1038/900/400",
          header:"Strategie Produit",
          paragraph: "Le e-diagnostic se déroule sur le thème Stratégie Produit."
        },
      ]
    })
  }
  </script>
  
  <style scoped>
  
  </style>