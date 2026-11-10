export const site = {
  name: "Faiza",
  roles: [
    "Social Media Marketer",
    "SEO Specialist",
    "Website Developer",
    "MS Office Expert",
  ],
  tagline:
    "Political Science graduate who turns ideas into online growth through marketing, SEO and web development.",
  about:
    "Hello! I'm Faiza, a Master's graduate in Political Science with a passion for the digital world. I combine analytical thinking from my academic background with practical skills in social media marketing, SEO, website development and MS Office. I enjoy helping brands and people grow online by building clean websites, creating engaging content and improving search visibility.",
  education: {
    degree: "Masters in Political Science",
    note: "Strong research, analysis and communication skills, now applied to digital marketing and web development.",
  },
  stats: [
    { value: 4, suffix: "", label: "Core Skills" },
    { value: 1, suffix: "", label: "Masters Degree" },
    { value: 4, suffix: "", label: "Projects" },
  ],
  // NOTE: levels apni marzi se adjust karen
  skills: [
    { name: "Social Media Marketing", level: 85 },
    { name: "SEO", level: 80 },
    { name: "Website Development", level: 75 },
    { name: "MS Office", level: 90 },
  ],
  services: [
    { icon: "📱", title: "Social Media Marketing", text: "Content planning, posting and growing your brand's audience." },
    { icon: "🔍", title: "SEO", text: "Keyword research and optimization to rank higher on Google." },
    { icon: "💻", title: "Website Development", text: "Modern, responsive and fast websites for your business." },
    { icon: "📊", title: "MS Office", text: "Professional Word, Excel and PowerPoint documents and reports." },
  ],
  email: "",   // <- apni email yahan likhen (Footer + SEO use karega)
  url: "",     // <- live site URL, e.g. https://faiza.dev
  social: {
    linkedin: "https://www.linkedin.com/in/faiza-manzoor-b835012b8/",
    github: "https://github.com/Fizza321",
  },
};

/* ---------- Navbar ke liye ---------- */
// Har item mein dono naming rakhi hain (label/name, to/path/href),
// taake Navbar jo bhi field use kare, undefined na aaye.
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Skills", path: "/#skills" },
  { label: "Services", path: "/#services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

/* ---------- Projects ---------- */
// "result" mein sirf wohi likhen jo sach ho (khali chhoden to nahi dikhega).
// "link" mein live website ka link likhen (khali ho to button nahi dikhega).
export const projects = [
  {
    title: "Social Media Ads Campaigns",
    problem: "The business needed more reach and sales but had no structured paid-social strategy.",
    solution: "Planned targeted Facebook & Instagram campaigns with audience segmentation and creatives built for conversions.",
    category: "Social Media Marketing",
    icon: "📱",
    description:
      "Ran paid social media ad campaigns and generated sales for the business through targeted audiences and engaging creatives.",
    tags: ["Facebook Ads", "Instagram Ads", "Lead Generation", "Sales"],
    result: "",
    link: "",
  },
  {
    title: "Services-Based Website",
    problem: "Visitors couldn't quickly understand what the business offers or how to get in touch.",
    solution: "Designed a clear, responsive, SEO-friendly site with defined service sections and a visible contact path.",
    category: "Website Development",
    icon: "🛠️",
    description:
      "Designed and developed a professional services website that presents the business offerings clearly and helps visitors get in touch.",
    tags: ["Web Development", "Responsive", "SEO"],
    result: "",
    link: "",
  },
  {
    title: "E-commerce Website",
    problem: "Customers had no easy way to browse products and order online.",
    solution: "Built a responsive online store with a browsable catalogue and a simple ordering flow.",
    category: "Website Development",
    icon: "🛒",
    description:
      "Built an e-commerce website where customers can browse products and place orders online.",
    tags: ["E-commerce", "Web Development", "Responsive"],
    result: "",
    link: "",
  },
  {
    title: "One-Page Website",
    problem: "The client needed a fast, focused web presence without a multi-page build.",
    solution: "Created a clean single-scroll page that presents everything important with a clear call to action.",
    category: "Website Development",
    icon: "📄",
    description:
      "Created a clean, fast one-page website that presents everything important in a single scroll.",
    tags: ["Landing Page", "Web Development", "Responsive"],
    result: "",
    link: "",
  },
];

export default site;