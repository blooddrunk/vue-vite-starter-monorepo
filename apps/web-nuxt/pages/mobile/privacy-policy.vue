<template>
  <article class="article">
    <section class="prose prose-xl">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor
        id eu nisl nunc. Senectus et netus et malesuada fames ac turpis egestas
        integer. Quam pellentesque nec nam aliquam. Adipiscing elit pellentesque
        habitant morbi tristique senectus et netus et. Sollicitudin nibh sit
        amet commodo nulla facilisi nullam vehicula ipsum. Vitae turpis massa
        sed elementum tempus egestas sed sed. Dui nunc mattis enim ut tellus
        elementum sagittis vitae. In egestas erat imperdiet sed euismod nisi.
        Elementum nibh tellus molestie nunc. Vel orci porta non pulvinar. Nulla
        aliquet enim tortor at. Placerat vestibulum lectus mauris ultrices eros
        in cursus. Turpis massa tincidunt dui ut ornare lectus sit amet est.
        Imperdiet proin fermentum leo vel orci porta non pulvinar. Nunc aliquet
        bibendum enim facilisis gravida neque convallis. Amet tellus cras
        adipiscing enim eu turpis egestas. Dolor sed viverra ipsum nunc aliquet
        bibendum. Et molestie ac feugiat sed lectus vestibulum.
      </p>
      <p>
        Aliquet risus feugiat in ante metus dictum at. Velit laoreet id donec
        ultrices tincidunt arcu. Lobortis elementum nibh tellus molestie nunc.
        Morbi leo urna molestie at elementum eu. Elementum nibh tellus molestie
        nunc non blandit massa enim nec. Elementum integer enim neque volutpat.
        Proin sed libero enim sed faucibus turpis. Mauris sit amet massa vitae
        tortor condimentum lacinia. Ornare quam viverra orci sagittis eu
        volutpat odio. Sed velit dignissim sodales ut eu sem integer. Sit amet
        dictum sit amet justo donec enim diam vulputate. Commodo odio aenean sed
        adipiscing diam.
      </p>
      <p>
        Etiam sit amet nisl purus. Ut etiam sit amet nisl purus in mollis. Nibh
        sit amet commodo nulla facilisi nullam vehicula. Sit amet purus gravida
        quis. Nisl nisi scelerisque eu ultrices vitae. At risus viverra
        adipiscing at in tellus integer feugiat. Id consectetur purus ut
        faucibus. Pellentesque dignissim enim sit amet venenatis urna cursus
        eget nunc. Nam at lectus urna duis convallis convallis tellus id. Mattis
        ullamcorper velit sed ullamcorper. Dui sapien eget mi proin sed libero
        enim. Et malesuada fames ac turpis.
      </p>
      <p>
        Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Nec
        feugiat nisl pretium fusce id velit. Id nibh tortor id aliquet lectus
        proin nibh nisl condimentum. Fames ac turpis egestas integer eget
        aliquet nibh. Vulputate sapien nec sagittis aliquam malesuada bibendum
        arcu vitae. Aliquam ut porttitor leo a diam sollicitudin. Et tortor
        consequat id porta nibh venenatis cras. Aliquet porttitor lacus luctus
        accumsan tortor. Dui faucibus in ornare quam viverra. Donec massa sapien
        faucibus et molestie ac feugiat sed lectus. Enim sed faucibus turpis in
        eu mi bibendum. Fames ac turpis egestas sed tempus urna. Sollicitudin
        nibh sit amet commodo nulla facilisi nullam. Consequat interdum varius
        sit amet mattis vulputate enim nulla aliquet.
      </p>
      <p>
        Sed risus ultricies tristique nulla aliquet. Maecenas pharetra convallis
        posuere morbi leo urna. Mattis rhoncus urna neque viverra justo nec
        ultrices. Tincidunt dui ut ornare lectus sit amet est placerat. Augue ut
        lectus arcu bibendum at varius vel. Lacus vel facilisis volutpat est
        velit. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque.
        Montes nascetur ridiculus mus mauris. Consectetur purus ut faucibus
        pulvinar elementum. Tincidunt arcu non sodales neque sodales. Et
        ultrices neque ornare aenean euismod elementum nisi quis. Faucibus a
        pellentesque sit amet porttitor eget dolor morbi. Commodo sed egestas
        egestas fringilla. Quam elementum pulvinar etiam non. At auctor urna
        nunc id cursus metus. Lobortis scelerisque fermentum dui faucibus.
      </p>
    </section>

    <footer class="mt-8 text-center">
      <van-button class="w-11/12" type="primary" round @click="navBack">
        我已阅读
      </van-button>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

definePage({
  meta: {
    layout: 'navbar',
    title: '隐私政策',
    requiresAuth: false,
    canNavBack: true,
  },
});

const router = useRouter();
const navBack = () => {
  router.back();
};
</script>
