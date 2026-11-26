/* =========================================================
   Monjurul Islam Polash — site logic
   ========================================================= */
(function(){
"use strict";
document.documentElement.classList.add("js");

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const WA="8801723328481";
const wa=t=>"https://wa.me/"+WA+"?text="+encodeURIComponent(t);
const BN_DIGITS="০১২৩৪৫৬৭৮৯";
let lang=store.get("mip-lang","en");
const bnNum=s=>lang==="bn"?String(s).replace(/\d/g,d=>BN_DIGITS[d]):String(s);
const T=(en,bn)=>lang==="bn"&&bn?bn:en;

/* ---------------- DATA ---------------- */
const GROUPS=window.GROUPS||[];
const TOTAL=GROUPS.reduce((a,g)=>a+g.tools.length,0);

const ROLES={en:["Digital marketer","SEO specialist","Web developer","Virtual assistant","YouTube creator","Teacher"],
             bn:["ডিজিটাল মার্কেটার","এসইও বিশেষজ্ঞ","ওয়েব ডেভেলপার","ভার্চুয়াল অ্যাসিস্ট্যান্ট","ইউটিউব ক্রিয়েটর","শিক্ষক"]};

const ICON={
  mkt:'<path d="M3 10.5v3a1 1 0 0 0 1 1h2.5L12 19V5L6.5 9.5H4a1 1 0 0 0-1 1z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>',
  web:'<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9h18M10 13l-2 2 2 2M14 13l2 2-2 2"/>',
  seo:'<circle cx="10.5" cy="10.5" r="7"/><path d="M20.5 20.5l-5-5M7 12l2-2 2 2 3-3"/>',
  soc:'<circle cx="18" cy="5.5" r="2.8"/><circle cx="6" cy="12" r="2.8"/><circle cx="18" cy="18.5" r="2.8"/><path d="M8.5 13.4l7 3.8M15.5 6.8l-7 3.8"/>',
  va:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.4-2 2-5 2"/>',
  des:'<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>'
};
const SERVICES=[
 {i:"mkt",en:"Digital Marketing",bn:"ডিজিটাল মার্কেটিং",d:"Strategic campaigns that drive traffic, engagement and conversions for your business.",db:"আপনার ব্যবসার জন্য ট্রাফিক, এনগেজমেন্ট ও কনভার্সন বাড়ানোর কৌশলগত ক্যাম্পেইন।",tags:["Google Ads","Facebook marketing","Email marketing","PPC","Conversion optimization"]},
 {i:"web",en:"Web Development",bn:"ওয়েব ডেভেলপমেন্ট",d:"Custom, responsive websites and stores built with modern tools and best practices.",db:"আধুনিক টুল ও সেরা পদ্ধতিতে তৈরি কাস্টম, রেসপন্সিভ ওয়েবসাইট ও অনলাইন স্টোর।",tags:["Responsive design","E-commerce","CMS development"]},
 {i:"seo",en:"SEO",bn:"এসইও",d:"Climb search results and grow organic traffic with proven, honest SEO work.",db:"প্রমাণিত ও সৎ এসইও দিয়ে সার্চে উপরে উঠুন, অর্গানিক ট্রাফিক বাড়ান।",tags:["Keyword research","On-page SEO","Off-page SEO","Local SEO"]},
 {i:"soc",en:"Social Media Marketing",bn:"সোশ্যাল মিডিয়া মার্কেটিং",d:"Build your brand and engage your audience across every major platform.",db:"সব বড় প্ল্যাটফর্মে আপনার ব্র্যান্ড গড়ুন ও অডিয়েন্সের সাথে যুক্ত থাকুন।",tags:["Content creation","Community management","Social ads"]},
 {i:"va",en:"Virtual Assistance",bn:"ভার্চুয়াল অ্যাসিস্ট্যান্স",d:"Reliable support that keeps your daily business operations running smoothly.",db:"নির্ভরযোগ্য সাপোর্ট, যাতে আপনার দৈনন্দিন ব্যবসা নির্বিঘ্নে চলে।",tags:["Admin support","Customer service","Data management"]},
 {i:"des",en:"Graphic Design",bn:"গ্রাফিক ডিজাইন",d:"Logos, brand identity and clean interfaces that make you look established.",db:"লোগো, ব্র্যান্ড আইডেন্টিটি ও পরিচ্ছন্ন ইন্টারফেস, যা আপনাকে পেশাদার দেখায়।",tags:["Logo design","Brand identity","UI/UX design"]}
];

const PLATFORMS=[
 {n:"Fiverr",l:"fi",c:"#1dbf73",s:"Top Rated Seller",u:"https://www.fiverr.com/"},
 {n:"Upwork",l:"Up",c:"#14a800",s:"Top Freelancer",u:"https://www.upwork.com/freelancers/~01e2a611d178fd578d"},
 {n:"PeoplePerHour",l:"PPH",c:"#3f6dff",s:"5.0 · Verified Expert",u:"https://www.peopleperhour.com/freelancer/marketing-seo/monjurul_islam-polash-digital-marketing-seo-web-vmyqyvw"},
 {n:"Freelancer.com",l:"Fr",c:"#29a8f0",s:"Professional Freelancer",u:"https://www.freelancer.com/hireme/MIPolash"},
 {n:"Guru.com",l:"G",c:"#7a5cff",s:"Trusted Expert",u:"https://www.guru.com/freelancers/monjurul-islam-polash"},
 {n:"Direct Hire",l:"✦",c:"#ff6a34",s:"No platform fees!",u:"#contact",direct:1}
];

const PLANS=[
 {en:"Quick task",bn:"দ্রুত কাজ",d:"One clear job, delivered fast: a site audit, a Google Ads setup, a logo or a data cleanup.",db:"একটি নির্দিষ্ট কাজ, দ্রুত ডেলিভারি: সাইট অডিট, গুগল অ্যাডস সেটআপ, লোগো বা ডেটা ক্লিনআপ।",p:"100",per:"",f:["Scope and price agreed first","One round of revisions included","Delivery in days, not weeks"],fb:["আগে কাজের পরিধি ও দাম ঠিক","এক রাউন্ড রিভিশন অন্তর্ভুক্ত","সপ্তাহ নয়, কয়েক দিনে ডেলিভারি"]},
 {en:"Monthly partner",bn:"মাসিক পার্টনার",d:"Ongoing SEO, ads, social media or admin support, with a regular plan and report.",db:"নিয়মিত পরিকল্পনা ও রিপোর্টসহ চলমান এসইও, অ্যাডস, সোশ্যাল মিডিয়া বা অ্যাডমিন সাপোর্ট।",p:"500",per:"/ month",perb:"/ মাস",f:["A monthly plan with clear goals","A progress report each month","Quick replies on WhatsApp"],fb:["পরিষ্কার লক্ষ্যসহ মাসিক পরিকল্পনা","প্রতি মাসে অগ্রগতির রিপোর্ট","হোয়াটসঅ্যাপে দ্রুত উত্তর"],hot:1},
 {en:"Full project",bn:"পূর্ণ প্রজেক্ট",d:"A website, an online store or a multi-channel campaign, from the first brief to launch.",db:"ওয়েবসাইট, অনলাইন স্টোর বা মাল্টি-চ্যানেল ক্যাম্পেইন — প্রথম ব্রিফ থেকে লঞ্চ পর্যন্ত।",p:"700",per:"",f:["A plan with milestones","Payments tied to milestones","Help after launch"],fb:["মাইলস্টোনসহ পরিকল্পনা","মাইলস্টোন অনুযায়ী পেমেন্ট","লঞ্চের পরেও সহায়তা"]}
];

const STEPS=[
 {en:"Brief",bn:"ব্রিফ",d:"You share the goal, budget and deadline. I reply with scope and price.",db:"আপনি লক্ষ্য, বাজেট ও ডেডলাইন জানান। আমি কাজের পরিধি ও দাম জানাই।"},
 {en:"Plan",bn:"পরিকল্পনা",d:"A short plan with milestones, so you know what arrives and when.",db:"মাইলস্টোনসহ ছোট পরিকল্পনা, যাতে জানেন কী কখন পাবেন।"},
 {en:"Build",bn:"কাজ",d:"Work happens in small steps and you see progress along the way.",db:"ছোট ছোট ধাপে কাজ হয়, আর আপনি পথে পথে অগ্রগতি দেখেন।"},
 {en:"Deliver",bn:"ডেলিভারি",d:"Handover of the finished work, and help after launch.",db:"সম্পূর্ণ কাজ হস্তান্তর, এবং লঞ্চের পরেও সহায়তা।"}
];

const CASES=[
 {tag:"SEO · Saudi Arabia",title:"Full SEO strategy for “Ajwa dates price in KSA”",client:"Delights Oasis (delightsoasis.sa), Fiverr buyer galrawi",
  problem:"The buyer would only approve work after seeing one full plan for a single keyword: on-page, off-page, local SEO and backlinks from high-authority sites only. His site had thin content for the keyword and a lot of technical clutter.",
  metrics:[["24%","duplicate content found"],["41","broken internal links"],["53%","pages without canonical"]],
  did:["Audited the site with Semrush and Siteliner: 24% duplicate content, 41 broken internal links, 21 duplicate title tags, 17 pages with duplicate meta descriptions, 39 broken links in all, and 53% of pages without a canonical tag.","Picked the page to rank, and wrote an on-page change sheet for titles, meta text and content.","Compared the top 10 ranking pages (Lulu, Carrefour, Amazon.sa and others) for domain strength, backlinks and traffic.","Planned off-page work with a sample list of high PA and DA backlinks, plus a local SEO setup: Google Business Profile, Google Maps, Analytics and Search Console.","Built a 6-month keyword plan with six buyer keywords, such as “Best dates in Saudi Arabia” and “Saudi dates online”."],
  got:"A written strategy covering on-page, off-page and local SEO, an on-page change sheet, a competitor table, a backlink sample sheet and the 6-month keyword plan, ready for the buyer to approve."},
 {tag:"On-page SEO · 3 websites",title:"On-page SEO audit for three websites",client:"10spotusa.com, jashimuddinpoly.edu.bd, jashimuddinmats.com",
  problem:"Three sites needed their key pages matched to one clear search phrase each: a US liquidation store, a polytechnic institute in Jamalpur and a medical assistant training institute.",
  metrics:[["3","websites audited"],["65","char. page titles"],["156","char. meta text"]],
  did:["Chose a target keyword and URL for each site, such as “best polytechnic institute in Jamalpur” and “Best MATS/IHT institute in Jamalpur”.","Wrote the page title within 65 characters and the meta description within 156 characters.","Prepared matching content, image alt text and H1 heading for every page, all in one audit sheet."],
  got:"One on-page audit report with ready-to-paste titles, meta descriptions, content, image alt text and H1 tags for each website."}
];

const REVIEWS=[
 {q:"Monjurul is the best freelancer ever I have seen. He is an expert and provides quality work. I will work with him more in the near future.",n:"Foreda Y.",m:"Bangladesh · Jul 2022",p:"Facebook marketing work",src:"PeoplePerHour"},
 {q:"Monjurul did an excellent job on my project. Highly recommend. He is professional, diligent and gives 100%.",n:"Amy C.",m:"United States · Apr 2022",p:"Teams/Zoom meeting participant",src:"PeoplePerHour"},
 {q:"I hired Polash to help me develop a new Facebook page and private group, and market LIVE Facebook events. He provided professional services and completed all tasks timely. I highly recommend Polash for your needs.",n:"Cheryl P.",m:"Upwork, verified · Mar 2022",p:"Facebook page, group & LIVE events",src:"Upwork"}
];

const CHANNELS=[
 ["US","USA, new hub","1-minute trending and viral shorts","USA, নতুন হাব","১ মিনিটের ট্রেন্ডিং ও ভাইরাল শর্টস"],
 ["US","USA, old hub","5-minute cinematic long-form documentaries","USA, পুরনো হাব","৫ মিনিটের সিনেমাটিক লং-ফর্ম ডকুমেন্টারি"],
 ["UK","United Kingdom","Shorts and long videos","যুক্তরাজ্য","শর্টস ও লং ভিডিও"],
 ["AU","Australia","Shorts and long videos","অস্ট্রেলিয়া","শর্টস ও লং ভিডিও"],
 ["JP","Japan","Shorts and long videos","জাপান","শর্টস ও লং ভিডিও"],
 ["DE","Germany","Shorts and long videos","জার্মানি","শর্টস ও লং ভিডিও"],
 ["ES","Spain & Latin America","Shorts and long videos","স্পেন ও ল্যাটিন আমেরিকা","শর্টস ও লং ভিডিও"],
 ["CW","Switzerland","Shorts and long videos","সুইজারল্যান্ড","শর্টস ও লং ভিডিও"],
 ["NL","Netherlands","Shorts and long videos","নেদারল্যান্ডস","শর্টস ও লং ভিডিও"],
 ["NO","Norway","Shorts and long videos","নরওয়ে","শর্টস ও লং ভিডিও"],
 ["AE","United Arab Emirates","Shorts and long videos","সংযুক্ত আরব আমিরাত","শর্টস ও লং ভিডিও"],
 ["BD","Bangladesh (Bangla)","Shorts and long videos","বাংলাদেশ (বাংলা)","শর্টস ও লং ভিডিও"],
 ["∞","Mystic Globe Relaxing — no voice","Soundless ambient loops, 30 minutes to 3 hours","Mystic Globe Relaxing — ভয়েস ছাড়া","শব্দহীন অ্যাম্বিয়েন্ট লুপ, ৩০ মিনিট থেকে ৩ ঘণ্টা",1]
];

/* weekend: 0=Sun..6=Sat */
const CITIES=[
 {tz:"Asia/Dhaka",en:"Dhaka",bn:"ঢাকা",home:1,we:[5,6]},
 {tz:"Asia/Kuwait",en:"Kuwait",bn:"কুয়েত",we:[5,6]},
 {tz:"Asia/Qatar",en:"Qatar",bn:"কাতার",we:[5,6]},
 {tz:"Asia/Riyadh",en:"Saudi Arabia",bn:"সৌদি আরব",we:[5,6]},
 {tz:"Europe/Madrid",en:"Spain",bn:"স্পেন",we:[0,6]},
 {tz:"Europe/Zurich",en:"Switzerland",bn:"সুইজারল্যান্ড",we:[0,6]},
 {tz:"Asia/Shanghai",en:"China",bn:"চীন",we:[0,6]},
 {tz:"America/New_York",en:"USA, New York",bn:"যুক্তরাষ্ট্র, নিউ ইয়র্ক",we:[0,6]}
];

const GUIDES=[
 {t:"SEO checklist for a new website",s:"Five small steps that matter most in the first months.",cat:"seo",steps:["Pick one main keyword for each page and use it in the title, the first heading and the first paragraph.","Write a page title of about 60 characters and a description of about 155 that tells people why to click.","Make the site fast and easy on a phone, then add it to Google Search Console.","Submit a sitemap in Search Console and fix the pages it marks as errors.","Earn links by being useful: guides, tools and real local listings. Do not buy links."]},
 {t:"Your first Google Ads campaign",s:"Start small, measure, then spend more on what works.",cat:"marketing",steps:["Choose one goal, such as calls, form leads or sales, and set up conversion tracking before you spend.","Start with a small daily budget and a few tightly related keywords.","Begin with exact and phrase match, and add negative keywords from the search terms report.","Write ads that repeat the words people searched, and send them to a page about exactly that.","Review every week: pause what wastes money and move budget to what converts."]},
 {t:"Freelance safely and get paid",s:"Simple habits that protect your time and your money.",cat:"business",steps:["Check the client: a real company site, reviews, and a verified payment method on the platform.","Keep the chat and the payment inside the platform until a contract exists.","Agree scope, deadline, revisions and price in writing before you start.","For bigger work, split it into milestones and take an advance or a payment for each one.","Never pay to get a job, and never accept a cheque or an overpayment you are asked to send back."]},
 {t:"A proposal that wins",s:"Five lines that make a client choose you.",cat:"business",steps:["Read the job post twice and answer exactly what it asks.","Open with their problem, not your biography.","Show one relevant sample or result.","Give a clear plan, a timeline and a price or a range.","End with one easy next step, such as a short call."]},
 {t:"Pick the right AI tool",s:"Spend ten minutes choosing and save hours later.",cat:"all",steps:["Start from the job: text, image, video, voice, code or research.","Test the free plan on a real task from your work, not a demo.","Check the licence for commercial use and the privacy rules before you upload client data.","Always check the facts and numbers an AI gives you.","Keep two or three tools you know well instead of chasing every new one."]},
 {t:"YouTube channel growth basics",s:"What to fix first when a channel is not growing.",cat:"youtube",steps:["Give each channel one topic and one audience.","Put your effort into the title, the thumbnail and the first 15 seconds.","Publish on a steady schedule you can really keep.","Read the analytics, especially click-through and retention, and fix the weakest one.","Follow the YouTube policies on reused content, and label realistic AI-made content the way YouTube asks."]}
];

const SOCIALS=[["Upwork","https://www.upwork.com/freelancers/~01e2a611d178fd578d"],["Upwork (Web Dev)","https://www.upwork.com/freelancers/~017242e0fa0e17fd0e"],["PeoplePerHour","https://www.peopleperhour.com/freelancer/marketing-seo/monjurul_islam-polash-digital-marketing-seo-web-vmyqyvw"],["Freelancer","https://www.freelancer.com/hireme/MIPolash"],["Guru","https://www.guru.com/freelancers/monjurul-islam-polash"],["YouTube","https://www.youtube.com/@MysticGlobeDocs-1/shorts"],["Facebook","https://web.facebook.com/monjurulislam.polash"],["GitHub","https://github.com/MIPolash-Prog"]];

const BN={
 "nav.about":"পরিচয়","nav.services":"সেবাসমূহ","nav.work":"কাজ","nav.toolkit":"এআই টুলকিট","nav.media":"মিডিয়া","nav.contact":"যোগাযোগ",
 "cta.hire":"হায়ার করুন","cta.start":"প্রজেক্ট শুরু করুন","cta.tools":"৫৭৪টি এআই টুল দেখুন","cta.cv":"সিভি PDF হিসেবে সেভ করুন","cta.seework":"আমার কাজ দেখুন →",
 "hero.open":"নতুন প্রজেক্টের জন্য প্রস্তুত","hero.first":"মনজুরুল ইসলাম","hero.iam":"আমি একজন","hero.nofee":"সরাসরি হায়ারে কোনো ফি নেই",
 "hero.lede":"আইডিয়াকে ডিজিটাল সাফল্যে রূপ দিই। ৫+ বছর ধরে ডিজিটাল মার্কেটিং, এসইও, ওয়েব ডেভেলপমেন্ট, সোশ্যাল মিডিয়া ও ভার্চুয়াল অ্যাসিস্ট্যান্সে কাজ করছি — ২৪/৭ পাওয়া যায়।",
 "stat.years":"বছরের ফ্রিল্যান্সিং","stat.projects":"সম্পন্ন প্রজেক্ট","stat.channels":"ইউটিউব চ্যানেল","stat.tools":"এআই টুল আমার টুলকিটে",
 "clock.eye":"টাইম জোন","clock.title":"ঢাকা আর <em>আপনার বাজার</em>, এই মুহূর্তে","clock.sub":"উপসাগরীয় দেশ, ইউরোপ, এশিয়া ও যুক্তরাষ্ট্রের ক্লায়েন্টদের সাথে কাজ করি। আপনার শহর দেখে নিন, কখন আমরা একসাথে অনলাইনে।",
 "about.eye":"আমার পরিচয়","about.title":"ব্রিফের <em>চেয়েও বেশি</em> ফলাফল।",
 "about.p1":"আমি মনজুরুল ইসলাম পলাশ, ঢাকার একজন ফ্রিল্যান্সার। পাঁচ বছরেরও বেশি সময় ধরে মার্কেটিং, সার্চ অপটিমাইজেশন, ওয়েবসাইট ও দৈনন্দিন অ্যাডমিন সাপোর্ট দিয়ে ব্যবসাগুলোকে অনলাইনে বড় হতে সাহায্য করছি।",
 "about.p2":"আমার লক্ষ্য সহজ: ক্লায়েন্ট যা চেয়েছেন তার চেয়েও ভালো ফলাফল দেওয়া। আমি ইউটিউব চ্যানেলের একটি নেটওয়ার্ক চালাই এবং শিক্ষকতা করি, তাই সহজ ভাষায় কাজ বুঝিয়ে বলি।",
 "about.f1":"ডিজিটাল মার্কেটার ও এসইও বিশেষজ্ঞ","about.f2":"ওয়েব ডেভেলপার ও ভার্চুয়াল অ্যাসিস্ট্যান্ট","about.f3":"ইউটিউব ক্রিয়েটর ও শিক্ষক","about.f4":"হোয়াটসঅ্যাপে সাধারণত ১ ঘণ্টার মধ্যে উত্তর",
 "svc.eye":"আমি যা করি","svc.title":"ছয়টি দক্ষতা, <em>একজন পার্টনার</em>।","svc.sub":"একটি বেছে নিন, অথবা কয়েকটি মিলিয়ে একটি প্রজেক্ট করুন। প্রতিটি সেবায় একই যত্ন ও পরিষ্কার রিপোর্ট।",
 "hire.eye":"আমার সাথে কাজ করুন","hire.title":"আপনার <em>পছন্দের</em> প্ল্যাটফর্মে হায়ার করুন","hire.sub":"সব বড় ফ্রিল্যান্স মার্কেটপ্লেসে আছি। অথবা সরাসরি হায়ার করুন, কোনো প্ল্যাটফর্ম ফি ছাড়াই।",
 "price.eye":"মূল্য","price.title":"একসাথে কাজের <em>তিনটি উপায়</em>","price.sub":"কাজ শুরুর আগে প্রতিটি কোট লিখিতভাবে চূড়ান্ত হয়।",
 "price.fine":"এগুলো শুরুর মূল্য। চূড়ান্ত কোট কাজের পরিধির উপর নির্ভর করে এবং কাজ শুরুর আগে লিখিতভাবে ঠিক হয়। সরাসরি হায়ারে কোনো প্ল্যাটফর্ম ফি নেই।",
 "proc.eye":"প্রক্রিয়া","proc.title":"প্রজেক্ট যেভাবে <em>চলে</em>","proc.sub":"চারটি ধাপ — ছোট কাজ ও বড় প্রজেক্ট দুটোর জন্যই একই।",
 "work.eye":"নির্বাচিত কাজ","work.title":"<em>আসল ফাইল</em> থেকে কেস স্টাডি","work.sub":"দুটি আসল কাজ — আমি কী করেছি আর কী হস্তান্তর করেছি। কোনো র‍্যাঙ্কিং সংখ্যা দাবি করা হয়নি।",
 "rev.eye":"রিভিউ","rev.title":"<em>ক্লায়েন্টরা</em> যা বলেন","rev.from":"PeoplePerHour ও Upwork থেকে আসল রিভিউ",
 "media.eye":"মিডিয়া","media.title":"Mystic Globe <em>Docs</em>","media.sub":"আমার নিজের মিডিয়া প্রজেক্ট: একটি ডকুমেন্টারি ব্র্যান্ড, ১৩টি ইউটিউব চ্যানেলে প্রকাশিত — বারোটি দেশভিত্তিক হাব আর একটি ভয়েস ছাড়া চ্যানেল।","media.watch":"ইউটিউবে দেখুন",
 "teach.title":"আমি শিক্ষকতাও করি","teach.p":"এআই টুলকিটে একটি টিচিং গ্রুপ আছে — লেসন প্ল্যান, কুইজ, গ্রেডিং, ক্লাসরুম ম্যানেজমেন্ট ও অনলাইন কোর্সের জন্য ৪৭টি টুল।","teach.btn":"টিচিং টুল খুলুন",
 "tk.eye":"স্মার্ট টুলকিট","tk.title":"যে এআই টুল আমি <em>প্রতিদিন</em> ব্যবহার করি","tk.sub":"১৫টি গ্রুপে ৫৭৪টি টুল — ক্লায়েন্টের কাজ, ইউটিউব, শিক্ষকতা ও বিদেশে কাজ খোঁজার জন্য বাছাই করা। প্রতিটি কার্ডে বাংলায় মূল সুবিধা দেখানো আছে।","tk.launch":"আমার প্রতিদিনের লঞ্চপ্যাড",
 "guide.eye":"গাইড","guide.title":"ছোট, <em>কাজের</em> গাইড","guide.sub":"আসল কাজ থেকে সহজ ধাপ। একটি গাইড খুলুন, তারপর সরাসরি মানানসই টুলে চলে যান।",
 "ct.eye":"যোগাযোগ করুন","ct.title":"চলুন একসাথে আপনার <em>ব্যবসা</em> বড় করি।","ct.sub":"আপনার কী দরকার জানান। সরাসরি হায়ারে কোনো প্ল্যাটফর্ম ফি নেই।",
 "ct.call":"কল করুন","ct.fast":"সাধারণত ১ ঘণ্টার মধ্যে উত্তর","ct.online":"এখন অনলাইনে · দ্রুত উত্তর","ct.name":"আপনার নাম","ct.need":"আপনার কী দরকার?","ct.budget":"বাজেট","ct.msg":"বার্তা","ct.send":"হোয়াটসঅ্যাপে পাঠান","ct.note":"আপনার বার্তা হোয়াটসঅ্যাপে খুলবে। সেখানে সেন্ড চাপুন।",
 "foot.made":"ঢাকা, বাংলাদেশ থেকে যত্ন নিয়ে তৈরি।"
};

/* ---------------- helpers ---------------- */
function hue(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h%360}
function mono(name){const h=hue(name);const ch=(name.match(/[A-Za-z0-9]/)||["•"])[0].toUpperCase();return `<span class="mono-ico" style="background:linear-gradient(140deg,hsl(${h} 70% 52%),hsl(${(h+40)%360} 70% 38%))">${ch}</span>`}
const svgUse=(id,cls="")=>`<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove("show"),2200)}

/* ---------------- renderers ---------------- */
function renderServices(){
  $("#svcGrid").innerHTML=SERVICES.map((s,i)=>`
   <article class="svc">
     <div class="svc__top"><div class="svc__icon"><svg viewBox="0 0 24 24">${ICON[s.i]}</svg></div><span class="svc__n">0${i+1}</span></div>
     <h3>${T(s.en,s.bn)}</h3>
     <p>${T(s.d,s.db)}</p>
     <div class="tags">${s.tags.map(t=>`<span>${t}</span>`).join("")}</div>
   </article>`).join("")+`
   <article class="svc svc--cta">
     <svg class="big-flower" viewBox="0 0 64 64"><use href="#palash"/></svg>
     <div><h3>${T("Need something else?","অন্য কিছু দরকার?")}</h3><p>${T("Let's discuss your custom requirements — I'll tell you honestly if I'm the right fit.","আপনার নিজস্ব চাহিদা নিয়ে কথা বলি — আমি ঠিক মানুষ কিনা, সৎভাবে জানাব।")}</p></div>
     <a href="#contact" class="btn">${T("Contact me","যোগাযোগ করুন")} <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
   </article>`;
}
function renderPlatforms(){
  $("#platGrid").innerHTML=PLATFORMS.map(p=>`
   <a class="plat${p.direct?" plat--direct":""}" style="--c:${p.c}" href="${p.u}" ${p.direct?"":'target="_blank" rel="noopener"'}>
     <span class="plat__logo">${p.l}</span><b>${p.n}</b><small>${p.direct?T(p.s,"কোনো প্ল্যাটফর্ম ফি নেই!"):p.s}</small>
     <span class="go">${p.direct?T("Contact now","এখনই যোগাযোগ"):T("Hire me","হায়ার করুন")} ${svgUse("i-ext")}</span>
   </a>`).join("");
}
function renderPlans(){
  $("#planGrid").innerHTML=PLANS.map(p=>`
   <article class="plan${p.hot?" plan--hot":""}">
     ${p.hot?`<span class="plan__badge">${T("Most popular","সবচেয়ে জনপ্রিয়")}</span>`:""}
     <h3>${T(p.en,p.bn)}</h3>
     <p class="desc">${T(p.d,p.db)}</p>
     <div class="price"><small>${T("From","শুরু")}</small><b>$${p.p}</b><span>${T(p.per,p.perb||p.per)}</span></div>
     <ul>${(lang==="bn"?p.fb:p.f).map(f=>`<li>${svgUse("i-check")}${f}</li>`).join("")}</ul>
     <div class="plan__cta">
       <a class="btn ${p.hot?"btn--flame":"btn--ghost"}" target="_blank" rel="noopener" href="${wa("Hello Polash, I am interested in: "+p.en+".")}">${T("Get a quote","কোট নিন")}</a>
       <a class="link-arrow center" target="_blank" rel="noopener" href="${wa("Hello Polash, I would like to book a short call.")}">${T("or book a short call →","অথবা ছোট একটি কল বুক করুন →")}</a>
     </div>
   </article>`).join("");
}
function renderSteps(){
  $("#steps").innerHTML=STEPS.map((s,i)=>`<li class="step"><div class="step__n">${bnNum(i+1)}</div><h3>${T(s.en,s.bn)}</h3><p>${T(s.d,s.db)}</p></li>`).join("");
}
let caseIdx=0;
function renderCases(){
  $("#caseTabs").innerHTML=CASES.map((c,i)=>`<button type="button" role="tab" aria-selected="${i===caseIdx}" data-case="${i}"><small>${c.tag}</small><b>${c.title}</b></button>`).join("");
  const c=CASES[caseIdx];
  $("#caseBody").innerHTML=`
   <div class="case" role="tabpanel">
     <div class="case__l">
       <p class="case__client"><b>${T("Client","ক্লায়েন্ট")}:</b> ${esc(c.client)}</p>
       <div class="metrics">${c.metrics.map(m=>`<div><b>${m[0]}</b><span>${m[1]}</span></div>`).join("")}</div>
       <div><h4>${T("The problem","সমস্যা")}</h4><p>${c.problem}</p></div>
       <div class="case__got"><h4>${T("What the client received","ক্লায়েন্ট যা পেয়েছেন")}</h4><p>${c.got}</p></div>
     </div>
     <div class="case__r"><h4>${T("What I did","আমি যা করেছি")}</h4><ol>${c.did.map(d=>`<li><span>${d}</span></li>`).join("")}</ol></div>
   </div>`;
}
function renderReviews(){
  $("#revGrid").innerHTML=REVIEWS.map(r=>`
   <figure class="rev" style="margin:0">
     <span class="stars">★★★★★</span>
     <blockquote>“${r.q}”</blockquote>
     <span class="proj">${T("Project","প্রজেক্ট")}: ${r.p}</span>
     <footer><span class="av">${r.n[0]}</span><div><b>${r.n}</b><small>${r.m} · ${r.src}</small></div></footer>
   </figure>`).join("");
}
function renderChannels(){
  $("#chanGrid").innerHTML=CHANNELS.map(c=>`
   <a class="chan${c[5]?" chan--wide":""}" href="https://www.youtube.com/@MysticGlobeDocs-1/shorts" target="_blank" rel="noopener">
     <span class="chan__code">${c[0]}</span><span><b>${T(c[1],c[3])}</b><small>${T(c[2],c[4])}</small></span>
   </a>`).join("");
}
function renderGuides(){
  const open=$$("#guideList details[open]").map(d=>d.dataset.i);
  $("#guideList").innerHTML=GUIDES.map((g,i)=>`
   <details class="guide" data-i="${i}" ${open.includes(String(i))||(!open.length&&i===0&&!renderGuides.done)?"open":""}>
     <summary><span class="guide__n">0${i+1}</span><span><b>${g.t}</b><small>${g.s}</small></span><span class="guide__x" aria-hidden="true"></span></summary>
     <div class="guide__body"><ol>${g.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
       <button type="button" class="link-arrow" data-open-cat="${g.cat}">${T("Open the matching tools →","মানানসই টুল খুলুন →")}</button></div>
   </details>`).join("");
  renderGuides.done=true;
}
function renderSocials(){
  $("#socials").innerHTML=SOCIALS.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join("");
}
function renderMarquee(){
  const a=[],b=[],seen=new Set();
  GROUPS.forEach(g=>{let k=0;g.tools.forEach(t=>{if(seen.has(t.n)||k>=6)return;seen.add(t.n);(k%2?b:a).push(t);k++})});
  const html=arr=>{const s=arr.map(t=>`<a href="${t.u}" target="_blank" rel="noopener">${esc(t.n)}</a>`).join("");return s+s};
  $("#mq1").innerHTML=html(a);$("#mq2").innerHTML=html(b);
}
function renderLaunch(){
  $("#launchRow").innerHTML=(window.LAUNCH||[]).map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${mono(l[0])}${l[0]}</a>`).join("");
}

/* ---------------- clocks ---------------- */
const fmtCache={};
function partsIn(tz,d){
  const f=fmtCache[tz]||(fmtCache[tz]=new Intl.DateTimeFormat("en-US",{timeZone:tz,hour12:false,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",weekday:"short"}));
  const o={};f.formatToParts(d).forEach(p=>o[p.type]=p.value);
  const h=+o.hour%24,m=+o.minute,s=+o.second;
  const wd=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday);
  const asUTC=Date.UTC(+o.year,+o.month-1,+o.day,h,m,s);
  return {h,m,s,wd,offMin:Math.round((asUTC-d.getTime())/60000)};
}
function buildClocks(){
  const ticks=Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;const r1=i%3?27:25;return `<line class="tick" x1="${34+Math.sin(a)*r1}" y1="${34-Math.cos(a)*r1}" x2="${34+Math.sin(a)*29}" y2="${34-Math.cos(a)*29}"/>`}).join("");
  $("#clockGrid").innerHTML=CITIES.map((c,i)=>`
   <div class="clock${c.home?" home":""}" data-i="${i}">
     <svg class="face" viewBox="0 0 68 68" aria-hidden="true"><circle class="rim" cx="34" cy="34" r="32"/>${ticks}
       <line class="h" x1="34" y1="34" x2="34" y2="19"/><line class="m" x1="34" y1="36" x2="34" y2="12"/><line class="s" x1="34" y1="39" x2="34" y2="9"/><circle class="c" cx="34" cy="34" r="2.4"/></svg>
     <div class="city">${T(c.en,c.bn)}${c.home?`<small>${T("HOME","হোম")}</small>`:""}</div>
     <div class="time"></div>
     <div class="meta"></div>
   </div>`).join("");
  tickClocks();
}
function tickClocks(){
  const now=new Date();
  const home=partsIn("Asia/Dhaka",now);
  const pad=n=>String(n).padStart(2,"0");
  const days=lang==="bn"?["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  $("#heroClock").textContent=`${T("Dhaka","ঢাকা")} ${bnNum(pad(home.h)+":"+pad(home.m)+":"+pad(home.s))} · ${days[home.wd]}`;
  $$("#clockGrid .clock").forEach(el=>{
    const c=CITIES[+el.dataset.i];const p=partsIn(c.tz,now);
    const ap=p.h<12?"AM":"PM";const h12=p.h%12||12;
    el.querySelector(".time").innerHTML=`${bnNum(pad(h12)+":"+pad(p.m))}<sub>${ap} · ${days[p.wd]}</sub>`;
    const [H,M,S]=el.querySelectorAll(".h,.m,.s");
    H.setAttribute("transform",`rotate(${(p.h%12)*30+p.m*.5} 34 34)`);
    M.setAttribute("transform",`rotate(${p.m*6+p.s*.1} 34 34)`);
    S.setAttribute("transform",`rotate(${p.s*6} 34 34)`);
    const biz=p.h>=9&&p.h<18&&!c.we.includes(p.wd);
    const diff=(p.offMin-home.offMin)/60;
    let rel;
    if(c.home) rel=T("Home base","হোম বেস");
    else{const a=Math.abs(diff);const n=bnNum(Number.isInteger(a)?a:a.toFixed(1));rel=diff<0?T(`${n}h behind Dhaka`,`ঢাকার ${n} ঘণ্টা পেছনে`):diff>0?T(`${n}h ahead of Dhaka`,`ঢাকার ${n} ঘণ্টা আগে`):T("Same as Dhaka","ঢাকার সমান")}
    const isDay=p.h>=6&&p.h<18;
    el.querySelector(".meta").innerHTML=`<span>${isDay?"☀":"☾"} ${rel}</span><span class="pill ${biz?"biz":"off"}">${biz?T("Business hours","অফিস সময়"):T("After hours","অফিস সময়ের বাইরে")}</span>`;
  });
}

/* ---------------- typing ---------------- */
function typing(){
  const el=$("#typed");let ri=0,ci=0,del=false;
  function step(){
    const list=ROLES[lang];const word=list[ri%list.length];
    if(!del){ci++;el.textContent=word.slice(0,ci);if(ci>=word.length){del=true;return setTimeout(step,1800)}}
    else{ci--;el.textContent=word.slice(0,ci);if(ci<=0){del=false;ri++}}
    setTimeout(step,del?40:85);
  }
  if(reduce){el.textContent=ROLES[lang].join(" · ");return}
  step();
}

/* ---------------- petals canvas ---------------- */
function petals(){
  const cv=$("#petals");if(!cv||reduce)return;
  const ctx=cv.getContext("2d");let W,H,dpr,ps=[],run=true,raf;
  function size(){dpr=Math.min(devicePixelRatio||1,2);W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function mk(init){const s=7+Math.random()*14;return{x:Math.random()*W,y:init?Math.random()*H:-30,s,vy:.25+Math.random()*.6+s*.02,vx:-.15+Math.random()*.3,r:Math.random()*6.28,vr:(-.5+Math.random())*.02,ph:Math.random()*6.28,a:.35+Math.random()*.5,flip:Math.random()*6.28}}
  size();const N=W<700?14:26;for(let i=0;i<N;i++)ps.push(mk(true));
  function petal(p){
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.scale(Math.cos(p.flip)*.6+.4,1);
    const s=p.s;const g=ctx.createLinearGradient(0,-s,0,s);
    g.addColorStop(0,"rgba(255,61,46,"+p.a+")");g.addColorStop(.6,"rgba(255,138,61,"+p.a+")");g.addColorStop(1,"rgba(255,210,122,"+p.a+")");
    ctx.fillStyle=g;ctx.beginPath();
    // curved, beak-like palash petal
    ctx.moveTo(0,s);ctx.bezierCurveTo(s*.9,s*.4,s*.7,-s*.6,-s*.15,-s);ctx.bezierCurveTo(s*.15,-s*.3,-s*.1,s*.3,0,s);ctx.fill();
    ctx.restore();
  }
  function loop(t){
    ctx.clearRect(0,0,W,H);
    ps.forEach((p,i)=>{p.y+=p.vy;p.x+=p.vx+Math.sin(t/1400+p.ph)*.35;p.r+=p.vr;p.flip+=.012;if(p.y>H+30)ps[i]=mk(false);petal(p)});
    if(run)raf=requestAnimationFrame(loop);
  }
  raf=requestAnimationFrame(loop);
  addEventListener("resize",size);
  new IntersectionObserver(([e])=>{run=e.isIntersecting&&!document.hidden;cancelAnimationFrame(raf);if(run)raf=requestAnimationFrame(loop)}).observe(cv);
  document.addEventListener("visibilitychange",()=>{run=!document.hidden;cancelAnimationFrame(raf);if(run)raf=requestAnimationFrame(loop)});
}

/* ---------------- counters ---------------- */
function counters(){
  $("#statTools").dataset.to=TOTAL;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;io.unobserve(e.target);
    const el=e.target,to=+el.dataset.to,suf=el.dataset.suffix||"";const t0=performance.now(),D=reduce?1:1600;
    (function f(t){const k=Math.min(1,(t-t0)/D);const v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=bnNum(v)+suf;if(k<1)requestAnimationFrame(f)})(t0);
  }),{threshold:.4});
  $$(".count").forEach(c=>io.observe(c));
}

/* ---------------- reveal ---------------- */
let revealIO;
function reveal(root=document){
  if(!revealIO)revealIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");revealIO.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -40px 0px"});
  const sel=".head,.svc,.plat,.plan,.step,.rev,.chan,.clock,.stat,.about__media,.about__copy,.cases,.guide,.form,.contact__left,.teach,.launch,.media__intro";
  $$(sel,root).forEach(el=>{
    if(el.classList.contains("rv"))return;
    el.classList.add("rv");
    const sib=Array.from(el.parentElement.children).filter(x=>x.matches(sel));
    el.style.transitionDelay=(sib.indexOf(el)%6)*70+"ms";
    revealIO.observe(el);
  });
}

/* ---------------- toolkit ---------------- */
const ALL=[];GROUPS.forEach(g=>g.tools.forEach(t=>ALL.push(Object.assign({gid:g.id,gen:g.en,gbn:g.bn,key:g.id+"|"+t.n},t))));
const tk={cat:"all",q:"",badge:"",limit:60,favs:new Set(store.get("mip-favs",[]))};
function renderCats(){
  const btn=(id,label,count)=>`<button type="button" data-cat="${id}" class="${tk.cat===id?"on":""}"><span>${label}</span><span>${bnNum(count)}</span></button>`;
  $("#tkCats").innerHTML=btn("all",T("All tools","সব টুল"),TOTAL)+btn("fav","★ "+T("My list","আমার তালিকা"),tk.favs.size)+'<div class="sep"></div>'+
    GROUPS.map(g=>btn(g.id,T(g.en,g.bn),g.tools.length)).join("");
}
function filtered(){
  const q=tk.q.trim().toLowerCase();
  return ALL.filter(t=>{
    if(tk.cat==="fav"){if(!tk.favs.has(t.key))return false}
    else if(tk.cat!=="all"&&t.gid!==tk.cat)return false;
    if(tk.badge){if(tk.badge==="PAID"?t.g!=="":t.g!==tk.badge)return false}
    if(q&&!(t.n+" "+t.e+" "+t.b+" "+t.s+" "+t.sb+" "+t.gen+" "+t.gbn).toLowerCase().includes(q))return false;
    return true;
  });
}
function renderTools(){
  const list=filtered();const shown=list.slice(0,tk.limit);
  let html="",lastG="",lastS="";
  shown.forEach(t=>{
    if(t.gid!==lastG&&tk.cat!=="fav"){if(tk.cat==="all"||tk.q){html+=`<h3 class="tgroup">${T(t.gen,t.gbn)} <small>${bnNum(GROUPS.find(g=>g.id===t.gid).tools.length)}</small></h3>`}lastG=t.gid;lastS=""}
    if(t.s&&t.s!==lastS){html+=`<h4 class="tgroup sub">${esc(T(t.s,t.sb))}</h4>`;lastS=t.s}
    const g=t.g||"PAID";const fav=tk.favs.has(t.key);
    html+=`<article class="tool">
      <div class="tool__top">${mono(t.n)}<h4 class="tool__name"><a href="${t.u}" target="_blank" rel="noopener">${esc(t.n)}</a></h4>
        <button type="button" class="fav${fav?" on":""}" data-fav="${esc(t.key)}" aria-pressed="${fav}" aria-label="${fav?"Remove from":"Add to"} my list">${svgUse("i-star")}</button></div>
      <div class="tool__txt"><p class="tool__desc">${esc(t.e)}</p><p class="tool__bn" lang="bn">${esc(t.b)}</p></div>
      <div class="tool__foot"><b class="bdg bdg--${g}">${g==="PAID"?T("PAID","পেইড"):g}</b>${tk.cat==="all"||tk.cat==="fav"?`<span class="grp">${esc(T(t.gen,t.gbn))}</span>`:""}</div>
    </article>`;
  });
  if(!list.length){
    html=tk.cat==="fav"&&!tk.q?`<div class="empty"><b>${T("Your list is empty","আপনার তালিকা খালি")}</b>${T("Tap the ★ on any tool to save it here. It stays in this browser.","যেকোনো টুলের ★ চাপুন, এখানে সেভ হবে। এই ব্রাউজারেই থাকবে।")}</div>`
      :`<div class="empty"><b>${T("No tools found","কোনো টুল পাওয়া যায়নি")}</b>${T("Try another word, or clear the filters.","অন্য শব্দ দিয়ে খুঁজুন, বা ফিল্টার মুছে দিন।")}</div>`;
  }
  $("#tkGrid").innerHTML=html;
  $("#tkCount").innerHTML=T(`Showing <b>${shown.length}</b> of <b>${list.length}</b> tools`,`<b>${bnNum(list.length)}</b>টির মধ্যে <b>${bnNum(shown.length)}</b>টি টুল দেখানো হচ্ছে`);
  const more=$("#tkMore");more.parentElement.hidden=list.length<=tk.limit;
  more.textContent=T(`Show more tools (${list.length-shown.length} left)`,`আরও টুল দেখুন (${bnNum(list.length-shown.length)}টি বাকি)`);
}
function setCat(c){tk.cat=c;tk.limit=60;renderCats();renderTools()}
function toolkitEvents(){
  $("#tkCats").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(b){setCat(b.dataset.cat);if(innerWidth<1100)b.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}});
  let deb;$("#tkSearch").addEventListener("input",e=>{clearTimeout(deb);deb=setTimeout(()=>{tk.q=e.target.value;tk.limit=60;renderTools()},120)});
  $("#tkBadges").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$("#tkBadges button").forEach(x=>x.classList.toggle("on",x===b));tk.badge=b.dataset.b;tk.limit=60;renderTools()});
  $("#tkMore").addEventListener("click",()=>{tk.limit+=60;renderTools()});
  $("#tkGrid").addEventListener("click",e=>{
    const f=e.target.closest("[data-fav]");if(!f)return;e.preventDefault();
    const k=f.dataset.fav;if(tk.favs.has(k)){tk.favs.delete(k);toast(T("Removed from your list","তালিকা থেকে সরানো হয়েছে"))}else{tk.favs.add(k);toast(T("Saved to your list ★","আপনার তালিকায় সেভ হয়েছে ★"))}
    store.set("mip-favs",[...tk.favs]);renderCats();
    if(tk.cat==="fav")renderTools();else{f.classList.toggle("on");f.setAttribute("aria-pressed",tk.favs.has(k))}
  });
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-open-cat]");if(!b)return;
    setCat(b.dataset.openCat);$("#toolkit").scrollIntoView({behavior:reduce?"auto":"smooth"});
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();$("#tkSearch").focus({preventScroll:false})}
  });
}

/* ---------------- nav ---------------- */
function nav(){
  const n=$("#nav");const onS=()=>n.classList.toggle("scrolled",scrollY>30);onS();addEventListener("scroll",onS,{passive:true});
  const burger=$("#burger"),m=$("#mnav");
  burger.addEventListener("click",()=>{const o=burger.getAttribute("aria-expanded")!=="true";burger.setAttribute("aria-expanded",o);m.classList.toggle("open",o)});
  m.addEventListener("click",e=>{if(e.target.closest("a")){burger.setAttribute("aria-expanded","false");m.classList.remove("open")}});
  const links=$$(".nav__links a");const map={};links.forEach(a=>map[a.getAttribute("href").slice(1)]=a);
  const watch={about:"about",services:"services",hire:"services",pricing:"services",process:"services",work:"work",reviews:"work",media:"media",toolkit:"toolkit",guides:"toolkit",contact:"contact"};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove("active"));const k=watch[e.target.id];if(map[k])map[k].classList.add("active")}}),{rootMargin:"-45% 0px -50% 0px"});
  Object.keys(watch).forEach(id=>{const s=document.getElementById(id);if(s)io.observe(s)});
}

/* ---------------- glow follow ---------------- */
function glow(){
  document.addEventListener("pointermove",e=>{
    const c=e.target.closest&&e.target.closest(".svc,.tool");if(!c)return;
    const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px");
  },{passive:true});
}

/* ---------------- contact ---------------- */
function contact(){
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-copy]");if(!b)return;const v=b.dataset.copy;
    const done=()=>toast(T("Copied: ","কপি হয়েছে: ")+v);
    if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(v).then(done,fallback);else fallback();
    function fallback(){const t=document.createElement("textarea");t.value=v;document.body.appendChild(t);t.select();try{document.execCommand("copy");done()}catch(_){toast(v)}t.remove()}
  });
  $("#waForm").addEventListener("submit",e=>{
    e.preventDefault();const f=e.target;const name=f.name.value.trim();
    if(!name){f.name.classList.add("err");f.name.focus();toast(T("Please add your name","অনুগ্রহ করে আপনার নাম লিখুন"));return}
    f.name.classList.remove("err");
    const txt=`Hello Polash, my name is ${name}.\nI need: ${f.need.value}\nBudget: ${(f.querySelector("[name=budget]:checked")||{}).value||"-"}\n\n${f.msg.value.trim()}`;
    window.open(wa(txt),"_blank","noopener");
  });
  $("#cvBtn").addEventListener("click",()=>window.print());
  $("#yr").textContent=new Date().getFullYear();
}

/* ---------------- music (WebAudio ambient) ---------------- */
function music(){
  const wrap=$("#music"),btn=$("#musicBtn"),panel=$("#musicPanel"),play=$("#musicPlay"),vol=$("#musicVol");
  let ac,master,timer,playing=false;
  btn.addEventListener("click",()=>{const o=panel.hidden;panel.hidden=!o;btn.setAttribute("aria-expanded",o)});
  document.addEventListener("click",e=>{if(!wrap.contains(e.target)&&!panel.hidden){panel.hidden=true;btn.setAttribute("aria-expanded",false)}});
  const chords=[[57,60,64,69],[53,57,60,65],[48,55,60,64],[55,59,62,67]];// Am F C G
  const pent=[69,72,74,76,79,81,84];
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function setup(){
    ac=new (window.AudioContext||window.webkitAudioContext)();
    master=ac.createGain();master.gain.value=vol.value/100*.5;
    const lp=ac.createBiquadFilter();lp.type="lowpass";lp.frequency.value=1800;
    const dl=ac.createDelay(2);dl.delayTime.value=.42;const fb=ac.createGain();fb.gain.value=.38;
    dl.connect(fb);fb.connect(dl);
    master.connect(lp);lp.connect(ac.destination);master.connect(dl);dl.connect(lp);
  }
  function pad(notes,t,d){
    notes.forEach(n=>[0,7].forEach(det=>{
      const o=ac.createOscillator(),g=ac.createGain();o.type=det?"sine":"triangle";o.frequency.value=hz(n-12);o.detune.value=det;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+2.2);g.gain.linearRampToValueAtTime(.04,t+d-2);g.gain.linearRampToValueAtTime(0,t+d+1.5);
      o.connect(g);g.connect(master);o.start(t);o.stop(t+d+2);
    }));
  }
  function bell(t){
    const o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.value=hz(pent[Math.floor(Math.random()*pent.length)]);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+3);
    o.connect(g);g.connect(master);o.start(t);o.stop(t+3.2);
  }
  let ci=0;
  function schedule(){
    const t=ac.currentTime+.1,D=7;pad(chords[ci%4],t,D);ci++;
    for(let i=0;i<3;i++)if(Math.random()<.75)bell(t+1+Math.random()*(D-1.5));
    timer=setTimeout(schedule,D*1000);
  }
  play.addEventListener("click",()=>{
    if(!ac)setup();
    if(!playing){ac.resume();schedule();playing=true;play.textContent="Pause";wrap.classList.add("playing")}
    else{clearTimeout(timer);ac.suspend();playing=false;play.textContent="Play";wrap.classList.remove("playing")}
  });
  vol.addEventListener("input",()=>{if(master)master.gain.value=vol.value/100*.5});
}

/* ---------------- language ---------------- */
function applyLang(first){
  document.documentElement.lang=lang==="bn"?"bn":"en";
  document.documentElement.classList.toggle("bn",lang==="bn");
  $$("#langBtn span").forEach((s,i)=>s.classList.toggle("on",(i===1)===(lang==="bn")));
  $$("[data-i18n],[data-i18n-html]").forEach(el=>{
    const html=el.hasAttribute("data-i18n-html");const k=el.getAttribute(html?"data-i18n-html":"data-i18n");
    if(el.dataset.en==null)el.dataset.en=html?el.innerHTML:el.textContent;
    const v=lang==="bn"&&BN[k]?BN[k]:el.dataset.en;
    if(html)el.innerHTML=v;else el.textContent=v;
  });
  $("#tkSearch").placeholder=T(`Search ${TOTAL} tools… e.g. video, keyword, ভিডিও`,`${bnNum(TOTAL)}টি টুলে খুঁজুন… যেমন ভিডিও, keyword`);
  $$("#tkBadges button").forEach(b=>{const m={"":["All","সব"],FREE:["Free","ফ্রি"],EARN:["Earn","আয়"],INFO:["Info","তথ্য"],PAID:["Paid","পেইড"]}[b.dataset.b];b.textContent=T(m[0],m[1])});
  renderServices();renderPlatforms();renderPlans();renderSteps();renderCases();renderReviews();renderChannels();renderGuides();buildClocks();renderCats();renderTools();
  $$(".count").forEach(c=>{if(c.textContent!=="0")c.textContent=bnNum(c.dataset.to)+(c.dataset.suffix||"")});
  if(!first)reveal();
  if(!first)$$(".rv").forEach(el=>el.classList.add("in"));
}

/* ---------------- init ---------------- */
renderMarquee();renderLaunch();renderSocials();
applyLang(true);
$("#caseTabs").addEventListener("click",e=>{const b=e.target.closest("[data-case]");if(b){caseIdx=+b.dataset.case;renderCases()}});
$("#langBtn").addEventListener("click",()=>{lang=lang==="en"?"bn":"en";store.set("mip-lang",lang);applyLang(false)});
nav();typing();petals();counters();toolkitEvents();glow();contact();music();
reveal();
setInterval(tickClocks,1000);
})();
