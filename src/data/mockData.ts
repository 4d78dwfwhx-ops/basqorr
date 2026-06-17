export const mockProducts = [
  { id:"1", name:"طقم فرامل أمامية تويوتا كامري 2020", description:"طقم فرامل أمامي أصلي من تويوتا", brand:"تويوتا", category:"فرامل", price:450, rating:4.8, reviewCount:234, inStock:true, image:"/products/brake-pads.jpg" },
  { id:"2", name:"فلتر زيت محرك هيونداي توسان", description:"فلتر زيت عالي الجودة", brand:"هيونداي", category:"محرك", price:45, rating:4.6, reviewCount:156, inStock:true, image:"/products/oil-filter.jpg" },
  { id:"3", name:"بطارية سيارة 70 أمبير", description:"بطارية عالية الأداء، ضمان 3 سنوات", brand:"فارتا", category:"كهرباء", price:380, rating:4.9, reviewCount:412, inStock:true, image:"/products/battery.jpg" },
  { id:"4", name:"إطارات ميشلان 225/65R17", description:"إطارات عالية الجودة", brand:"ميشلان", category:"إطارات", price:520, rating:4.7, reviewCount:289, inStock:true, image:"/products/tires.jpg" },
  { id:"5", name:"زيت محرك كاسترول 5W-30", description:"زيت محرك تخليقي بالكامل", brand:"كاسترول", category:"محرك", price:180, rating:4.8, reviewCount:567, inStock:true, image:"/products/engine-oil.jpg" },
  { id:"6", name:"شمعات إشعال NGK", description:"شمعات إشعال إيريدية", brand:"NGK", category:"محرك", price:120, rating:4.9, reviewCount:345, inStock:true, image:"/products/spark-plugs.jpg" },
];

export const mockWorkshops = [
  { id:"1", name:"ورشة النور", description:"ورشة متخصصة في صيانة السيارات اليابانية", rating:4.9, reviewCount:1284, location:{ lat:24.7136, lng:46.6753, city:"الرياض" }, services:["محرك","ناقل الحركة","كهرباء"], image:"/workshops/al-noor.jpg" },
  { id:"2", name:"مركز FastFix", description:"مركز سريع لصيانة السيارات الأوروبية", rating:4.7, reviewCount:892, location:{ lat:21.4858, lng:39.1925, city:"جدة" }, services:["فرامل","تعليق","تكييف"], image:"/workshops/fastfix.jpg" },
];
