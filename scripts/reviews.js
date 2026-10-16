/* ============================================================
   AK FISHERS — Google reviews
   Customer reviews from our Google Business profile (58 reviews,
   4.9 average). Only reviews with written feedback are listed;
   owner replies are omitted. Text is as posted by the customer.
   ============================================================ */
const AKF_REVIEWS_META = {
  rating: 4.9,
  count: 58,
  url: "https://share.google/IqGbWfZtBnWX4tr9Z"
};

const AKF_REVIEWS_FEATURED = ["Durvesh Karpe","Gaurav Sonawane","Rahul Pirdhankar","Shubham Mane","balaji tewar","Taniya Rathod"];

const AKF_REVIEWS = [
  {"name":"Durvesh Karpe","rating":5,"text":"The Quality, taste, and quantity exceeded all my expectations! The packaging is top-notch for handling fresh fish, and the prices are very fair. If you’re looking for the freshest catch, look no further-highly recommended!"},
  {"name":"Sunita Rathod","rating":5,"text":"the quality, the quantity— i can't. hands down the best suppliersss🤚🏻 💘 super affordable aswell. y'all should definitely try it once. worth each and every penny :p"},
  {"name":"Radhey Mhatre","rating":5,"text":"Excellent Quality and really fresh fish 🐟 the fish was fresh and well packed the service was also good and hassle free a great experience HIGHLY RECOMMEND THANKS TO MR KISHAN PAWAR"},
  {"name":"NIKITA DUBEY","rating":5,"text":"I ordered fish from this seller a few days ago, and had a really good experience. The seller was helpful and explained the different options nicely. The prices were fair, and the quality was definitely worth it."},
  {"name":"Shubham Mane","rating":5,"text":"We have been ordering from AK Fisheries for the past three years, and we are extremely happy with their service. They always provide fresh and high-quality seafood at very reasonable prices."},
  {"name":"Varad Shinde","rating":5,"text":"Overall experience is too good the fish is fresh and tasty too with the reasonable rate and fast service"},
  {"name":"Asmi Gawade","rating":5,"text":"Had a really good experience with AK Fisher Suppliers. The service was professional, the staff was helpful and responsive, and everything was handled smoothly. The quality of products/services was also satisfactory and the overall experience was hassle-free. Would definitely recommend AK Fisher Suppliers to others!"},
  {"name":"Ganesh Pujari","rating":5,"text":"Very satisfied with the quality and service. Fresh products, timely delivery, and good communication. Thank you!"},
  {"name":"Vishal Rathod","rating":5,"text":"It was a great experience with AK Fishers. Professional staff and good service."},
  {"name":"Sujal Rokade","rating":5,"text":"Fantastic experience with AK Fishers Supplier LLP! The quality of the seafood is always exceptionally fresh, and their service is reliable, prompt, and professional. Highly recommend them to anyone looking for top-tier quality and dependable supply"},
  {"name":"Raunak Choudhary","rating":5,"text":"Freshness, Great quality , value for money all in one at AK Fishers. Fish and prawns where really fresh"},
  {"name":"Hemlibai","rating":5,"text":"Nice service and the fish are so clean"},
  {"name":"amritha shetty","rating":5,"text":"Very fresh it is . I love to order again"},
  {"name":"Eshani Rane","rating":5,"text":"They sell fresh sea food and of good equality 👍 😋"},
  {"name":"Francis Alwin Diago Fernandes","rating":5,"text":"Fresh products and affordable price"},
  {"name":"Shashank Moolya","rating":5,"text":"Good price and nice quality"},
  {"name":"Rupali Gawkar","rating":5,"text":"Fresh products👍🏻Thank you."},
  {"name":"Sumit Daundkar","rating":5,"text":"Fresh fish and properly cleaned ...good service"},
  {"name":"Narayan Ramane","rating":5,"text":"Very Good Love it"},
  {"name":"Sheeva Power","rating":5,"text":"The Rohu fish i hot from them is fresh..i loved it.. thank you Mr Pawar"},
  {"name":"PRASANNA GAWANKAR","rating":4,"text":"PURCHASED SURMAI & BOMBAY DUCK FROM THEM. THE SUPPLIED FISH WAS FRESH. SERVICE IS VERY PROMPT. I RECOMMED OTHERS TO BUY FROM AK FISHERS SUPPLIERS"},
  {"name":"Gaurav Sonawane","rating":5,"text":"I’ve been ordering from Ak fishers and the quality is consistently top-notch. The fish arrives fresh, well-cleaned, and properly chilled on ice every time. Great service and reliable delivery!"},
  {"name":"Sunita Rathod","rating":5,"text":"I recently made a bulk order from AK fishers. Fresh fish and good service. I also recommended to my family members and friends to once order and try their service."},
  {"name":"Hhh Huh","rating":5,"text":"Good services. I highly recommend to order from AK fishers."},
  {"name":"Aditya Joshi","rating":5,"text":"Good quality. Good services."},
  {"name":"Suresh Rathod","rating":5,"text":"Good service, well packed and delivered timely."},
  {"name":"Tanvi Sonawane","rating":5,"text":"The quality is excellent and the products are fresh"},
  {"name":"balaji tewar","rating":5,"text":"I recently ordered fish from this company and was thoroughly impressed with the experience. The fish was incredibly fresh, the pricing was very reasonable for the quality provided, and the delivery arrived right on time. Highly recommend them for anyone looking for reliable, high-quality seafood"},
  {"name":"Payal Sakpal","rating":5,"text":"It was very nice experience"},
  {"name":"Rahul Pirdhankar","rating":5,"text":"I am so impressed with the door to door first delivery service! The fish arrived remarkably fresh, perfectly cleaned and right on schedule. It’s so convenient to get top quality seafood delivered straight to the kitchen without any hassle. Excellent service and exceptional quality highly recommend !"},
  {"name":"Yogita Naidu","rating":5,"text":"Great fishh good qualitys"},
  {"name":"Ishaa Qureshii","rating":5,"text":"Nice and excellent service loved the food."},
  {"name":"Pujari Dikshu","rating":5,"text":"Excellent quality fish and fresh products. The service was good, and the delivery was timely. Overall, a very good experience. Highly recommended!"},
  {"name":"Sakshi Jadhav","rating":4,"text":"Fresh fishes good quality and reasonable price"},
  {"name":"Sakshi Jadhav","rating":5,"text":"Fresh clean fishes fast delivery and the staff's are so helpful and responsive affordable price."},
  {"name":"Taniya Rathod","rating":5,"text":"I recently ordered fish from AK Fishers Suppliers and was really happy with the quality. The fish was fresh, properly packed, and the overall service was good. They have a nice variety of options and the prices also seemed reasonable. Would definitely consider ordering from them again."},
  {"name":"Rathod Umesh","rating":5,"text":"The seafood was absolutely delicious! Everything was fresh, flavorful, and perfectly cooked. Great taste, good quality, and excellent service. Definitely worth trying!"},
  {"name":"Saqlain","rating":5,"text":"Everything about this was way better than I thought it would be – the quality, the taste, and even how much you got! The way it's packed is perfect for fresh fish, and the prices are totally reasonable. Seriously, if you want the freshest fish, this is the place to go. Big thumbs up!"},
  {"name":"Ganesh Dewoolkar","rating":5,"text":"Really Good Quality and service"},
  {"name":"Prashant Gavhal","rating":5,"text":"I ordered this product online for the first time and was a little scared about the quality and delivery, but they proved me wrong. The quality and delivery method were very prompt and nice. Thanks for providing the service!"},
  {"name":"Shrisha Shetty","rating":5,"text":"The fishes are very fresh and the service is fast and reliable ❤️"},
  {"name":"Kalpana Acharya","rating":5,"text":"The fish is very fresh and it's cleaned properly, hygiene and quality is topmost ."},
  {"name":"Harshali Navghare","rating":5,"text":"Excellent quality and really fresh fish! 🐟 The fish was clean, tasty, and properly packed. Great service and reasonable prices. Highly recommended for fresh seafood lovers! 👍thank you"},
  {"name":"Jitendra Naugare","rating":5,"text":"Very good quality and fresh fishes. Good service and reasonable prices. Happy with my purchase. Thanks Kishan.."},
  {"name":"Tejas Murkar","rating":5,"text":"Good quality fresh fishes and other items. The service was also good and hassle free. Overall, a great experience. Highly recommended! Thanks to Mr Kishan!"},
  {"name":"Milichavan","rating":5,"text":"The quality is good and the service is also great. Overall the experience was very good."},
  {"name":"Prashant Bhalekar","rating":5,"text":"The fish was very fresh and the quality was also very good. The price is reasonable.."},
  {"name":"Pratham Padawal","rating":5,"text":"खूप फ्रेश आणि छान मच्छी असते दादा कडे, आणि योग्य दरात आणि चांगली quality असते."}
];

/* ---------- rendering helpers (need products.js: akfEscapeHTML, akfStars) ---------- */
function akfReviewCardHTML(r) {
  return '<div class="testi-card">' +
    '<span class="t-quote">"</span>' +
    '<div class="t-stars">' + akfStars(r.rating) + '</div>' +
    '<p class="t-text">' + akfEscapeHTML(r.text) + '</p>' +
    '<div class="t-person">' +
      '<span class="t-avatar">' + akfEscapeHTML(r.name.charAt(0).toUpperCase()) + '</span>' +
      '<span><span class="t-name">' + akfEscapeHTML(r.name) + '</span><br><span class="t-area">Google review</span></span>' +
    '</div>' +
  '</div>';
}

function akfReviewsSummaryHTML(showAllLink) {
  var m = AKF_REVIEWS_META;
  return '<div class="rv-summary">' +
    '<div class="rv-score"><b>' + m.rating.toFixed(1) + '</b><span class="t-stars">' + akfStars(5) + '</span></div>' +
    '<div class="rv-text"><b>' + m.count + ' Google reviews</b><span>Rated ' + m.rating.toFixed(1) + ' out of 5 by our customers</span></div>' +
    '<div class="rv-actions">' +
      (showAllLink ? '<a class="btn btn--primary btn--sm" href="/reviews">Read all reviews</a>' : '') +
      '<a class="btn btn--ghost btn--sm" href="' + m.url + '" target="_blank" rel="noopener">See us on Google</a>' +
    '</div>' +
  '</div>';
}
