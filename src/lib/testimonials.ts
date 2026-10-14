export interface Testimonial {
  name: string;
  company?: string;
  rating: number;
  content: string;
  platform: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Scott Wade",
    company: "ACD of Lancashire Ltd",
    rating: 5,
    content:
      "Really happy with our service so far from Carlos and the staff. Very professional from start to finish with our new website, now looking forward to them helping us promoting our website , would definitely recommend these guys , Acd of Lancashire ltd",
    platform: "Google Review",
  },
  {
    name: "Beenoir",
    company: "The Bee Noir Manchester Team",
    rating: 5,
    content:
      "Dear Hivebyte Manchester Team,\n\nOn behalf of Bee Noir Manchester, I want to express our sincere thanks for the excellent website you created for us. We are absolutely thrilled with the final result! The design is stunning and the site is incredibly user-friendly. It perfectly captures the spirit of our project.\nThank you for your professionalism, creativity and support.",
    platform: "Google Review",
  },
  {
    name: "Martin Unsworth",
    company: "OCVS Limited",
    rating: 5,
    content:
      "To Carlos and the team at Hivebyte , thank you for supporting our journey to completion of OCVS Limited's new website. You have really gone the extra mile with our tricky requirements - Martin",
    platform: "Google Review",
  },
  {
    name: "Tina Waterfall",
    rating: 5,
    content:
      "I've had a fantastic experience working with this marketing and web design agency in Manchester. From the initial consultation through to delivery, the team were professional, knowledgeable and genuinely invested in helping our business grow. I would highly recommend them to any business looking to improve their online presence and generate more leads. A great team and a pleasure to work with. Thank you.",
    platform: "Google Review",
  },
  {
    name: "J Astro",
    rating: 5,
    content:
      "Really helped our small business by building us a website that catered to all our requirements. Previously we tried to use templates that just didn't have the functionality we needed, Hivebyte built us a website that absolutely works for us, now our process is seamless and a much better experience for our customers.",
    platform: "Google Review",
  },
  {
    name: "Mrs NI",
    rating: 5,
    content:
      "I couldn't have asked for a better web designer. Hivebyte went over and beyond my expectations, delivered much more than i had expected. I previously had a bad experience with a web designer and was a bit sceptical at first but i am so pleased with the website. Thank you Hivebyte for all your hard work and patience!!!! Thank you :)",
    platform: "Google Review",
  },
];
