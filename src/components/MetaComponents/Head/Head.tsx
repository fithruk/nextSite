import Head from "next/head";

const SiteHead = () => {
  return (
    <Head>
      <title>Фитнес Тренер | Имя Фитнес Тренера</title>
      <meta
        name="description"
        content="Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей."
      />
      <meta
        name="keywords"
        content="фитнес, тренер, тренировки, здоровье, спорт, индивидуальные тренировки, программы питания"
      />
      <meta name="author" content="Имя Фитнес Тренера" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://yourwebsite.com/" />
      <meta property="og:title" content="Фитнес Тренер | Имя Фитнес Тренера" />
      <meta
        property="og:description"
        content="Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourwebsite.com/" />
      <meta
        property="og:image"
        content="https://yourwebsite.com/path/to/image.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Фитнес Тренер | Имя Фитнес Тренера" />
      <meta
        name="twitter:description"
        content="Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей."
      />
      <meta
        name="twitter:image"
        content="https://yourwebsite.com/path/to/image.jpg"
      />
    </Head>
  );
};

export default SiteHead;
