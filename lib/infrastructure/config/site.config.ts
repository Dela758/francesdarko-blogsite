export const siteConfig = {
  name: "Frances Darko",
  tagline: "On the quiet art of observation.",
  description:
    "Exploring the subtle architectures of daily life, memory, and the unspoken spaces between words. A collection of thoughts on living deliberately in a noisy world.",
  url: "https://www.francesdarko.com",
  author: "Frances Darko",
  email: "francesndarko@gmail.com",
  social: {
    instagram: "https://www.instagram.com/cesi_the_solutionist?igsh=Y25mZ3E5NThuOG9k&igsi=Y25mZ3E5NThuOG9k",
    substack: "https://substack.com/@francesthesolutionist?utm_source=share&utm_medium=android&r=7u7408",
    linkedin: "https://www.linkedin.com/in/frances-nakkie-d-502564306?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  giscus: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "francesicodes/francesdarko-blogsite",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_kgDOTxgJIQ",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDOTxgJIc4DC4sN",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Cesi's Ponderings✨", href: "/essays" },
    { label: "About", href: "/about" },
    { label: "Newsletter", href: "/contact" },
  ],
} as const;
