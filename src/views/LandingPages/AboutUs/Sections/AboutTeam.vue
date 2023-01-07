<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import Khant from "@/assets/img/kmt2.jpg";
import kyi from "@/assets/img/kyiminkhant.jpg";
import aung from "@/assets/img/aunghtet.jpg";
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            The Executive Team
          </h3>
          <p class="text-white opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="Khant"
            :profile="{ name: 'Khant Min Thu', link: 'javascript:;' }"
            :position="{ label: 'Full Stack Developer', color: 'success' }"
            description="A full-stack developer is a developer or engineer who can build both the front end and the back end of a website."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="kyi"
            :profile="{ name: 'Kyi Min Khant', link: 'javascript:;' }"
            :position="{ label: 'Full Stack Developer', color: 'success' }"
            description="A full-stack developer is a developer or engineer who can build both the front end and the back end of a website."
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-3 col-12">

        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="aung"
            :profile="{ name: 'Aung Htet', link: 'javascript:;' }"
            :position="{ label: 'Full Stack Developer', color: 'success' }"
            description="A full-stack developer is a developer or engineer who can build both the front end and the back end of a website."
          />
        </div>

      </div>
    </div>
  </section>
</template>
