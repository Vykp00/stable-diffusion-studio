AOS.init();

//  Work experience cards

const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "Machine Learning Engineering (MLOps) Mentor",
    cardImage: "assets/images/experience-page/deep-learning-ai.png",
    place: "DeepLearning.AI, Finland",
    time: "(Jan, 2023 - Present)",
    desp: "<li>Support learners and communicate between Mentors/Staff</li> <li>Report and solve any technical issues found by Learners or Mentors on Gitissue</li> <li>Alpha Tester for new courses and coding projects</li>",
  },
  {
    title: "Marketing Coordinator",
    cardImage: "assets/images/experience-page/joensuu.jpg",
    place: "OSK North Karelia Folk Theater & Fingo ry, Finland",
    time: "(May, 2019 - Aug, 2021)",
    desp: "<li>Managed the organization's social media (Facebook, Instagram,  Twitter)</li> <li>Created digital marketing strategies</li> <li>Analyzed and resolved problems in marketing projects</li>",
  },
  {
    title: "Sales and Marketing Assistant",
    cardImage: "assets/images/experience-page/arbonaut.jpg",
    place: "Arbonaut, Finland",
    time: "(Feb, 2020 - May, 2021)",
    desp: "<li>Created a digital asset storage management system to improve the efficiency in digital marketing.</li> <li>Performed market research for new technological services.</li> <li>Supported the sales team in B2B project proposals.</li> <li>Created digital content (i.e social media posts, videos, etc.) and digital marketing promotion.</li> <li>Conducted thesis research in Risk Management.</li>",
  },
  {
    title: "Market Researcher",
    cardImage: "assets/images/experience-page/sencom.png",
    place: "Sencom, Finland",
    time: "(Oct, 2019 - Jan, 2020)",
    desp: "<li>Conducted market research on the Middle East Market for medical technologies</li><li>Contacted potential customers and partners</li><li>Maintained and optimized the Sencom's social medias</li>",
  },
  {
    title: "Project Manager",
    cardImage: "assets/images/experience-page/vipenglish.png",
    place: "VIP English (Global) Education, Vietnam",
    time: "(Apr - Aug, 2018)",
    desp: "<li>Administered projects within tight deadlines. </li><li>Analyzed customers' data to personalize services</li><li>Ensured data security in project development</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, cardImage, place, time, desp }) =>
      (output += `        
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400"> 
      <div class="card card1">
        <img src="${cardImage}" class="featured-image"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>
              ${desp}
            </ol>
          </header>
        </article>
      </div>
    </div>
      `)
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);


// Hackathon Section

const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [
  {
    title: "INVEST Winter School",
    subtitle: "Team-leader",
    image: "assets/images/experience-page/logo_invest_main_v2.jpg",
    desp: "The student explored AI applications in several sectors of urban environment to find and propose AI-assisted solutions for supporting regional sustainable development.",
    href: "https://www.invest-alliance.eu/",
  },
  {
    title: "Epic Challenge",
    subtitle: "Team-member",
    image: "assets/images/experience-page/epic-challenge.png",
    desp: "Epic Challenge is a 2 to 6-month program where students applied a problem solving method created by NASA astronaut Dr. Charles Camarda to creatively solve the complex challenges of Sustaining Humans on Mars",
    href: "http://www.epicchallengejoensuu.com/en/",
  },
  {
    title: "Innovate or Die",
    subtitle: "Team-member",
    image: "assets/images/experience-page/Logo-IOD.png",
    desp: "Innovate or die is a 48-hour hackathon for producing innovations, where goal-oriented students from different fields of studies come up with the most innovative solutions to real life business challenges.",
    href: "https://www.innovateordie.eu/",
  },
];

const showCards3 = () => {
  let output = "";
  mentor.forEach(
    ({ title, image, subtitle, desp, href }) =>
      (output += `  
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
            <img src="${image}" alt="">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
          <a href="${href}" class="blog-slider__button">Read More</a>    
        </div>
      </div>
      `)
  );
  hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);
