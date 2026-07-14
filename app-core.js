
(function(){
  const DAYS=["Pon","Wt","Śr","Czw","Pt","Sob","Nd"];
  const MEALS=[["breakfast","Śniadanie"],["lunch","Obiad"],["dinner","Kolacja"]];
  const CUISINES=["Japońska","Koreańska","Chińska","Indyjska","Tajska","Wietnamska","Bliski Wschód","Malezyjska","Turecka","Peruwiańska","Filipińska","Karaibska","Gruzińska","Lankijska","Grecka","Włoska","Francuska","Hiszp./Portug.","Nordycka","Meksykańska","Amerykańska","Polska","Europejska","Roślinna","Shake"];
  const STORAGE_KEY="kk_program_v8";
  const RECIPES_VERSION=4;   // podbij, gdy zmienią się wbudowane przepisy lub cele
  // prepStyle: 'mar' marynuj+zamroź | 'freeze' gotuj+zamroź | 'fresh' świeżo
  function R(id,name,cuis,mt,ptype,time,prot,prep,note,ing,steps){
    return {id,name,cuisine:cuis,mealTypes:mt,ptype,prepTime:time,proteinTotal:prot,prepStyle:prep,note,ingredients:ing,steps};
  }
  function seedRaw(){ return [
    // ——— JAPOŃSKA ———
    R("j1","Chirashi bowl — szybkie sushi dla Magdy","Japońska",["lunch","dinner"],"Ryby i owoce morza",20,84,"fresh",
      "Świeżo. Ryż do sushi możesz ugotować dzień wcześniej. Idealne, gdy Magda ma ochotę na sushi bez zamawiania.",
      ["300 g świeżego łososia i/lub tuńczyka (sushi-grade), w kostkę","200 g ryżu do sushi (suchy)","2 łyżki octu ryżowego","1/2 awokado, w plastry","1 ogórek, w słupki","edamame, nori, sezam","sos sojowy + odrobina wasabi"],
      ["Ugotuj ryż, wymieszaj z octem ryżowym, ostudź.","Ułóż ryż w miskach.","Poukładaj rybę, awokado, ogórek i edamame.","Posyp sezamem i nori, podawaj z sosem sojowym."]),
    R("j2","Katsu z kurczaka z ryżem i surówką z kapusty","Japońska",["lunch"],"Drób",30,112,"fresh",
      "Panierowanego kurczaka najlepiej smażyć świeżo. Sos katsu trzyma się tydzień w lodówce.",
      ["500 g piersi z kurczaka","1 jajko, mąka, panko","200 g ryżu (suchy)","1/4 kapusty, cienko poszatkowana","sos tonkatsu (lub ketchup+sos Worcester+sojowy)","1 łyżka oleju do smażenia"],
      ["Rozbij kurczaka, obtocz w mące, jajku i panko.","Smaż na złoto z obu stron.","Ugotuj ryż, poszatkuj kapustę.","Pokrój kurczaka w paski, polej sosem, podawaj z ryżem i kapustą."]),
    R("j3","Gyudon — miska wołowiny z ryżem","Japońska",["lunch","dinner"],"Wołowina",20,96,"freeze",
      "Sama wołowina w sosie mrozi się dobrze. Ryż i jajko świeżo.",
      ["500 g cienko krojonej wołowiny (np. rozmrożona plasterkowana)","2 cebule, w piórka","4 łyżki sosu sojowego","2 łyżki mirin","1 łyżka cukru","200 g ryżu (suchy)","2 jajka, marynowane lub sadzone","szczypiorek"],
      ["Podsmaż cebulę, dodaj wołowinę.","Wlej sos sojowy, mirin i cukier, duś 5-7 min.","Ugotuj ryż.","Nałóż wołowinę na ryż, dodaj jajko i szczypiorek."]),
    // ——— KOREAŃSKA ———
    R("k1","Kurczak po koreańsku (gochujang) z ryżem i marchewką po koreańsku","Koreańska",["lunch"],"Drób",35,116,"mar",
      "Marynatę + kurczaka można zamrozić surowe (vacuum) — Twój ulubiony smak zawsze pod ręką.",
      ["500 g piersi z kurczaka, w kostkę","2 łyżki gochujang","1 łyżka sosu sojowego","1 łyżka miodu","1 łyżeczka oleju sezamowego","2 ząbki czosnku, starte","200 g ryżu (suchy)","200 g marchewki po koreańsku","sezam, szczypiorek"],
      ["Wymieszaj gochujang, sojowy, miód, olej sezamowy i czosnek.","Podsmaż kurczaka, dodaj sos, duś 5-7 min.","Ugotuj ryż.","Podawaj z marchewką, sezamem i szczypiorkiem."]),
    R("k2","Bulgogi wołowe z ryżem i kimchi","Koreańska",["lunch"],"Wołowina",25,104,"mar",
      "Wołowina w marynacie bulgogi mrozi się świetnie surowa — rozmroź i podsmaż w 6 minut.",
      ["500 g cienko krojonej wołowiny","3 łyżki sosu sojowego","1 starta gruszka lub jabłko","1 łyżka oleju sezamowego","1 łyżka cukru","3 ząbki czosnku","200 g ryżu (suchy)","kimchi do podania","szczypiorek, sezam"],
      ["Zamarynuj wołowinę w sojowym, gruszce, oleju, cukrze i czosnku (min. 30 min).","Smaż na dużym ogniu 5-6 min.","Ugotuj ryż.","Podawaj z kimchi, sezamem i szczypiorkiem."]),
    R("k3","Bibimbap z wołowiną, warzywami i jajkiem","Koreańska",["lunch"],"Wołowina",35,98,"fresh",
      "Warzywa i mięso możesz przygotować wcześniej, składasz świeżo z jajkiem.",
      ["400 g mielonej lub krojonej wołowiny","200 g ryżu (suchy)","1 marchewka, cukinia, garść szpinaku","150 g kiełków fasoli","2 jajka sadzone","2 łyżki gochujang","olej sezamowy, sezam"],
      ["Podsmaż wołowinę z odrobiną sojowego.","Podsmaż osobno każde warzywo.","Ugotuj ryż.","Ułóż ryż, wokół warzywa i mięso, na wierzch jajko.","Podawaj z gochujang i olejem sezamowym."]),
    // ——— CHIŃSKA ———
    R("c1","Kung pao z kurczakiem, orzeszkami i ryżem","Chińska",["lunch","dinner"],"Drób",25,108,"fresh",
      "Świeżo — stir-fry najlepszy prosto z woka. Sos wymieszaj wcześniej.",
      ["500 g piersi z kurczaka, w kostkę","3 łyżki sosu sojowego","1 łyżka octu ryżowego","1 łyżeczka cukru","2 suszone papryczki chili","garść orzeszków ziemnych","2 ząbki czosnku, imbir","1 papryka, szczypiorek","200 g ryżu (suchy)"],
      ["Wymieszaj sos: sojowy, ocet, cukier.","Smaż kurczaka na woku do zrumienienia.","Dodaj czosnek, imbir, chili i paprykę.","Wlej sos, dodaj orzeszki, smaż 2 min.","Podawaj z ryżem i szczypiorkiem."]),
    R("c2","Wołowina z brokułami w sosie ostrygowym","Chińska",["lunch","dinner"],"Wołowina",25,100,"fresh",
      "Świeżo. Wołowinę pokrój i zamarynuj — resztę robisz w 15 min.",
      ["500 g wołowiny (rozbratel), w cienkie paski","1 duży brokuł, różyczki","3 łyżki sosu ostrygowego","1 łyżka sosu sojowego","1 łyżeczka mąki ziemniaczanej","2 ząbki czosnku, imbir","200 g ryżu (suchy)"],
      ["Zamarynuj wołowinę w sojowym i mące 15 min.","Zblanszuj brokuł 2 min.","Smaż wołowinę na dużym ogniu 3 min, odłóż.","Podsmaż czosnek i imbir, dodaj brokuł i sos ostrygowy.","Wróć wołowinę, wymieszaj, podawaj z ryżem."]),
    R("c3","Smażony ryż z krewetkami i jajkiem","Chińska",["lunch","dinner"],"Ryby i owoce morza",20,76,"fresh",
      "Idealne na ugotowany dzień wcześniej ryż. Twoje mrożone obrane krewetki wrzucasz wprost.",
      ["400 g mrożonych obranych krewetek (rozmrożonych)","350 g ugotowanego, wystudzonego ryżu","3 jajka","150 g mrożonego groszku i marchewki","3 łyżki sosu sojowego","szczypiorek, olej sezamowy"],
      ["Rozgrzej wok, usmaż roztrzepane jajka, odłóż.","Podsmaż krewetki 2 min, odłóż.","Podsmaż groszek z marchewką, dodaj ryż i sojowy.","Wróć jajka i krewetki, skrop olejem sezamowym."]),
    R("c4","Mapo tofu z mieloną wieprzowiną","Chińska",["lunch"],"Roślinne",25,66,"freeze",
      "Sos z tofu i mięsem mrozi się dobrze. Ryż świeżo.",
      ["400 g tofu twardego, w kostkę","200 g mielonej wieprzowiny","2 łyżki pasty doubanjiang (lub gochujang)","2 ząbki czosnku, imbir","1 łyżka sosu sojowego","szczypiorek","200 g ryżu (suchy)"],
      ["Podsmaż mięso z czosnkiem i imbirem.","Dodaj pastę, chwilę smaż.","Wlej trochę wody, dodaj tofu, duś delikatnie 8 min.","Podawaj z ryżem i szczypiorkiem."]),
    // ——— INDYJSKA ———
    R("i1","Butter chicken (murgh makhani) z ryżem basmati","Indyjska",["lunch"],"Drób",40,118,"freeze",
      "Sos mrozi się świetnie. Kurczaka możesz zamarynować i zamrozić osobno.",
      ["500 g udek z kurczaka bez kości, w kostkę","150 g jogurtu naturalnego","2 łyżki pasty imbirowo-czosnkowej","400 g passaty pomidorowej","60 ml śmietanki 30%","1 łyżka masła","2 łyżeczki garam masali, kurkuma, chili","200 g ryżu basmati (suchy)"],
      ["Zamarynuj kurczaka w jogurcie i połowie przypraw (30 min).","Obsmaż kurczaka, odłóż.","Na maśle podsmaż pastę i przyprawy, dodaj passatę, duś 10 min.","Wlej śmietankę, wróć kurczaka, duś 10 min.","Podawaj z ryżem basmati."]),
    R("i2","Tandoori udka z kurczaka z ryżem i raitą","Indyjska",["lunch"],"Drób",35,120,"mar",
      "Sztandarowa opcja marynuj+zamroź — udka w marynacie tandoori vacuum sealed, rozmroź i upiecz.",
      ["500 g udek z kurczaka","200 g jogurtu naturalnego","2 łyżki pasty tandoori masala","2 ząbki czosnku, imbir","sok z 1 cytryny","200 g ryżu (suchy)","raita: jogurt + starty ogórek + kmin","kolendra"],
      ["Zamarynuj udka w jogurcie, tandoori, czosnku i cytrynie (min. 2 godz. lub zamroź).","Piecz w 220°C ok. 25-30 min.","Ugotuj ryż, zrób raitę.","Podawaj z ryżem, raitą i kolendrą."]),
    R("i3","Dal z soczewicy z jajkiem i naanem","Indyjska",["lunch"],"Roślinne",30,54,"freeze",
      "Dal mrozi się bardzo dobrze. Jajko i naan świeżo.",
      ["300 g czerwonej soczewicy (sucha)","4 kromki chleba na zakwasie","1 cebula, 2 ząbki czosnku, imbir","1 puszka pomidorów","2 łyżeczki garam masali, kurkuma, kmin","4 jajka na twardo lub sadzone","naan lub ryż","kolendra"],
      ["Zeszklij cebulę z czosnkiem, imbirem i przyprawami.","Dodaj pomidory i soczewicę, zalej wodą, gotuj 20 min.","Dopraw, w razie potrzeby zblenduj część.","Podawaj z jajkiem, naanem i kolendrą."]),
    // ——— TAJSKA ———
    R("t1","Czerwone curry z kurczakiem i ryżem jaśminowym","Tajska",["lunch"],"Drób",35,124,"freeze",
      "Mrozi się świetnie do 3 miesięcy. Ryż świeżo przy odgrzaniu.",
      ["400 g piersi z kurczaka, w kostkę","400 ml mleka kokosowego","2 łyżki czerwonej pasty curry","1 papryka, 1 cukinia","200 g ryżu jaśminowego (suchy)","kolendra, sok z limonki","1 łyżka oleju"],
      ["Podsmaż kurczaka.","Dodaj pastę curry, smaż 1 min.","Wlej mleko kokosowe, dodaj warzywa, gotuj 15 min.","Dopraw limonką, podawaj z ryżem i kolendrą."]),
    R("t2","Pad krapow — bazyliowy kurczak z ryżem i jajkiem","Tajska",["lunch","dinner"],"Drób",20,106,"fresh",
      "Bardzo szybkie, mocno aromatyczne. Idealne na wieczór bez energii.",
      ["500 g mielonego lub drobno krojonego kurczaka","3 ząbki czosnku, 2 papryczki chili","2 łyżki sosu sojowego","1 łyżka sosu rybnego","1 łyżeczka cukru","garść bazylii tajskiej","200 g ryżu (suchy)","2 jajka sadzone"],
      ["Podsmaż czosnek i chili.","Dodaj kurczaka, smaż do zrumienienia.","Wlej sosy i cukier, dorzuć bazylię.","Podawaj z ryżem i jajkiem sadzonym."]),
    R("t3","Pad thai z krewetkami","Tajska",["lunch","dinner"],"Ryby i owoce morza",25,72,"fresh",
      "Świeżo — makaron ryżowy najlepszy prosto z woka. Twoje mrożone krewetki wrzucasz wprost.",
      ["400 g mrożonych obranych krewetek (rozmrożonych)","200 g makaronu ryżowego","2 jajka","3 łyżki sosu tamaryndowego (lub ocet+cukier+sojowy)","2 łyżki sosu rybnego","kiełki fasoli, szczypiorek","30 g orzeszków ziemnych, limonka"],
      ["Namocz makaron ryżowy wg opakowania.","Usmaż jajka na woku, odłóż.","Podsmaż krewetki, dodaj makaron i sos.","Wróć jajka, dodaj kiełki, posyp orzeszkami, skrop limonką."]),
    // ——— WIETNAMSKA ———
    R("v1","Bun cha z kaczką — grillowana kaczka z makaronem ryżowym","Wietnamska",["lunch"],"Drób",30,94,"mar",
      "Kaczkę w marynacie zamroź surową. Smaż skórą do dołu, aż się wytopi i zrobi chrupiąca. Mniej roboty niż pho, a smak wietnamski zostaje.",
      ["400 g piersi z kaczki, w plastry (ze skórą)","2 łyżki sosu rybnego","1 łyżka cukru trzcinowego","2 ząbki czosnku, trawa cytrynowa","200 g makaronu ryżowego","sos nuoc cham (rybny+limonka+cukier+chili)","zioła: mięta, kolendra; sałata, marchewka"],
      ["Zamarynuj kaczkę w sosie rybnym, cukrze, czosnku i trawie cytrynowej.","Smaż skórą do dołu na zimnej patelni, stopniowo grzejąc, aż skóra będzie chrupiąca (8-10 min), potem 2-3 min z drugiej strony.","Ugotuj makaron ryżowy.","Podawaj makaron, mięso, zioła i warzywa z sosem nuoc cham."]),
    R("v2","Miska z cytrynową trawą i kurczakiem (bun ga)","Wietnamska",["lunch","dinner"],"Drób",25,104,"mar",
      "Kurczak w marynacie z trawą cytrynową świetnie się mrozi.",
      ["500 g piersi lub udek, w kostkę","2 łyżki sosu rybnego","2 łodygi trawy cytrynowej, drobno","2 ząbki czosnku, 1 łyżeczka cukru","200 g makaronu ryżowego","zioła, ogórek, marchewka","orzeszki, sos nuoc cham"],
      ["Zamarynuj kurczaka w sosie rybnym, trawie cytrynowej, czosnku i cukrze.","Podsmaż do zrumienienia.","Ugotuj makaron ryżowy.","Złóż miskę: makaron, kurczak, warzywa, zioła, sos, orzeszki."]),
    // ——— BLISKI WSCHÓD ———
    R("m1","Shawarma z kurczaka z hummusem i pitą","Bliski Wschód",["lunch"],"Drób",30,122,"mar",
      "Kurczak w marynacie shawarma zamroź surowy — Twoje ulubione bliskowschodnie smaki na zawołanie.",
      ["500 g udek z kurczaka, w paski","1 łyżka oliwy","2 łyżeczki kuminu, kolendry, papryki, kurkumy","2 ząbki czosnku, sok z cytryny","hummus (własny lub gotowy)","4 pity","pomidor, ogórek, cebula","sos czosnkowy (toum) lub jogurtowy"],
      ["Zamarynuj kurczaka w oliwie, przyprawach, czosnku i cytrynie.","Upiecz lub usmaż do zrumienienia.","Podgrzej pity, przygotuj warzywa.","Podawaj z hummusem, warzywami i sosem czosnkowym."]),
    R("m2","Kofta — mielone kotleciki z bulgurem i jogurtem","Bliski Wschód",["lunch"],"Wołowina",30,108,"mar",
      "Uformowane kofty mrożą się świetnie surowe. Bulgur świeżo w 15 min.",
      ["500 g mielonej wołowiny (lub mix wołowo-jagnięcy)","1 cebula drobno starta, natka, kolendra","2 łyżeczki kuminu, kolendry, cynamon szczypta","200 g bulguru (suchy)","jogurt grecki + czosnek + mięta","sumak, pomidor"],
      ["Wymieszaj mięso z cebulą, ziołami i przyprawami, uformuj podłużne kofty.","Zgrilluj lub usmaż.","Ugotuj bulgur.","Podawaj z bulgurem, jogurtem czosnkowym i sumakiem."]),
    R("m3","Miska falafel z hummusem i tabbouleh","Bliski Wschód",["lunch"],"Roślinne",30,52,"freeze",
      "Falafel możesz upiec i zamrozić. Świetne dla roślinnego dnia.",
      ["2 puszki ciecierzycy","1 cebula, 3 ząbki czosnku, natka, kolendra","1 łyżeczka kuminu, sody","hummus","tabbouleh: 100 g bulguru + natka + pomidor + cytryna","4 pity","jogurt"],
      ["Zblenduj ciecierzycę z cebulą, czosnkiem, ziołami i przyprawami.","Uformuj kulki, upiecz w 200°C 25 min (lub usmaż).","Zrób tabbouleh.","Podawaj z hummusem, tabbouleh i pitą."]),
    // ——— MALEZYJSKA ———
    R("y1","Rendang wołowe z ryżem","Malezyjska",["lunch"],"Wołowina",120,110,"freeze",
      "Król dań na zapas — mrozi się fantastycznie, smak lepszy po przegryzieniu. Długi czas duszenia to sama praca garnka.",
      ["500 g wołowiny (łopatka), w kostkę","400 ml mleka kokosowego","2 łyżki pasty rendang (lub curry + kurkuma + trawa cytrynowa)","2 cebule, 3 ząbki czosnku, imbir, galangal","1 łyżka tamaryndu","200 g ryżu (suchy)"],
      ["Zblenduj cebulę, czosnek, imbir i przyprawy na pastę.","Obsmaż wołowinę, dodaj pastę.","Wlej mleko kokosowe i tamarynd, duś na małym ogniu 1,5-2 godz. aż sos odparuje.","Podawaj z ryżem."]),
    R("y2","Satay z kurczaka z sosem orzechowym","Malezyjska",["lunch"],"Drób",30,112,"mar",
      "Kurczak na szpadkach w marynacie zamroź surowy. Sos orzechowy trzyma się tydzień.",
      ["500 g piersi lub udek, w kostkę","2 łyżeczki kurkumy, kolendry, kuminu","1 łyżka sosu sojowego, trawa cytrynowa","sos: 2 łyżki masła orzechowego + 100 ml mleka kokosowego + sos sojowy + chili","200 g ryżu (suchy)","ogórek, cebula"],
      ["Zamarynuj kurczaka w przyprawach i sojowym.","Nabij na szpadki, zgrilluj lub upiecz.","Wymieszaj sos orzechowy, podgrzej.","Podawaj z ryżem, sosem i warzywami."]),
    // ——— GRECKA ———
    R("g1","Gyros z kurczaka z ziemniakami po grecku i tzatziki","Grecka",["lunch"],"Drób",45,120,"mar",
      "Kurczak w marynacie zamroź surowy. Ziemniaki i tzatziki świeżo.",
      ["500 g udek z kurczaka","sok z 1 cytryny, 1 łyżka oliwy","1 łyżeczka oregano, 2 ząbki czosnku","800 g ziemniaków, w ćwiartki","tzatziki: jogurt grecki + ogórek + czosnek + koperek"],
      ["Zamarynuj kurczaka w cytrynie, oliwie, oregano i czosnku.","Piecz ziemniaki z oliwą i oregano w 200°C 40 min.","Upiecz kurczaka 20-25 min.","Zrób tzatziki, podawaj razem."]),
    R("g2","Keftedes — greckie pulpeciki z fetą i sałatką","Grecka",["lunch"],"Wołowina",30,106,"freeze",
      "Pulpeciki mrożą się świetnie surowe lub upieczone. Twoje ulubione greckie smaki.",
      ["500 g mielonej wołowiny (chuda, do 10% tł.)","1 cebula starta, natka, mięta","1 łyżeczka oregano, kmin","60 g fety","sałatka grecka: pomidor, ogórek, oliwki, feta, cebula","4 pity","oliwa"],
      ["Wymieszaj mięso z cebulą, ziołami i przyprawami, uformuj pulpeciki.","Usmaż lub upiecz do zrumienienia.","Zrób sałatkę grecką.","Podawaj z fetą, sałatką i pitą."]),
    R("g3","Halloumi z bulgurem, warzywami i jogurtem","Grecka",["lunch","dinner"],"Roślinne",20,58,"fresh",
      "Bardzo szybkie danie roślinno-serowe. Halloumi grillujesz w 5 min.",
      ["250 g halloumi, w plastry","200 g bulguru (suchy)","1 cukinia, 1 papryka, grillowane","jogurt grecki, mięta","sok z cytryny, oliwa, sumak"],
      ["Ugotuj bulgur.","Zgrilluj halloumi i warzywa.","Wymieszaj bulgur z warzywami, cytryną i oliwą.","Podawaj z halloumi i jogurtem z miętą."]),
    // ——— WŁOSKA ———
    R("w1","Bolognese z indyka z pełnoziarnistym makaronem","Włoska",["lunch"],"Drób",45,104,"freeze",
      "Klasyk na zapas — mrozi się bardzo dobrze. Makaron świeżo.",
      ["500 g mielonego indyka","1 cebula, marchewka, seler naciowy","2 ząbki czosnku, 1 puszka pomidorów","2 łyżki koncentratu, oregano, bazylia","240 g pełnoziarnistego makaronu (suchy)","parmezan"],
      ["Podsmaż warzywa, dodaj czosnek.","Dodaj mięso, smaż do zrumienienia.","Dodaj pomidory, koncentrat i zioła, duś 30 min.","Podawaj z makaronem i parmezanem."]),
    R("w2","Kurczak parmigiana z makaronem","Włoska",["lunch"],"Drób",40,118,"fresh",
      "Świeżo z piekarnika. Sos pomidorowy możesz zrobić wcześniej.",
      ["500 g piersi z kurczaka","jajko, mąka, panko","400 g passaty, czosnek, bazylia","100 g mozzarelli","parmezan","240 g makaronu (suchy)"],
      ["Rozbij kurczaka, panieruj i podsmaż.","Zrób szybki sos pomidorowy.","Ułóż kurczaka w naczyniu, polej sosem, przykryj mozzarellą i parmezanem.","Zapiekaj 15 min w 200°C, podawaj z makaronem."]),
    R("w3","Pinsa proteinowa na kolację","Włoska",["dinner"],"Drób",30,86,"fresh",
      "Spód pinsy kup gotowy lub zrób wcześniej. Kolacja, którą oboje lubicie, z porządną dawką białka.",
      ["2 spody pinsy (gotowe lub domowe)","150 g passaty","100 g mozzarelli","200 g pieczonego kurczaka lub szynki parmeńskiej","rukola, parmezan, oliwa"],
      ["Rozsmaruj passatę na spodach.","Dodaj mozzarellę.","Piecz w 230°C 8-10 min.","Po upieczeniu dodaj kurczaka/szynkę, rukolę i parmezan."]),
    R("w4","Makaron z krewetkami, czosnkiem i chili","Włoska",["lunch","dinner"],"Ryby i owoce morza",20,70,"fresh",
      "Bardzo szybkie. Twoje mrożone krewetki wrzucasz po krótkim rozmrożeniu.",
      ["500 g mrożonych obranych krewetek (rozmrożonych)","240 g makaronu (spaghetti/linguine)","4 ząbki czosnku, 1 chili","2 łyżki oliwy, sok z cytryny","natka pietruszki"],
      ["Ugotuj makaron al dente.","Podsmaż czosnek i chili na oliwie.","Dodaj krewetki, smaż 2-3 min.","Wymieszaj z makaronem, dodaj cytrynę i natkę."]),
    // ——— HISZPAŃSKA / PORTUGALSKA ———
    R("h1","Piri piri kurczak z ryżem i grillowaną papryką","Hiszp./Portug.",["lunch"],"Drób",35,120,"mar",
      "Kurczak w marynacie piri piri zamroź surowy — portugalski klasyk na zawołanie.",
      ["500 g udek lub piersi z kurczaka","3 łyżki sosu piri piri (lub chili+czosnek+papryka+ocet+oliwa)","2 ząbki czosnku, sok z cytryny","200 g ryżu (suchy)","2 papryki, grillowane","kolendra"],
      ["Zamarynuj kurczaka w piri piri, czosnku i cytrynie.","Upiecz lub zgrilluj, polewając marynatą.","Ugotuj ryż, zgrilluj paprykę.","Podawaj razem, posyp kolendrą."]),
    R("h2","Gambas al ajillo — krewetki w czosnku i oliwie","Hiszp./Portug.",["lunch","dinner"],"Ryby i owoce morza",15,64,"fresh",
      "Najszybsze danie w programie — krewetki, czosnek, chili, chleb. 15 minut.",
      ["500 g mrożonych obranych krewetek (rozmrożonych)","6 ząbków czosnku, w plasterkach","1 papryczka chili","5 łyżek oliwy","natka, sok z cytryny","chleb na zeszklenie sosu"],
      ["Rozgrzej oliwę z czosnkiem i chili na małym ogniu.","Dodaj krewetki, smaż 3 min.","Dopraw cytryną i natką.","Podawaj z chlebem do maczania w sosie."]),
    // ——— MEKSYKAŃSKA ———
    R("x1","Chili con carne z indyka z ryżem i awokado","Meksykańska",["lunch"],"Drób",40,118,"freeze",
      "Świetnie się mrozi do 3 miesięcy, smak lepszy na drugi dzień.",
      ["500 g mielonego indyka","1 puszka pomidorów, 1 puszka czerwonej fasoli","1 puszka kukurydzy, 1 cebula, 2 ząbki czosnku","2 łyżeczki chili, kmin","200 g ryżu (suchy)","1/2 awokado"],
      ["Podsmaż cebulę, czosnek i mięso.","Dodaj przyprawy, pomidory, fasolę i kukurydzę.","Duś 25-30 min.","Podawaj z ryżem i awokado."]),
    R("x2","Carnitas — meksykańska wieprzowina z tortillami","Meksykańska",["lunch"],"Wieprzowina",180,132,"freeze",
      "Idealne na zapas — mrozi się świetnie. Głównie praca piekarnika/garnka, nie Twoja.",
      ["400 g łopatki wieprzowej (odtłuszczonej), w dużą kostkę","2 pomarańcze (sok), 1 cebula","4 ząbki czosnku, 2 łyżeczki kuminu, oregano","6 tortilli kukurydzianych","1/2 awokado, kolendra, limonka, cebula"],
      ["Natrzyj mięso przyprawami, ułóż z cebulą, czosnkiem i sokiem z pomarańczy.","Duś pod przykryciem 3 godz. w 160°C aż się rozpada.","Rozszarp i podpiecz na patelni do chrupkości.","Podawaj w tortillach z awokado, kolendrą i limonką."]),
    R("x3","Burrito bowl z wołowiną, fasolą i awokado","Meksykańska",["lunch","dinner"],"Wołowina",30,112,"fresh",
      "Świetne pod meal prep w pojemnikach. Awokado dodawaj świeżo.",
      ["500 g mielonej lub krojonej wołowiny","2 łyżeczki przyprawy taco","1 puszka czarnej fasoli, kukurydza","200 g ryżu (suchy)","1/2 awokado, salsa, limonka","kolendra, jogurt/śmietana"],
      ["Podsmaż wołowinę z przyprawą taco.","Ugotuj ryż, podgrzej fasolę i kukurydzę.","Złóż miski: ryż, mięso, fasola, kukurydza.","Dodaj awokado, salsę, jogurt, limonkę."]),
    // ——— AMERYKAŃSKA ———
    R("a1","Stek wołowy z pieczonymi ziemniakami i rukolą","Amerykańska",["lunch","dinner"],"Wołowina",30,90,"fresh",
      "Zawsze świeżo — stek na dobry wieczór, 30 minut.",
      ["2 steki (rostbef/antrykot), ok. 500 g","800 g ziemniaków, w ćwiartki","1 łyżka oliwy, rozmaryn","100 g rukoli, parmezan","masło, tymianek do polewania"],
      ["Piecz ziemniaki z oliwą i rozmarynem 35 min w 200°C.","Osusz i posól steki, obsmaż 2-3 min z każdej strony, polewając masłem z tymiankiem.","Odstaw stek na 5 min.","Podawaj z ziemniakami i rukolą z parmezanem."]),
    R("a2","Pulled pork z colesław i bułką","Amerykańska",["lunch"],"Wieprzowina",480,140,"freeze",
      "Idealne na zapas — mrozi się świetnie. Długi czas to wolnowar bez Twojej pracy.",
      ["400 g łopatki wieprzowej (odtłuszczonej)","2 łyżki suchej marynaty (papryka, kmin, cukier, czosnek)","60 ml sosu BBQ","1/4 kapusty, 1 marchewka","1 łyżka majonezu, ocet jabłkowy","2 duże bułki pełnoziarniste"],
      ["Natrzyj mięso marynatą, odstaw min. 1 godz.","Gotuj w wolnowarze 8 godz. na niskiej mocy.","Rozszarp, wymieszaj z BBQ.","Zrób colesław, podawaj w bułce."]),
    // ——— POLSKA / EUROPEJSKA ———
    R("p1","Gulasz wołowy z kaszą gryczaną i surówką z czerwonej kapusty","Polska/Europejska",["lunch"],"Wołowina",90,110,"freeze",
      "Idealny na zapas — smak się rozwija, mrozi się bardzo dobrze.",
      ["500 g wołowiny gulaszowej","2 cebule, 2 łyżki koncentratu","1 łyżeczka papryki, liść laurowy","300 ml bulionu","200 g kaszy gryczanej (sucha)","1/2 czerwonej kapusty, ocet jabłkowy"],
      ["Obsmaż wołowinę partiami.","Zeszklij cebulę z papryką i koncentratem.","Wróć mięso, zalej bulionem, duś 1,5-2 godz.","Ugotuj kaszę, zrób surówkę z kapusty."]),
    R("p2","Kotlety mielone z ziemniakami i mizerią","Polska/Europejska",["lunch"],"Wołowina",40,104,"freeze",
      "Usmażone kotlety mrożą się dobrze. Narodowy comfort food dla głowy.",
      ["500 g mielonego chudego (wołowo-wieprzowe)","1 cebula, 1 jajko, bułka tarta","800 g ziemniaków","mizeria: ogórek + jogurt + koperek","koperek do ziemniaków"],
      ["Wymieszaj mięso z cebulą, jajkiem i bułką, uformuj kotlety.","Usmaż na złoto.","Ugotuj ziemniaki, zrób mizerię.","Podawaj razem."]),
    R("p3","Rosół / zupa proteinowa z makaronem i mięsem","Polska/Europejska",["lunch"],"Drób",120,60,"freeze",
      "Legalny dzień zupy — niższe białko jest OK w skali tygodnia. Bulion mrozi się świetnie.",
      ["600 g elementów rosołowych (skrzydła, udka, korpus)","włoszczyzna: marchew, seler, por, pietruszka","liść laurowy, ziele angielskie","160 g makaronu do zupy (suchy)","natka pietruszki","250 g ugotowanego mięsa z rosołu do dodania"],
      ["Zalej mięso i włoszczyznę wodą, gotuj 2 godz. na małym ogniu.","Odcedź, dopraw.","Ugotuj makaron osobno.","Podawaj z makaronem, dużą ilością mięsa i natką (dodaj mięso, by podbić białko)."]),
    // ——— ROŚLINNA ———
    R("r7","Chana masala z ryżem basmati i jajkiem","Roślinna",["lunch"],"Roślinne",30,58,"freeze",
      "Mrozi się bardzo dobrze. Jajko świeżo.",
      ["2 puszki ciecierzycy","1 cebula, 2 ząbki czosnku, imbir","1 puszka pomidorów","1,5 łyżeczki garam masali, kmin","200 g ryżu basmati (suchy)","4 jajka"],
      ["Zeszklij cebulę z czosnkiem i imbirem.","Dodaj przyprawy, potem pomidory i ciecierzycę.","Duś 20 min.","Podawaj z ryżem i jajkiem sadzonym."]),
    R("r11","Krem z czerwonej soczewicy z grzankami i jajkiem","Roślinna",["lunch"],"Roślinne",30,64,"freeze",
      "Zupa mrozi się bardzo dobrze. Jajko i grzanki świeżo.",
      ["300 g czerwonej soczewicy","1 cebula, marchewka, seler","2 ząbki czosnku, kmin","1 l bulionu warzywnego","4 kromki chleba, 4 jajka","oliwa"],
      ["Zeszklij warzywa z czosnkiem i kminem.","Dodaj soczewicę i bulion, gotuj 20 min, zblenduj.","Zrób grzanki i jajka.","Podawaj z grzankami, jajkiem i oliwą."]),
    // ——— ŚNIADANIA (rotacja 16+) ———
    R("b1","Owsianka proteinowa z serkiem wiejskim i owocami","Polska/Europejska",["breakfast"],"—",10,48,"fresh","Świeżo rano, 10 minut.",
      ["160 g płatków owsianych","400 ml mleka","200 g serka wiejskiego lub skyr","garść orzechów, owoce, miód"],
      ["Ugotuj płatki na mleku 5 min.","Dodaj serek/skyr, owoce, orzechy i miód."]),
    R("b5","Owsianka na noc (overnight oats)","Polska/Europejska",["breakfast"],"—",8,42,"freeze","Rób na 2-4 dni w słoikach — rano tylko wyjmujesz.",
      ["200 g płatków owsianych","600 ml mleka lub jogurtu","200 g skyr","2 łyżki chia","owoce, miód"],
      ["Wymieszaj płatki, mleko, skyr i chia w słoikach.","Wstaw do lodówki na noc.","Rano dodaj owoce i miód."]),
    R("b13","Overnight oats z masłem orzechowym i bananem","Polska/Europejska",["breakfast"],"—",5,38,"freeze","Rób na 3-4 dni naraz.",
      ["200 g płatków owsianych","600 ml mleka","2 łyżki masła orzechowego","2 banany, cynamon, miód"],
      ["Wymieszaj płatki, mleko i masło orzechowe w słoikach.","Do lodówki na noc.","Rano dodaj banana, cynamon i miód."]),
    R("b2","Omlet z twarogiem i szczypiorkiem","Polska/Europejska",["breakfast"],"—",12,58,"fresh","Świeżo, 12 minut.",
      ["6 jajek","200 g twarogu","szczypiorek","4 kromki chleba, masło"],
      ["Roztrzep jajka, usmaż omlet.","Na pół wyłóż twaróg i szczypiorek, złóż.","Podawaj z pieczywem."]),
    R("b6","Jajecznica z awokado na grzance","Polska/Europejska",["breakfast"],"—",10,40,"fresh","Świeżo, 10 minut.",
      ["6 jajek","1/2 awokado","4 kromki chleba","chili flakes, cytryna, oliwa"],
      ["Podpiecz pieczywo.","Usmaż jajecznicę.","Rozgnieć awokado z cytryną na grzankach, nałóż jajecznicę, posyp chili."]),
    R("b7","Szakszuka","Bliski Wschód",["breakfast"],"—",20,40,"freeze","Sos zrób dzień wcześniej — rano wbijasz jajka i 8 min.",
      ["6 jajek","1 puszka pomidorów","1 papryka, 1 cebula, 2 ząbki czosnku","kmin, wędzona papryka","50 g fety, pieczywo"],
      ["Podsmaż cebulę i paprykę z czosnkiem i przyprawami.","Dodaj pomidory, gotuj 10 min.","Wbij jajka, przykryj, gotuj 6-8 min.","Posyp fetą, podawaj z pieczywem."]),
    R("b8","Naleśniki proteinowe z jogurtem i owocami","Polska/Europejska",["breakfast"],"—",15,44,"fresh","Ciasto blendujesz w 2 min.",
      ["4 jajka","200 g twarogu","60 g mąki owsianej","200 g jogurtu greckiego","200 g owoców","2 łyżki miodu"],
      ["Zblenduj jajka, twaróg i mąkę.","Smaż małe placki 1-2 min z każdej strony.","Podawaj z jogurtem, owocami i miodem."]),
    R("b3","Tofu scramble z warzywami i kurkumą","Roślinna",["breakfast"],"—",15,38,"fresh","Świeżo, szybkie, roślinne.",
      ["400 g tofu naturalnego","1 papryka, garść szpinaku","kurkuma, czosnek granulowany","oliwa, 4 kromki pieczywa"],
      ["Podsmaż paprykę.","Dodaj pokruszone tofu, kurkumę i czosnek, smaż 5 min.","Dorzuć szpinak, podawaj z pieczywem."]),
    R("b9","Smoothie bowl proteinowe","Polska/Europejska",["breakfast"],"—",8,40,"fresh","8 minut, gdy nie chcesz nic ciepłego.",
      ["2 mrożone banany","300 g mrożonych owoców","400 ml mleka/jogurtu","2 miarki białka lub 200 g skyr","60 g granoli, 20 g orzechów"],
      ["Zblenduj owoce, mleko i białko na gęsty krem.","Przełóż do misek, udekoruj granolą i orzechami."]),
    R("b10","Babeczki jajeczne z szynką i warzywami","Polska/Europejska",["breakfast"],"—",30,28,"freeze","Piecz raz w weekend — mrozi się świetnie, rano 2 muffinki/os. i 2 min.",
      ["10 jajek","150 g szynki lub bekonu","1 papryka, garść szpinaku","sól, pieprz","4 kromki chleba na zakwasie","owoce do podania"],
      ["Roztrzep jajka.","Rozłóż szynkę i warzywa do 12 foremek, zalej jajkami.","Piecz 18-20 min w 180°C.","Studź, przechowuj 5 dni lub zamroź."]),
    R("b14","Burrito śniadaniowe z jajkami i fasolą (do zamrożenia)","Meksykańska",["breakfast"],"—",25,46,"freeze","Zawiń kilka na zapas i zamroź — rano odgrzej 10 min.",
      ["8 jajek","1 puszka czarnej fasoli","70 g sera, salsa","4 tortille, 1 papryka"],
      ["Usmaż jajecznicę z papryką.","Rozłóż na tortille z fasolą, serem i salsą, zawiń.","Zjedz od razu lub zamroź w folii."]),
    R("b15","Kanapka z hummusem, jajkiem i rukolą","Bliski Wschód",["breakfast"],"—",8,34,"fresh","Świeżo, 8 minut, roślinno-jajeczna.",
      ["4 łyżki hummusu","4 jajka na twardo","rukola","4 kromki chleba, oliwa, chili"],
      ["Rozsmaruj hummus.","Ułóż plastry jajka i rukolę, skrop oliwą, posyp chili."]),
    R("b11","Pasta jajeczna z rzodkiewką na pieczywie","Polska/Europejska",["breakfast"],"—",10,34,"fresh","Pasta trzyma się 2 dni, jeśli zrobisz więcej.",
      ["6 jajek na twardo","3 łyżki jogurtu, musztarda","rzodkiewki, szczypiorek","4 kromki chleba"],
      ["Posiekaj jajka, wymieszaj z jogurtem i musztardą.","Dodaj rzodkiewki i szczypiorek, rozsmaruj na pieczywie."]),
    R("b12","Twarożek ze szczypiorkiem, rzodkiewką i pomidorem","Polska/Europejska",["breakfast"],"—",5,40,"fresh","Zero gotowania, 5 minut — najszybsza opcja.",
      ["400 g twarogu półtłustego","2 łyżki jogurtu","szczypiorek, rzodkiewki, pomidor","6 kromek pieczywa żytniego","owoce"],
      ["Rozgnieć twaróg z jogurtem.","Dodaj szczypiorek i rzodkiewki, podawaj z pomidorem i pieczywem."]),
    R("b4","Bowl jogurtowy z granolą i owocami","Polska/Europejska",["breakfast"],"—",5,40,"fresh","Zero gotowania — granolę możesz zrobić na cały tydzień.",
      ["400 g jogurtu greckiego","80 g granoli","orzechy, owoce, miód"],
      ["Rozłóż jogurt, dodaj granolę, orzechy i owoce, polej miodem."]),
    R("b16","Wrap śniadaniowy z jajecznicą i wędzonym łososiem","Polska/Europejska",["breakfast"],"—",10,44,"fresh","Świeżo, 10 minut — porządne białko na start.",
      ["6 jajek","100 g wędzonego łososia","2 duże tortille","serek śmietankowy, szczypiorek, rukola","1 banan lub 150 g owoców"],
      ["Usmaż jajecznicę.","Posmaruj tortille serkiem, dodaj jajecznicę, łososia i rukolę, zawiń."]),
    // ——— DNI RATUNKOWE / SPECJALNE ———
    R("q1","Ratunkowy wrap z kurczakiem i hummusem","Bliski Wschód",["lunch","dinner"],"Drób",10,55,"fresh","Dzień bez energii — złóż z gotowych składników w 10 min.",
      ["2 tortille","300 g pieczonego kurczaka","4 łyżki hummusu","mix sałat, marchewka, ogórek"],
      ["Rozsmaruj hummus, ułóż kurczaka i warzywa, zwiń."]),
    R("q2","Ratunkowa kanapka z tuńczykiem i jajkiem","Polska/Europejska",["breakfast","lunch","dinner"],"Ryby i owoce morza",10,45,"fresh","Więcej białka niż zwykła kanapka, zero gotowania.",
      ["1 puszka tuńczyka","2 jajka na twardo","jogurt/majonez, szczypiorek","4 kromki chleba, pomidor, sałata"],
      ["Wymieszaj tuńczyka, jajka, jogurt i szczypiorek.","Rozsmaruj na pieczywie z pomidorem i sałatą."])
    ,
    // ——— SZYBKIE KOLACJE ———
    R("d1","Tuna melt — zapiekana kanapka z tuńczykiem i serem","Polska/Europejska",["dinner"],"Ryby i owoce morza",15,46,"fresh","Świeżo, 15 minut. Klasyczna szybka kolacja z porządnym białkiem.",
      ["2 puszki tuńczyka w wodzie, odsączone","2 łyżki jogurtu lub majonezu","szczypiorek, szczypta chili","4 kromki chleba na kanapki","80 g sera żółtego, w plastrach","masło"],
      ["Wymieszaj tuńczyka z jogurtem i szczypiorkiem.","Nałóż na chleb, przykryj serem i drugą kromką.","Podsmaż na maśle lub w opiekaczu do roztopienia sera."]),
    R("d2","Quesadilla z kurczakiem i serem","Meksykańska",["dinner"],"Drób",15,58,"fresh","Świeżo, 15 minut. Najlepsza na prepowanym wcześniej kurczaku.",
      ["4 tortille pełnoziarniste","300 g ugotowanego kurczaka, poszarpanego","100 g sera (cheddar/mozzarella)","1/2 papryki, w kostkę","salsa lub jogurt do podania"],
      ["Na tortilli rozłóż ser, kurczaka i paprykę, przykryj drugą tortillą.","Podsmaż na suchej patelni 2-3 min z każdej strony do roztopienia sera.","Pokrój w trójkąty, podawaj z salsą."]),
    R("d3","Makaron aglio e olio z kurczakiem","Włoska",["dinner"],"Drób",20,74,"fresh","Świeżo, 20 minut. Prosty makaron, który zawsze działa.",
      ["240 g spaghetti","300 g piersi z kurczaka, w paski (lub prepowany)","4 ząbki czosnku, w plasterkach","1 papryczka chili","2 łyżki oliwy","natka pietruszki, parmezan"],
      ["Ugotuj makaron al dente.","Podsmaż kurczaka, odłóż.","Na oliwie zeszklij czosnek i chili.","Wrzuć makaron i kurczaka, wymieszaj z odrobiną wody z gotowania.","Posyp natką i parmezanem."]),
    R("d4","Klubowa kanapka z indykiem, jajkiem i awokado","Polska/Europejska",["dinner"],"Drób",12,48,"fresh","Świeżo, 12 minut. Kanapka, ale porządna i sycąca.",
      ["6 kromek pełnoziarnistego pieczywa","200 g pieczonego indyka lub kurczaka, w plastrach","2 jajka na twardo, w plastrach","1/2 awokado","sałata, pomidor","jogurt/majonez, musztarda"],
      ["Posmaruj pieczywo jogurtem z musztardą.","Ułóż warstwy: indyk, jajko, awokado, sałata, pomidor.","Złóż w piętrową kanapkę, przekrój."]),
    R("d5","Wrap z wołowiną, warzywami i sosem czosnkowym","Bliski Wschód",["dinner"],"Wołowina",15,60,"fresh","Świeżo, 15 minut. Idealny na prepowaną wcześniej wołowinę.",
      ["2 duże tortille","300 g ugotowanej/grillowanej wołowiny, w paski","mix sałat, pomidor, ogórek, czerwona cebula","sos: jogurt + czosnek + cytryna","chili flakes"],
      ["Rozgrzej tortille.","Rozsmaruj sos czosnkowy, ułóż wołowinę i warzywa.","Zwiń ciasno, przekrój na pół."]),
    R("d6","Tuńczyk z patelni z sezamem i ryżem","Japońska",["dinner"],"Ryby i owoce morza",20,88,"fresh","Świeżo — tuńczyk najlepszy lekko krwisty w środku. Szybka, efektowna kolacja.",
      ["400 g steków z tuńczyka","2 łyżki sezamu (biały+czarny)","2 łyżki sosu sojowego","1 łyżka oleju sezamowego","200 g ryżu (suchy)","1 ogórek, marchewka w paski"],
      ["Obtocz tuńczyka w sezamie.","Smaż na mocno rozgrzanej patelni 1-1,5 min z każdej strony.","Ugotuj ryż.","Pokrój tuńczyka, polej sojowym i olejem sezamowym, podawaj z ryżem i warzywami."]),
    R("d7","Sałatka z grillowanym kurczakiem, ciecierzycą i fetą","Grecka",["dinner"],"Drób",15,56,"fresh","Świeżo, 15 minut. Lekka, ale białkowa kolacja.",
      ["300 g piersi z kurczaka (lub prepowany)","1 puszka ciecierzycy, odsączona","80 g fety","mix sałat, pomidorki, ogórek, oliwki","oliwa, cytryna, oregano"],
      ["Zgrilluj lub podsmaż kurczaka, pokrój.","Wymieszaj sałatę, ciecierzycę, warzywa i fetę.","Dodaj kurczaka, skrop dressingiem z oliwy, cytryny i oregano."]),
    R("d8","Tacos z krewetkami i awokado","Meksykańska",["dinner"],"Ryby i owoce morza",20,54,"fresh","Świeżo, 20 minut. Twoje mrożone krewetki wrzucasz po rozmrożeniu.",
      ["400 g mrożonych obranych krewetek (rozmrożonych)","1 łyżeczka przyprawy taco","8 małych tortilli","1 awokado, w plastrach","kapusta poszatkowana, kolendra","limonka, jogurt"],
      ["Podsmaż krewetki z przyprawą taco 3-4 min.","Podgrzej tortille.","Nałóż krewetki, kapustę, awokado i kolendrę.","Skrop limonką i jogurtem."]),
    R("d9","Pinsa proteinowa na kolację","Włoska",["dinner"],"Drób",25,86,"fresh","Spód kup gotowy lub zrób wcześniej. Kolacja, którą oboje lubicie, z porządnym białkiem.",
      ["2 spody pinsy","150 g passaty","100 g mozzarelli","200 g pieczonego kurczaka lub szynki parmeńskiej","rukola, parmezan, oliwa"],
      ["Rozsmaruj passatę, dodaj mozzarellę.","Piecz w 230°C 8-10 min.","Po upieczeniu dodaj kurczaka/szynkę, rukolę i parmezan."]),
    R("d10","Omlet na bogato z szynką, serem i szpinakiem","Polska/Europejska",["dinner"],"Drób",12,50,"fresh","Świeżo, 12 minut. Kolacja z jajek, gdy nie chce się gotować.",
      ["6 jajek","100 g szynki, w kostkę","80 g sera żółtego","garść szpinaku","masło","pieczywo do podania"],
      ["Roztrzep jajka, dopraw.","Wlej na patelnię z masłem, dodaj szynkę, ser i szpinak.","Smaż na średnim ogniu, złóż omlet, podawaj z pieczywem."]),
    // ——— SHAKE'I / BIAŁKO ———
    R("s1","Shake potreningowy — banan i masło orzechowe","Shake",["shake"],"—",5,78,"fresh","Po porannym treningu (siłownia / HIIT / bieganie). Szybki zastrzyk białka + węgli na regenerację.",
      ["3 miarki odżywki białkowej (ok. 70 g)","2 banany","500 ml mleka lub napoju roślinnego","1 łyżka masła orzechowego (15 g)","kilka kostek lodu"],
      ["Wrzuć wszystko do blendera.","Zblenduj na gładko.","Wypij w ciągu 30-60 min po treningu."]),
    R("s2","Szybki shake na mleku (30 sekund)","Shake",["shake"],"—",2,70,"fresh","Najprostszy — na dni, gdy nie ma czasu na nic. Podbija dzienne białko bez wysiłku.",
      ["3 miarki odżywki białkowej (ok. 70 g)","500 ml mleka lub wody","opcjonalnie: cynamon lub kakao"],
      ["Wsyp białko do shakera.","Zalej mlekiem, wstrząśnij 20 sekund.","Gotowe."]),
    R("s3","Shake śniadaniowy na bogato","Shake",["shake"],"—",5,84,"fresh","Zastępuje śniadanie w biegu — owsianka w płynie z pełną porcją białka.",
      ["3 miarki odżywki białkowej (ok. 70 g)","80 g płatków owsianych","2 banany","500 ml mleka","1 łyżka masła orzechowego (15 g)","miód, cynamon"],
      ["Zblenduj wszystkie składniki na gładko.","Jeśli za gęsty, dolej mleka."]),
    R("s4","Zielony shake — szpinak i owoce","Shake",["shake"],"—",5,76,"fresh","Białko + porcja warzyw i owoców. Dobry, gdy dzień jest ubogi w warzywa.",
      ["3 miarki odżywki białkowej (ok. 70 g)","garść szpinaku","2 banany","250 g mrożonych owoców leśnych","500 ml mleka lub wody"],
      ["Zblenduj szpinak z płynem na gładko.","Dodaj białko, banana i owoce, zblenduj ponownie."]),
    R("s5","Shake na jogurcie greckim (gęsty, na łyżce)","Shake",["shake"],"—",5,80,"fresh","Gęsty jak deser — dobry wieczorem lub jako sycąca przekąska białkowa.",
      ["2 miarki odżywki białkowej (ok. 45 g)","400 g jogurtu greckiego","250 g owoców (jagody/mango)","odrobina mleka","granola do posypania"],
      ["Wymieszaj jogurt z białkiem i odrobiną mleka.","Dodaj owoce, posyp granolą."])
    ,
    // ——— TURECKA ———
    R("tu1","Adana kebab z bulgurem i jogurtem","Turecka",["lunch"],"Wołowina",30,112,"mar",
      "Uformowane kebaby zamroź surowe (vacuum) — rozmroź i na grill Tefala w 8 minut.",
      ["500 g mielonej wołowiny (chuda, do 10% tł.)","1 cebula, drobno starta i odciśnięta","2 łyżeczki pul biber (płatki chili) lub papryki","1 łyżeczka kuminu, natka","200 g bulguru (suchy)","jogurt grecki, sumak","pomidor, ogórek"],
      ["Wymieszaj mięso z cebulą, przyprawami i natką, wyrób 3 min.","Uformuj podłużne kebaby na szpadkach lub bez.","Grilluj na OptiGrillu / patelni 8-10 min.","Ugotuj bulgur, podawaj z jogurtem, sumakiem i warzywami."]),
    R("tu2","Menemen — tureckie jajka w pomidorach","Turecka",["breakfast"],"—",15,38,"fresh",
      "Świeżo, 15 minut. Turecka odpowiedź na szakszukę — bardziej rozbełtana i szybsza.",
      ["6 jajek","2 pomidory, starte (lub 1/2 puszki mutti)","1 zielona papryka, drobno","1 łyżka masła, pul biber","biały ser (feta/koryciński)","pieczywo na zakwasie"],
      ["Podsmaż paprykę na maśle, dodaj pomidory, odparuj 5 min.","Wbij jajka, mieszaj delikatnie do lekkiego ścięcia.","Posyp serem i pul biber, podawaj z pieczywem."]),
    R("tu3","Tavuk şiş — grillowane szaszłyki z kurczaka z ryżem","Turecka",["lunch"],"Drób",30,118,"mar",
      "Kurczak w jogurtowej marynacie zamroź surowy — idealny na grill Tefala.",
      ["500 g piersi z kurczaka, w kostkę","150 g jogurtu","2 łyżki koncentratu paprykowego (biber salçası) lub słodkiej papryki","2 ząbki czosnku, oregano, cytryna","200 g ryżu (suchy)","grillowana papryka i cukinia (OptiGrill)"],
      ["Zamarynuj kurczaka w jogurcie, paprykowym koncentracie, czosnku i cytrynie (min. 2 godz.).","Nabij na szpadki, grilluj 10-12 min.","Ugotuj ryż, zgrilluj warzywa.","Podawaj razem."]),
    // ——— PERUWIAŃSKA ———
    R("pe1","Ceviche z dorsza z batatami","Peruwiańska",["dinner"],"Ryby i owoce morza",25,66,"fresh",
      "Zawsze świeżo — ryba 'gotuje się' w limonce. Zero ognia, dużo wrażenia. Idealne dla Magdy.",
      ["400 g świeżego dorsza (sushi-grade), w kostkę","sok z 5-6 limonek","1 czerwona cebula, w cienkie piórka","1 papryczka ají lub chili, kolendra","2 bataty, ugotowane w plastrach","kukurydza (może być z puszki)"],
      ["Zalej rybę sokiem z limonki z solą, odstaw 10-15 min aż zbieleje.","Dodaj cebulę, chili i kolendrę.","Podawaj z plastrami batata i kukurydzą."]),
    R("pe2","Lomo saltado — peruwiański stir-fry z wołowiny","Peruwiańska",["lunch","dinner"],"Wołowina",25,102,"fresh",
      "Świeżo, 25 minut — chińsko-peruwiańska fuzja: wołowina, pomidory, frytki i ryż w jednym.",
      ["400 g polędwicy lub rostbefu, w paski","1 czerwona cebula, w piórka","2 pomidory, w ćwiartki","3 łyżki sosu sojowego, 1 łyżka octu","1 papryczka ají/chili, kolendra","frytki pieczone z 500 g ziemniaków","150 g ryżu (suchy)"],
      ["Upiecz frytki w piekarniku.","Smaż wołowinę na bardzo mocnym ogniu 2 min, odłóż.","Podsmaż cebulę, dodaj pomidory, sojowy i ocet.","Wróć mięso, dodaj frytki, wymieszaj. Podawaj z ryżem i kolendrą."]),
    // ——— FILIPIŃSKA ———
    R("fi1","Chicken adobo z ryżem","Filipińska",["lunch"],"Drób",45,116,"freeze",
      "Jedno z najlepszych dań batch-cook na świecie — mrozi się znakomicie i smakuje lepiej z każdym dniem.",
      ["550 g udek z kurczaka","100 ml sosu sojowego","80 ml octu (spirytusowego lub ryżowego)","6 ząbków czosnku, zgniecionych","3 liście laurowe, 1 łyżeczka pieprzu ziarnistego","200 g ryżu (suchy)","szczypiorek"],
      ["Zamarynuj kurczaka w sojowym, occie i czosnku (30 min lub na noc).","Obsmaż kurczaka, wlej marynatę i liście laurowe.","Duś pod przykryciem 30-35 min, aż sos zgęstnieje.","Podawaj z ryżem i szczypiorkiem."]),
    R("fi2","Pork adobo z polędwiczki z ryżem czosnkowym","Filipińska",["lunch"],"Wieprzowina",50,108,"freeze",
      "Wersja z polędwiczką wieprzową — mrozi się świetnie, ryż czosnkowy robisz świeżo.",
      ["500 g polędwiczki wieprzowej, w plastry","100 ml sosu sojowego, 80 ml octu","6 ząbków czosnku + 3 do ryżu","liście laurowe, pieprz","200 g ryżu (suchy)","1 łyżka oleju"],
      ["Zamarynuj i duś jak w chicken adobo, 25-30 min.","Ugotowany ryż podsmaż z czosnkiem na oleju.","Podawaj razem."]),
    // ——— KARAIBSKA ———
    R("ka1","Jerk chicken z ryżem kokosowym i fasolą","Karaibska",["lunch"],"Drób",40,122,"mar",
      "Marynata jerk to poziom mistrzowski marynuj+zamroź — vacuum seal i do zamrażalnika.",
      ["500 g udek z kurczaka","2 łyżki pasty jerk (lub: chili habanero/scotch bonnet, ziele angielskie, tymianek, cynamon, czosnek, limonka)","200 g ryżu (suchy)","100 ml mleka kokosowego do ryżu","1 puszka czerwonej fasoli","limonka, kolendra"],
      ["Zamarynuj kurczaka w jerk (min. 4 godz. lub zamroź).","Piecz w 200°C 30-35 min lub grilluj.","Ugotuj ryż na wodzie z mlekiem kokosowym, dodaj fasolę.","Podawaj z limonką."]),
    R("ka2","Karaibski bowl z krewetkami i mango","Karaibska",["dinner"],"Ryby i owoce morza",20,62,"fresh",
      "Świeżo, 20 minut — Twoje mrożone krewetki + mrożone mango w jednym daniu.",
      ["400 g mrożonych obranych krewetek (rozmrożonych)","1 łyżeczka pasty jerk lub chili+ziele angielskie","150 g mrożonego mango, rozmrożonego, w kostce","200 g ryżu (suchy)","1/2 awokado","limonka, kolendra, czerwona cebula"],
      ["Podsmaż krewetki z przyprawą jerk 3 min.","Ugotuj ryż.","Zrób salsę: mango, cebula, kolendra, limonka.","Złóż bowl: ryż, krewetki, salsa mango, awokado."]),
    // ——— FRANCUSKA ———
    R("fr1","Boeuf bourguignon z puree ziemniaczanym","Francuska",["lunch"],"Wołowina",180,108,"freeze",
      "Twoja jesienna klasyka — mrozi się fantastycznie, rób podwójną porcję od razu (×2). Puree świeżo (Termomix robi je sam).",
      ["550 g wołowiny (łopatka/pręga), w dużą kostkę","60 g boczku, w kostkę","2 marchewki, 1 cebula, 2 ząbki czosnku","400 ml czerwonego wina, 300 ml bulionu","1 łyżka koncentratu, tymianek, liść laurowy","250 g pieczarek","800 g ziemniaków na puree","1 łyżka masła","100 ml mleka"],
      ["Obsmaż boczek, potem wołowinę partiami.","Zeszklij warzywa, wróć mięso, dodaj koncentrat.","Zalej winem i bulionem, dodaj zioła, duś 2,5-3 godz.","Na końcu dodaj podsmażone pieczarki.","Zrób puree (Termomix: 25 min program), podawaj razem."]),
    R("fr2","Steak frites z masłem ziołowym i rukolą","Francuska",["dinner"],"Wołowina",30,88,"fresh",
      "Wieczorne szaleństwo — bavette lub flat iron: tańsze kawałki, które przy krótkim smażeniu i krojeniu w poprzek włókien są rewelacyjne.",
      ["400 g bavette (łata) lub flat iron","800 g ziemniaków na frytki pieczone","25 g masła + czosnek, natka, tymianek","100 g rukoli, oliwa, cytryna","sól morska, pieprz"],
      ["Upiecz frytki w piekarniku (200°C, 30 min).","Wyjmij stek 30 min wcześniej. Smaż na bardzo mocnym ogniu 2-3 min/strona (medium-rare).","Odstaw 5 min pod folią z masłem ziołowym.","Krój CIENKO W POPRZEK WŁÓKIEN — przy bavette to klucz. Podawaj z frytkami i rukolą."]),
    // ——— NORDYCKA ———
    R("no1","Łosoś po nordycku z koperkowymi ziemniakami i ogórkiem","Nordycka",["lunch"],"Ryby i owoce morza",30,94,"fresh",
      "Świeżo — prosty, czysty smak: łosoś, koperek, cytryna. Ziemniaki młode, gdy sezon.",
      ["400 g filetu z łososia","800 g ziemniaków","pęczek koperku","200 g jogurtu/kwaśnej śmietany","1 ogórek, w cienkie plastry, ocet, cukier","cytryna, masło"],
      ["Piecz łososia w 180°C 15 min z masłem i cytryną.","Ugotuj ziemniaki, wymieszaj z masłem i koperkiem.","Zrób szybki pikiel: ogórek + ocet + szczypta cukru.","Podawaj z sosem jogurtowo-koperkowym."]),
    R("no2","Smørrebrød — duńskie kanapki z makrelą wędzoną i śledziem","Nordycka",["dinner"],"Ryby i owoce morza",15,52,"fresh",
      "Kolacja bez gotowania z polskich, świetnych ryb: makrela wędzona i matjas. Dobre pieczywo na zakwasie robi robotę.",
      ["4 kromki chleba żytniego na zakwasie","1 makrela wędzona, obrana","4 płaty matjasów","biały serek do smarowania","2 jajka na twardo","rzodkiewka, koperek, czerwona cebula, cytryna"],
      ["Posmaruj pieczywo białym serkiem.","Na połowie ułóż makrelę z jajkiem i rzodkiewką.","Na drugiej matjasy z cebulą i koperkiem.","Skrop cytryną, dużo koperku."]),
    R("no3","Sałatka ze śledziem, buraczkami i jajkiem","Nordycka",["dinner"],"Ryby i owoce morza",15,44,"fresh",
      "Kolacja z probiotykiem — śledź, buraczki, kiszony ogórek. Zero gotowania poza jajkami.",
      ["4 płaty matjasów, w kawałkach","300 g ugotowanych buraczków, w kostce","2 ogórki kiszone, w kostce","3 jajka na twardo","1/2 czerwonej cebuli","jogurt/śmietana, musztarda, koperek"],
      ["Wymieszaj buraczki, ogórki, cebulę i śledzia.","Dodaj sos: jogurt + musztarda + koperek.","Podawaj z ćwiartkami jajek i pieczywem."]),
    // ——— SHAKE MANGO ———
    R("s6","Mango lassi proteinowe","Shake",["shake"],"—",5,74,"fresh",
      "Mrożone mango + jogurt = indyjskie lassi z białkiem. Idealne po letnim treningu.",
      ["250 g mrożonego mango","400 g jogurtu naturalnego lub kefiru","2 miarki odżywki białkowej (ok. 45 g)","szczypta kardamonu","odrobina mleka do konsystencji"],
      ["Zblenduj wszystko na gładko.","Dolej mleka, jeśli za gęste."])
    ,
    // ═══════ ROZBUDOWA BIBLIOTEKI ═══════
    // ——— OBIADY: wieprzowina (lato/grill) ———
    R("cl1","Char siu — chińska wieprzowina BBQ z ryżem","Chińska",["lunch"],"Wieprzowina",40,92,"mar",
      "Wieprzowina w marynacie char siu zamroź surową — rozmroź i upiecz/zgrilluj. Lepka, słodko-umami klasyka.",
      ["450 g karkówki, w płaty","2 łyżki sosu hoisin","1 łyżka sosu sojowego","1 łyżka miodu","1 łyżeczka pięciu smaków","2 ząbki czosnku, imbir","200 g ryżu (suchy)","szczypiorek"],
      ["Zamarynuj mięso w hoisin, sojowym, miodzie, pięciu smakach i czosnku (min. 2 godz.).","Piecz w 200°C 25-30 min, polewając marynatą, aż się zeszkli.","Ugotuj ryż.","Pokrój w plastry, podawaj z ryżem i szczypiorkiem."]),
    R("cl2","Souvlaki wieprzowe z pitą i tzatziki","Grecka",["lunch"],"Wieprzowina",35,104,"mar",
      "Szaszłyki w cytrynowo-oregano marynacie zamroź surowe — idealne na grill Tefala latem.",
      ["500 g schabu lub karkówki, w kostkę","2 łyżki oliwy, sok z cytryny","1 łyżeczka oregano, 2 ząbki czosnku","4 pity","tzatziki: jogurt grecki + ogórek + czosnek","pomidor, czerwona cebula"],
      ["Zamarynuj mięso w oliwie, cytrynie, oregano i czosnku.","Nabij na szpadki, grilluj 12-15 min.","Podgrzej pity, zrób tzatziki.","Podawaj w picie z tzatziki i warzywami."]),
    R("cl3","Pork inasal — grillowana wieprzowina po filipińsku","Filipińska",["lunch"],"Wieprzowina",35,102,"mar",
      "Marynata z trzcinowego octu, imbiru i trawy cytrynowej — mrozi się świetnie surowa.",
      ["500 g schabu lub karkówki, w plastry","3 łyżki octu (trzcinowego/ryżowego)","2 ząbki czosnku, imbir","1 łodyga trawy cytrynowej","1 łyżka sosu sojowego, 1 łyżeczka cukru","200 g ryżu (suchy)","dymka, limonka"],
      ["Zamarynuj mięso w occie, czosnku, imbirze i trawie cytrynowej (min. 1 godz.).","Grilluj lub smaż na mocnym ogniu do zrumienienia.","Ugotuj ryż.","Podawaj z ryżem, dymką i limonką."]),
    // ——— OBIADY: ryby (zima) ———
    R("cl4","Dorsz zapiekany po grecku (plaki)","Grecka",["lunch"],"Ryby i owoce morza",40,78,"fresh",
      "Jednogarnkowe danie z piekarnika — dorsz w pomidorach z cebulą i oliwą. Zimowe, sycące, a lekkie.",
      ["500 g filetu z dorsza","1 puszka pomidorów krojonych","2 cebule, w piórka","3 ząbki czosnku","4 łyżki oliwy, oregano","natka pietruszki","cytryna","6 kromek chleba na zakwasie"],
      ["Podsmaż cebulę i czosnek, dodaj pomidory i oregano, duś 10 min.","Przełóż sos do naczynia, ułóż dorsza, polej oliwą.","Piecz w 190°C 20-25 min.","Skrop cytryną, posyp natką, podawaj z pieczywem."]),
    R("cl5","Curry z dorsza po indyjsku z ryżem","Indyjska",["lunch"],"Ryby i owoce morza",35,76,"freeze",
      "Sos curry mrozi się dobrze; dorsza dodaj świeżo przy odgrzaniu. Rozgrzewające danie na zimę.",
      ["500 g filetu z dorsza, w kostkę","400 ml mleka kokosowego","1 cebula, 2 ząbki czosnku, imbir","1 łyżka pasty curry madras","1 łyżeczka kurkumy, kmin","200 g ryżu basmati (suchy)","kolendra, limonka"],
      ["Zeszklij cebulę z czosnkiem, imbirem i przyprawami.","Wlej mleko kokosowe, gotuj 8 min.","Włóż dorsza, duś delikatnie 6-8 min.","Podawaj z ryżem, kolendrą i limonką."]),
    R("cl6","Miso łosoś z piekarnika z ryżem i brokułem","Japońska",["lunch"],"Ryby i owoce morza",30,84,"fresh",
      "Marynata miso karmelizuje się w piekarniku — głęboki umami. Zimą świetnie grzeje.",
      ["400 g filetu z łososia","2 łyżki pasty miso","1 łyżka mirin, 1 łyżka sosu sojowego","1 łyżeczka miodu","200 g ryżu (suchy)","1 brokuł na parze","sezam"],
      ["Wymieszaj miso, mirin, sojowy i miód, posmaruj łososia.","Piecz w 200°C 12-15 min.","Ugotuj ryż i brokuł na parze.","Podawaj razem, posyp sezamem."]),
    // ——— OBIADY: roślinne ———
    R("cl7","Palak paneer — szpinak z serem paneer i ryżem","Indyjska",["lunch"],"Roślinne",35,60,"freeze",
      "Sos szpinakowy mrozi się dobrze; paneer dodaj przy podaniu. Kremowe i sycące.",
      ["200 g sera paneer, w kostkę","400 g szpinaku (świeży lub mrożony)","1 cebula, 2 ząbki czosnku, imbir","1 łyżeczka garam masali, kmin","60 ml śmietanki lub jogurtu","200 g ryżu basmati (suchy)"],
      ["Zblanszuj szpinak, zblenduj na gładko.","Podsmaż cebulę z czosnkiem, imbirem i przyprawami.","Dodaj szpinak i śmietankę, duś 10 min.","Podsmaż kostki paneer, wmieszaj.","Podawaj z ryżem."]),
    R("cl8","Dal makhani — kremowa czarna soczewica z ryżem","Indyjska",["lunch"],"Roślinne",50,54,"freeze",
      "Zimowy klasyk — długo duszona, aksamitna. Mrozi się fantastycznie, smak lepszy nazajutrz.",
      ["200 g czarnej soczewicy (lub czerwonej)","1 puszka czerwonej fasoli","1 puszka pomidorów","1 cebula, czosnek, imbir","1 łyżeczka garam masali, kmin","40 ml śmietanki, 1 łyżeczka masła","180 g ryżu (suchy)"],
      ["Ugotuj soczewicę do miękkości.","Podsmaż cebulę z czosnkiem, imbirem i przyprawami, dodaj pomidory.","Dodaj soczewicę i fasolę, duś 25 min.","Wmieszaj śmietankę i masło.","Podawaj z ryżem."]),
    // ——— OBIADY: drób i wołowina (różnorodność) ———
    R("cl9","Chakhokhbili — gruzińska duszona z kurczaka z pomidorami","Gruzińska",["lunch"],"Drób",40,110,"freeze",
      "Aromatyczny gulasz z kurczaka z mnóstwem ziół i pomidorów. Mrozi się bardzo dobrze.",
      ["500 g udek z kurczaka bez kości, w kawałki","3 pomidory (lub puszka), w kostkę","2 cebule, 3 ząbki czosnku","pęczek kolendry i natki","1 łyżeczka chmeli-suneli (lub kozieradka+kolendra)","200 g ryżu (suchy)"],
      ["Obsmaż kurczaka bez tłuszczu, aż puści soki.","Dodaj cebulę, duś 10 min, potem czosnek i przyprawy.","Dodaj pomidory, duś 20 min.","Wmieszaj posiekane zioła.","Podawaj z chlebem lub ryżem."]),
    R("cl10","Sri Lanka chicken curry z ryżem","Lankijska",["lunch"],"Drób",40,112,"freeze",
      "Cejlońskie curry z prażonymi przyprawami i mlekiem kokosowym. Mrozi się świetnie.",
      ["500 g udek z kurczaka, w kawałki","400 ml mleka kokosowego","1 cebula, czosnek, imbir","2 łyżeczki curry cejlońskiego, kurkuma","1 laska cynamonu, liść curry","200 g ryżu (suchy)"],
      ["Podpraż przyprawy na sucho, dodaj cebulę, czosnek, imbir.","Dodaj kurczaka, obsmaż.","Wlej mleko kokosowe, duś 30 min.","Podawaj z ryżem."]),
    R("cl11","Nikujaga — japoński gulasz wołowo-ziemniaczany","Japońska",["lunch"],"Wołowina",45,90,"freeze",
      "Comfort food po japońsku: wołowina, ziemniaki i cebula w słodko-słonym dashi. Zimowe, mrozi się dobrze.",
      ["400 g cienko krojonej wołowiny","500 g ziemniaków, w kawałki","2 cebule, w piórka","1 marchewka","4 łyżki sosu sojowego, 2 łyżki mirin, 1 łyżka cukru","300 ml bulionu dashi (lub warzywnego)"],
      ["Podsmaż wołowinę z cebulą.","Dodaj ziemniaki, marchewkę, bulion i przyprawy.","Duś pod przykryciem 25-30 min do miękkości.","Podawaj samo lub z ryżem."]),
    R("cl12","Ropa vieja — kubańska duszona wołowina z ryżem","Karaibska",["lunch"],"Wołowina",180,104,"freeze",
      "Wołowina rozszarpana w papryczano-pomidorowym sosie. Długie duszenie to praca garnka; mrozi się świetnie.",
      ["500 g łaty lub mostku wołowego","1 puszka pomidorów","2 papryki, 2 cebule, w paski","4 ząbki czosnku","1 łyżeczka kuminu, oregano, liść laurowy","200 g ryżu (suchy)","oliwki, kolendra"],
      ["Obsmaż wołowinę, zalej wodą, gotuj 1,5-2 godz. do miękkości, rozszarp.","Podsmaż paprykę, cebulę i czosnek, dodaj pomidory i przyprawy.","Wmieszaj mięso, duś 20 min.","Podawaj z ryżem, oliwkami i kolendrą."]),
    // ——— KOLACJE (szybkie) ———
    R("cd1","Baked feta pasta — makaron z zapiekaną fetą i pomidorkami","Włoska",["dinner"],"Roślinne",30,44,"fresh",
      "Wszystko piecze się w jednym naczyniu, potem miksujesz z makaronem. Minimum pracy, świetny smak.",
      ["120 g fety (blok)","400 g pomidorków koktajlowych","2 łyżki oliwy, czosnek","240 g makaronu","bazylia, chili flakes"],
      ["Ułóż fetę na środku naczynia, wokół pomidorki, polej oliwą i czosnkiem.","Piecz w 200°C 25 min.","Ugotuj makaron.","Rozgnieć fetę z pomidorkami, wymieszaj z makaronem i bazylią."]),
    R("cd2","Krem pomidorowy z grzankami serowymi","Polska/Europejska",["dinner"],"Roślinne",25,30,"fresh",
      "Zimowa, rozgrzewająca kolacja bez wysiłku. Grzanki z serem podbijają sytość.",
      ["2 puszki pomidorów (mutti)","1 cebula, 2 ząbki czosnku","400 ml bulionu warzywnego","100 ml śmietanki","4 kromki chleba, 100 g sera","bazylia, oliwa"],
      ["Podsmaż cebulę i czosnek, dodaj pomidory i bulion, gotuj 15 min.","Zblenduj, wmieszaj śmietankę.","Zapiecz grzanki z serem.","Podawaj zupę z grzankami i bazylią."]),
    R("cd3","Sałatka nicejska z tuńczykiem","Francuska",["dinner"],"Ryby i owoce morza",20,58,"fresh",
      "Letnia, świeża kolacja bez gotowania (poza jajkiem i ziemniakami). Sycąca dzięki tuńczykowi i jajku.",
      ["2 puszki tuńczyka","4 jajka na twardo","300 g młodych ziemniaków, ugotowanych","garść fasolki szparagowej","pomidory, oliwki, sałata","oliwa, cytryna, musztarda"],
      ["Ugotuj ziemniaki i fasolkę.","Ułóż sałatę, ziemniaki, fasolkę, pomidory, oliwki.","Dodaj tuńczyka i ćwiartki jajek.","Skrop dressingiem z oliwy, cytryny i musztardy."]),
    R("cd4","Caesar wrap z kurczakiem","Amerykańska",["dinner"],"Drób",15,62,"fresh",
      "Szybka kolacja na prepowanym kurczaku. Sos zrób lub kup gotowy.",
      ["2 duże tortille","300 g grillowanego kurczaka, w paski","serce sałaty rzymskiej","sos cezar","parmezan, grzanki","cytryna"],
      ["Wymieszaj sałatę z sosem cezar i parmezanem.","Dodaj kurczaka i grzanki.","Zawiń w tortillę, przekrój."]),
    R("cd5","Szybki bowl z łososiem teriyaki i ryżem","Japońska",["dinner"],"Ryby i owoce morza",20,80,"fresh",
      "20-minutowa miska: łosoś, ryż, warzywa i lepki sos teriyaki.",
      ["400 g łososia, w kostkę","3 łyżki sosu sojowego, 1 łyżka miodu, 1 łyżeczka imbiru","200 g ryżu (suchy)","1 ogórek, 1 marchewka, edamame","sezam, dymka"],
      ["Podsmaż łososia, dodaj sojowy, miód i imbir, glazuruj 3 min.","Ugotuj ryż.","Ułóż ryż, łososia i warzywa w miskach.","Posyp sezamem i dymką."]),
    R("cd6","Kiełbasa z zieloną soczewicą i musztardą","Francuska",["dinner"],"Wieprzowina",30,70,"fresh",
      "Zimowa, treściwa kolacja w stylu bistro. Soczewica gotuje się sama, kiełbasę podsmażasz.",
      ["300 g dobrej kiełbasy (np. z Tuluzy) lub polskiej","200 g zielonej soczewicy (sucha)","1 marchewka, 1 cebula, 2 ząbki czosnku","1 łyżka musztardy Dijon","tymianek, liść laurowy","natka"],
      ["Ugotuj soczewicę z warzywami, liściem laurowym i tymiankiem 25 min.","Podsmaż kiełbasę na złoto.","Wmieszaj musztardę do soczewicy.","Podawaj kiełbasę na soczewicy, posyp natką."]),
    R("cd7","Quesadilla warzywna z fasolą i serem","Meksykańska",["dinner"],"Roślinne",15,42,"fresh",
      "Szybka roślinna kolacja z tego, co jest w lodówce.",
      ["4 tortille","1 puszka czarnej fasoli, odsączona","100 g sera","1 papryka, garść kukurydzy, szpinak","salsa, jogurt","kumin, chili"],
      ["Rozgnieć fasolę z kuminem i chili.","Na tortilli rozłóż fasolę, ser i warzywa, przykryj drugą.","Podsmaż 2-3 min z każdej strony.","Podawaj z salsą i jogurtem."]),
    // ——— ŚNIADANIA ———
    R("cb1","Pudding chia kokosowy z owocami","Roślinna",["breakfast"],"Tofu/roślinne",5,30,"freeze",
      "Zrób wieczorem na 2-3 dni. Letnie, orzeźwiające, roślinne.",
      ["60 g nasion chia","150 ml mleka kokosowego","250 ml mleka","2 łyżki syropu klonowego","mrożone mango lub owoce leśne","20 g orzechów, wiórki kokosowe"],
      ["Wymieszaj chia z mlekiem i syropem w słoikach.","Wstaw do lodówki na noc.","Rano dodaj owoce, orzechy i wiórki."]),
    R("cb2","Kanapka z awokado, jajkiem i wędzonym łososiem","Nordycka",["breakfast"],"Ryby i owoce morza",10,44,"fresh",
      "Porządne białko i dobre tłuszcze na start. Świeżo w 10 minut.",
      ["4 kromki chleba na zakwasie","1/2 awokado","4 jajka (sadzone lub gotowane)","100 g wędzonego łososia","cytryna, koperek, chili flakes"],
      ["Podpiecz pieczywo, rozgnieć awokado z cytryną.","Ułóż łososia i jajko.","Posyp koperkiem i chili."]),
    R("cb3","Bircher muesli (szwajcarska owsianka na zimno)","Polska/Europejska",["breakfast"],"Nabiał",8,40,"freeze",
      "Zrób wieczorem — starte jabłko i jogurt czynią ją kremową. Letnie, lekkie.",
      ["200 g płatków owsianych","400 g jogurtu naturalnego","1 starte jabłko","25 g orzechów i rodzynek","2 łyżki miodu","cynamon"],
      ["Wymieszaj płatki z jogurtem, jabłkiem, orzechami i miodem.","Wstaw do lodówki na noc.","Rano dopraw cynamonem, dodaj świeże owoce."]),
    R("cb4","Jajka po benedyktyńsku (uproszczone)","Francuska",["breakfast"],"Jajka",20,46,"fresh",
      "Weekendowe, efektowne, a proste — sos holenderski na skróty z jogurtu.",
      ["4 jajka w koszulce","2 muffiny angielskie lub kromki chleba","100 g szynki dobrej jakości","sos: 100 g jogurtu greckiego + musztarda + cytryna","szczypiorek"],
      ["Ugotuj jajka w koszulce (3 min we wrzątku z octem).","Podpiecz pieczywo, ułóż szynkę i jajko.","Polej sosem, posyp szczypiorkiem."]),
    R("cb5","Pieczona owsianka z jagodami (baked oats)","Polska/Europejska",["breakfast"],"Nabiał",30,40,"freeze",
      "Zimowe, ciepłe śniadanie — upiecz jedną blaszkę na kilka dni, rano tylko podgrzej.",
      ["200 g płatków owsianych","400 ml mleka","2 jajka","200 g jagód/owoców leśnych","2 łyżki miodu, 1 łyżeczka proszku do pieczenia","cynamon, orzechy"],
      ["Wymieszaj płatki, mleko, jajka, miód i proszek.","Wmieszaj owoce, przełóż do naczynia.","Piecz w 180°C 30 min.","Krój na porcje; przechowuj 4 dni lub zamroź."]),
    R("cb6","Tost francuski proteinowy z owocami","Amerykańska",["breakfast"],"Jajka",15,42,"fresh",
      "French toast na bogato — dużo jajek i twarogu do namoczenia. Weekendowy klasyk.",
      ["4 kromki chałki lub chleba tostowego","4 jajka","100 g twarogu/serka","100 ml mleka, cynamon","1 łyżka masła do smażenia","owoce, jogurt, miód"],
      ["Roztrzep jajka z mlekiem, twarogiem i cynamonem.","Namocz pieczywo, smaż na maśle na złoto.","Podawaj z owocami, jogurtem i miodem."]),
    R("cb7","Makrela wędzona na grzance z pomidorem","Nordycka",["breakfast"],"Ryby i owoce morza",8,40,"fresh",
      "Zero gotowania, świetne polskie ryby. Białko i omega-3 na start.",
      ["1-2 makrele wędzone, obrane","4 kromki chleba na zakwasie","biały serek do smarowania","pomidor, czerwona cebula","koperek, cytryna, pieprz"],
      ["Posmaruj pieczywo serkiem.","Ułóż makrelę, pomidora i cebulę.","Skrop cytryną, posyp koperkiem."]),
    R("cb8","Placuszki bananowo-owsiane (roślinne)","Roślinna",["breakfast"],"Tofu/roślinne",15,24,"fresh",
      "Bez jajek i nabiału — banan i mąka owsiana wiążą ciasto. Dobre na roślinny dzień.",
      ["2 dojrzałe banany","120 g mąki owsianej","150 ml napoju roślinnego","1 łyżeczka proszku do pieczenia","masło orzechowe, owoce, syrop klonowy"],
      ["Rozgnieć banany, wymieszaj z mąką, napojem i proszkiem.","Smaż małe placki na patelni 2 min z każdej strony.","Podawaj z masłem orzechowym, owocami i syropem."])
  ];}

  // specjalne pseudo-pozycje trybu dnia (wpisywane w komórki planu)
  const SPECIAL = {
    "__zupa__": {name:"🍜 Dzień zupy / botwinka / rosół", prot:35, note:"Świadomy dzień z niższym białkiem — OK w skali tygodnia."},
    "__mias__": {name:"🍽️ Na mieście / lunch w pracy (Powiśle)", prot:40, note:"Wybrany posiłek poza domem — nie liczy się do gotowania."},
    "__kater__":{name:"📦 Katering dietetyczny", prot:45, note:"Dostawa — bez gotowania tego dnia."}
  };

  function seedWeek(){
    // Ultimate tydzień startowy: balans 3× drób, 3× wołowina, 3× ryba w obiadach+kolacjach,
    // szybkie kolacje, rotacja śniadań, shake w dni treningowe (Pon/Śr/Pt), niedziela = dzień zupy.
    const w={};
    const plan={
      "Pon":{breakfast:"b5", lunch:"i1",  dinner:"d3",  shake:"s1"},
      "Wt": {breakfast:"b10",lunch:"tu1", dinner:"j1",  shake:"s2"},
      "Śr": {breakfast:"b6", lunch:"fi1", dinner:"d8",  shake:"s1"},
      "Czw":{breakfast:"b12",lunch:"fr1", dinner:"d7",  shake:"s2"},
      "Pt": {breakfast:"b7", lunch:"no1", dinner:"d9",  shake:"s1"},
      "Sob":{breakfast:"b8", lunch:"ka1", dinner:"fr2", shake:"s2"},
      "Nd": {breakfast:"b16",lunch:"p3",  dinner:"no3", shake:"s5"}
    };
    DAYS.forEach(d=>{
      const p=plan[d]||{};
      w[d]={ addP1:0, addP2:0, shakeId:p.shake||"",
        breakfast:{recipeId:p.breakfast||""}, lunch:{recipeId:p.lunch||""}, dinner:{recipeId:p.dinner||""} };
    });
    return w;
  }
  // sezon: "all" całoroczny, "lato" wiosna/lato, "zima" jesień/zima
  const SEASON_MAP={
    p1:"zima",p2:"zima",p3:"zima",fr1:"zima",y1:"zima",x2:"zima",a2:"zima",x1:"zima",w1:"zima",r11:"zima",i1:"zima",t1:"zima",c4:"zima",fi1:"zima",fi2:"zima",
    pe1:"lato",j1:"lato",ka2:"lato",h2:"lato",g3:"lato",no2:"lato",no3:"lato",d7:"lato",tu1:"lato",tu3:"lato",ka1:"lato",y2:"lato",g1:"lato",m1:"lato",pe2:"lato",d8:"lato",no1:"lato",g2:"lato",d6:"lato",cl1:"lato",cl2:"lato",cl3:"lato",cd3:"lato",cb1:"lato",cb3:"lato",cl4:"zima",cl5:"zima",cl6:"zima",cl8:"zima",cl11:"zima",cd2:"zima",cd6:"zima",cb5:"zima"
  };
  const BREAKFAST_PTYPE={
    b1:"Nabiał",b5:"Nabiał",b13:"Nabiał",b9:"Nabiał",b12:"Nabiał",b4:"Nabiał",
    b2:"Jajka",b6:"Jajka",b7:"Jajka",b8:"Jajka",b10:"Jajka",b14:"Jajka",b15:"Jajka",b11:"Jajka",tu2:"Jajka",
    b3:"Tofu/roślinne", b16:"Ryby i owoce morza"
  };
  const BREAKFAST_CATS=["Jajka","Nabiał","Tofu/roślinne","Ryby i owoce morza"];
  // Kuchnia polska wydzielona z dawnej "Polska/Europejska"
  const POLSKIE=["p1","p2","p3","b2","b11","b12"];
  // ═══ MAKRO liczone ze SKŁADNIKÓW (gramatura × wartości odżywcze) ═══
  // wartości na 100 g: [białko, węglowodany, tłuszcz]
  const FOOD=[
    // mięso / drób
    [["pierś z kurczaka","piersi z kurczaka","pierś kurczaka","kurczak"],[31,0,4]],
    [["kaczk"],[19,0,18]],
    [["udka z kurczaka","udek z kurczaka","udka","udek"],[25,0,8]],
    [["mielonego indyka","mielony indyk","indyk"],[27,0,8]],
    [["mielonej wołowiny","mielona wołowina","mielonego (wołowo","mielone"],[20,0,10]],
    [["wołowiny gulaszowej","łaty","mostku","pręga","wołowin"],[26,0,10]],
    [["rostbef","antrykot","stek","bavette","flat iron","polędwic"],[26,0,12]],
    [["łopatki wieprzowej","łopatka wieprz"],[18,0,20]],
    [["karkówki","karkówka"],[17,0,20]],
    [["schabu","schab"],[21,0,6]],
    [["boczku","boczek","bekon"],[13,0,40]],
    [["kiełbas"],[14,1,28]],
    [["szynki","szynka","mortadel"],[20,1,6]],
    // ryby / owoce morza
    [["łososia","łosoś","losos"],[20,0,13]],
    [["tuńczyka w wodzie","tuńczyka z puszki","puszka tuńczyka","puszki tuńczyka"],[25,0,1]],
    [["tuńczyka","tuńczyk"],[23,0,1]],
    [["dorsza","dorsz"],[18,0,1]],
    [["makrel"],[19,0,24]],
    [["matjas","śledz","śledź"],[17,0,15]],
    [["krewet"],[20,0,1]],
    [["wędzonego łososia","wędzony łosoś"],[22,0,12]],
    // roślinne białko
    [["tofu"],[13,2,8]],
    [["paneer"],[18,3,22]],
    [["ciecierzyc"],[7,14,3]],
    [["czerwonej fasoli","czarnej fasoli","fasol"],[7,13,1]],
    [["soczewic"],[24,50,1]],
    [["edamame"],[11,9,5]],
    // jaja / nabiał
    [["białka jaj","białek","białka)"],[11,1,0]],
    [["jajek","jajka","jaj"],[13,1,11]],
    [["jogurtu greckiego","jogurt grecki"],[9,4,5]],
    [["skyr"],[11,4,1]],
    [["jogurtu","jogurt"],[5,5,3]],
    [["kefir"],[3,4,2]],
    [["twarogu","twaróg"],[18,3,4]],
    [["serka wiejskiego","serek wiejski","serek"],[11,3,4]],
    [["mozzarell"],[18,2,20]],
    [["parmezan","pecorino"],[33,0,28]],
    [["halloumi"],[22,2,25]],
    [["fety","feta"],[14,4,21]],
    [["camembert","koryciński"],[20,1,24]],
    [["startego sera","sera żółtego","ser żółty","cheddar","sera"],[25,1,30]],
    [["śmietanki","śmietana"],[2,3,30]],
    [["mleka kokosowego","mleko kokosowe"],[2,3,20]],
    [["napoju roślinnego","mleka roślinnego"],[1,3,2]],
    [["mleka","mleko"],[3,5,2]],
    [["masła orzechowego","masło orzechowe"],[25,20,50]],
    [["masła","masło"],[1,1,82]],
    // zboża / węgle
    [["ryżu","ryż"],[7,78,1]],
    [["makaronu ryżowego","makaron ryżowy"],[6,80,1]],
    [["makaronu","makaron","spaghetti","linguine"],[12,72,2]],
    [["kaszy","kasza"],[12,70,3]],
    [["bulguru","bulgur"],[12,70,2]],
    [["płatków owsianych","płatki owsiane","owsian"],[13,60,7]],
    [["mąki owsianej","mąki","mąka"],[11,70,2]],
    [["ziemniak"],[2,17,1]],
    [["batat"],[2,20,1]],
    [["chleba","chleb","pieczyw","krom","grzank","tost","chałk","chalk"],[9,45,3]],
    [["tortill"],[8,50,7]],
    [["bułe","bułk","muffin"],[9,50,4]],
    [["pity","pita","pit "],[9,50,2]],
    [["naan"],[9,50,6]],
    [["panko","bułka tarta"],[13,70,2]],
    [["granol"],[10,60,15]],
    [["spody pinsy","pinsy","pinsa"],[9,50,4]],
    [["kukurydz"],[3,19,1]],
    [["frytki"],[3,30,10]],
    // tłuszcze / dodatki
    [["oliwy","oliwa","oleju","olej"],[0,0,100]],
    [["awokado"],[2,9,15]],
    [["orzech","migdał","orzeszk"],[15,15,60]],
    [["sezam"],[17,23,50]],
    [["chia"],[17,42,31]],
    [["hummus"],[8,14,17]],
    [["majonez"],[1,1,75]],
    [["oliwki"],[1,1,15]],
    [["tahini"],[17,10,54]],
    // sosy / przyprawy / płyny
    [["sosu sojowego","sos sojowy","sojowy"],[8,5,0]],
    [["hoisin"],[3,45,1]],
    [["gochujang","doubanjiang"],[5,40,2]],
    [["pasty curry","pasta curry","pasty rendang","tandoori","piri piri","jerk","harissa","fajita","taco"],[3,15,5]],
    [["sosu bbq","sos bbq","teriyaki","tonkatsu","ostrygowego","tamaryndowego","nuoc cham","salsa","hoisin"],[2,25,1]],
    [["mirin"],[0,45,0]],
    [["miodu","miód"],[0,82,0]],
    [["cukru","cukier","syrop"],[0,90,0]],
    [["sosu rybnego","sos rybny"],[5,4,0]],
    [["octu","ocet"],[0,1,0]],
    [["wina","wino"],[0,3,0]],
    [["passaty","passata","pomidorów krojonych","pomidorów","puszka pomidorów"],[1,5,1]],
    [["koncentratu","koncentrat"],[5,12,1]],
    [["bulionu","bulion","dashi"],[1,1,0]],
    [["odżywki białkowej","odżywka białkowa","białka (odżywka","miarki białka"],[75,8,6]],
    [["kimchi","kiszon","kapust","buracz"],[2,4,1]],
    // owoce / warzywa
    [["banan"],[1,23,1]],
    [["mango","jagod","malin","truskaw","borówk","owoc","jabłk","gruszk"],[1,12,1]],
    [["cytryn","limonk","pomarańcz"],[1,8,1]],
    [["szpinak","rukol","sałat","kolendr","natk","bazyli","mięt","koperek","szczypior","zioł"],[3,2,1]],
    [["brokuł","cukini","bakłażan","papryk","marchew","cebul","por ","seler","ogór","pomidor","rzodkiew","kiełk","grzyb","pieczark","dyni","kapust"],[2,5,1]],
    [["czosnk","czosnek","imbir","chili","trawa cytrynowa","galangal"],[3,10,1]],
    [["groszek"],[5,14,1]],
  ];
  // przeliczniki jednostek na gramy
  const UNIT_G={ g:1, kg:1000, ml:1, l:1000 };
  function unitGrams(unit, name){
    const n=(name||"").toLowerCase();
    switch(unit){
      case "łyżka":
        if(/oliw|olej/.test(n)) return 12;
        if(/masł/.test(n)) return 15;
        if(/miod|miód|syrop/.test(n)) return 21;
        return 15;
      case "łyżeczka": return 5;
      case "ząbek": return 5;
      case "puszka":
        if(/tuńczyk/.test(n)) return 120;
        if(/pomidor|passat/.test(n)) return 400;
        if(/mleka kokos|kokos/.test(n)) return 400;
        if(/ciecierzyc|fasol|kukurydz/.test(n)) return 240;
        return 400;
      case "szklanka": return 200;
      case "garść": return 25;
      case "kromka": return 35;
      case "plaster": return 20;
      case "pęczek": return 30;
      case "miarka": return 30;
      case "laska": return 3;
      case "liść": return 1;
      case "łodyga": return 15;
      case "szt": // sztuki — zależnie od produktu
      default:
        if(/jajk|jaj/.test(n)) return 55;
        if(/banan/.test(n)) return 120;
        if(/awokado/.test(n)) return 150;
        if(/cebul/.test(n)) return 110;
        if(/papryk/.test(n)) return 150;
        if(/cukini/.test(n)) return 200;
        if(/bakłażan/.test(n)) return 250;
        if(/marchew/.test(n)) return 80;
        if(/pomidor/.test(n)) return 120;
        if(/ogór/.test(n)) return 200;
        if(/ziemniak/.test(n)) return 150;
        if(/brokuł/.test(n)) return 400;
        if(/cytryn|limonk/.test(n)) return 60;
        if(/tortill/.test(n)) return 50;
        if(/pit[ay]/.test(n)) return 60;
        if(/bułk|muffin/.test(n)) return 70;
        if(/kromk/.test(n)) return 35;
        if(/ząb|czosnk/.test(n)) return 5;
        if(/chili|papryczk/.test(n)) return 10;
        if(/jabłk|gruszk/.test(n)) return 150;
        if(/spod|pinsy/.test(n)) return 200;
        if(/stek/.test(n)) return 250;
        if(/makrel/.test(n)) return 200;
        if(/płat/.test(n)) return 30;
        return 60; // ostrożnie: nieznana sztuka
    }
  }
  const UNIT_RE=/(\d+[.,]?\d*)\s*(kg|g|ml|l|łyżecz\w*|łyż\w*|ząb\w*|puszk\w*|puszek|szklan\w*|garść|garści|krom\w*|plast\w*|pęcz\w*|miar\w*|lask\w*|liś\w*|łodyg\w*|szt\w*)?\b/i;
  function normUnit(u){
    if(!u) return null;
    u=u.toLowerCase();
    if(u==="kg"||u==="g"||u==="ml"||u==="l") return u;
    const p=(x)=>u.indexOf(x)===0;
    if(p("łyżecz")) return "łyżeczka";
    if(p("łyż"))    return "łyżka";
    if(p("ząb"))    return "ząbek";
    if(p("puszk")||p("puszek")) return "puszka";
    if(p("szklan")) return "szklanka";
    if(p("garś")||p("garści")) return "garść";
    if(p("krom"))   return "kromka";
    if(p("plast"))  return "plaster";
    if(p("pęcz"))   return "pęczek";
    if(p("miar"))   return "miarka";
    if(p("lask"))   return "laska";
    if(p("liś"))    return "liść";
    if(p("łodyg"))  return "łodyga";
    if(p("szt"))    return "szt";
    return null;
  }
  // domyślna ilość, gdy składnik nie ma podanej gramatury (na 2 porcje)
  function defaultGrams(name){
    const n=(name||"").toLowerCase();
    if(/chleb|pieczyw|krom|grzank|tost/.test(n)) return 140;   // ~4 kromki
    if(/pit[ay]|pit /.test(n)) return 120;
    if(/tortill/.test(n)) return 100;
    if(/naan/.test(n)) return 100;
    if(/bułe|bułk/.test(n)) return 140;
    if(/oliw|olej/.test(n)) return 15;
    if(/masł[oa]\b|masło/.test(n)) return 15;
    if(/jogurt|śmietan/.test(n)) return 100;
    if(/ser |sera|feta|parmezan|mozzarell/.test(n)) return 40;
    if(/orzech|sezam|migdał/.test(n)) return 20;
    if(/salsa|sos|hummus|majonez|kimchi|kiszon|oliwki/.test(n)) return 30;
    if(/sałat|rukol|szpinak|zioł|natk|kolendr|koperek|szczypior|mięt|bazyli/.test(n)) return 25;
    if(/pomidor|ogór|cebul|papryk|marchew|rzodkiew|warzyw|kiełk/.test(n)) return 80;
    if(/cytryn|limonk/.test(n)) return 20;
    if(/owoc|jagod|malin|banan|mango/.test(n)) return 100;
    return 0; // przyprawy, sól, pieprz itp.
  }
  function lookupFood(name){
    const n=(name||"").toLowerCase();
    // wybierz produkt, którego nazwa pojawia się NAJWCZEŚNIEJ w linii
    // ("800 g ziemniaków na puree","1 łyżka masła","100 ml mleka" → ziemniaki, nie masło)
    let best=null, bestPos=Infinity, bestLen=0;
    for(const [keys,vals] of FOOD){
      for(const kk of keys){
        const p=n.indexOf(kk);
        if(p<0) continue;
        if(p<bestPos || (p===bestPos && kk.length>bestLen)){ best=vals; bestPos=p; bestLen=kk.length; }
      }
    }
    return best;
  }
  // zwraca gramy danego składnika
  function ingredientGrams(line){
    const m=(line||"").match(UNIT_RE);
    if(!m) return null;
    let qty=parseFloat((m[1]||"").replace(",","."));
    if(!isFinite(qty)) return null;
    // ułamek typu "1/2"
    const fr=(line||"").match(/(\d+)\s*\/\s*(\d+)/);
    if(fr && line.indexOf(fr[0])<8) qty=parseInt(fr[1])/parseInt(fr[2]);
    const u=normUnit(m[2]);
    if(u && UNIT_G[u]) return qty*UNIT_G[u];
    return qty*unitGrams(u, line);
  }
  // dzieli "oliwa, 4 kromki pieczywa" na osobne człony (przecinki poza nawiasami)
  function splitParts(line){
    const out=[]; let cur=""; let depth=0;
    for(const ch of (line||"")){
      if(ch==="(") depth++;
      if(ch===")") depth=Math.max(0,depth-1);
      if(ch==="," && depth===0){ out.push(cur); cur=""; }
      else cur+=ch;
    }
    if(cur.trim()) out.push(cur);
    return out.map(x=>x.trim()).filter(Boolean);
  }
  function estimateMacros(r){
    let P=0,C=0,F=0, matched=0;
    (r.ingredients||[]).forEach(line=>{
      const parts=splitParts(line);
      // wiodąca ilość z początku linii (np. "350 g ugotowanego, wystudzonego ryżu")
      const lead=(line||"").match(/^\s*(\d+[.,]?\d*(?:\s*\/\s*\d+)?\s*[a-ząćęłńóśźż]*)/i);
      const leadTok = lead ? lead[1] : null;
      let leadUsed = false;
      parts.forEach(part=>{
        const food=lookupFood(part);
        if(!food) return;
        let g=ingredientGrams(part);
        const partHasNum=/\d/.test(part);
        // człon bez własnej liczby → przypisz wiodącą ilość z linii (raz)
        if((!g || g<=0) && !partHasNum && leadTok && !leadUsed){
          g=ingredientGrams(leadTok+" "+part);
          if(g && g>0) leadUsed=true;
        }
        if(!g || g<=0) g=defaultGrams(part);
        if(!g || g<=0) return;
        if(partHasNum) leadUsed=true;
        matched++;
        P += food[0]*g/100;
        C += food[1]*g/100;
        F += food[2]*g/100;
      });
    });
    if(matched===0){
      const p=+(r.proteinTotal||0);
      return { kcal: Math.round((p*4+p*3.2+p*1.6*9)/10)*10, carbs: Math.round(p*0.8), fat: Math.round(p*0.4), protein: p, auto:true };
    }
    const Pdecl = +(r.proteinTotal||0);
    if(P>0 && Pdecl>0){
      const fs = Math.max(0.85, Math.min(1.2, Pdecl / P));
      C *= fs; F *= fs;
    }
    const Puse = Pdecl || Math.round(P);
    const kcal = Math.round((Puse*4 + C*4 + F*9)/10)*10;
    return { kcal, carbs: Math.round(C), fat: Math.round(F), protein: Puse, auto:true };
  }
  function estimateKcal(r){ return estimateMacros(r).kcal; }

  // ═══ DOPASOWANIE WĘGLI DO CELU ═══
  // Rusza tylko dodatki węglowodanowe. Mięso, sos i tłuszcz zostają nietknięte.
  // DODATKI, które można skalować bez psucia dania:
  const CARB_WORDS=/(ryż|ryz|kasz|bulgur|kuskus|ziemniak|batat|frytk|pit[ay]\b|naan)/i;
  // NOŚNIKI dania i śniadania — NIE ruszamy:
  // pieczywo/kromki (kanapka bez chleba to nie kanapka), tortille (nie ma w co zawinąć),
  // bułki, makaron (jest istotą dania), płatki/owsianka (śniadanie i tak się spali), granola, pinsa.
  const CARB_LOCKED=/(chleb|pieczyw|krom|grzank|tost|tortill|bułk|bule|makaron|spaghetti|linguine|płatk|platk|owsian|granol|pinsy|pinsa|muffin|chałk|chalk)/i;
  // czy składnik to skrobiowy DODATEK, który nakładacie osobno (a nie sos/warzywo)
  const CARB_STAPLE=/(ryż|ryz|makaron|spaghetti|linguine|kasz|bulgur|kuskus|ziemniak|batat|frytk|chleb|pieczyw|krom|grzank|tost|tortill|bułk|bule|pit[ay]\b|naan|płatk|platk|owsian|granol|pinsy|pinsa|muffin|chałk|chalk|makaronu ryżowego)/i;
  function isCarbFood(line){
    if(!CARB_STAPLE.test(line||"")) return false;   // sosy, pasty i warzywa idą z daniem
    const f=lookupFood(line);
    if(!f) return false;
    return f[1] >= 15;   // faktycznie skrobiowy
  }
  function isCarbLine(line){
    const n=line||"";
    if(CARB_LOCKED.test(n)) return false;   // nośnik / śniadanie → zostaw w spokoju
    return CARB_WORDS.test(n);
  }
  function carbAdjOf(d){ const v=(state.carbAdj||{})[d]; return (v==null||!isFinite(v))?1:v; }
  // przelicza składniki węglowodanowe przepisu wg współczynnika (do podpowiedzi)
  // minimalna porcja dodatku (na 2 osoby) — poniżej tego danie traci sens
  function carbFloor(line){
    const n=(line||"").toLowerCase();
    if(/ryż|ryz|kasz|bulgur|kuskus/.test(n)) return 160;   // g suchego na 2 os.
    if(/ziemniak|batat/.test(n)) return 450;
    if(/frytk/.test(n)) return 350;
    if(/pit[ay]|naan/.test(n)) return 2;                    // sztuki
    return 0;
  }
  function carbHints(r, adj){
    if(!r || Math.abs(adj-1)<0.03) return [];
    const out=[];
    (r.ingredients||[]).forEach(line=>{
      if(!isCarbLine(line)) return;
      const m=(line||"").match(/(\d+[.,]?\d*)\s*(g|ml|kromk\w*|krom\w*|szt\w*)?/i);
      if(!m || !m[1]) return;
      const q=parseFloat(m[1].replace(",","."));
      if(!isFinite(q) || q<=0) return;
      let nq=Math.round(q*adj);
      const floor=carbFloor(line);
      let clipped=false;
      if(floor && nq<floor && q>=floor){ nq=floor; clipped=true; }   // nie schodź poniżej minimum
      if(nq===Math.round(q)) return;
      out.push(`${line.slice(0,32)}: ${Math.round(q)} → ${nq}${clipped?" (min)":""}`);
    });
    return out;
  }
  // suma węgli dnia po korekcie
  function dayCarbs(d, adjusted){
    let C=0;
    MEALS.forEach(([mk])=>{ const r=findR(state.week[d][mk].recipeId); if(r) C+=(+r.carbs||0); });
    const sh=findR(state.week[d].shakeId||""); if(sh) C+=(+sh.carbs||0);
    return adjusted ? C*carbAdjOf(d) : C;
  }
  function fitCarbsToTarget(){
    const T=state.targets;
    const targetTotal=(+T.carb1||0)+(+T.carb2||0); // węgle obojga razem
    if(!targetTotal){ alert("Ustaw cele węglowodanów w nagłówku."); return; }
    let changed=0;
    DAYS.forEach(d=>{
      const cur=dayCarbs(d,false);
      if(cur<=0){ state.carbAdj[d]=1; return; }
      let f=targetTotal/cur;
      f=Math.max(0.70, Math.min(1.6, f));   // PODŁOGA: nigdy poniżej 70% — danie musi zostać daniem
      state.carbAdj[d]=Math.round(f*100)/100;
      if(Math.abs(f-1)>=0.03) changed++;
    });
    queueSave(); renderWeek();
    alert("Dopasowano porcje węglowodanów w "+changed+" dniach.\n\nSKALUJĘ tylko dodatki:\n• ryż, kasza, bulgur, ziemniaki, bataty, frytki, pity, naan\n\nNIE RUSZAM:\n• pieczywa i tortilli (bez nich nie ma kanapki ani wrapa)\n• makaronu (jest istotą dania)\n• owsianek i śniadań\n• mięsa, sosu i tłuszczu — stały podział 60/40\n\nPorcja nie schodzi poniżej 70% ani poniżej minimum\n(ryż 160 g, ziemniaki 450 g na dwoje).");
  }
  function resetCarbs(){ state.carbAdj={}; queueSave(); renderWeek(); }

  // ═══ HISTORIA GOTOWANIA + OCENY ═══
  function todayISO(){ return new Date().toISOString().slice(0,10); }
  function markCooked(recipeId){
    if(!recipeId || SPECIAL[recipeId] || (recipeId+"").indexOf("frz_")===0) return;
    state.cooked=state.cooked||[];
    state.cooked.push({id:uid("h"), recipeId, date:todayISO()});
    queueSave();
  }
  function unmarkCookedToday(recipeId){
    state.cooked=(state.cooked||[]).filter(x=>!(x.recipeId===recipeId && x.date===todayISO()));
    queueSave();
  }
  function cookedToday(recipeId){
    return (state.cooked||[]).some(x=>x.recipeId===recipeId && x.date===todayISO());
  }
  function cookedCount(recipeId){
    return (state.cooked||[]).filter(x=>x.recipeId===recipeId).length;
  }
  function getRating(recipeId){ return (state.ratings||{})[recipeId]||0; }
  function setRating(recipeId,v){
    state.ratings=state.ratings||{};
    if(getRating(recipeId)===v) delete state.ratings[recipeId]; // ponowne kliknięcie = kasuj ocenę
    else state.ratings[recipeId]=v;
    queueSave();
  }
  function starsHTML(recipeId, cls){
    const r=getRating(recipeId);
    let h=`<span class="kk-stars ${cls||""}" data-rid="${recipeId}">`;
    for(let i=1;i<=5;i++) h+=`<span class="kk-star ${i<=r?"on":""}" data-v="${i}">★</span>`;
    h+=`</span>`;
    return h;
  }
  function bindStars(root){
    root.querySelectorAll(".kk-star").forEach(st=> st.addEventListener("click",e=>{
      e.stopPropagation();
      const wrap=e.target.closest(".kk-stars");
      setRating(wrap.dataset.rid, +e.target.dataset.v);
      renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); renderMealTab("shake");
      renderHistory(); renderWeek();
    }));
  }



  function seed(){
    const rs=seedRaw();
    rs.forEach(r=>{
      if(r.cuisine==="Polska/Europejska") r.cuisine = POLSKIE.indexOf(r.id)>=0 ? "Polska" : "Europejska";
      r.season = SEASON_MAP[r.id] || "all";
      if(r.mealTypes.includes("breakfast") && BREAKFAST_PTYPE[r.id]) r.ptype=BREAKFAST_PTYPE[r.id];
      if(r.kcal==null || r.carbs==null || r.fat==null){ const mm=estimateMacros(r); if(r.kcal==null) r.kcal=mm.kcal; if(r.carbs==null) r.carbs=mm.carbs; if(r.fat==null) r.fat=mm.fat; }
      if(r.unotes==null) r.unotes="";
    });
    return rs;
  }
  function mkWeek(plan){
    const w={};
    DAYS.forEach(d=>{ const p=plan[d]||{};
      w[d]={ addP1:0, addP2:0, shakeId:p.shake||"",
        breakfast:{recipeId:p.b||""}, lunch:{recipeId:p.l||""}, dinner:{recipeId:p.di||""} }; });
    return w;
  }
  function seedSavedWeeks(){
    return [
      { id:"w_base", name:"Bazowy (ultimate)", mult:{fr1:2}, week: seedWeek() },
      { id:"w_asia", name:"Azjatycki tydzień", mult:{}, week: mkWeek({
        "Pon":{b:"b5",  l:"t1",  di:"j1",  shake:"s1"},
        "Wt": {b:"b9",  l:"k1",  di:"c3"},
        "Śr": {b:"b3",  l:"c1",  di:"d6",  shake:"s1"},
        "Czw":{b:"b12", l:"i1",  di:"t2"},
        "Pt": {b:"b6",  l:"v2",  di:"c2",  shake:"s1"},
        "Sob":{b:"b8",  l:"k2",  di:"t3"},
        "Nd": {b:"b16", l:"p3",  di:"j1"}
      })},
      { id:"w_medi", name:"Śródziemnomorski tydzień", mult:{}, week: mkWeek({
        "Pon":{b:"b7",  l:"g1",  di:"w4",  shake:"s1"},
        "Wt": {b:"b15", l:"w1",  di:"g3"},
        "Śr": {b:"b6",  l:"m1",  di:"w3",  shake:"s1"},
        "Czw":{b:"b12", l:"no1", di:"d7"},
        "Pt": {b:"b8",  l:"h1",  di:"h2",  shake:"s1"},
        "Sob":{b:"b4",  l:"g2",  di:"fr2"},
        "Nd": {b:"b16", l:"p3",  di:"no3"}
      })},
      { id:"w_korgr", name:"Koreańsko-grecki", mult:{}, week: mkWeek({
        "Pon":{b:"b5",  l:"k1",  di:"g3",  shake:"s1"},
        "Wt": {b:"b2",  l:"g1",  di:"c3"},
        "Śr": {b:"b6",  l:"k2",  di:"d7",  shake:"s1"},
        "Czw":{b:"b12", l:"g2",  di:"j1"},
        "Pt": {b:"b7",  l:"k3",  di:"d10", shake:"s1"},
        "Sob":{b:"b8",  l:"g1",  di:"d8"},
        "Nd": {b:"b16", l:"p3",  di:"no3"}
      })}
    ];
  }
  function defaultState(){
    return { targets:{ p1:115, p2:160, splitM:58, splitF:56, splitC:53, kcal1:1800, kcal2:2250, fat1:70, fat2:90, carb1:180, carb2:200 }, recipes:seed(), week:seedWeek(), shopping:[], prep:[], mult:{ fr1:2 }, freezer:[], carbAdj:{}, cooked:[], ratings:{}, recipesVersion:RECIPES_VERSION, shopDays:null, shopView:"recipe", shopSum:false, season:"all", savedWeeks:seedSavedWeeks(), prevWeekIds:[], genTempo:"mix", batchExtra:{} };
  }

  let state=null, saveTimer=null, tab="rules", editing=null;
  let fCuisine="Wszystkie", fProtein="Wszystkie", recipeMeal="breakfast";
  const PROTEIN_CATS=["Drób","Wołowina","Ryby i owoce morza","Wieprzowina","Roślinne"];

  async function load(){
    try{ const r=await window.storage.get(STORAGE_KEY,true); state=r&&r.value?JSON.parse(r.value):defaultState(); }
    catch(e){ state=defaultState(); }
    DAYS.forEach(d=>{ if(!state.week[d]) state.week[d]={}; if(state.week[d].addP1==null) state.week[d].addP1=0; if(state.week[d].addP2==null) state.week[d].addP2=0; if(state.week[d].shakeId==null) state.week[d].shakeId=""; MEALS.forEach(([mk])=>{ if(!state.week[d][mk]) state.week[d][mk]={recipeId:""}; }); });
    // ═══ MIGRACJA: odśwież wbudowane przepisy i cele, zachowaj to, co Wasze ═══
    if(state.recipesVersion !== RECIPES_VERSION){
      const fresh=seed();
      const freshIds=new Set(fresh.map(r=>r.id));
      // 1) zachowaj własne przepisy (dodane przez Was)
      const mine=(state.recipes||[]).filter(r=>!freshIds.has(r.id));
      // 2) zachowaj Wasze notatki przy wbudowanych przepisach
      const notes={}; (state.recipes||[]).forEach(r=>{ if(r.unotes) notes[r.id]=r.unotes; });
      fresh.forEach(r=>{ if(notes[r.id]) r.unotes=notes[r.id]; });
      state.recipes=fresh.concat(mine);
      // 3) zaktualizuj cele do uzgodnionych wartości
      const D=defaultState().targets;
      state.targets=Object.assign({}, state.targets||{}, D);
      // 4) wyczyść korekty węgli (odnoszą się do starych gramatur)
      state.carbAdj={};
      // 5) usuń stare zadania prep bez znacznika (rosły w nieskończoność) i stare pozycje zakupów
      const AUTO_TXT=/^(Zamarynuj i zamroź|Ugotuj na zapas i zamroź|Świeżo w dniu podania|Rozłóż porcje)/;
      state.prep=(state.prep||[]).filter(t=> !(t.auto || t.srcId || AUTO_TXT.test(t.text||"")) );
      state.shopping=(state.shopping||[]).filter(it=> it.auto===false );
      state.recipesVersion=RECIPES_VERSION;
      queueSave();
      console.log("Zmigrowano bazę przepisów do wersji "+RECIPES_VERSION);
    }
    if(!state.savedWeeks) state.savedWeeks=seedSavedWeeks();
    if(state.shopSum==null) state.shopSum=false;
    if(!state.season) state.season="all";
    (state.recipes||[]).forEach(r=>{ if(r.cuisine==="Polska/Europejska") r.cuisine = POLSKIE.indexOf(r.id)>=0 ? "Polska" : "Europejska"; if(!r.season) r.season="all"; if(r.kcal==null||r.carbs==null||r.fat==null){ const mm=estimateMacros(r); if(r.kcal==null) r.kcal=mm.kcal; if(r.carbs==null) r.carbs=mm.carbs; if(r.fat==null) r.fat=mm.fat; } if(r.unotes==null) r.unotes=""; });
    if(!state.batchExtra) state.batchExtra={};
    if(!state.carbAdj) state.carbAdj={};
    if(!state.cooked) state.cooked=[];
    if(!Array.isArray(state.shopDays)) state.shopDays=DAYS.slice();
    if(!state.ratings) state.ratings={};
    if(!state.prevWeekIds) state.prevWeekIds=[];
    if(!state.genTempo) state.genTempo="mix";
    if(!state.targets.splitM) state.targets.splitM=58;
    if(state.targets.splitC==null) state.targets.splitC=53;
    if(state.targets.splitF==null) state.targets.splitF=56;
    if(state.targets.splitM==null) state.targets.splitM=58;
    if(state.targets.fat1==null) state.targets.fat1=70;
    if(state.targets.fat2==null) state.targets.fat2=90;
    if(state.targets.carb1==null) state.targets.carb1=180;
    if(state.targets.carb2==null) state.targets.carb2=200;
    if(state.targets.kcal1==null) state.targets.kcal1=1800;
    if(state.targets.kcal2==null) state.targets.kcal2=2250;
    if(!state.freezer) state.freezer=[];
    if(!state.shopView) state.shopView="recipe";
    render();
  }
  function queueSave(){ clearTimeout(saveTimer); saveTimer=setTimeout(async()=>{ try{ await window.storage.set(STORAGE_KEY,JSON.stringify(state),true);}catch(e){console.error(e);} },350); }
  function uid(p){ return p+Math.random().toString(36).slice(2,8); }
  function findR(id){ return state.recipes.find(r=>r.id===id); }
  function getMult(id){ return (state.mult && state.mult[id]) ? state.mult[id] : 1; }
  function getExtra(id){ return (state.batchExtra && state.batchExtra[id]) ? state.batchExtra[id] : 0; }
  function setExtra(id,v){ if(!state.batchExtra) state.batchExtra={}; state.batchExtra[id]=Math.max(0,Math.min(6,v)); queueSave(); }
  function totalMult(id){ return getMult(id)+getExtra(id); }
  function setMult(id,v){ if(!state.mult) state.mult={}; state.mult[id]=Math.max(1,Math.min(6,v)); queueSave(); }
  function esc(s){ return (s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function split(){ const m=(state.targets.splitM||62)/100; return {m,k:1-m}; }
  function splitCF(){ const c=(state.targets.splitC||50)/100; return {c,ck:1-c}; }
  // Tłuszcz jest w tym samym garnku co mięso i sos → dzieli się DOKŁADNIE jak białko.
  function splitFat(){ const fv=(state.targets.splitM||58)/100; return {f:fv, fk:1-fv}; }
  function findFrz(id){ return (state.freezer||[]).find(x=>("frz_"+x.id)===id); }
  function mealProt(meal){
    if(SPECIAL[meal.recipeId]) return SPECIAL[meal.recipeId].prot;
    if(meal.recipeId && meal.recipeId.indexOf("frz_")===0){ const fz=findFrz(meal.recipeId); return fz?(+fz.protein||0):0; }
    const r=findR(meal.recipeId); return r?r.proteinTotal:0;
  }
  function mealName(meal){
    if(SPECIAL[meal.recipeId]) return SPECIAL[meal.recipeId].name;
    if(meal.recipeId && meal.recipeId.indexOf("frz_")===0){ const fz=findFrz(meal.recipeId); return fz?("❄ "+fz.name):"❄ (z zamrażalnika)"; }
    const r=findR(meal.recipeId); return r?r.name:"";
  }
  const PREP_LABEL={mar:["Marynuj + zamroź","kk-b-mar"], freeze:["Gotuj + zamroź","kk-b-freeze"], fresh:["Świeżo","kk-b-fresh"]};

  function render(){
    const root=document.getElementById("kk-root");
    root.innerHTML=`
      <div class="kk-header">
        <div class="kk-eyebrow">Wasza kuchnia · finalny program</div>
        <h1 class="kk-title">Program gotowania</h1>
        <div class="kk-sub">21 kuchni świata, filtr sezonowy, wysokie białko. Gotujecie jedną potrawę i dzielicie na dwoje (z podziałem składników na dwie miski). Częściowy meal prep, zamrażalnik jako bufor, biblioteka gotowych tygodni i tryb przetrwania na tygodnie z górą pracy. Dni zupy i jedzenia na mieście są częścią planu, nie porażką.</div>
        <div class="kk-targets">
          <div class="kk-tcard"><label>Magda: kcal</label><input id="t-k1" type="number" value="${state.targets.kcal1}" style="width:56px;"></div>
          <div class="kk-tcard"><label>M: białko</label><input id="t-p1" type="number" value="${state.targets.p1}"></div>
          <div class="kk-tcard"><label>M: tłuszcz</label><input id="t-f1" type="number" value="${state.targets.fat1}"></div>
          <div class="kk-tcard"><label>M: węgle</label><input id="t-c1" type="number" value="${state.targets.carb1}"></div>
        </div>
        <div class="kk-targets" style="margin-top:8px;">
          <div class="kk-tcard"><label>Ty: kcal</label><input id="t-k2" type="number" value="${state.targets.kcal2}" style="width:56px;"></div>
          <div class="kk-tcard"><label>Ty: białko</label><input id="t-p2" type="number" value="${state.targets.p2}"></div>
          <div class="kk-tcard"><label>Ty: tłuszcz</label><input id="t-f2" type="number" value="${state.targets.fat2}"></div>
          <div class="kk-tcard"><label>Ty: węgle</label><input id="t-c2" type="number" value="${state.targets.carb2}"></div>
        </div>
        <div class="kk-targets" style="margin-top:8px;">
          <div class="kk-tcard"><label>Twój podział: mięso, sos, tłuszcz %</label><input id="t-split" type="number" value="${state.targets.splitM}"></div>
          <div class="kk-tcard"><label>Twój podział: węgle (ryż, ziemniaki) %</label><input id="t-splitc" type="number" value="${state.targets.splitC}"></div>
        </div>
      </div>
      <div class="kk-tabs">
        <div class="kk-tab" data-tab="rules">Zasady</div>
        <div class="kk-tab" data-tab="breakfast">Śniadania</div>
        <div class="kk-tab" data-tab="lunch">Obiady</div>
        <div class="kk-tab" data-tab="dinner">Kolacje</div>
        <div class="kk-tab" data-tab="shake">Shake'i</div>
        <div class="kk-tab" data-tab="week">Plan tygodnia</div>
        <div class="kk-tab" data-tab="weeks">Biblioteka tygodni</div>
        <div class="kk-tab" data-tab="freezer">Zamrażalnik</div>
        <div class="kk-tab" data-tab="shop">Lista zakupów</div>
        <div class="kk-tab" data-tab="prep">Sesja prep</div>
        <div class="kk-tab" data-tab="history">Historia</div>
        <div class="kk-tab" data-tab="survival">Przetrwanie</div>
      </div>
      <div class="kk-body">
        <div class="kk-panel" data-panel="rules"></div>
        <div class="kk-panel" data-panel="breakfast"></div>
        <div class="kk-panel" data-panel="lunch"></div>
        <div class="kk-panel" data-panel="dinner"></div>
        <div class="kk-panel" data-panel="shake"></div>
        <div class="kk-panel" data-panel="week"></div>
        <div class="kk-panel" data-panel="weeks"></div>
        <div class="kk-panel" data-panel="freezer"></div>
        <div class="kk-panel" data-panel="shop"></div>
        <div class="kk-panel" data-panel="prep"></div>
        <div class="kk-panel" data-panel="history"></div>
        <div class="kk-panel" data-panel="survival"></div>
      </div>`;
    root.querySelectorAll(".kk-tab").forEach(t=> t.addEventListener("click",()=>{ tab=t.dataset.tab; refreshTabs(); }));
    const bindT=(id,key,min,max)=>{ const el=document.getElementById(id); if(el) el.addEventListener("change",e=>{
      let v=+e.target.value||0; if(min!=null) v=Math.max(min,Math.min(max,v));
      state.targets[key]=v; queueSave(); renderWeek(); renderRules();
      renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); renderMealTab("shake");
    }); };
    bindT("t-p1","p1"); bindT("t-p2","p2");
    bindT("t-k1","kcal1"); bindT("t-k2","kcal2");
    bindT("t-f1","fat1"); bindT("t-f2","fat2");
    bindT("t-c1","carb1"); bindT("t-c2","carb2");
    bindT("t-split","splitM",15,85); bindT("t-splitc","splitC",15,85);
    renderRules(); renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); renderMealTab("shake"); renderWeek(); renderWeeksLib(); renderFreezer(); renderShop(); renderPrep(); renderHistory(); renderSurvival(); refreshTabs();
  }
  function refreshTabs(){
    document.querySelectorAll(".kk-tab").forEach(t=> t.classList.toggle("active", t.dataset.tab===tab));
    document.querySelectorAll(".kk-panel").forEach(p=> p.classList.toggle("active", p.dataset.panel===tab));
    // zwiń rozwinięte przepisy, żeby po powrocie widok był czysty
    document.querySelectorAll(".kk-panel details[open]").forEach(d=> d.open=false);
  }

  function renderRules(){
    const p=document.querySelector('[data-panel="rules"]');
    p.innerHTML=`<div class="kk-rules">
      <h3>Filozofia programu</h3>
      <div class="kk-rule"><b>1. Jedna potrawa, podział na dwoje.</b><p>Gotujemy wspólnie w większej ilości i dzielimy w proporcji ~${state.targets.splitM}/${100-state.targets.splitM} (Ty/Magda). Żadnych dwóch osobnych dań jak w Respo. Twoja porcja jest większa — zwłaszcza węglowodany.</p></div>
      <div class="kk-rule"><b>2. Cele białka osobne, nie proporcjonalne.</b><p>Ty ~${state.targets.p2} g, Magda ~${state.targets.p1} g. To nie ten sam talerz w skali — Twój ma po prostu więcej wszystkiego. Gdy dania jest za mało dla Ciebie, dokładasz węgli lub prosty dodatek białkowy (jajko, skyr) — <i>realną</i> ilość, nigdy absurdalnych 600 g skyru.</p></div>
      <div class="kk-rule"><b>3. Trzy różne role posiłków.</b><p><b>Śniadania</b> — stała rotacja 17 prostych opcji, żadnego zmęczenia decyzją. <b>Obiady</b> — kreatywna, światowa zmienność, tu mieszka radość i tu robicie dania na zapas. <b>Kolacje</b> — szybkie i proste (kanapki, wrapy, makarony, stek, pinsa, quesadilla), nic skomplikowanego na wieczór, bo i tak tego nie zrobisz.</p></div>
      <div class="kk-rule"><b>3b. Shake białkowy dobija dzienny cel.</b><p>Przy 3 porannych treningach w tygodniu (siłownia / HIIT / bieganie) shake po treningu to najszybszy sposób na +30-45 g białka. W planie tygodnia jest osobny wiersz „Shake / dodatek" — wpisujesz gramy indywidualnie dla siebie i Magdy (bez podziału porcji).</p></div>
      <div class="kk-rule"><b>4. Balans białka liczony tygodniowo, nie dziennie.</b><p>Cel: ~2× drób, 2× wołowina, 2× ryba w tygodniu. Licznik w planie pilnuje, żeby ryba nigdy nie "wypadała" z tygodnia. Jeden dzień poniżej celu to nic — liczy się średnia.</p></div>
      <div class="kk-rule"><b>5. Częściowy meal prep, nie gotowanie na miesiąc.</b><p>Twój sweet spot: zamarynowane mięso vacuum sealed w zamrażalniku + świeży ryż/warzywa na bieżąco. Dania oznaczone <span class="kk-badge kk-b-mar">Marynuj + zamroź</span> i <span class="kk-badge kk-b-freeze">Gotuj + zamroź</span> robisz na zapas; <span class="kk-badge kk-b-fresh">Świeżo</span> tego samego dnia.</p></div>
      <div class="kk-rule"><b>6. Dni zupy, knajpy i kateringu są legalne.</b><p>W planie możesz wpisać dzień zupy (botwinka, rosół), lunch na mieście albo katering — bez poczucia, że łamiesz system. To realne życie przy Waszej pracy.</p></div>
      <div class="kk-rule"><b>7. Regularne, umiarkowane białko > perfekcyjne, męczące.</b><p>Forma skacze z aktywnością. Cel to trafiać w białko <i>w miarę codziennie</i> bez wojny z jedzeniem — to utrzyma formę łatwiej niż idealny, ale nie do utrzymania plan.</p></div>

      <h3>Wasze parametry</h3>
      <div class="kk-rule"><b>Ty:</b> 98 kg, 183 cm, ~78 kg beztłuszczowej masy, budowa sportowa, treningi siłowe / HIIT / Hyrox.
        <p>Cel ${state.targets.p2} g białka ≈ 2,0 g na kg masy beztłuszczowej — mocny, realny cel pod regenerację i budowę przy Twoim treningu. Węglowodany skalują się z aktywnością: więcej w dni treningowe.</p>
        <div class="kk-pill-row"><span class="kk-pill">Kurczak i udka</span><span class="kk-pill">Wołowina i steki</span><span class="kk-pill">Pulled pork</span><span class="kk-pill">Ryby: łosoś, tuńczyk</span><span class="kk-pill">Krewetki (mrożone obrane)</span></div></div>
      <div class="kk-rule"><b>Magda:</b> 59 kg, 166 cm, te same treningi.
        <p>Cel ${state.targets.p1} g ≈ 1,7 g/kg — dobry pod aktywny tryb. Uwielbia sushi → w bazie jest szybki chirashi bowl na domowe "sushi" bez zamawiania.</p></div>

      <h3>Kalorie, węgle i redukcja ~10%</h3>
      <div class="kk-rule"><b>Cele kaloryczne (orientacyjne).</b><p>Ty ~${state.targets.kcal2} kcal, Magda ~${state.targets.kcal1} kcal. To lekki deficyt pod cel zrzucenia ~10% masy — nie licz co do kalorii, trzymaj kierunek. Zmień w nagłówku, jeśli forma nie rusza po 2-3 tygodniach.</p></div>
      <div class="kk-rule"><b>Białko na pierwszym miejscu — węgle się dostosują.</b><p>Priorytet to trafić w białko (Ty ${state.targets.p2} g, Magda ${state.targets.p1} g) i dobre tłuszcze (oliwa, awokado, orzechy, ryby). Przy wysokim białku sytość rośnie i węgle naturalnie się regulują — nie musisz ich liczyć, tylko dopasować porcję do dnia.</p></div>
      <div class="kk-rule"><b>Węgle wokół treningu.</b><p>W dni treningowe (Pon/Śr/Pt) jedz pełną porcję węgli — ryż, ziemniaki, makaron — to paliwo pod HIIT/Hyrox/ciężary i regenerację. W dni bez treningu zmniejsz dodatek węgli o ~1/3 i dołóż warzyw/sałaty. Białko zostaje bez zmian codziennie.</p></div>
      <div class="kk-rule"><b>Jakość ponad budżet.</b><p>Bez ograniczeń budżetowych — stawiacie na dobrej jakości, różnorodne produkty (grecka oliwa, mutti, irański ryż, dobre mięso i ryby, włoskie sery). To świadomy wybór: lepsze składniki = większa frajda z jedzenia = łatwiej wytrwać.</p></div>

      <h3>Zamrażalnik i tryb przetrwania</h3>
      <div class="kk-rule"><b>Zamrażalnik to Twój bufor.</b><p>Zakładka <b>Zamrażalnik</b> to ewidencja tego, co masz na zapas (danie, porcje, data). Gdy coś tam jest, wybierasz to wprost w planie tygodnia (grupa „Z zamrażalnika") — idealne na dni bez czasu. Zasada FIFO: najstarsze najpierw, nic nie leży 4 miesiące.</p></div>
      <div class="kk-rule"><b>Tryb przetrwania na złe tygodnie.</b><p>Osobna zakładka <b>Przetrwanie</b>: minimalny plan i lista zakupów „białko bez gotowania" na tygodnie z górą pracy. Ma jedno zadanie — utrzymać białko i rytm, gdy pełny plan jest nierealny.</p></div>

      <h3>Narzędzia planowania</h3>
      <div class="kk-rule"><b>„Ułóż mi tydzień" jednym kliknięciem.</b><p>W Planie tygodnia przycisk automatycznie dobiera dania z zachowaniem balansu (2× drób / 2× wołowina / 2× ryba), aktywnego sezonu i wybranego tempa (więcej na zapas / więcej świeżo / mix). Potem dostosowujesz ręcznie.</p></div>
      <div class="kk-rule"><b>Rotacja anty-powtórkowa.</b><p>Przycisk „↺ Zamknij tydzień" zapamiętuje obecne dania jako miniony tydzień. W kolejnym powtórki są oznaczane „↺ w zesz. tyg.", a auto-układanie ich unika — żeby nie wpaść w kółko tych samych dań.</p></div>
      <div class="kk-rule"><b>Biblioteka tygodni.</b><p>Zapisuj ułożone tygodnie pod nazwą i wczytuj je jednym kliknięciem — z czasem zbudujesz własne zestawy tematyczne (koreańsko-grecki, śródziemnomorski, jesienny…).</p></div>
      <div class="kk-rule"><b>Druk / PDF.</b><p>Przycisk „🖨 Drukuj" generuje czystą kartkę z planem tygodnia i listą zakupów (pogrupowaną i zsumowaną) — do lodówki albo do sklepu bez telefonu.</p></div>
      <div class="kk-rule"><b>Kcal orientacyjne i notatki.</b><p>Każde danie ma szacunkową wartość kcal (na 2 porcje) liczoną ze składników — w Planie tygodnia widać dzienny bilans kcal obok białka. To <i>przybliżenie</i>: możesz je poprawić w edycji przepisu. Tam też dopiszesz własne notatki (np. „udka lepsze niż pierś", „więcej chili").</p></div>

      <h3>Wasza spiżarnia i sprzęt</h3>
      <div class="kk-rule"><b>Składniki-filary (zawsze w domu):</b>
        <p>Pomidory mutti, grecka oliwa, ryż z irańskiego sklepu, dobre pieczywo na zakwasie, jajka, biały serek do smarowania, masło orzechowe, chia, mrożone owoce (mango, maliny, porzeczki, truskawki) + sezonowe borówki.</p>
        <div class="kk-pill-row"><span class="kk-pill">Sery: mozzarella, feta, halloumi, camembert, koryciński, parmezan/pecorino</span><span class="kk-pill">Zieleniny: szpinak, rukola</span><span class="kk-pill">Awokado, ostra papryka</span></div></div>
      <div class="kk-rule"><b>Fermenty i probiotyki jako stały dodatek:</b>
        <p>Kimchi, kapusta kiszona, ogórki kiszone, buraczki — traktujcie jako obowiązkowy dodatek do 1-2 posiłków dziennie (dosłownie łyżka-dwie obok dania). Kefir z butelki liczy się do białka: szklanka ≈ 8-9 g. To najtańszy upgrade zdrowotny w całym planie.</p></div>
      <div class="kk-rule"><b>Sprzęt pracuje za Ciebie:</b>
        <p><b>Grill Tefal (OptiGrill)</b> — grillowane warzywa (papryka/cukinia/bakłażan) do każdego obiadu w 5 minut + wszystkie dania „marynuj+zamroź" (kebaby, szisz, jerk, satay) prosto z rozmrożenia. <b>Vacuum seal</b> — serce systemu marynuj+zamroź: mięso w marynacie, podpisz datą, do zamrażalnika. <b>Termomix</b> — puree, hummus, sosy, pasty przyprawowe (rendang, jerk) bez wysiłku.</p></div>
      <div class="kk-rule"><b>Tańsze steki warte nauki:</b>
        <p>Bavette (łata) i flat iron to najlepszy stosunek smaku do ceny w wołowinie. Zasada jedna: bardzo mocny ogień, krótko (2-3 min/strona), 5 min odpoczynku i <b>krojenie cienko w poprzek włókien</b> — wtedy biją cenowo antrykot. Przepis „Steak frites" w kolacjach jest pod nie napisany.</p></div>

      <h3>Jak używać</h3>
      <div class="kk-rule"><b>Tygodniowy rytm.</b><p>1) W <b>Bazie przepisów</b> wybierzcie dania na tydzień (filtruj po kuchni). 2) W <b>Planie tygodnia</b> wpiszcie je w dni; licznik pokaże białko dla Ciebie i Magdy oraz balans drób/wołowina/ryba. 3) <b>Lista zakupów</b> generuje się z planu. 4) <b>Sesja prep</b> zbiera, co ugotować/zamarynować na zapas. Wszystko synchronizuje się między Waszymi kontami na żywo.</p></div>
    </div>`;
  }

  function renderMealTab(meal){
    const p=document.querySelector('[data-panel="'+meal+'"]');
    if(!p) return;
    // dostępne kuchnie i białka w obrębie tego posiłku
    const inMeal=state.recipes.filter(r=> meal==="breakfast"?r.mealTypes.includes("breakfast"):r.mealTypes.includes(meal));
    const cuisinesHere=["Wszystkie",...CUISINES.filter(c=> inMeal.some(r=>r.cuisine===c))];
    const noProteinFilter = (meal==="shake");
    const protCats = meal==="breakfast" ? BREAKFAST_CATS : PROTEIN_CATS;
    const proteinsHere = noProteinFilter ? [] : ["Wszystkie",...protCats.filter(pc=> inMeal.some(r=>r.ptype===pc))];
    const showSeason = (meal!=="shake");

    let html="";
    if(meal==="shake") html+=`<div class="kk-note" style="margin:0 0 12px;">Shake'i to indywidualny dodatek białkowy — świetne po Waszych 3 porannych treningach (siłownia / HIIT / bieganie), żeby szybko dobić dzienne białko. W <b>Planie tygodnia</b> wybierasz konkretny shake w wierszu „Shake / dodatek" — jego białko dzieli się między Was, a ręcznie możesz dopisać dodatkowe gramy (np. kefir, skyr).</div>`;
    if(showSeason){
      html+=`<div class="kk-note" style="margin:0 0 6px;"><b>Sezon</b></div><div class="kk-filters">`;
      [["all","Cały rok"],["lato","Wiosna / Lato"],["zima","Jesień / Zima"]].forEach(([v,lab])=> html+=`<div class="kk-fbtn kk-fs ${state.season===v?"active":""}" data-s="${v}" style="border-color:var(--mustard);">${lab}</div>`);
      html+=`</div>`;
    }
    if(cuisinesHere.length>1 && meal!=="shake"){
      html+=`<div class="kk-note" style="margin:4px 0 6px;"><b>Filtr kuchni</b></div><div class="kk-filters">`;
      cuisinesHere.forEach(c=> html+=`<div class="kk-fbtn kk-fc ${fCuisine===c?"active":""}" data-c="${esc(c)}">${esc(c)}</div>`);
      html+=`</div>`;
    }
    html+=`<div class="kk-filters" style="margin-bottom:10px;">
      <div class="kk-fbtn ${state.onlyFav?"active":""}" id="favfilter-${meal}" style="border-color:var(--amber);">${state.onlyFav?"★ ":"☆ "}Tylko ulubione (4★+)</div>
    </div>`;
    if(proteinsHere.length){
      html+=`<div class="kk-note" style="margin:4px 0 6px;"><b>Filtr źródła białka</b></div><div class="kk-filters">`;
      proteinsHere.forEach(pc=> html+=`<div class="kk-fbtn kk-fp ${fProtein===pc?"active":""}" data-p="${esc(pc)}" style="border-color:var(--herb);">${esc(pc)}</div>`);
      html+=`</div>`;
    }
    html+=`<div class="kk-grid">`;

    let list=inMeal;
    if(showSeason && state.season!=="all") list=list.filter(r=> (r.season||"all")==="all" || r.season===state.season);
    if(cuisinesHere.length>1 && meal!=="shake" && fCuisine!=="Wszystkie") list=list.filter(r=>r.cuisine===fCuisine);
    if(!noProteinFilter && fProtein!=="Wszystkie") list=list.filter(r=>r.ptype===fProtein);
    if(state.onlyFav) list=list.filter(r=>getRating(r.id)>=4);

    const {m,k}=split();
    if(list.length===0) html+=`<div class="kk-note">Brak przepisów dla tego filtra. Zmień filtr albo dodaj własny przepis niżej.</div>`;
    list.forEach(r=>{
      const pl=PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh;
      const mult=getMult(r.id);
      html+=`<div class="kk-card" data-id="${r.id}">
        <div class="kk-chead">
          <div class="kk-cuis">${esc(r.cuisine)}${r.ptype&&r.ptype!=="—"?" · "+esc(r.ptype):""}</div>
          <div class="kk-cname">${esc(r.name)}</div>
          <div class="kk-meta">
            <span>⏱ ${r.prepTime} min</span>
            <span>Białko: ${r.proteinTotal} g</span>
            <span>Ty ${Math.round(r.proteinTotal*m)} · M ${Math.round(r.proteinTotal*k)}</span>
            ${r.kcal?`<span>≈ ${r.kcal} kcal · W ${r.carbs||0} · T ${r.fat||0}</span>`:""}
            <span class="kk-badge ${pl[1]}">${pl[0]}</span>
            ${r.season&&r.season!=="all"?`<span class="kk-badge" style="background:var(--mustard);">${r.season==="lato"?"Wiosna/Lato":"Jesień/Zima"}</span>`:""}
          </div>
          <div class="kk-multrow">
            <span class="kk-multlabel">Porcje / dni:</span>
            <button class="kk-mminus" title="mniej">−</button>
            <span class="kk-multval">×${mult}</span>
            <button class="kk-mplus" title="więcej">+</button>
            <span class="kk-multhint">${mult>1?`= ${2*mult} porcji (${mult} dni po 2 os.)`:`2 porcje`}</span>
          </div>
        </div>
        <div class="kk-cbody">
          <details><summary>Składniki (${mult>1?`×${mult} → ${2*mult} porcji`:`2 porcje`})</summary><ul>${r.ingredients.map(i=>`<li>${esc(scaleIng(i,mult))}</li>`).join("")}</ul></details>
          ${meal!=="shake"?(()=>{ const cs=(state.targets.splitC||53)/100;
            const share=(ing,who)=>{ const carb=isCarbFood(ing); const f = carb ? (who==="ty"?cs:1-cs) : (who==="ty"?m:k); return scalePortion(scaleIng(ing,mult), f); };
            return `<details><summary>Podział na dwie miski</summary>
            <div class="kk-note" style="margin:0 0 6px;">Mięso, sos i tłuszcz: <b>${Math.round(m*100)}/${Math.round(k*100)}</b> · Węgle: <b>${Math.round(cs*100)}/${Math.round((1-cs)*100)}</b></div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <div style="flex:1; min-width:140px;"><b style="font-size:11px;">Twoja miska</b><ul>${r.ingredients.map(i=>`<li>${esc(share(i,"ty"))}</li>`).join("")}</ul></div>
              <div style="flex:1; min-width:140px;"><b style="font-size:11px;">Miska Magdy</b><ul>${r.ingredients.map(i=>`<li>${esc(share(i,"m"))}</li>`).join("")}</ul></div>
            </div>
            <div class="kk-note" style="margin-top:4px;">Ryż i ziemniaki dzielicie niemal po równo, mięso i sos w Twoją stronę. Przyprawy „do smaku" — na oko.</div>
          </details>`; })():""}
          <details><summary>Przygotowanie</summary><ol>${r.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></details>
          ${r.note?`<div class="kk-storenote">${esc(r.note)}</div>`:""}
          ${r.unotes?`<div class="kk-storenote" style="border-left-color:var(--plum); background:#f3eef6;">📝 ${esc(r.unotes)}</div>`:""}
          <div class="kk-ratingrow">
            ${starsHTML(r.id)}
            ${cookedCount(r.id)>0?`<span class="kk-cookcount">ugotowane ${cookedCount(r.id)}×</span>`:""}
          </div>
          <div class="kk-cedit"><button class="ed">Edytuj</button><button class="del">Usuń</button></div>
        </div>
      </div>`;
    });
    html+=`</div>
      <div class="kk-actions-row" style="margin-top:16px;">
        <button class="kk-btn addr">+ Dodaj własny ${meal==="shake"?"shake":"przepis"}</button>
        <button class="kk-btn sec pastr">📋 Wklej przepis z czatu</button>
      </div>
      <div class="pasteslot"></div><div class="edslot"></div>`;
    p.innerHTML=html;

    const ff=document.getElementById("favfilter-"+meal);
    if(ff) ff.addEventListener("click",()=>{ state.onlyFav=!state.onlyFav; queueSave(); renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); renderMealTab("shake"); });
    p.querySelectorAll(".kk-fs").forEach(b=> b.addEventListener("click",()=>{ state.season=b.dataset.s; queueSave(); renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); }));
    p.querySelectorAll(".kk-fc").forEach(b=> b.addEventListener("click",()=>{ fCuisine=b.dataset.c; renderMealTab(meal); }));
    p.querySelectorAll(".kk-fp").forEach(b=> b.addEventListener("click",()=>{ fProtein=b.dataset.p; renderMealTab(meal); }));
    p.querySelectorAll(".kk-mminus").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-card").dataset.id; setMult(id,getMult(id)-1); renderMealTab(meal); }));
    p.querySelectorAll(".kk-mplus").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-card").dataset.id; setMult(id,getMult(id)+1); renderMealTab(meal); }));
    p.querySelectorAll(".ed").forEach(b=> b.addEventListener("click",e=>{ editing=e.target.closest(".kk-card").dataset.id; renderEdit(meal); }));
    p.querySelectorAll(".del").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-card").dataset.id; if(confirm("Usunąć przepis?")){ state.recipes=state.recipes.filter(r=>r.id!==id); queueSave(); renderMealTab(meal); }}));
    p.querySelector(".addr").addEventListener("click",()=>{ editing="__new__"; renderEdit(meal); });
    p.querySelector(".pastr").addEventListener("click",()=>{ renderPasteBox(meal); });
    bindStars(p);
  }

  // skalowanie o dowolny współczynnik (podział na osobę)
  function scalePortion(text,factor){
    const frac=text.match(/(\d+)\/(\d+)/);
    if(frac){
      const val=(parseInt(frac[1])/parseInt(frac[2]))*factor;
      const out=val>=1&&Number.isInteger(val)?String(val):val.toFixed(2).replace(/\.?0+$/,"").replace(".",",");
      return text.replace(frac[0], out);
    }
    if(!/\d/.test(text)) return text;
    return text.replace(/(\d+[.,]?\d*)/, (num)=>{
      const val=parseFloat(num.replace(",","."))*factor;
      let out;
      if(val>=10) out=String(Math.round(val));
      else if(Number.isInteger(val)) out=String(val);
      else out=val.toFixed(1).replace(".",",");
      return out;
    });
  }

  // skalowanie wiodącej ilości w składniku przez mnożnik (obsługa ułamków i liczb)
  function scaleIng(text,mult){
    if(mult<=1) return text;
    // najpierw ułamek "a/b" (np. 1/2 główki)
    const frac=text.match(/(\d+)\/(\d+)/);
    if(frac){
      const val=(parseInt(frac[1])/parseInt(frac[2]))*mult;
      const out=Number.isInteger(val)?String(val):val.toFixed(2).replace(/\.?0+$/,"").replace(".",",");
      return text.replace(frac[0], out);
    }
    return text.replace(/(\d+[.,]?\d*)/, (num)=>{
      const val=parseFloat(num.replace(",","."))*mult;
      const out=Number.isInteger(val)?String(val):val.toFixed(1).replace(".",",");
      return out;
    });
  }

  // ——— Import przepisu z tekstu (np. z czatu z Claude) ———
  function parseRecipeText(t){
    const lines=(t||"").split("\n").map(x=>x.replace(/\r/g,"").trim());
    const out={name:"",ingredients:[],steps:[],protein:0,time:0};
    let mode="head";
    const clean=x=> x.replace(/^([-*\u2022\u00b7\u2013\u2014]|\d+[.)])\s*/,"").replace(/\*\*/g,"").trim();
    const isMeta=L=>{
      const low=L.toLowerCase();
      return /^(bia[lł]k\w*|kalor\w*|kcal|czas\w*|makro\w*|w[eę]glowod\w*|t[lł]uszcz\w*|porcj\w*|kuchnia|sezon|autor|\u017ar[oó]d[lł]o)\b/.test(low.replace(/[*#:]/g,"").trim());
    };
    const grabMeta=L=>{
      // "Białko: 110 g"  albo "110 g białka"
      let mp=L.match(/bia[lł]k\w*\s*[:\-]?\s*(\d+)/i) || L.match(/(\d+)\s*g\s*bia[lł]k/i);
      if(mp && !out.protein) out.protein=parseInt(mp[1]);
      // czas tylko z wyraźnej etykiety
      let mt=L.match(/czas\w*\s*[:\-]?\s*(\d+)/i) || L.match(/^\s*(\d+)\s*(?:min|minut)\b/i);
      if(mt && !out.time) out.time=parseInt(mt[1]);
    };
    for(const raw of lines){
      const L=raw.trim(); if(!L) continue;
      const low=L.toLowerCase().replace(/[#*:]/g,"").trim();
      if(/^(sk[lł]adniki|ingredients)\b/.test(low)){ mode="ing"; continue; }
      if(/^(przygotowanie|spos[oó]b przygotowania|kroki|wykonanie|instrukcje|steps|instructions)\b/.test(low)){ mode="steps"; continue; }
      if(isMeta(L)){ grabMeta(L); continue; }
      grabMeta(L);
      if(mode==="head"){ if(!out.name) out.name=L.replace(/^#+\s*/,"").replace(/\*\*/g,"").trim(); continue; }
      if(mode==="ing"){ const c=clean(L); if(c) out.ingredients.push(c); continue; }
      if(mode==="steps"){ const c=clean(L); if(c) out.steps.push(c); continue; }
    }
    // brak nagłówków → heurystyka
    if(out.ingredients.length===0 && out.steps.length===0){
      lines.filter(Boolean).forEach((L,i)=>{
        if(isMeta(L)){ grabMeta(L); return; }
        if(i===0){ if(!out.name) out.name=L.replace(/^#+\s*/,"").trim(); return; }
        const c=clean(L); if(!c) return;
        if(/^\d+[.,]?\d*\s*(g|kg|ml|l|[lł]y[zż]k|[lł]y[zż]eczk|szt|z[aą]b|puszk|gar[sś][cć]|kromk)/i.test(c)) out.ingredients.push(c);
        else out.steps.push(c);
      });
    }
    return out;
  }

  function renderPasteBox(meal){
    const slot=document.querySelector('[data-panel="'+meal+'"] .pasteslot');
    slot.innerHTML=`<div class="kk-form">
      <label>Wklej przepis (np. skopiowany z czatu)</label>
      <textarea id="pz-text" style="min-height:180px;" placeholder="Wklej cały tekst przepisu — nazwę, składniki i kroki.\n\nNajlepiej działa, gdy w tekście są nagłówki „Składniki" i „Przygotowanie"."></textarea>
      <div class="kk-note">Rozpoznam nazwę, składniki i kroki, a potem otworzę formularz, w którym wszystko poprawisz i uzupełnisz (kuchnia, białko, sezon).</div>
      <div class="kk-actions">
        <button class="kk-btn" id="pz-go">Rozpoznaj i otwórz formularz</button>
        <button class="kk-btn sec" id="pz-cancel">Anuluj</button>
      </div>
    </div>`;
    document.getElementById("pz-cancel").addEventListener("click",()=>{ slot.innerHTML=""; });
    document.getElementById("pz-go").addEventListener("click",()=>{
      const parsed=parseRecipeText(document.getElementById("pz-text").value);
      if(!parsed.name && parsed.ingredients.length===0){ alert("Nie udało się nic rozpoznać — wklej tekst z nazwą, składnikami i krokami."); return; }
      slot.innerHTML="";
      editing="__new__"; pendingPaste=parsed; renderEdit(meal);
    });
    slot.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
  let pendingPaste=null;

  function renderEdit(meal){
    const slot=document.querySelector('[data-panel="'+meal+'"] .edslot');
    const isNew=editing==="__new__";
    const defMT = meal==="breakfast" ? ["breakfast"] : meal==="shake" ? ["shake"] : ["lunch","dinner"];
    const r=isNew?{name:"",cuisine:CUISINES[0],mealTypes:defMT,ptype:meal==="breakfast"?"\u2014":"Dr\u00f3b",prepTime:30,proteinTotal:100,prepStyle:"fresh",note:"",ingredients:[],steps:[]}:findR(editing);
    if(!r){ slot.innerHTML=""; return; }
    const PT=["Dr\u00f3b","Wo\u0142owina","Ryby i owoce morza","Wieprzowina","Ro\u015blinne","\u2014"];
    slot.innerHTML=`<div class="kk-form">
      <label>Nazwa</label><input id="f-name" value="${esc(r.name)}">
      <div class="kk-row">
        <div><label>Kuchnia</label><select id="f-cuis">${CUISINES.map(c=>`<option ${c===r.cuisine?"selected":""}>${c}</option>`).join("")}</select></div>
        <div><label>\u0179r\u00f3d\u0142o bia\u0142ka</label><select id="f-pt">${PT.map(c=>`<option ${c===r.ptype?"selected":""}>${c}</option>`).join("")}</select></div>
        <div><label>Czas (min)</label><input id="f-time" type="number" value="${r.prepTime}"></div>
        <div><label>Bia\u0142ko / 2 porcje (g)</label><input id="f-prot" type="number" value="${r.proteinTotal}"></div>
      </div>
      <div class="kk-row">
        <div><label>\u015aniadanie?</label><select id="f-mtb"><option value="1" ${r.mealTypes.includes("breakfast")?"selected":""}>Tak</option><option value="0" ${!r.mealTypes.includes("breakfast")?"selected":""}>Nie</option></select></div>
        <div><label>Obiad?</label><select id="f-mtl"><option value="1" ${r.mealTypes.includes("lunch")?"selected":""}>Tak</option><option value="0" ${!r.mealTypes.includes("lunch")?"selected":""}>Nie</option></select></div>
        <div><label>Kolacja?</label><select id="f-mtd"><option value="1" ${r.mealTypes.includes("dinner")?"selected":""}>Tak</option><option value="0" ${!r.mealTypes.includes("dinner")?"selected":""}>Nie</option></select></div>
        <div><label>Styl prep</label><select id="f-prep"><option value="fresh" ${r.prepStyle==="fresh"?"selected":""}>\u015awie\u017co</option><option value="mar" ${r.prepStyle==="mar"?"selected":""}>Marynuj + zamro\u017a</option><option value="freeze" ${r.prepStyle==="freeze"?"selected":""}>Gotuj + zamro\u017a</option></select></div>
      </div>
      <label>Notatka o przechowywaniu</label><input id="f-note" value="${esc(r.note||"")}">
      <label>Sezon</label><select id="f-season"><option value="all" ${(r.season||"all")==="all"?"selected":""}>Cały rok</option><option value="lato" ${r.season==="lato"?"selected":""}>Wiosna / Lato</option><option value="zima" ${r.season==="zima"?"selected":""}>Jesień / Zima</option></select>
      <div class="kk-row">
        <div><label>Węglowodany (2 porcje, g)</label><input id="f-carbs" type="number" value="${r.carbs||0}"></div>
        <div><label>Tłuszcz (2 porcje, g)</label><input id="f-fat" type="number" value="${r.fat||0}"></div>
        <div><label>Kcal (2 porcje)</label><input id="f-kcal" type="number" value="${r.kcal||0}"></div>
        <div style="flex:0 0 auto; display:flex; align-items:flex-end;"><button class="kk-btn sec" id="f-kcalest" style="padding:7px 12px; white-space:nowrap;">≈ oszacuj</button></div>
      </div>
      <label>Twoje notatki (modyfikacje, tipy)</label><textarea id="f-unotes" placeholder="np. dodać więcej chili, udka lepsze niż pierś...">${esc(r.unotes||"")}</textarea>
      <label>Sk\u0142adniki (linia = pozycja)</label><textarea id="f-ing">${esc((r.ingredients||[]).join("\n"))}</textarea>
      <label>Kroki (linia = krok)</label><textarea id="f-steps">${esc((r.steps||[]).join("\n"))}</textarea>
      <div class="kk-actions"><button class="kk-btn" id="savr">Zapisz</button><button class="kk-btn sec" id="canr">Anuluj</button></div>
    </div>`;
    document.getElementById("savr").addEventListener("click",()=>{
      const mt=[]; if(document.getElementById("f-mtb").value==="1") mt.push("breakfast");
      if(document.getElementById("f-mtl").value==="1") mt.push("lunch");
      if(document.getElementById("f-mtd").value==="1") mt.push("dinner");
      const u={ id:isNew?uid("r"):r.id, name:document.getElementById("f-name").value.trim()||"Bez nazwy",
        cuisine:document.getElementById("f-cuis").value, ptype:document.getElementById("f-pt").value,
        mealTypes:mt.length?mt:defMT, prepTime:+document.getElementById("f-time").value||30,
        proteinTotal:+document.getElementById("f-prot").value||0, prepStyle:document.getElementById("f-prep").value,
        note:document.getElementById("f-note").value.trim(),
        season:document.getElementById("f-season").value,
        kcal:+document.getElementById("f-kcal").value||0,
        carbs:+document.getElementById("f-carbs").value||0,
        fat:+document.getElementById("f-fat").value||0,
        unotes:document.getElementById("f-unotes").value.trim(),
        ingredients:document.getElementById("f-ing").value.split("\n").map(s=>s.trim()).filter(Boolean),
        steps:document.getElementById("f-steps").value.split("\n").map(s=>s.trim()).filter(Boolean) };
      if(isNew) state.recipes.push(u); else state.recipes=state.recipes.map(x=>x.id===r.id?u:x);
      editing=null; queueSave(); renderMealTab(meal); renderWeek();
    });
    document.getElementById("f-kcalest").addEventListener("click",()=>{
      const tmp={ proteinTotal:+document.getElementById("f-prot").value||0, ingredients:document.getElementById("f-ing").value.split("\n").map(s=>s.trim()).filter(Boolean) };
      const mm=estimateMacros(tmp);
      document.getElementById("f-kcal").value=mm.kcal;
      document.getElementById("f-carbs").value=mm.carbs;
      document.getElementById("f-fat").value=mm.fat;
    });
    document.getElementById("canr").addEventListener("click",()=>{ editing=null; renderMealTab(meal); });
    slot.scrollIntoView({behavior:"smooth",block:"nearest"});
  }

  function renderWeek(){
    const p=document.querySelector('[data-panel="week"]');
    const {m,k}=split();
    const prev=new Set(state.prevWeekIds||[]);
    let html=`<div class="kk-actions-row" style="align-items:center;">
      <button class="kk-btn" id="gw">✨ Ułóż mi tydzień</button>
      <select id="gw-tempo" style="padding:8px; border:1px solid var(--line); border-radius:5px; font-size:12px;">
        <option value="mix" ${state.genTempo==="mix"?"selected":""}>Tempo: Mix</option>
        <option value="batch" ${state.genTempo==="batch"?"selected":""}>Tempo: Więcej na zapas</option>
        <option value="fresh" ${state.genTempo==="fresh"?"selected":""}>Tempo: Więcej świeżo</option>
      </select>
      <button class="kk-btn sec" id="closeweek" title="zapamiętaj obecne dania jako miniony tydzień, żeby uniknąć powtórek">↺ Zamknij tydzień (rotacja)</button>
      <button class="kk-btn sec" id="fitcarbs" title="skaluje tylko ryż, makaron, ziemniaki i pieczywo">⚖ Dopasuj węgle do celu</button>
      <button class="kk-btn sec" id="resetcarbs" style="background:var(--mute);box-shadow:none;">Reset porcji</button>
      <button class="kk-btn sec" id="printweek">🖨 Drukuj / PDF</button>
    </div>
    <div style="overflow-x:auto;"><table class="kk-wtable"><thead><tr><th style="width:70px;">Posiłek</th>`;
    DAYS.forEach(d=> html+=`<th>${d}</th>`);
    html+=`</tr></thead><tbody>`;
    MEALS.forEach(([mk,ml])=>{
      html+=`<tr><th style="background:var(--slate-2);">${ml}</th>`;
      DAYS.forEach(d=>{
        const meal=state.week[d][mk];
        const pool=state.recipes.filter(r=> r.mealTypes.includes(mk));
        const specialOpts = mk==="breakfast" ? "" : Object.keys(SPECIAL).map(sk=>`<option value="${sk}" ${meal.recipeId===sk?"selected":""}>${esc(SPECIAL[sk].name)}</option>`).join("");
        const frzOpts = (state.freezer||[]).filter(x=>(+x.portions||0)>0 || meal.recipeId==="frz_"+x.id).map(x=>`<option value="frz_${x.id}" ${meal.recipeId==="frz_"+x.id?"selected":""}>❄ ${esc(x.name)} (${x.portions||0} porc.)</option>`).join("");
        const isRepeat = meal.recipeId && prev.has(meal.recipeId);
        const rNow=findR(meal.recipeId);
        const plNow=rNow?(PREP_LABEL[rNow.prepStyle]||PREP_LABEL.fresh):null;
        html+=`<td class="kk-mcell" data-day="${d}" data-meal="${mk}">
          <select class="kk-msel">
            <option value="">— wybierz —</option>
            ${pool.map(r=>`<option value="${r.id}" ${r.id===meal.recipeId?"selected":""}>${esc(r.name)}</option>`).join("")}
            ${frzOpts?`<optgroup label="Z zamrażalnika">${frzOpts}</optgroup>`:""}
            ${specialOpts?`<optgroup label="Tryb dnia">${specialOpts}</optgroup>`:""}
          </select>
          ${meal.recipeId?`<div class="kk-mname">${esc(mealName(meal))}</div>`:""}
          ${plNow?`<span class="kk-badge ${plNow[1]}" style="font-size:9px;">${plNow[0]}</span>`:""}
          ${meal.recipeId?`<div class="kk-mprot">${(SPECIAL[meal.recipeId]||(meal.recipeId+"").indexOf("frz_")===0)?"~":""}Ty ${Math.round(mealProt(meal)*(SPECIAL[meal.recipeId]?1:m))} · M ${Math.round(mealProt(meal)*(SPECIAL[meal.recipeId]?1:k))} g</div>`:""}
          ${isRepeat?`<div class="kk-repeat">↺ w zesz. tyg.</div>`:""}
          ${(()=>{ const hs=carbHints(rNow, carbAdjOf(d)); return hs.length?`<div class="kk-carbhint">${hs.map(x=>esc(x)).join("<br>")}</div>`:""; })()}
          ${rNow?`<button class="kk-cookbtn ${cookedToday(rNow.id)?"done":""}" data-rid="${rNow.id}">${cookedToday(rNow.id)?"✓ ugotowane":"+ ugotowane"}</button>`:""}
        </td>`;
      });
      html+=`</tr>`;
    });
    // wiersz shake: wybór konkretnego shake'a (dzielony 62/38) + ręczne gramy per osoba
    const shakes=state.recipes.filter(r=>r.mealTypes.includes("shake"));
    html+=`<tr><th style="background:var(--slate-2);">Shake /<br>dodatek</th>`;
    DAYS.forEach(d=>{
      const sid=state.week[d].shakeId||"";
      const sh=findR(sid);
      html+=`<td class="kk-mcell kk-addcell" data-day="${d}">
        <select class="kk-shakesel">
          <option value="">— shake —</option>
          ${shakes.map(r=>`<option value="${r.id}" ${r.id===sid?"selected":""}>${esc(r.name)} (${r.proteinTotal}g)</option>`).join("")}
        </select>
        <div class="kk-mprot">${sh?`Ty ${Math.round(sh.proteinTotal*m)} · M ${Math.round(sh.proteinTotal*k)} g`:`Ty 0 · M 0 g`}</div>
        <div class="kk-addrow"><span>+Ty</span><input type="number" class="kk-addinp" data-who="addP2" value="${state.week[d].addP2||0}"></div>
        <div class="kk-addrow"><span>+M</span><input type="number" class="kk-addinp" data-who="addP1" value="${state.week[d].addP1||0}"></div>
      </td>`;
    });
    html+=`</tr>`;
    // wiersz korekty węgli (widoczny tylko, gdy jakiś dzień skorygowany)
    if(DAYS.some(d=>Math.abs(carbAdjOf(d)-1)>=0.03)){
      html+=`<tr><th style="background:var(--slate-2);">Porcja węgli</th>`;
      DAYS.forEach(d=>{ const a=carbAdjOf(d);
        const pct=Math.round(a*100);
        const cls = a<0.97?"kk-miss":(a>1.03?"kk-hit":"");
        html+=`<td class="kk-dtotal" style="text-align:center;"><span class="${cls}" style="font-weight:700;">${pct}%</span><div class="kk-tot-macro">${a<1?"mniej":"więcej"} dodatków</div></td>`;
      });
      html+=`</tr>`;
    }
    html+=`<tr><th style="background:var(--slate-2);">Suma / cel</th>`;
    DAYS.forEach(d=>{
      const {c:cs, ck:cks} = splitCF();
      const {f:fs, fk:fks} = splitFat();
      let pM=0,pK=0,cAll=0,fAll=0;
      MEALS.forEach(([mk])=>{ const meal=state.week[d][mk];
        if(SPECIAL[meal.recipeId]){ pM+=mealProt(meal); pK+=mealProt(meal); }
        else { pM+=mealProt(meal)*m; pK+=mealProt(meal)*k; }
        const rr=findR(meal.recipeId);
        if(rr){ cAll+=(+rr.carbs||0); fAll+=(+rr.fat||0); }
      });
      const sh=findR(state.week[d].shakeId||"");
      if(sh){ pM+=sh.proteinTotal*m; pK+=sh.proteinTotal*k; cAll+=(+sh.carbs||0); fAll+=(+sh.fat||0); }
      pM+=(+state.week[d].addP2||0); pK+=(+state.week[d].addP1||0);
      const adj=carbAdjOf(d); cAll*=adj;   // korekta dotyczy WYŁĄCZNIE węglowodanów
      const cM=Math.round(cAll*cs), cK=Math.round(cAll*cks);
      const fM=Math.round(fAll*fs), fK=Math.round(fAll*fks);
      const kM=Math.round(pM*4 + cM*4 + fM*9);
      const kK=Math.round(pK*4 + cK*4 + fK*9);
      const T=state.targets;
      const cls=(val,target,tol)=> !target ? "" : (Math.abs(val-target)<=target*(tol||0.15) ? "kk-hit" : "kk-miss");
      html+=`<td class="kk-dtotal">
        <div class="kk-tot-person">
          <b>Ty</b>
          <span class="${cls(pM,T.p2,0.10)}">B ${Math.round(pM)}/${T.p2}</span>
          <span class="${cls(cM,T.carb2,0.20)}">W ${cM}/${T.carb2}</span>
          <span class="${cls(fM,T.fat2,0.25)}">T ${fM}/${T.fat2}</span>
          <span class="${cls(kM,T.kcal2,0.12)}">${kM}/${T.kcal2} kcal</span>
        </div>
        <div class="kk-tot-person">
          <b>Magda</b>
          <span class="${cls(pK,T.p1,0.10)}">B ${Math.round(pK)}/${T.p1}</span>
          <span class="${cls(cK,T.carb1,0.20)}">W ${cK}/${T.carb1}</span>
          <span class="${cls(fK,T.fat1,0.25)}">T ${fK}/${T.fat1}</span>
          <span class="${cls(kK,T.kcal1,0.12)}">${kK}/${T.kcal1} kcal</span>
        </div>
      </td>`;
    });
    html+=`</tr></tbody></table></div>
    <div class="kk-note"><b>B</b> = białko, <b>W</b> = węglowodany, <b>T</b> = tłuszcz (g). Zielone = w celu, czerwone = poza celem. Podział wspólnego dania: <b>mięso, sos i tłuszcz ${state.targets.splitM}/${100-state.targets.splitM}</b> (jedna patelnia — tłuszczu nie da się rozdzielić inaczej niż białka), <b>węgle ${state.targets.splitC}/${100-state.targets.splitC}</b> (ryż i ziemniaki nakładacie osobno). Makro liczone ze składników — <i>orientacyjne</i>.</div>`;
    // balans białka
    const tc={};
    DAYS.forEach(d=> ["lunch","dinner"].forEach(mk=>{ const r=findR(state.week[d][mk].recipeId); if(r&&r.ptype&&r.ptype!=="—"){ tc[r.ptype]=(tc[r.ptype]||0)+1; }}));
    const order=["Drób","Wołowina","Ryby i owoce morza","Wieprzowina","Roślinne"];
    let tally=`<div class="kk-sgroup" style="margin-top:12px;"><h4>Balans białka w tygodniu (obiady + kolacje)</h4><div style="display:flex; gap:14px; flex-wrap:wrap; font-size:13px;">`;
    order.forEach(t=>{ if(tc[t]) tally+=`<span><b>${tc[t]}×</b> ${t}</span>`; });
    if(Object.keys(tc).length===0) tally+=`<span style="color:#7a7156;">Wybierzcie dania powyżej, żeby zobaczyć balans.</span>`;
    tally+=`</div><div class="kk-note" style="margin-top:6px;">Cel tygodnia: ~2× drób, 2× wołowina, 2× ryba (reszta wg nastroju i sezonu).</div></div>`;
    p.innerHTML=html; p.insertAdjacentHTML("beforeend",tally);
    p.querySelectorAll(".kk-mcell[data-meal] select").forEach(sel=> sel.addEventListener("change",e=>{
      const c=e.target.closest(".kk-mcell"); state.week[c.dataset.day][c.dataset.meal].recipeId=e.target.value; queueSave(); renderWeek();
    }));
    p.querySelectorAll(".kk-shakesel").forEach(sel=> sel.addEventListener("change",e=>{
      const c=e.target.closest(".kk-addcell"); state.week[c.dataset.day].shakeId=e.target.value; queueSave(); renderWeek();
    }));
    p.querySelectorAll(".kk-addinp").forEach(inp=> inp.addEventListener("change",e=>{
      const c=e.target.closest(".kk-addcell"); state.week[c.dataset.day][e.target.dataset.who]=+e.target.value||0; queueSave(); renderWeek();
    }));
    document.getElementById("gw-tempo").addEventListener("change",e=>{ state.genTempo=e.target.value; queueSave(); });
    document.getElementById("gw").addEventListener("click",()=>{ generateWeek(document.getElementById("gw-tempo").value); });
    document.getElementById("closeweek").addEventListener("click",()=>{
      const ids=[]; DAYS.forEach(d=> MEALS.forEach(([mk])=>{ const id=state.week[d][mk].recipeId; if(id&&!SPECIAL[id]&&id.indexOf("frz_")!==0) ids.push(id); }));
      state.prevWeekIds=[...new Set(ids)]; queueSave(); renderWeek();
      alert("Zapamiętano dania tego tygodnia jako miniony tydzień. Przy układaniu nowego będą oznaczane jako powtórki i pomijane przez auto-układanie.");
    });
    p.querySelectorAll(".kk-cookbtn").forEach(b=> b.addEventListener("click",e=>{
      const rid=e.target.dataset.rid;
      if(cookedToday(rid)) unmarkCookedToday(rid); else markCooked(rid);
      renderWeek(); renderHistory();
    }));
    document.getElementById("fitcarbs").addEventListener("click",()=>{ fitCarbsToTarget(); });
    document.getElementById("resetcarbs").addEventListener("click",()=>{ resetCarbs(); });
    document.getElementById("printweek").addEventListener("click",()=>{ printPlan(); });
  }

  function generateWeek(tempo){
    tempo=tempo||"mix";
    const prev=new Set(state.prevWeekIds||[]);
    const seasonOk=r=> state.season==="all" || (r.season||"all")==="all" || r.season===state.season;
    const pick=(pool,used)=>{
      let cand=pool.filter(r=>seasonOk(r) && !used.has(r.id) && !prev.has(r.id));
      if(cand.length===0) cand=pool.filter(r=>seasonOk(r) && !used.has(r.id));
      if(cand.length===0) cand=pool.filter(r=>!used.has(r.id));
      if(cand.length===0) cand=pool.slice();
      return cand[Math.floor(Math.random()*cand.length)];
    };
    const tempoPref=r=>{
      if(tempo==="batch") return (r.prepStyle==="mar"||r.prepStyle==="freeze")?0:1;
      if(tempo==="fresh") return (r.prepStyle==="fresh")?0:1;
      return 0;
    };
    const sortByTempo=pool=> pool.slice().sort((a,b)=> tempoPref(a)-tempoPref(b) || Math.random()-0.5);

    // ŚNIADANIA: 7 różnych, z rotacją
    const bfPool=state.recipes.filter(r=>r.mealTypes.includes("breakfast"));
    const usedB=new Set(); const bf={};
    DAYS.forEach(d=>{ const r=pick(bfPool,usedB); if(r){ bf[d]=r.id; usedB.add(r.id); } });

    // OBIADY: cel balansu 2 drób / 2 wołowina / 2 ryba + 1 wildcard, sezon + tempo
    const lunchPool=state.recipes.filter(r=>r.mealTypes.includes("lunch"));
    const byType=t=> sortByTempo(lunchPool.filter(r=>r.ptype===t));
    const plan=["Drób","Drób","Wołowina","Wołowina","Ryby i owoce morza","Ryby i owoce morza",null];
    // shuffle typów na dni
    for(let i=plan.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [plan[i],plan[j]]=[plan[j],plan[i]]; }
    const usedL=new Set(); const lu={};
    DAYS.forEach((d,i)=>{
      const want=plan[i];
      let pool = want? byType(want) : sortByTempo(lunchPool);
      if(pool.length===0) pool=sortByTempo(lunchPool);
      const r=pick(pool,usedL); if(r){ lu[d]=r.id; usedL.add(r.id); }
    });

    // KOLACJE: szybkie, różne, sezon
    const dinPool=state.recipes.filter(r=>r.mealTypes.includes("dinner"));
    const usedD=new Set(); const di={};
    DAYS.forEach(d=>{ const r=pick(sortByTempo(dinPool),usedD); if(r){ di[d]=r.id; usedD.add(r.id); } });

    // SHAKE w dni treningowe
    const shakeDays={"Pon":1,"Śr":1,"Pt":1};
    const s1 = state.recipes.find(r=>r.id==="s1") ? "s1" : (state.recipes.find(r=>r.mealTypes.includes("shake"))||{}).id||"";

    const nw={};
    DAYS.forEach(d=>{
      nw[d]={ addP1:0, addP2:0, shakeId: shakeDays[d]?s1:"",
        breakfast:{recipeId:bf[d]||""}, lunch:{recipeId:lu[d]||""}, dinner:{recipeId:di[d]||""} };
    });
    state.week=nw; queueSave(); renderWeek();
  }

  function printPlan(){
    const {m,k}=split();
    let h=`<h1>Plan tygodnia</h1><table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse; width:100%; font-size:12px;"><tr><th>Posiłek</th>${DAYS.map(d=>`<th>${d}</th>`).join("")}</tr>`;
    MEALS.forEach(([mk,ml])=>{
      h+=`<tr><td><b>${ml}</b></td>`;
      DAYS.forEach(d=>{ h+=`<td>${esc(mealName(state.week[d][mk])||"—")}</td>`; });
      h+=`</tr>`;
    });
    // shake row
    h+=`<tr><td><b>Shake</b></td>`;
    DAYS.forEach(d=>{ const sh=findR(state.week[d].shakeId||""); h+=`<td>${sh?esc(sh.name):"—"}</td>`; });
    h+=`</tr></table>`;
    // lista zakupów (kategorie, zsumowana)
    if((state.shopping||[]).length){
      h+=`<h2>Lista zakupów</h2>`;
      const byC={}; state.shopping.forEach(it=>{ const c=it.cat||prodCat(it.name); (byC[c]=byC[c]||[]).push(it); });
      const catOrder=["Mięso","Ryby i owoce morza","Nabiał i jaja","Warzywa i strączki","Owoce","Pieczywo i zboża","Spiżarnia / sosy / tłuszcze","Przyprawy","Inne"];
      catOrder.forEach(c=>{ if(!byC[c])return; h+=`<h3>${c}</h3><ul>`;
        aggregateItems(byC[c]).forEach(g=> h+=`<li>${esc(g.label)}</li>`); h+=`</ul>`; });
    }
    // PRZEPISY z tego tygodnia (pełne)
    const rids=[]; DAYS.forEach(d=>{ MEALS.forEach(([mk])=>{ const id=state.week[d][mk].recipeId; if(id&&!SPECIAL[id]&&id.indexOf("frz_")!==0&&rids.indexOf(id)<0) rids.push(id); });
      const sid=state.week[d].shakeId; if(sid&&rids.indexOf(sid)<0) rids.push(sid); });
    if(rids.length){
      h+=`<h2 style="page-break-before:always;">Przepisy na ten tydzień</h2>`;
      rids.forEach(id=>{ const r=findR(id); if(!r) return; const tot=totalMult(id);
        h+=`<div class="rec">
          <h3>${esc(r.name)}</h3>
          <div class="meta">${esc(r.cuisine)}${r.ptype&&r.ptype!=="—"?" · "+esc(r.ptype):""} · ${r.prepTime} min · ${r.proteinTotal} g białka${r.kcal?` · ok. ${r.kcal} kcal`:""} · ${(PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh)[0]}${tot>1?` · gotujesz ×${tot}`:""}</div>
          <b>Składniki${tot>1?` (×${tot} → ${2*tot} porcji)`:" (2 porcje)"}:</b>
          <ul>${r.ingredients.map(i=>`<li>${esc(scaleIng(i,tot))}</li>`).join("")}</ul>
          <b>Przygotowanie:</b>
          <ol>${r.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
          ${r.unotes?`<div class="note"><b>Moje notatki:</b> ${esc(r.unotes)}</div>`:""}
          ${r.note?`<div class="note">${esc(r.note)}</div>`:""}
        </div>`;
      });
    }
    const win=window.open("","_blank");
    if(win){
      win.document.write(`<html><head><meta charset="utf-8"><title>Plan tygodnia</title><style>body{font-family:system-ui,sans-serif;padding:24px;color:#222;line-height:1.45;} h1{font-size:22px;margin:0 0 12px;} h2{font-size:17px;margin-top:24px;border-bottom:2px solid #ddd;padding-bottom:4px;} h3{font-size:14px;margin:12px 0 4px;} ul,ol{margin:4px 0 8px;padding-left:20px;} th{background:#eee;text-align:left;} td,th{font-size:11px;} .rec{page-break-inside:avoid;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #eee;} .rec .meta{font-size:11px;color:#666;margin-bottom:6px;} .rec .note{font-size:11px;color:#555;background:#f7f7f7;padding:4px 8px;border-radius:4px;margin-top:4px;} @page{margin:14mm;}</style></head><body>${h}<script>window.onload=function(){window.print();}<\/script></body></html>`);
      win.document.close();
    } else {
      // fallback: druk bieżącej strony przez sekcję printable
      const pr=document.getElementById("kk-print"); pr.innerHTML=h; document.body.classList.add("kk-printing"); window.print(); document.body.classList.remove("kk-printing");
    }
  }

  // kategoryzacja produktu na podstawie nazwy
  function prodCat(name){
    const n=(name||"").toLowerCase();
    const has=arr=>arr.some(w=>n.includes(w));
    if(has(["łosoś","łosos","losos","tuńczyk","tunczyk","dorsz","makrel","śledź","śledz","sledz","matjas","krewetk","ryb","owoce morza","edamame"])) return "Ryby i owoce morza";
    if(has(["kurczak","udka","udek","indyk","wołowin","wolowin","wieprz","boczek","szynk","mielon","stek","bavette","flat iron","rostbef","antrykot","polędwic","poledwic","łopatk","lopatk","karków","karkow","mortadel","kebab","gulasz","jagni"])) return "Mięso";
    if(has(["jaj","jajk","jajec","mleko","jogurt","kefir","twaróg","twarog","fet","mozzarell","halloumi","parmezan","pecorino","śmietan","smietan","masło","maslo","skyr","serek","camembert","koryciński","korycinski","ser ","sera","serze"])) return "Nabiał i jaja";
    if(has(["chleb","pieczywo","tortill","bułk","bulk","pita","naan","makaron","spaghetti","linguine","ryż","ryz","kasz","bulgur","płatk","platk","owsian","panko","mąk","maka","granol","tost","krakers","muffin","chałk","kuskus","krom"])) return "Pieczywo i zboża";
    if(has(["banan","mango","jagod","malin","truskaw","porzecz","borówk","borowk","cytryn","limonk","pomarańcz","pomarancz","owoc","jabłk","jablk","gruszk"])) return "Owoce";
    if(has(["papryk","cukini","bakłażan","baklazan","cebul","czosnek","marchew","seler","pomidor","ogórek","ogorek","sałat","salat","rukol","szpinak","kapust","brokuł","brokul","ziemniak","batat","buracz","imbir","chili","kolendr","natk","szczypior","awokado","kiełk","kielk","groszek","kukurydz","fasol","ciecierzyc","soczewic","trawa cytry","por ","dyni","rzodkiew","oliwk"])) return "Warzywa i strączki";
    if(has(["kmin","kumin","kurkum","oregano","garam","cynamon","sumak","pul biber","liść","lisc","laurow","ziele angielskie","tymianek","rozmaryn","bazyli","kardamon","przypraw"])) return "Przyprawy";
    if(has(["mleko kokos","passat","koncentrat","sos","oliw","olej","ocet","miód","miod","cukier","past","sezam","orzech","chia","tamaryn","bulion","puszka","kokos","hummus","salsa","syrop","wino"])) return "Spiżarnia / sosy / tłuszcze";
    return "Inne";
  }
  const MEAL_LABEL={breakfast:"Śniadanie", lunch:"Obiad", dinner:"Kolacja", shake:"Shake"};
  const MEAL_CLS={"Śniadanie":"mt-b","Obiad":"mt-l","Kolacja":"mt-d","Shake":"mt-s"};
  function mealTagsHTML(mealsTxt){
    return String(mealsTxt||"").split(",").map(x=>x.trim()).filter(Boolean)
      .map(x=>`<span class="kk-mealtag ${MEAL_CLS[x]||""}">${esc(x)}</span>`).join(" ");
  }
  function recipeMealLabel(r){
    if(!r) return "";
    const order=["breakfast","lunch","dinner","shake"];
    const t=order.find(mt=>r.mealTypes.includes(mt));
    return t?MEAL_LABEL[t]:"";
  }

  // parsuje wiodącą ilość + jednostkę, resztę traktuje jako klucz produktu
  function parseQty(name){
    const m=(name||"").trim().match(/^(\d+[.,]?\d*)\s*(kg|g|ml|l|łyżeczk\w*|łyżk\w*|ząbk\w*|puszk\w*|szklank\w*|garść|garści|plaster|plastr\w*|szt\w*|kromk\w*|sztuk\w*)?\.?\s+(.*)$/i);
    if(!m) return {qty:null, unit:"", rest:(name||"").trim().toLowerCase(), orig:name};
    let qty=parseFloat(m[1].replace(",",".")); let unit=(m[2]||"").toLowerCase(); let rest=m[3].trim().toLowerCase();
    // normalizacja jednostek wagi/objętości
    if(unit==="kg"){ qty*=1000; unit="g"; }
    if(unit==="l"){ qty*=1000; unit="ml"; }
    // uprość warianty łyżek
    if(unit.indexOf("łyżeczk")===0) unit="łyżeczka";
    else if(unit.indexOf("łyżk")===0) unit="łyżka";
    else if(unit.indexOf("ząbk")===0) unit="ząbek";
    else if(unit.indexOf("puszk")===0) unit="puszka";
    else if(unit.indexOf("szklank")===0) unit="szklanka";
    else if(unit.indexOf("plastr")===0||unit==="plaster") unit="plaster";
    else if(unit.indexOf("kromk")===0) unit="kromka";
    else if(unit.indexOf("szt")===0||unit.indexOf("sztuk")===0) unit="szt";
    return {qty, unit, rest, orig:name};
  }
  function fmtQty(q){ return Number.isInteger(q)?String(q):(Math.round(q*10)/10).toString().replace(".",","); }
  function aggregateItems(items){
    const map={}; const order=[];
    items.forEach(it=>{
      const p=parseQty(it.name);
      const key = (p.qty!=null? (p.rest+"|"+p.unit) : ("__"+it.name.toLowerCase()));
      if(!map[key]){ map[key]={items:[], ids:[], qty:(p.qty!=null?0:null), unit:p.unit, rest:p.rest, sample:it.name, parsable:p.qty!=null}; order.push(key); }
      const g=map[key]; g.items.push(it); g.ids.push(it.id);
      if(g.parsable && p.qty!=null) g.qty+=p.qty;
    });
    return order.map(k=>{
      const g=map[k];
      let label;
      if(g.parsable){
        const unitStr = g.unit? (" "+g.unit) : "";
        // ładniejszy zapis: "Ryż — 400 g" -> "400 g ryżu"
        label = `${fmtQty(g.qty)}${unitStr} ${g.rest}`.trim();
        // wielka litera
        label = label.charAt(0).toUpperCase()+label.slice(1);
      } else {
        label = g.sample;
      }
      return {label, items:g.items, ids:g.ids};
    });
  }

  // Panel "gotowanie na zapas": dodatkowe porcje wchodzą do listy zakupów
  function batchPanel(){
    const ids=[]; DAYS.forEach(d=> MEALS.forEach(([mk])=>{ const id=state.week[d][mk].recipeId; if(id&&!SPECIAL[id]&&id.indexOf("frz_")!==0 && ids.indexOf(id)<0) ids.push(id); }));
    const batchable=ids.map(findR).filter(r=>r && (r.prepStyle==="mar"||r.prepStyle==="freeze"));
    if(batchable.length===0) return `<div class="kk-note" style="margin-bottom:12px;">Brak dań „na zapas" w planie tygodnia — dodaj jakieś (tag <b>Marynuj+zamroź</b> lub <b>Gotuj+zamroź</b>), a pojawi się tu opcja ugotowania większej partii.</div>`;
    let h=`<div class="kk-sgroup" style="margin-bottom:14px;"><h4>Gotowanie na zapas (zwiększa listę zakupów)</h4>
      <div class="kk-note" style="margin:0 0 8px;">Ile <b>dodatkowych</b> porcji chcesz ugotować/zamarynować do zamrażalnika? Składniki doliczą się do listy zakupów. 1 porcja = danie na 2 osoby.</div>`;
    batchable.forEach(r=>{
      const ex=getExtra(r.id), mult=getMult(r.id), tot=mult+ex;
      const pl=PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh;
      h+=`<div class="kk-batchrow" data-id="${r.id}">
        <span class="kk-batchname">${esc(r.name)} <span class="kk-badge ${pl[1]}">${pl[0]}</span></span>
        <span class="kk-multrow" style="margin:0;">
          <span class="kk-multlabel">na zapas:</span>
          <button class="bx-minus">−</button><span class="kk-multval">+${ex}</span><button class="bx-plus">+</button>
          <span class="kk-multhint">razem ${tot} × (2 os.)</span>
        </span>
      </div>`;
    });
    h+=`</div>`;
    return h;
  }

  // Zbiera dania z wybranych dni, ZLICZAJĄC powtórzenia (to samo danie 2× = podwójne składniki)
  function collectPlanned(){
    const days=(Array.isArray(state.shopDays)&&state.shopDays.length)?state.shopDays:DAYS;
    const occ={};   // recipeId -> {count, meals:Set, days:Set}
    days.forEach(d=> MEALS.forEach(([mk,ml])=>{
      const id=state.week[d][mk].recipeId;
      if(!id || SPECIAL[id] || (id+"").indexOf("frz_")===0) return;
      if(!occ[id]) occ[id]={count:0, meals:new Set(), days:new Set()};
      occ[id].count++; occ[id].meals.add(ml); occ[id].days.add(d);
      const sid=state.week[d].shakeId;
    }));
    // shake'i też
    days.forEach(d=>{
      const sid=state.week[d].shakeId;
      if(!sid) return;
      if(!occ[sid]) occ[sid]={count:0, meals:new Set(), days:new Set()};
      occ[sid].count++; occ[sid].meals.add("Shake"); occ[sid].days.add(d);
    });
    return occ;
  }
  function regenShopping(notify){
    const occ=collectPlanned();
    const wasChecked={}; (state.shopping||[]).forEach(it=>{ if(it.auto&&it.checked) wasChecked[it.name.toLowerCase()]=true; });
    state.shopping=(state.shopping||[]).filter(it=>!it.auto);   // zostaw ręczne
    const add=[];
    Object.keys(occ).forEach(id=>{
      const r=findR(id); if(!r) return;
      const o=occ[id];
      const extra=getExtra(id);
      // ile porcji łącznie: ile razy w planie × mnożnik z karty + porcje na zapas
      const portions = o.count*getMult(id) + extra;
      const parts=[];
      if(o.count>1) parts.push(o.count+"× w planie");
      if(extra>0) parts.push(extra+" na zapas");
      const gname = parts.length ? `${r.name} (${parts.join(", ")} → ${portions} porcji)` : r.name;
      const mealsTxt=[...o.meals].join(", ");
      const daysTxt=DAYS.filter(d=>o.days.has(d)).join(", ");
      r.ingredients.forEach(ing=>{
        const scaled=scaleIng(ing, portions);
        add.push({id:uid("i"), name:scaled, group:gname, meal:mealsTxt, days:daysTxt,
                  cat:prodCat(ing), auto:true, checked:!!wasChecked[scaled.toLowerCase()]});
      });
    });
    state.shopping=state.shopping.concat(add);
    queueSave(); renderShop();
    if(notify && add.length===0) alert("Nie ma czego wygenerować — wybierz dania w Planie tygodnia (i sprawdź filtr dni).");
  }

  function renderShop(){
    const p=document.querySelector('[data-panel="shop"]');
    const view=state.shopView||"recipe";
    let html=`<div class="kk-actions-row">
      <button class="kk-btn" id="gen">↻ Generuj z planu tygodnia</button>
      <button class="kk-btn sec" id="clr">Usuń odhaczone</button>
      <button class="kk-btn sec" id="wipe" style="background:var(--mute);box-shadow:none;">Wyczyść całą listę</button>
    </div>
    <div class="kk-note" style="margin:0 0 12px;">„Generuj" <b>odświeża</b> pozycje z planu tygodnia (stare dania znikają). Rzeczy dopisane ręcznie zostają nietknięte.</div>
    <div class="kk-sgroup" style="margin-bottom:12px;">
      <h4>Na które dni robisz zakupy?</h4>
      <div class="kk-filters" style="margin-bottom:6px;">
        ${DAYS.map(d=>`<div class="kk-fbtn kk-dayf ${(state.shopDays||DAYS).includes(d)?"active":""}" data-d="${d}">${d}</div>`).join("")}
        <div class="kk-fbtn" id="days-all" style="border-color:var(--basil);">Cały tydzień</div>
      </div>
      <div class="kk-note" style="margin:0;">Odznacz dni, na które nie kupujesz — składniki tych dań nie trafią na listę.</div>
    </div>
    ${batchPanel()}
    <div class="kk-filters" style="margin-bottom:12px;">
      <div class="kk-fbtn ${view==="recipe"?"active":""}" id="v-recipe">Widok: wg przepisów</div>
      <div class="kk-fbtn ${view==="cat"?"active":""}" id="v-cat">Widok: wg kategorii produktów</div>
      ${view==="cat"?`<div class="kk-fbtn ${state.shopSum?"active":""}" id="v-sum" style="border-color:var(--herb);">${state.shopSum?"✓ ":""}Sumuj produkty</div>`:""}
    </div>`;
    if(state.shopping.length===0){
      html+=`<div class="kk-note">Pusto. Kliknij „Generuj z planu tygodnia" albo dodaj coś ręcznie.</div>`;
    } else if(view==="recipe"){
      const byG={}; state.shopping.forEach(it=>{ (byG[it.group]=byG[it.group]||[]).push(it); });
      Object.keys(byG).forEach(g=>{
        const ml=byG[g][0].meal||"";
        html+=`<div class="kk-sgroup"><h4>${esc(g)} ${ml?mealTagsHTML(ml):""} ${byG[g][0].days?`<span class="kk-daytag">${esc(byG[g][0].days)}</span>`:""}</h4>`;
        byG[g].forEach(it=> html+=`<div class="kk-sitem ${it.checked?"checked":""}" data-id="${it.id}"><input type="checkbox" ${it.checked?"checked":""}><span>${esc(it.name)}</span><button class="sd">×</button></div>`);
        html+=`</div>`;
      });
    } else {
      const byC={}; state.shopping.forEach(it=>{ const c=it.cat||prodCat(it.name); (byC[c]=byC[c]||[]).push(it); });
      const catOrder=["Mięso","Ryby i owoce morza","Nabiał i jaja","Warzywa i strączki","Owoce","Pieczywo i zboża","Spiżarnia / sosy / tłuszcze","Przyprawy","Inne"];
      catOrder.forEach(c=>{ if(!byC[c]) return;
        html+=`<div class="kk-sgroup"><h4>${esc(c)}</h4>`;
        if(state.shopSum){
          const groups=aggregateItems(byC[c]);
          groups.forEach(gr=>{
            const ids=gr.ids.join(",");
            const allChecked=gr.items.every(x=>x.checked);
            html+=`<div class="kk-sitem ${allChecked?"checked":""}" data-ids="${ids}"><input type="checkbox" class="sum-cb" ${allChecked?"checked":""}><span>${esc(gr.label)}${gr.items.length>1?` <span class="kk-fromtag">(${gr.items.length} poz.)</span>`:""}</span></div>`;
          });
        } else {
          byC[c].forEach(it=> html+=`<div class="kk-sitem ${it.checked?"checked":""}" data-id="${it.id}">
            <input type="checkbox" ${it.checked?"checked":""}>
            <span>${esc(it.name)}
              <span class="kk-itemmeta">
                ${it.meal?mealTagsHTML(it.meal):""}
                ${it.days?`<span class="kk-daytag">${esc(it.days)}</span>`:""}
                ${it.group?`<span class="kk-fromtag">${esc(it.group)}</span>`:""}
              </span>
            </span><button class="sd">×</button></div>`);
        }
        html+=`</div>`;
      });
    }
    html+=`<div class="kk-additem"><input type="text" id="ni" placeholder="np. oliwa, cytryny, ryż z irańskiego..."><button class="kk-btn" id="ai">Dodaj</button></div><div class="kk-sync">● Lista współdzielona — oboje widzicie odhaczenia na żywo. Zakupy na 4 dni? Odhaczaj/usuwaj dania, których nie robicie w tym okresie — etykieta posiłku pomaga wybrać.</div>`;
    p.innerHTML=html;
    p.querySelectorAll(".kk-dayf").forEach(b=> b.addEventListener("click",()=>{
      const d=b.dataset.d;
      let sd=(state.shopDays||DAYS.slice());
      sd = sd.includes(d) ? sd.filter(x=>x!==d) : sd.concat([d]);
      state.shopDays = DAYS.filter(x=>sd.includes(x));   // zachowaj kolejność dni
      queueSave(); renderShop();
    }));
    const dall=document.getElementById("days-all");
    if(dall) dall.addEventListener("click",()=>{ state.shopDays=DAYS.slice(); queueSave(); renderShop(); });
    document.getElementById("v-recipe").addEventListener("click",()=>{ state.shopView="recipe"; queueSave(); renderShop(); });
    document.getElementById("v-cat").addEventListener("click",()=>{ state.shopView="cat"; queueSave(); renderShop(); });
    const vsum=document.getElementById("v-sum"); if(vsum) vsum.addEventListener("click",()=>{ state.shopSum=!state.shopSum; queueSave(); renderShop(); });
    const hasAuto=(state.shopping||[]).some(x=>x.auto);
    p.querySelectorAll(".bx-minus").forEach(b=> b.addEventListener("click",e=>{
      const id=e.target.closest(".kk-batchrow").dataset.id; setExtra(id,getExtra(id)-1);
      if(hasAuto) regenShopping(false); else renderShop();   // od razu przelicz składniki
      renderPrep();
    }));
    p.querySelectorAll(".bx-plus").forEach(b=> b.addEventListener("click",e=>{
      const id=e.target.closest(".kk-batchrow").dataset.id; setExtra(id,getExtra(id)+1);
      if(hasAuto) regenShopping(false); else renderShop();
      renderPrep();
    }));
    p.querySelectorAll(".sum-cb").forEach(cb=> cb.addEventListener("change",e=>{ const ids=(e.target.closest(".kk-sitem").dataset.ids||"").split(","); const val=e.target.checked; ids.forEach(id=>{ const it=state.shopping.find(x=>x.id===id); if(it) it.checked=val; }); queueSave(); renderShop(); }));
    p.querySelectorAll(".kk-sitem input").forEach(cb=> cb.addEventListener("change",e=>{ const id=e.target.closest(".kk-sitem").dataset.id; const it=state.shopping.find(x=>x.id===id); if(it){it.checked=e.target.checked; queueSave(); renderShop();}}));
    p.querySelectorAll(".sd").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-sitem").dataset.id; state.shopping=state.shopping.filter(x=>x.id!==id); queueSave(); renderShop(); }));
    document.getElementById("gen").addEventListener("click",()=>{ regenShopping(true); });
    document.getElementById("wipe").addEventListener("click",()=>{
      if(!confirm("Wyczyścić całą listę zakupów (łącznie z ręcznie dodanymi)?")) return;
      state.shopping=[]; queueSave(); renderShop();
    });
    document.getElementById("clr").addEventListener("click",()=>{ state.shopping=state.shopping.filter(x=>!x.checked); queueSave(); renderShop(); });
    document.getElementById("ai").addEventListener("click",()=>{ const i=document.getElementById("ni"); if(i.value.trim()){ state.shopping.push({id:uid("i"),name:i.value.trim(),group:"Dodane ręcznie",meal:"",cat:prodCat(i.value.trim()),auto:false,checked:false}); i.value=""; queueSave(); renderShop(); }});
  }

  function renderWeeksLib(){
    const p=document.querySelector('[data-panel="weeks"]');
    if(!p) return;
    let html=`<div class="kk-note" style="margin-bottom:12px;">Gotowe tygodnie do szybkiego startu. Wczytaj do <b>Planu tygodnia</b> i dostosuj, albo zapisz swój obecny plan jako nowy zestaw (np. „Tydzień nr 5", „Koreańsko-grecki"). Z czasem zbudujesz własną bibliotekę tematycznych tygodni.</div>`;
    html+=`<div class="kk-sgroup"><h4>Zapisz obecny Plan tygodnia</h4>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <input id="wk-name" type="text" placeholder="nazwa, np. Tydzień nr 5 / Tajsko-włoski" style="flex:1; min-width:200px; padding:8px; border:1px solid var(--line); border-radius:5px;">
        <button class="kk-btn" id="wk-save">Zapisz jako nowy</button>
      </div></div>`;
    const sw=state.savedWeeks||[];
    html+=`<div class="kk-sgroup"><h4>Zapisane tygodnie (${sw.length})</h4>`;
    if(sw.length===0) html+=`<div class="kk-note">Brak zapisanych tygodni.</div>`;
    sw.forEach(w=>{
      // krótki podgląd: policz kuchnie obiadów+kolacji
      const cset={};
      DAYS.forEach(d=>["lunch","dinner"].forEach(mk=>{ const r=(w.week[d]&&w.week[d][mk])?findR(w.week[d][mk].recipeId):null; if(r) cset[r.cuisine]=(cset[r.cuisine]||0)+1; }));
      const top=Object.keys(cset).sort((a,b)=>cset[b]-cset[a]).slice(0,3).join(", ");
      let prev=`<table class="kk-wtable kk-preview"><tr><th></th>${DAYS.map(d=>`<th>${d}</th>`).join("")}</tr>`;
      MEALS.forEach(([mk,ml])=>{
        prev+=`<tr><th>${ml}</th>`;
        DAYS.forEach(d=>{ const cell=(w.week[d]&&w.week[d][mk])?w.week[d][mk].recipeId:""; const rr=findR(cell); const sp=SPECIAL[cell];
          prev+=`<td>${rr?esc(rr.name):(sp?esc(sp.name):"—")}</td>`; });
        prev+=`</tr>`;
      });
      prev+=`<tr><th>Shake</th>${DAYS.map(d=>{ const sh=findR((w.week[d]||{}).shakeId||""); return `<td>${sh?esc(sh.name):"—"}</td>`; }).join("")}</tr></table>`;
      html+=`<div class="kk-weekrow" data-id="${w.id}">
        <div style="flex:1; min-width:180px;"><b>${esc(w.name)}</b>${top?`<div class="kk-note" style="margin:2px 0 0;">${esc(top)}</div>`:""}</div>
        <button class="kk-btn wk-load">Wczytaj do planu</button>
        <button class="kk-btn sec wk-rename">Zmień nazwę</button>
        <button class="wk-del" title="usuń">×</button>
        <details class="kk-wkprev"><summary>Podgląd tygodnia</summary><div style="overflow-x:auto;">${prev}</div></details>
      </div>`;
    });
    html+=`</div>`;
    p.innerHTML=html;
    document.getElementById("wk-save").addEventListener("click",()=>{
      const nm=document.getElementById("wk-name").value.trim(); if(!nm) return;
      state.savedWeeks=state.savedWeeks||[];
      state.savedWeeks.push({ id:uid("w"), name:nm,
        week:JSON.parse(JSON.stringify(state.week)),
        mult:JSON.parse(JSON.stringify(state.mult||{})) });
      queueSave(); renderWeeksLib();
    });
    p.querySelectorAll(".wk-load").forEach(b=> b.addEventListener("click",e=>{
      const id=e.target.closest(".kk-weekrow").dataset.id; const w=(state.savedWeeks||[]).find(x=>x.id===id); if(!w) return;
      if(!confirm("Wczytać: "+w.name+" do Planu tygodnia? Obecny plan zostanie nadpisany.")) return;
      state.week=JSON.parse(JSON.stringify(w.week));
      if(w.mult) state.mult=Object.assign({}, state.mult||{}, JSON.parse(JSON.stringify(w.mult)));
      // uzupełnij brakujące pola dni
      DAYS.forEach(d=>{ if(!state.week[d]) state.week[d]={}; if(state.week[d].addP1==null) state.week[d].addP1=0; if(state.week[d].addP2==null) state.week[d].addP2=0; if(state.week[d].shakeId==null) state.week[d].shakeId=""; MEALS.forEach(([mk])=>{ if(!state.week[d][mk]) state.week[d][mk]={recipeId:""}; }); });
      queueSave(); tab="week"; renderWeek(); renderMealTab("breakfast"); renderMealTab("lunch"); renderMealTab("dinner"); renderMealTab("shake"); refreshTabs();
    }));
    p.querySelectorAll(".wk-rename").forEach(b=> b.addEventListener("click",e=>{
      const id=e.target.closest(".kk-weekrow").dataset.id; const w=(state.savedWeeks||[]).find(x=>x.id===id); if(!w) return;
      const nn=prompt("Nowa nazwa:", w.name); if(nn&&nn.trim()){ w.name=nn.trim(); queueSave(); renderWeeksLib(); }
    }));
    p.querySelectorAll(".wk-del").forEach(b=> b.addEventListener("click",e=>{
      const id=e.target.closest(".kk-weekrow").dataset.id;
      if(confirm("Usunąć ten zapisany tydzień?")){ state.savedWeeks=state.savedWeeks.filter(x=>x.id!==id); queueSave(); renderWeeksLib(); }
    }));
  }

  function renderFreezer(){
    const p=document.querySelector('[data-panel="freezer"]');
    if(!p) return;
    let html=`<div class="kk-note" style="margin-bottom:12px;">Ewidencja zamrażalnika — co, ile porcji (1 porcja = danie na 2 os.) i od kiedy. Dodane pozycje pojawiają się w <b>Planie tygodnia</b> w grupie „Z zamrażalnika". Zasada FIFO: najstarsze zjadajcie pierwsze.</div>`;
    // dodawanie z bazy przepisów (mar/freeze)
    const batchRecipes=state.recipes.filter(r=>r.prepStyle==="mar"||r.prepStyle==="freeze");
    html+=`<div class="kk-sgroup"><h4>Dodaj z bazy przepisów</h4>
      <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
        <select id="frz-recipe" style="flex:1; min-width:180px; padding:7px; border:1px solid var(--line); border-radius:5px; font-size:13px;">
          ${batchRecipes.map(r=>`<option value="${r.id}">${esc(r.name)} (${PREP_LABEL[r.prepStyle][0]})</option>`).join("")}
        </select>
        <input id="frz-rport" type="number" value="2" min="1" style="width:60px; padding:7px; border:1px solid var(--line); border-radius:5px;" title="ile porcji">
        <button class="kk-btn" id="frz-addr">Dodaj do zamrażalnika</button>
      </div></div>`;
    // ręczne dodawanie
    html+=`<div class="kk-sgroup"><h4>Dodaj ręcznie</h4>
      <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
        <input id="frz-name" type="text" placeholder="nazwa dania" style="flex:1; min-width:160px; padding:7px; border:1px solid var(--line); border-radius:5px;">
        <input id="frz-port" type="number" value="2" min="1" style="width:60px; padding:7px; border:1px solid var(--line); border-radius:5px;" title="porcje">
        <input id="frz-prot" type="number" value="100" style="width:70px; padding:7px; border:1px solid var(--line); border-radius:5px;" title="białko/porcję (2 os.) g">
        <button class="kk-btn" id="frz-addm">Dodaj</button>
      </div>
      <div class="kk-note" style="margin-top:4px;">Białko podaj na 1 porcję (danie na 2 os.) — będzie dzielone jak zwykłe danie.</div></div>`;
    // lista
    const fz=(state.freezer||[]).slice().sort((a,b)=>(a.date||"").localeCompare(b.date||""));
    if(fz.length===0) html+=`<div class="kk-note">Zamrażalnik pusty. Dodaj coś powyżej albo wygeneruj w „Sesji prep".</div>`;
    else {
      html+=`<div class="kk-sgroup"><h4>W zamrażalniku (${fz.length})</h4>`;
      fz.forEach(x=>{
        const days = x.date ? Math.floor((Date.now()-new Date(x.date).getTime())/86400000) : null;
        const age = days==null?"":(days===0?"dziś":days===1?"wczoraj":days+" dni temu");
        const dstr = x.date ? new Date(x.date).toLocaleDateString("pl-PL",{day:"2-digit",month:"2-digit",yyyy:"numeric",year:"numeric"}) : "—";
        const warn = (days!=null&&days>90)?' style="color:var(--meat);font-weight:600;"':'';
        html+=`<div class="kk-frzitem" data-id="${x.id}">
          <span class="kk-frzname">❄ ${esc(x.name)}<span class="kk-frzdate">Zamrożone: ${dstr}${age?` · ${age}`:""}${(days!=null&&days>90)?" · ⚠ długo leży":""}</span></span>
          <span class="kk-frzmeta"${warn}>${x.protein||0} g biał.</span>
          <span class="kk-frzport"><button class="fz-minus">−</button> ${x.portions||0} porc. <button class="fz-plus">+</button></span>
          <button class="fz-del">×</button>
        </div>`;
      });
      html+=`</div>`;
    }
    p.innerHTML=html;
    const addr=document.getElementById("frz-addr");
    if(addr) addr.addEventListener("click",()=>{
      const rid=document.getElementById("frz-recipe").value; const r=findR(rid); if(!r) return;
      const port=Math.max(1,+document.getElementById("frz-rport").value||1);
      state.freezer.push({id:uid("f"),name:r.name,portions:port,protein:r.proteinTotal,date:new Date().toISOString().slice(0,10),src:rid});
      queueSave(); renderFreezer(); renderWeek();
    });
    document.getElementById("frz-addm").addEventListener("click",()=>{
      const nm=document.getElementById("frz-name").value.trim(); if(!nm) return;
      const port=Math.max(1,+document.getElementById("frz-port").value||1);
      const prot=+document.getElementById("frz-prot").value||0;
      state.freezer.push({id:uid("f"),name:nm,portions:port,protein:prot,date:new Date().toISOString().slice(0,10)});
      queueSave(); renderFreezer(); renderWeek();
    });
    p.querySelectorAll(".fz-minus").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-frzitem").dataset.id; const x=state.freezer.find(f=>f.id===id); if(x){ x.portions=Math.max(0,(+x.portions||0)-1); queueSave(); renderFreezer(); renderWeek(); }}));
    p.querySelectorAll(".fz-plus").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-frzitem").dataset.id; const x=state.freezer.find(f=>f.id===id); if(x){ x.portions=(+x.portions||0)+1; queueSave(); renderFreezer(); renderWeek(); }}));
    p.querySelectorAll(".fz-del").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-frzitem").dataset.id; state.freezer=state.freezer.filter(f=>f.id!==id); queueSave(); renderFreezer(); renderWeek(); }));
  }

  const SURVIVAL_STAPLES=[
    "Skyr / jogurt grecki (duże opakowania)","Kefir (kilka butelek)","Jajka (2 opakowania)","Twaróg / serek wiejski",
    "Odżywka białkowa","Tuńczyk w puszce (kilka)","Makrela wędzona","Gotowany/pieczony kurczak (kup gotowy lub upiecz raz)",
    "Wędlina drobiowa dobrej jakości","Hummus","Tortille i dobre pieczywo na zakwasie","Ser (mozzarella/feta)",
    "Awokado","Pomidorki, ogórek, rukola/szpinak (myte, gotowe)","Mrożone owoce (mango, maliny)","Owsianka / płatki",
    "Kimchi / ogórki kiszone / buraczki","Masło orzechowe","Banany"
  ];
  function renderHistory(){
    const p=document.querySelector('[data-panel="history"]');
    if(!p) return;
    const H=(state.cooked||[]).slice().sort((a,b)=>(b.date||"").localeCompare(a.date||""));
    const now=Date.now();
    const inDays=(d,n)=> (now-new Date(d).getTime())/86400000 <= n;
    const last30=H.filter(x=>inDays(x.date,30));

    // statystyki
    const cnt={}; last30.forEach(x=> cnt[x.recipeId]=(cnt[x.recipeId]||0)+1);
    const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const cuis={}; last30.forEach(x=>{ const r=findR(x.recipeId); if(r) cuis[r.cuisine]=(cuis[r.cuisine]||0)+1; });
    const topCuis=Object.entries(cuis).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const ptypes={}; last30.forEach(x=>{ const r=findR(x.recipeId); if(r&&r.ptype&&r.ptype!=="—") ptypes[r.ptype]=(ptypes[r.ptype]||0)+1; });

    // ile z zaplanowanych w tym tygodniu faktycznie ugotowane
    let planned=0, done=0;
    DAYS.forEach(d=> MEALS.forEach(([mk])=>{
      const id=state.week[d][mk].recipeId;
      if(id && !SPECIAL[id] && (id+"").indexOf("frz_")!==0){ planned++; if((state.cooked||[]).some(x=>x.recipeId===id && inDays(x.date,7))) done++; }
    }));
    const pct = planned? Math.round(done/planned*100) : 0;

    let html=`<div class="kk-note" style="margin-bottom:14px;">Odhaczaj <b>„+ ugotowane"</b> w Planie tygodnia. Po miesiącu zobaczysz prawdę o swoich nawykach — co realnie gotujecie, a co tylko planujecie.</div>`;

    html+=`<div class="kk-statgrid">
      <div class="kk-stat"><div class="kk-statnum">${last30.length}</div><div class="kk-statlab">dań ugotowanych<br>(30 dni)</div></div>
      <div class="kk-stat"><div class="kk-statnum">${pct}%</div><div class="kk-statlab">planu zrealizowane<br>(ten tydzień)</div></div>
      <div class="kk-stat"><div class="kk-statnum">${Object.keys(cnt).length}</div><div class="kk-statlab">różnych dań<br>(30 dni)</div></div>
      <div class="kk-stat"><div class="kk-statnum">${Object.keys(state.ratings||{}).length}</div><div class="kk-statlab">ocenionych<br>przepisów</div></div>
    </div>`;

    if(top.length){
      html+=`<div class="kk-sgroup"><h4>Najczęściej gotowane (30 dni)</h4>`;
      top.forEach(([rid,c])=>{ const r=findR(rid); if(!r) return;
        html+=`<div class="kk-sitem"><span><b>${c}×</b> ${esc(r.name)}</span>${starsHTML(rid,"sm")}</div>`; });
      html+=`</div>`;
    }
    if(topCuis.length){
      html+=`<div class="kk-sgroup"><h4>Wasze kuchnie (30 dni)</h4><div style="display:flex;gap:8px;flex-wrap:wrap;">`;
      topCuis.forEach(([c,n])=> html+=`<span class="kk-pill"><b>${n}×</b> ${esc(c)}</span>`);
      html+=`</div></div>`;
    }
    if(Object.keys(ptypes).length){
      html+=`<div class="kk-sgroup"><h4>Balans białka (30 dni)</h4><div style="display:flex;gap:8px;flex-wrap:wrap;">`;
      ["Drób","Wołowina","Ryby i owoce morza","Wieprzowina","Roślinne"].forEach(t=>{ if(ptypes[t]) html+=`<span class="kk-pill"><b>${ptypes[t]}×</b> ${t}</span>`; });
      html+=`</div></div>`;
    }

    // ranking ocen
    const rated=Object.entries(state.ratings||{}).map(([rid,v])=>({r:findR(rid),v})).filter(x=>x.r).sort((a,b)=>b.v-a.v);
    if(rated.length){
      html+=`<div class="kk-sgroup"><h4>Wasz ranking</h4>`;
      rated.slice(0,12).forEach(({r,v})=> html+=`<div class="kk-sitem"><span>${esc(r.name)} <span class="kk-fromtag">${esc(r.cuisine)}</span></span>${starsHTML(r.id,"sm")}</div>`);
      html+=`</div>`;
    }

    // dziennik
    if(H.length){
      html+=`<div class="kk-sgroup"><h4>Dziennik (ostatnie 30 wpisów)</h4>`;
      H.slice(0,30).forEach(x=>{ const r=findR(x.recipeId);
        const dstr=new Date(x.date).toLocaleDateString("pl-PL",{day:"2-digit",month:"2-digit"});
        html+=`<div class="kk-sitem" data-hid="${x.id}"><span><b>${dstr}</b> — ${r?esc(r.name):"(usunięty przepis)"}</span><button class="h-del">×</button></div>`; });
      html+=`</div>`;
    } else {
      html+=`<div class="kk-note">Brak wpisów. Ugotuj coś i kliknij „+ ugotowane" w Planie tygodnia.</div>`;
    }
    p.innerHTML=html;
    bindStars(p);
    p.querySelectorAll(".h-del").forEach(b=> b.addEventListener("click",e=>{
      const hid=e.target.closest(".kk-sitem").dataset.hid;
      state.cooked=(state.cooked||[]).filter(x=>x.id!==hid); queueSave(); renderHistory(); renderWeek();
    }));
  }

  function renderSurvival(){
    const p=document.querySelector('[data-panel="survival"]');
    if(!p) return;
    const survMeals=["b5","b12","b9","q1","q2","d1","d4","d10","s2","s5"].map(id=>findR(id)).filter(Boolean);
    let html=`<div class="kk-rules">
      <h3>Tryb przetrwania</h3>
      <div class="kk-rule"><b>Kiedy go włączyć.</b><p>Tydzień z górą pracy, wyjazdy, zero energii na gotowanie. Celem NIE jest idealny plan — celem jest trafić w białko z minimalnym wysiłkiem i bez poczucia porażki. Kanapki, wrapy, skyr, shake i lunch na mieście są tu <b>planem A</b>, nie wyjątkiem.</p></div>
      <div class="kk-rule"><b>Zasada 3 ruchów dziennie.</b><p>1) <b>Śniadanie z lodówki</b> — overnight oats / twarożek / skyr z owocami (0 gotowania). 2) <b>Lunch na mieście lub wrap</b> — food hall Powiśle albo wrap z gotowym kurczakiem. 3) <b>Kolacja 10-minutowa</b> — jajka, tuna melt, kanapka + shake, żeby dobić białko. To wszystko.</p></div>
      <div class="kk-rule"><b>Reset po złym tygodniu.</b><p>Wracasz zawsze tak samo: (1) zrób jedne duże zakupy z listy poniżej, (2) w niedzielę wieczorem zrób tylko owsianki na noc na 3 dni i ugotuj kurczaka/jajka na zapas, (3) resztę składaj na bieżąco. Nie próbuj od razu wracać do pełnego planu — najpierw odzyskaj rytm.</p></div>
    </div>`;
    html+=`<div class="kk-sgroup" style="margin-top:6px;"><h4>Szybkie dania przetrwania (z bazy)</h4>`;
    survMeals.forEach(r=> html+=`<div class="kk-sitem"><span>${esc(r.name)} <span class="kk-mealtag">${esc(recipeMealLabel(r))}</span> · ${r.prepTime} min · ${r.proteinTotal} g</span></div>`);
    html+=`</div>`;
    html+=`<div class="kk-sgroup"><h4>Lista zakupów „przetrwanie" (białko bez gotowania)</h4>`;
    SURVIVAL_STAPLES.forEach(s=> html+=`<div class="kk-sitem"><span>${esc(s)}</span></div>`);
    html+=`<button class="kk-btn" id="surv-add" style="margin-top:10px;">Dodaj tę listę do zakupów</button></div>`;
    p.innerHTML=html;
    document.getElementById("surv-add").addEventListener("click",()=>{
      const keys=new Set(state.shopping.map(x=>x.name.toLowerCase()));
      SURVIVAL_STAPLES.forEach(s=>{ if(!keys.has(s.toLowerCase())){ state.shopping.push({id:uid("i"),name:s,group:"Przetrwanie",meal:"",cat:prodCat(s),auto:false,checked:false}); }});
      queueSave(); tab="shop"; renderShop(); refreshTabs();
    });
  }

  function renderPrep(){
    const p=document.querySelector('[data-panel="prep"]');
    let html=`<div class="kk-actions-row"><button class="kk-btn" id="gp">Generuj listę prep</button><button class="kk-btn sec" id="cp">Usuń odhaczone</button></div><div class="kk-plist">`;
    if(state.prep.length===0) html+=`<div class="kk-note" style="padding:6px;">Kliknij „Generuj listę prep" — zbierze dania z planu, które robicie na zapas (marynuj+zamroź / gotuj+zamroź), i oznaczy co świeżo.</div>`;
    else state.prep.forEach(t=> html+=`<div class="kk-pitem ${t.checked?"checked":""}" data-id="${t.id}"><input type="checkbox" ${t.checked?"checked":""}><span>${esc(t.text)}${t.sub?`<span class="kk-psub">${esc(t.sub)}</span>`:""}</span>${t.srcId?`<button class="pf" title="dodaj porcje do zamrażalnika">❄ +</button>`:""}<button class="pd">×</button></div>`);
    html+=`</div><div class="kk-additem"><input type="text" id="np" placeholder="np. zamarynować kurczaka na 2 dania..."><button class="kk-btn" id="ap">Dodaj</button></div><div class="kk-sync">● Checklista współdzielona. Przy daniach na zapas przycisk „❄ +" dorzuca porcje wprost do zamrażalnika.</div>`;
    p.innerHTML=html;
    p.querySelectorAll(".kk-pitem input").forEach(cb=> cb.addEventListener("change",e=>{ const id=e.target.closest(".kk-pitem").dataset.id; const t=state.prep.find(x=>x.id===id); if(t){t.checked=e.target.checked; queueSave(); renderPrep();}}));
    p.querySelectorAll(".pd").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-pitem").dataset.id; state.prep=state.prep.filter(x=>x.id!==id); queueSave(); renderPrep(); }));
    p.querySelectorAll(".pf").forEach(b=> b.addEventListener("click",e=>{ const id=e.target.closest(".kk-pitem").dataset.id; const t=state.prep.find(x=>x.id===id); if(!t||!t.srcId) return; const r=findR(t.srcId); if(!r) return; const port=t.mult||2;
      state.freezer=state.freezer||[]; state.freezer.push({id:uid("f"),name:r.name,portions:port,protein:r.proteinTotal,date:new Date().toISOString().slice(0,10),src:t.srcId});
      t.checked=true; queueSave(); renderPrep(); renderFreezer(); renderWeek();
      alert("Dodano do zamrażalnika: "+r.name+" ("+port+" porcji). Pojawi się w Planie tygodnia w grupie „Z zamrażalnika.");
    }));
    document.getElementById("gp").addEventListener("click",()=>{
      const ids=new Set(); DAYS.forEach(d=> MEALS.forEach(([mk])=>{ const id=state.week[d][mk].recipeId; if(id&&!SPECIAL[id]&&id.indexOf("frz_")!==0) ids.add(id); }));
      // zapamiętaj odhaczenia starych auto-zadań (po treści)
      const wasChecked={}; (state.prep||[]).forEach(t=>{ if(t.auto&&t.checked) wasChecked[t.text]=true; });
      // usuń stare auto-zadania, zostaw ręcznie dodane
      const AUTO_TXT=/^(Zamarynuj i zamroź|Ugotuj na zapas i zamroź|Świeżo w dniu podania|Rozłóż porcje)/;
      state.prep=(state.prep||[]).filter(t=> !(t.auto || AUTO_TXT.test(t.text||"")) );
      const add=[]; const marT=[], frzT=[], freshT=[];
      ids.forEach(id=>{ const r=findR(id); if(!r) return;
        if(r.prepStyle==="mar") marT.push(r); else if(r.prepStyle==="freeze") frzT.push(r); else freshT.push(r); });
      const push=(r,prefix)=>{
        const tot=totalMult(r.id); const extra=getExtra(r.id);
        const suf = tot>1 ? ` (${tot} porcje po 2 os.${extra>0?`, w tym ${extra} na zamrażalnik`:""})` : "";
        const txt=prefix+r.name+suf;
        add.push({id:uid("t"),text:txt,sub:r.note,srcId:r.id,mult:tot,extra:extra,auto:true,checked:!!wasChecked[txt]});
      };
      marT.forEach(r=>push(r,"Zamarynuj i zamroź (vacuum): "));
      frzT.forEach(r=>push(r,"Ugotuj na zapas i zamroź: "));
      freshT.forEach(r=>push(r,"Świeżo w dniu podania: "));
      if(add.length) add.push({id:uid("t"),text:"Rozłóż porcje do pojemników i podpisz datą",auto:true,checked:!!wasChecked["Rozłóż porcje do pojemników i podpisz datą"]});
      state.prep=state.prep.concat(add); queueSave(); renderPrep();
    });
    document.getElementById("cp").addEventListener("click",()=>{ state.prep=state.prep.filter(x=>!x.checked); queueSave(); renderPrep(); });
    document.getElementById("wipep").addEventListener("click",()=>{
      if(!confirm("Wyczyścić całą listę prep (łącznie z ręcznie dodanymi)?")) return;
      state.prep=[]; queueSave(); renderPrep();
    });
    document.getElementById("ap").addEventListener("click",()=>{ const i=document.getElementById("np"); if(i.value.trim()){ state.prep.push({id:uid("t"),text:i.value.trim(),checked:false}); i.value=""; queueSave(); renderPrep(); }});
  }

  window.__KK_START = load;
  window.__KK_RELOAD = load;
})();
