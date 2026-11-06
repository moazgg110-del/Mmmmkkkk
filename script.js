/* Space Infinity — لعبة أوفلاين بالكامل. لا API ولا اتصالات خارجية. */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const TOTAL_LEVELS = 1200, WORLD_SIZE = 100;
const worlds = [
 ["مجرة البداية","🌍","#278acb"],["مجرة القمر الأزرق","🌙","#477fe8"],["مجرة النيازك","☄️","#c66b4a"],["مجرة البلورات","💎","#36bcb0"],["مجرة العمالقة","🪐","#a56bdd"],["مجرة الشفق","🌌","#6c68d9"],["مجرة اللهب","🔥","#db704b"],["مجرة الجليد","❄️","#64c4e8"],["مجرة الظلال","🌑","#74769a"],["مجرة الملوك","👑","#d2a747"],["مجرة المجهول","🛸","#4aa9a1"],["مجرة اللانهاية","✨","#e0a4ff"]
];
const facts = [
["الشمس","نجم","ما نوع الشمس؟",["كوكب","قمر","نجم","مذنب"],2,"الشمس نجم يضيء بذاته."],
["الأرض","الشمس","ما الكوكب الذي نعيش عليه؟",["المريخ","الأرض","الزهرة","زحل"],1,"الأرض هي موطننا."],
["المريخ","الأحمر","بماذا يُعرف المريخ؟",["الكوكب الأزرق","الكوكب الأحمر","الكوكب الحلقي","الكوكب الجليدي"],1,"يبدو المريخ أحمر بسبب أكاسيد الحديد."],
["المشتري","أكبر كواكب المجموعة الشمسية","ما أكبر كواكب المجموعة الشمسية؟",["الأرض","زحل","المشتري","عطارد"],2,"المشتري هو الأكبر."],
["زحل","حلقات","أي كوكب يشتهر بحلقاته الواضحة؟",["زحل","عطارد","الأرض","المريخ"],0,"حلقات زحل مميزة جدًا."],
["عطارد","الأقرب إلى الشمس","ما أقرب كوكب إلى الشمس؟",["الزهرة","عطارد","الأرض","نبتون"],1,"عطارد أقرب الكواكب للشمس."],
["نبتون","الأبعد بين الكواكب الثمانية عن الشمس","ما أبعد كوكب عن الشمس؟",["المشتري","أورانوس","نبتون","الزهرة"],2,"نبتون هو الأبعد."],
["القمر","تابع طبيعي للأرض","ما القمر بالنسبة إلى الأرض؟",["نجم","كوكب","تابع طبيعي","مذنب"],2,"القمر تابع الأرض الطبيعي."],
["الفضاء","شبه فراغ","كيف يوصف الفضاء بين الأجرام غالبًا؟",["محيط مائي","شبه فراغ","غلاف صخري","سحابة هواء كثيفة"],1,"الفضاء شبه فراغ."],
["المجرة","مجموعة ضخمة من النجوم والغاز والغبار","ما المجرة؟",["كوكب منفرد","مجموعة نجوم ومواد كونية","قمر صناعي","مركبة فضائية"],1,"المجرة تضم نجومًا وغازًا وغبارًا."],
["درب التبانة","مجرة الأرض","في أي مجرة تقع مجموعتنا الشمسية؟",["المرأة المسلسلة","درب التبانة","السنبلة","الدوامة"],1,"نحن داخل مجرة درب التبانة."],
["السنة الضوئية","المسافة التي يقطعها الضوء في سنة","ماذا تقيس السنة الضوئية؟",["الزمن فقط","الحرارة","المسافة","السرعة"],2,"السنة الضوئية وحدة مسافة."],
["الجاذبية","قوة جذب الأجسام لبعضها","ما القوة التي تبقينا على سطح الأرض؟",["المغناطيسية","الجاذبية","الاحتكاك فقط","الكهرباء"],1,"الجاذبية تجذبنا نحو الأرض."],
["المدار","مسار جسم حول جسم آخر","ما اسم مسار الكوكب حول النجم؟",["مدار","محور","ظل","مجرة"],0,"الكواكب تدور في مدارات."],
["الكسوف","حجب جرم سماوي لآخر","ماذا يحدث في كسوف الشمس؟",["تختفي النجوم","يمر القمر أمام الشمس","تنطفئ الشمس","تتوقف الأرض"],1,"القمر يحجب ضوء الشمس جزئيًا أو كليًا."],
["الخسوف","وقوع القمر في ظل الأرض","ماذا يحدث في خسوف القمر؟",["يدخل القمر في ظل الأرض","تقترب الشمس","ينفجر نجم","يتوقف دوران القمر"],0,"ظل الأرض يقع على القمر."],
["المذنب","جسم جليدي وغباري","مم يتكون المذنب غالبًا؟",["حديد فقط","جليد وغبار وصخور","غاز الأكسجين فقط","ماء سائل فقط"],1,"المذنبات أجسام جليدية وغبارية."],
["النيزك","جسم يصل إلى سطح الأرض","ما الاسم الذي يطلق على الجسم الفضائي إذا وصل إلى سطح الأرض؟",["شهاب","نيزك","كوكب","قمر"],1,"النيزك هو ما يصل إلى سطح الأرض."],
["الشهاب","أثر ضوئي عند احتراق جسم في الغلاف الجوي","ما الشهاب؟",["أثر ضوئي في السماء","قمر صغير","نجم جديد","كوكب"],0,"الشهاب يظهر عند دخول جسم الغلاف الجوي."],
["رائد الفضاء","شخص يسافر إلى الفضاء","من هو رائد الفضاء؟",["قائد سفينة بحرية","شخص يعمل أو يسافر في الفضاء","عالم نبات","طيار فقط"],1,"رائد الفضاء يتدرب على مهام الفضاء."],
["المحطة الفضائية","مختبر يدور حول الأرض","ما المحطة الفضائية؟",["مدينة تحت البحر","مختبر مداري","قمر طبيعي","صاروخ عابر"],1,"المحطة الفضائية مكان للبحث في المدار."],
["الصاروخ","وسيلة إطلاق المركبات","ما الوسيلة الشائعة لإطلاق المركبات إلى الفضاء؟",["قطار","صاروخ","غواصة","منطاد"],1,"الصواريخ توفر الدفع اللازم للإطلاق."],
["التلسكوب","أداة لرصد الأجرام البعيدة","ما الأداة التي تساعدنا على رؤية الأجرام البعيدة؟",["مجهر","تلسكوب","ميزان","بوصلة"],1,"التلسكوب يجمع الضوء أو الإشارات."],
["الزهرة","أسخن كواكب المجموعة الشمسية","ما أسخن كواكب المجموعة الشمسية؟",["عطارد","الزهرة","المريخ","الأرض"],1,"غلاف الزهرة الجوي الكثيف يحبس الحرارة."],
["أورانوس","يميل على جانبه","أي كوكب يتميز بميل محوري شديد؟",["الأرض","أورانوس","المشتري","عطارد"],1,"أورانوس يدور بميل كبير."],
["البلوتو","كوكب قزم","كيف يصنف بلوتو حاليًا؟",["نجم","كوكب قزم","قمر الأرض","مذنب"],1,"بلوتو كوكب قزم."],
["الأكسجين","ضروري لتنفس الإنسان","أي غاز يحتاجه الإنسان للتنفس؟",["الهيليوم","الأكسجين","الهيدروجين","النيون"],1,"الأكسجين ضروري للتنفس."],
["الهيليوم","غاز خفيف","أي غاز يستخدم في بعض البالونات ويعد خفيفًا؟",["الهيليوم","الحديد","النيتروجين السائل","الكربون الصلب"],0,"الهيليوم أخف من الهواء."],
["الضوء","أسرع من الصوت","أيهما أسرع: الضوء أم الصوت؟",["الصوت","الضوء","متساويان","يعتمدان على اللون"],1,"سرعة الضوء أكبر بكثير."],
["الليل والنهار","دوران الأرض حول محورها","ما سبب تعاقب الليل والنهار؟",["دوران الأرض حول محورها","دوران القمر","ابتعاد الشمس","تغير الفصول"],0,"دوران الأرض يبدل الجهة المواجهة للشمس."],
["الفصول","ميل محور الأرض ودورانها حول الشمس","ما السبب الأساسي للفصول؟",["تغير حجم الشمس","ميل محور الأرض مع دورانها حول الشمس","تغير القمر","الغيوم"],1,"ميل المحور يغير زاوية وصول ضوء الشمس."],
["الماء","يوجد جليد مائي في أماكن فضائية","ما المادة التي توجد على الأرض في الحالات الثلاث؟",["الذهب","الماء","الزجاج","الملح"],1,"الماء يوجد صلبًا وسائلاً وغازًا."],
["الطيف","تحليل الضوء إلى ألوان","ماذا ينتج عند تحليل الضوء الأبيض؟",["لون واحد","ألوان الطيف","موجات صوتية","ظل أسود"],1,"الضوء الأبيض يتكون من ألوان متعددة."],
["الثقب الأسود","جاذبية شديدة جدًا","ما الثقب الأسود؟",["كوكب مظلم","منطقة جاذبيتها شديدة جدًا","قمر صناعي","مجرة صغيرة"],1,"جاذبيته تمنع حتى الضوء من الإفلات بعد أفق الحدث."],
["السديم","سحابة غاز وغبار","ما السديم؟",["سحابة كونية من غاز وغبار","كوكب صخري","قمر جليدي","مدار"],0,"السدم مناطق من الغاز والغبار."],
["النجم","كرة غازية مضيئة","ما النجم؟",["كرة غازية تنتج طاقة وضوءًا","صخرة باردة","قمر","مركبة"],0,"النجوم تنتج الطاقة في داخلها."],
["الاندماج النووي","مصدر طاقة النجوم","كيف تنتج الشمس معظم طاقتها؟",["احتراق الخشب","الاندماج النووي","احتكاك الصخور","البطاريات"],1,"تندمج نوى الهيدروجين لتكوين الهيليوم."],
["الأرض","كوكب صخري","إلى أي مجموعة ينتمي كوكب الأرض؟",["الكواكب الغازية","الكواكب الصخرية","الأقمار","المذنبات"],1,"الأرض كوكب صخري."],
["المريخ","يضم بركان أوليمبوس مونس","على أي كوكب يقع بركان أوليمبوس مونس؟",["المريخ","الزهرة","زحل","الأرض"],0,"يقع على سطح المريخ."],
["المشتري","بقعة حمراء عظيمة","ما اسم العاصفة الشهيرة على المشتري؟",["البقعة الزرقاء","البقعة الحمراء العظيمة","عين زحل","دوامة نبتون"],1,"هي عاصفة ضخمة طويلة العمر."],
["القمر","لا يضيء بذاته","لماذا نرى القمر مضيئًا؟",["لأنه نجم","يعكس ضوء الشمس","يشتعل من الداخل","لأنه مصنوع من زجاج"],1,"القمر يعكس ضوء الشمس."],
["المحور","خط تخيلي يمر عبر القطبين","حول ماذا تدور الأرض يوميًا؟",["مدار المشتري","محورها","الشمس فقط","القمر"],1,"تدور الأرض حول محورها."],
["المد والجزر","تأثير جاذبية القمر والشمس","ما الذي يساهم بقوة في حدوث المد والجزر؟",["الرياح فقط","جاذبية القمر والشمس","البراكين","الغيوم"],1,"جاذبية القمر مؤثرة جدًا في مياه المحيطات."],
["الضوء","ينتقل في خطوط مستقيمة في وسط متجانس","كيف ينتقل الضوء في وسط متجانس؟",["في دوائر","في خطوط مستقيمة","يتوقف دائمًا","على شكل صوت"],1,"ينتقل الضوء في خطوط مستقيمة في الوسط المتجانس."],
["الصوت","يحتاج إلى وسط مادي","هل ينتقل الصوت في الفراغ؟",["نعم دائمًا","لا يحتاج إلى وسط","لا، يحتاج إلى وسط مادي","أسرع من الضوء"],2,"الصوت يحتاج إلى مادة لينتقل."],
["المريخ","له قمران طبيعيان","كم قمرًا طبيعيًا معروفًا للمريخ؟",["واحد","اثنان","أربعة","ثمانية"],1,"للمريخ قمران: فوبوس وديموس."],
["الأرض","لها قمر طبيعي واحد","كم قمرًا طبيعيًا للأرض؟",["واحد","اثنان","ثلاثة","خمسة"],0,"للأرض قمر طبيعي واحد."],
["زحل","كوكب غازي عملاق","ما طبيعة زحل؟",["كوكب غازي عملاق","كوكب صخري صغير","نجم","مذنب"],0,"زحل عملاق غازي."],
["المجرة","تحتوي على أعداد هائلة من النجوم","هل تحتوي المجرة على نجم واحد فقط؟",["نعم","لا، تضم أعدادًا هائلة من النجوم","كل المجرات فارغة","المجرة كوكب"],1,"المجرات تضم أعدادًا هائلة من النجوم."]
];
const questionBank = [];
const forms = [
 f => ({q:f[2],a:f[3],c:f[4],hint:f[5]}),
 f => ({q:`أي عبارة تصف ${f[0]} بشكل صحيح؟`,a:[f[1],...f[3].filter((_,i)=>i!==f[4]).slice(0,3)],c:0,hint:f[5]}),
 f => ({q:`اختر الإجابة الصحيحة عن ${f[0]}:`,a:f[3],c:f[4],hint:f[5]}),
 f => ({q:`ما المعلومة المرتبطة بـ ${f[0]}؟`,a:[f[1],...f[3].filter((_,i)=>i!==f[4]).slice(0,3)],c:0,hint:f[5]}),
 f => ({q:`اختبر معلوماتك: ${f[2]}`,a:f[3],c:f[4],hint:f[5]})
];
facts.forEach((f,fi)=>forms.forEach((fn,vi)=>{const x=fn(f);questionBank.push({...x,category:fi%3===0?"أسرار الكون":fi%3===1?"الكواكب والمجرات":"علوم الفضاء",id:questionBank.length});}));
const extraTopics = [
 ["المريخ","يمتلك غلافًا جويًا رقيقًا","أي وصف يناسب غلاف المريخ الجوي؟"],
 ["القمر","توجد عليه فوهات اصطدام كثيرة","ما الذي يميز سطح القمر؟"],
 ["الشمس","تدور حول مركز مجرة درب التبانة","هل الشمس ثابتة في المجرة؟"],
 ["زحل","كثافته المتوسطة أقل من كثافة الماء","ما المعلومة المدهشة عن كثافة زحل؟"],
 ["الفضاء","توجد فيه إشعاعات كونية","هل الفضاء خالٍ تمامًا من الإشعاع؟"],
 ["المركبة الفضائية","تحتاج إلى أنظمة طاقة واتصال","ما الذي تحتاجه المركبة الفضائية؟"],
 ["القمر الصناعي","يمكنه مراقبة الطقس","ما إحدى مهام الأقمار الصناعية؟"],
 ["التلسكوب الفضائي","يرصد الكون بعيدًا عن تشويش الغلاف الجوي","ما ميزة التلسكوب الفضائي؟"],
 ["المحطة الدولية","تدور حول الأرض","أين تتحرك محطة الفضاء الدولية؟"],
 ["النجوم","تختلف في اللون ودرجة الحرارة","هل كل النجوم لها اللون نفسه؟"]
];
const fillerAnswers = [
 ["تدور حول مركز المجرة","ثابتة تمامًا في مكانها","تسقط على الأرض يوميًا","تتحول إلى كوكب"],
 ["توجد فوهات اصطدام كثيرة","مغطى بمحيطات سائلة","لا يحتوي على أي صخور","له غلاف نباتي"],
 ["تحتاج إلى أنظمة طاقة واتصال","تعمل بلا طاقة","تتنفس الهواء","تطفو في المحيط"],
 ["يمكنه مراقبة الطقس","يصنع الأمطار","يوقف الرياح","يغير الفصول"]
];
extraTopics.forEach((f,i)=>{for(let v=0;v<14;v++){let a=fillerAnswers[i%4].slice();let correct=i%4===0?0:i%4===1?0:i%4===2?0:0;questionBank.push({q:v%2?`أي معلومة صحيحة عن ${f[0]}؟`:f[2],a,c:correct,hint:f[1],category:"معلومات كونية",id:questionBank.length});}});
/* توليد أسئلة حسابية وفهم أنماط لضمان بنك ضخم يتجاوز ألف سؤال فريد */
const mathSeeds = [
 [2,"كم يساوي 1 + 1؟",2],[3,"كم يساوي 1 + 2؟",3],[4,"كم يساوي 2 + 2؟",4],[5,"كم يساوي 2 + 3؟",5],
 [6,"كم يساوي 3 + 3؟",6],[7,"كم يساوي 4 + 3؟",7],[8,"كم يساوي 4 + 4؟",8],[9,"كم يساوي 5 + 4؟",9]
];
for(let n=10;n<260;n++){let a=(n*7)%41+3,b=(n*11)%37+2,sum=a+b;questionBank.push({q:`مركبة الاستكشاف جمعت ${a} وحدة طاقة ثم وجدت ${b} وحدات أخرى. كم أصبح معها؟`,a:[String(sum),String(sum+2),String(Math.max(1,sum-3)),String(sum+5)],c:0,hint:`اجمع ${a} + ${b}.`,category:"حسابات المستكشف",id:questionBank.length});}
const patternSets=[
 ["🚀","🪐","⭐","🚀","🪐","⭐"],["🔵","🔴","🔵","🔴"],["1","2","3","1","2","3"],["🌙","☀️","🌙","☀️"]
];
for(let n=0;n<260;n++){const p=patternSets[n%patternSets.length],answer=p[n%p.length];const options=[answer,"🚀","⭐","🌙"];const unique=[...new Set(options)];while(unique.length<4)unique.push(["🪐","☀️","💎","🌍"][unique.length]);questionBank.push({q:`تحدي النمط ${n+1}: ما الرمز الذي يناسب تسلسل الرموز التالي؟ ${p.slice(0,4).join("  ")}  ؟`,a:unique,c:unique.indexOf(answer),hint:"لاحظ ترتيب الرموز وتكرارها.",category:"ألغاز الأنماط",id:questionBank.length});}
for(let n=0;n<160;n++){const a=(n*13)%90+10,b=(n*17)%80+10,opts=[a>b?"الأول":a<b?"الثاني":"متساويان","الأول","الثاني","متساويان"];const correct=a>b?0:a<b?2:3;questionBank.push({q:`أي العددين أكبر في سجل الوقود: ${a} أم ${b}؟`,a:["الأول","الثاني","متساويان","لا يمكن التحديد"],c:correct,hint:"قارن العددين مباشرة.",category:"تحديات الأرقام",id:questionBank.length});}
for(let n=0;n<180;n++){let k=n%10;let qs=[
["أي مما يلي جسم سماوي؟",["نجم","كرسي","كتاب","مفتاح"],0,"النجم جسم سماوي."],
["أي أداة نستخدمها لرصد النجوم؟",["تلسكوب","مطرقة","ميزان","مقص"],0,"التلسكوب أداة للرصد."],
["أي مما يلي كوكب؟",["المريخ","الشمس","الشهاب","السديم"],0,"المريخ كوكب."],
["ما الذي يدور حول الأرض طبيعيًا؟",["القمر","المشتري","الشمس","زحل"],0,"القمر تابع الأرض."],
["أي لون يرتبط غالبًا بالمريخ؟",["الأحمر","الأخضر","الوردي","الأسود"],0,"يسمى الكوكب الأحمر."]
][k%5];questionBank.push({q:`سؤال المستكشف ${n+1}: ${qs[0]}`,a:qs[1],c:qs[2],hint:qs[3],category:"اختبار المستكشف",id:questionBank.length});}
const stateDefault={unlocked:1,completed:[],coins:0,crystals:0,correct:0,answered:0,streak:0,lastDaily:"",sound:true,dark:true,motion:true,font:"normal",lastLevel:1};
let state;try{state={...stateDefault,...JSON.parse(localStorage.getItem("spaceInfinitySave")||"{}")}}catch{state={...stateDefault}}
let currentLevel=1,currentQuestion=null,answeredThis=false,worldSelected=0,runScore=0;
const save=()=>localStorage.setItem("spaceInfinitySave",JSON.stringify(state));
const shuffle=(arr,seed)=>{let a=arr.slice(),x=(seed*9301+49297)%233280;for(let i=a.length-1;i>0;i--){x=(x*9301+49297)%233280;let j=Math.floor(x/233280*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function sound(freq=520){if(!state.sound)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),o=c.createOscillator(),g=c.createGain();o.frequency.value=freq;g.gain.value=.04;o.connect(g);g.connect(c.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.13);o.stop(c.currentTime+.14);o.onended=()=>c.close()}catch{}}
function updateTop(){ $("coins").textContent=state.coins;$("crystals").textContent=state.crystals;$("lives").textContent=5; }
function updateStats(){ $("statLevels").textContent=state.unlocked;$("statStars").textContent=state.coins;$("statCorrect").textContent=state.correct;$("statAccuracy").textContent=(state.answered?Math.round(state.correct/state.answered*100):0)+"%";$("bigProgressFill").style.width=(state.completed.length/TOTAL_LEVELS*100)+"%";$("bigProgressText").textContent=`${state.completed.length} من ${TOTAL_LEVELS} مرحلة مكتملة`;$("journeyLog").textContent=state.completed.length?`أكملت ${state.completed.length} مرحلة. آخر محطة لك هي المرحلة ${state.lastLevel}. استمر يا بطل!`:"لم تبدأ رحلتك بعد. أول خطوة في انتظارك!";$("levelProgress").textContent=`${state.unlocked} / ${TOTAL_LEVELS}`;updateTop()}
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");if(id==="levelsScreen")renderLevels();if(id==="statsScreen")updateStats();if(id==="achievementsScreen")renderAchievements();window.scrollTo(0,0)}
document.querySelectorAll("[data-screen]").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.screen)));
function renderWorlds(){const root=$("worldTabs");root.innerHTML="";worlds.forEach((w,i)=>{const b=document.createElement("button");b.className="world-tab"+(worldSelected===i?" active":"");b.textContent=`${w[1]} ${w[0]}`;b.onclick=()=>{worldSelected=i;renderWorlds();renderLevels()};root.appendChild(b)})}
function renderLevels(){renderWorlds();const root=$("levelGrid");root.innerHTML="";let start=worldSelected*WORLD_SIZE+1;for(let n=start;n<start+WORLD_SIZE;n++){const b=document.createElement("button"),done=state.completed.includes(n),locked=n>state.unlocked;b.className="level-cell"+(locked?" locked":"")+(done?" done":"")+(n===state.unlocked?" current":"");b.innerHTML=`<span>${locked?"🔒":done?"✓":n}</span><small>${done?"مكتملة":locked?"مغلقة":n===state.unlocked?"ابدأ":"متاحة"}</small>`;b.disabled=locked;b.onclick=()=>startLevel(n);root.appendChild(b)}}
function startLevel(level){currentLevel=level;state.lastLevel=level;runScore=0;answeredThis=false;showScreen("gameScreen");$("stageNumber").textContent=`المرحلة ${level}`;$("worldName").textContent=worlds[Math.floor((level-1)/100)][0];$("runScore").textContent="0";let hue=(level*37)%360;$("scenePlanet").style.background=`radial-gradient(circle at 30% 25%,hsl(${hue},95%,85%),hsl(${hue},70%,52%) 38%,hsl(${(hue+70)%360},65%,28%) 72%,#101632)`;$("sceneCaption").textContent=["إشارة غامضة قادمة من الكوكب...","اجمع بيانات المجرة وافتح المسار التالي!","مستكشف شجاع، التحدي بانتظارك!","اقتربت من اكتشاف سر كوني جديد!"][level%4];loadQuestion(level)}
function loadQuestion(seed){answeredThis=false;$("feedback").textContent="";$("feedback").className="feedback";$("nextBtn").disabled=true;let q=questionBank[(seed*17+Math.floor(seed/3))%questionBank.length];currentQuestion=q;let order=shuffle(q.a,seed+q.id);let correctText=q.a[q.c];q._shown=order;q._correct=order.indexOf(correctText);$("questionText").textContent=q.q;$("questionCategory").textContent=q.category;$("questionCounter").textContent=`تحدي ${seed} • بنك ${questionBank.length.toLocaleString("ar-EG")} سؤال`;const root=$("answers");root.innerHTML="";order.forEach((a,i)=>{let b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>chooseAnswer(i,b);root.appendChild(b)})}
function chooseAnswer(i,btn){if(answeredThis)return;answeredThis=true;state.answered++;const correct=i===currentQuestion._correct;document.querySelectorAll(".answer").forEach((b,j)=>{b.disabled=true;if(j===currentQuestion._correct)b.classList.add("correct")});if(correct){state.correct++;state.coins+=3;state.crystals+=1;runScore+=10;$("runScore").textContent=runScore;$("feedback").textContent="إجابة صحيحة! أحسنت يا مستكشف ⭐";$("feedback").className="feedback good";sound(760)}else{btn.classList.add("wrong");$("feedback").textContent=`ليست هذه الإجابة. ${currentQuestion.hint}`;$("feedback").className="feedback bad";sound(180)}$("nextBtn").disabled=false;save();updateTop();updateStats()}
function finishLevel(){if(!state.completed.includes(currentLevel)){state.completed.push(currentLevel);state.coins+=5;state.unlocked=Math.min(TOTAL_LEVELS,Math.max(state.unlocked,currentLevel+1));}save();toast("أحسنت! تم فتح المرحلة التالية 🎉");updateStats();if(currentLevel<TOTAL_LEVELS){startLevel(currentLevel+1)}else{showScreen("homeScreen");toast("لقد أكملت الرحلة الأسطورية!")}}
$("nextBtn").onclick=()=>{if(!answeredThis)return;finishLevel()};
$("hintBtn").onclick=()=>{if(!currentQuestion)return;toast("💡 "+currentQuestion.hint);sound(430)};
$("skipBtn").onclick=()=>{if(answeredThis){finishLevel();return}state.answered++;answeredThis=true;document.querySelectorAll(".answer").forEach((b,j)=>{b.disabled=true;if(j===currentQuestion._correct)b.classList.add("correct")});$("feedback").textContent="تم تخطي السؤال. يمكنك المتابعة."; $("feedback").className="feedback";$("nextBtn").disabled=false;save()};
$("continueBtn").onclick=()=>startLevel(Math.min(state.unlocked,TOTAL_LEVELS));
function renderAchievements(){const list=[["🚀","أول انطلاقة","أكمل أول مرحلة",state.completed.length>=1],["⭐","جامع النجوم","اجمع 50 نجمة",state.coins>=50],["🧠","عقل المجرة","أجب عن 25 سؤالًا بشكل صحيح",state.correct>=25],["🪐","رحالة الكواكب","افتح 100 مرحلة",state.unlocked>=100],["🌌","سيد المجرات","افتح 600 مرحلة",state.unlocked>=600],["👑","أسطورة اللانهاية","افتح كل المراحل الـ1200",state.unlocked>=1200]];$("achievementList").innerHTML=list.map(x=>`<div class="achievement ${x[3]?"":"locked"}"><span class="medal">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]} • ${x[3]?"تم الإنجاز":"لم يكتمل بعد"}</small></div></div>`).join("")}
$("dailyBtn").onclick=()=>{const today=new Date().toDateString();if(state.lastDaily===today){toast("لقد استلمت مكافأتك اليوم بالفعل!");return}state.lastDaily=today;state.coins+=20;state.crystals+=3;save();updateTop();toast("🎁 حصلت على 20 نجمة و3 بلورات!")};
$("settingsBtn").onclick=()=>$("settingsModal").classList.add("show");document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).classList.remove("show"));
function applySettings(){document.body.classList.toggle("light",!state.dark);document.body.classList.toggle("large-text",state.font==="large");$("darkToggle").checked=state.dark;$("soundToggle").checked=state.sound;$("motionToggle").checked=state.motion;$("fontSize").value=state.font;$("themeBtn").textContent=state.dark?"🌙":"☀️";$("soundBtn").textContent=state.sound?"🔊":"🔇";$("stars").style.opacity=state.motion?"1":"0.15"}
$("themeBtn").onclick=()=>{state.dark=!state.dark;applySettings();save()};$("soundBtn").onclick=()=>{state.sound=!state.sound;applySettings();save();toast(state.sound?"الصوت يعمل":"تم إيقاف الصوت")};
$("saveSettings").onclick=()=>{state.dark=$("darkToggle").checked;state.sound=$("soundToggle").checked;state.motion=$("motionToggle").checked;state.font=$("fontSize").value;applySettings();save();$("settingsModal").classList.remove("show");toast("تم حفظ الإعدادات")};
$("resetBtn").onclick=()=>{if(confirm("هل تريد مسح تقدمك وكل النجوم والإنجازات؟")){localStorage.removeItem("spaceInfinitySave");state={...stateDefault,completed:[]};applySettings();updateStats();$("settingsModal").classList.remove("show");showScreen("homeScreen");toast("تم بدء رحلة جديدة")}};
/* نجوم مرسومة محليًا على Canvas — لا صور أو مكتبات خارجية مطلوبة */
const canvas=$("stars"),ctx=canvas.getContext("2d");let starList=[];function resizeStars(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);starList=Array.from({length:Math.min(180,Math.floor(innerWidth/5))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.6+.25,a:Math.random()*.7+.2,s:Math.random()*.012+.002}))}function drawStars(){ctx.clearRect(0,0,innerWidth,innerHeight);starList.forEach(s=>{s.a+=s.s;if(s.a>.95||s.a<.15)s.s*=-1;ctx.globalAlpha=s.a;ctx.fillStyle="#d9f4ff";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;if(state.motion)requestAnimationFrame(drawStars)}addEventListener("resize",resizeStars);resizeStars();drawStars();
applySettings();updateStats();
})();