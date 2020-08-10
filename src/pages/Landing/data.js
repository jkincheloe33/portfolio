export default {
  about: {
    background: {
      titles: [
        'Josh Kincheloe. Josh Kincheloe.',
        'Interactive Developer. Interactive Developer.',
        'Josh Kincheloe. Josh Kincheloe.'
      ]
    },
    details: {
      copy: `I won't sit here and recite keywords like <span>responsive design</span> | <span>problem solver</span> | <span>attention to detail</span> etc etc. Those should all go without saying. Instead, I built this page to showcase some of the things I'm capable of. (Also why are we still talking about responsive design in 2020 like it's a feature and optional...)`,
      image: {
        alt: 'Josh overlooking Chicago skyline',
        src: './img/me2.JPG'
      }
    },
    meet: {
      copy: `Josh here. I'm a musician & developer currently <span>living</span> quarantining in Nashville. Married and father of two cats. I enjoy music, travel and the ocassional face mask. On a more technical note, I enjoy all things frontend, and love to create fun interactive experiences that bring pages to life.`,
      image: {
        alt: 'Josh in Chicago',
        src: './img/me3.jpg'
      },
      title: 'Hello, It Me.'
    }
  },
  caseStudies: {
    images: [
      './img/casestudies.png',
      './img/lpcorp.JPG',
      './img/joshkincheloe.png',
      './img/creeps.png',
      './img/nutrition-builder.JPG',
      './img/salata.JPG'
    ],
    slides: [
      {
        copy: `
          Here you can see some of the projects I've worked on and features I've built.<br />
          To navigate through the case studies, rotate and click the different sides of the cube below.
        `,
        title: 'Case Studies'
      },
      {
        copy: `
          This Color Picker feature I made was designed to help users see the what the different paint color options would look like on a piece of siding. The subtle amounts of interaction and animation is just enough to give the page some life and modernity, but it's not over the top for a primarily B to B company website.<br />
          <a href="https://lpcorp.com/products/exterior/siding-trim/products/overview" target="_blank">LpCorp.com</a>
        `,
        title: 'LP Corp'
      },
      {
        copy: `
          A React build showcasing some of my WebGL and interactive animation capabilities. This one page portfolio site was a lot of fun to create and continute to iterate off of.
        `,
        title: 'Josh Kincheloe'
      },
      {
        copy: `
          A release page I built for Nashville based artists, Glasslands. It features a simple line of text fading in and out with a "flashlight" cursor that reveals hidden pieces of information in the background.<br />
          <a href="https://Glasslands.co/creeps" target="_blank">Glasslands.co</a>
        `,
        title: 'Glasslands'
      },
      {
        copy: `
          This mini web application for Salata allows users to build their own custom salad and see the nutritional output from their selection. All ingredients used by Salata are represented here with their corresponding nutritional data. Once a user is finished building their salad, they can print or email their totals.<br />
          <a href="https://salata.com/nutrition" target="_blank">Nutrition Builder</a>
        `,
        title: 'Nutrition Builder'
      },
      {
        copy: `
          Lead Developer for chipotle style salad chain, Salata, rebrand and launch. Brand new custom site built using a headless Wordpress CMS with a React frontend.<br />
          <a href="https://salata.com" target="_blank">Salata.com</a>
        `,
        title: 'Salata'
      }
    ]
  },
  contact: {
    icons: [
      {
        image: {
          alt: 'Email icon',
          src: './img/mail.png'
        },
        link: 'mailto:jkincheloe33@gmail.com'
      },
      {
        image: {
          alt: 'LinkedIn icon',
          src: './img/linkedin.png'
        },
        link: 'https://www.linkedin.com/in/joshkincheloe/'
      }
    ]
  },
  hero: {
    title: '<span>interactive developer</span><br />Josh Kincheloe<br /><div />'
  }
};
