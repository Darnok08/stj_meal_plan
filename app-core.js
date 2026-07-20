
(function(){
  const DAYS=["Pon","Wt","Śr","Czw","Pt","Sob","Nd"];
  const MEALS=[["breakfast","Śniadanie"],["lunch","Obiad"],["dinner","Kolacja"]];
  const CUISINES=["Japońska","Koreańska","Chińska","Indyjska","Tajska","Wietnamska","Bliski Wschód","Malezyjska","Turecka","Peruwiańska","Filipińska","Karaibska","Gruzińska","Lankijska","Grecka","Włoska","Francuska","Hiszp./Portug.","Nordycka","Meksykańska","Amerykańska","Polska","Europejska","Roślinna","Shake"];
  const STORAGE_KEY="kk_program_v8";
  const RECIPES_VERSION=11;   // podbij, gdy zmienią się wbudowane przepisy lub cele
  // prepStyle: 'mar' marynuj+zamroź | 'freeze' gotuj+zamroź | 'fresh' świeżo
  function R(id,name,cuis,mt,ptype,time,prot,prep,note,ing,steps){
    return {id,name,cuisine:cuis,mealTypes:mt,ptype,prepTime:time,proteinTotal:prot,prepStyle:prep,note,ingredients:ing,steps};
  }
  // ── Dane przepisów przeniesiono do osobnego pliku data.js ──
  // (MACROS, SEASON_DOC, PMAC, SHOP_PRESETS, PREP_PRESETS, SIDE
  //  są teraz globalne i ładowane z data.js przed tym plikiem)

  function seedRaw(){ return [
    R("b01","Turkish Eggs (Çılbır)","Turecka",["breakfast"],"Jajka",10,84,"fresh",
      "",
      ["270 g Skyr naturalny", "100 g Jogurt grecki 10%", "2 ząbki czosnku", "1 łyżeczka soku z cytryny", "½ łyżeczki soli", "świeżo mielony pieprz", "5 jajek (rozmiar L)", "1 łyżka Ocet (do gotowania jajek; pomijalny w makro)", "20 g Masło", "2 łyżeczki Pul biber", "1 łyżeczka Papryka wędzona", "140 g Chleb na zakwasie", "Koperek", "Szczypiorek", "Sumak (opcjonalnie)", "Skórka z ½ cytryny"],
      ["Krem jogurtowy. Wymieszaj skyr z jogurtem greckim. Dodaj: przeciśnięty czosnek, sok z cytryny, sól, pieprz. Odstaw na 10 minut.", "Masło paprykowe. Na małym ogniu rozpuść masło. Dodaj pul biber i paprykę wędzoną. Podgrzewaj 45–60 sekund. Nie dopuść do przypalenia przypraw.", "Jajka. W szerokim garnku zagotuj wodę. Dodaj 1 łyżkę octu. Zmniejsz ogień do delikatnego wrzenia. Każde jajko wbij do osobnej miseczki i ostrożnie przełóż do wody. Gotuj 3–3½ minuty.", "Pieczywo. Podpiecz chleb do uzyskania chrupiącej skórki.", "Podanie. Na talerzu rozprowadź krem jogurtowy. Ułóż jajka. Polej masłem paprykowym. Posyp koperkiem, szczypiorkiem i odrobiną sumaku. Podawaj z ciepłym pieczywem."]),
    R("b02","New York Cheesecake Overnight Oats","Amerykańska",["breakfast"],"Nabiał",10,80,"fresh",
      "",
      ["110 g Płatki owsiane górskie", "350 g Skyr naturalny", "150 g Jogurt grecki 2%", "180 ml Mleko 2%", "20 g Nasiona chia", "40 g Serek śmietankowy", "1 łyżeczka Ekstrakt waniliowy", "Skórka z 1 cytryny", "Sok z ½ cytryny", "Szczypta soli", "120 g Borówki", "20 g Pokruszone herbatniki digestive", "Opcjonalnie:", "10 g Miód (opcjonalnie; nieujęty w makro)"],
      ["Przygotuj bazę. Do dużej miski dodaj: płatki, skyr, jogurt, mleko, chia. Dokładnie wymieszaj.", "Dodaj smak sernika. Dodaj: serek śmietankowy, wanilię, skórkę i sok z cytryny, szczyptę soli. Mieszaj do uzyskania gładkiej konsystencji.", "Przełóż do pojemników. Podziel masę do dwóch słoików lub pojemników. Przykryj. Wstaw do lodówki na minimum 8 godzin.", "Przed podaniem. Dodaj: borówki, pokruszone herbatniki. Jeżeli używasz miodu, polej nim owsiankę na samym końcu."]),
    R("b03","Shakshuka z Fetą i Jogurtem","Bliski Wschód",["breakfast"],"Jajka",10,88,"fresh",
      "",
      ["15 g Oliwa extra virgin", "150 g Cebula", "180 g Czerwona papryka", "3 ząbki Czosnek", "400 g Pomidory krojone z puszki", "30 g Koncentrat pomidorowy", "2 łyżeczki Kumin mielony", "2 łyżeczki Papryka wędzona", "1 łyżeczka Kolendra mielona", "½ łyżeczki Płatki chili", "Sól", "Pieprz", "5 szt. Jajka L", "70 g Feta", "180 g Skyr naturalny", "140 g Chleb na zakwasie", "Natka pietruszki", "Kolendra (opcjonalnie)", "Szczypiorek", "Sumak"],
      ["Przygotuj bazę. Rozgrzej oliwę na dużej patelni. Dodaj cebulę i smaż około 5 minut. Dodaj paprykę. Smaż kolejne 6–7 minut, aż zmięknie.", "Dodaj przyprawy. Dodaj czosnek. Po 30 sekundach wsyp: kumin, kolendrę, paprykę wędzoną, chili. Podsmaż około 30 sekund.", "Zredukuj sos. Dodaj koncentrat pomidorowy. Smaż minutę. Dodaj pomidory z puszki. Gotuj bez przykrycia 15–20 minut, aż sos stanie się gęsty. Dopraw solą i pieprzem.", "Dodaj jajka. Łyżką zrób pięć zagłębień. Wbij jajka. Przykryj patelnię. Gotuj około 6–8 minut, aż białka się zetną, a żółtka pozostaną płynne.", "Wykończenie. Posyp fetą. Dodaj świeżą natkę, szczypiorek i szczyptę sumaku. Podawaj z porcją skyru obok oraz chrupiącym pieczywem."]),
    R("b04","Protein Pancakes z Borówkami i Kremem Waniliowym","Amerykańska",["breakfast"],"Jajka",10,111,"fresh",
      "",
      ["250 g Twaróg półtłusty", "3 szt. Jajka L", "100 g Płatki owsiane (zmielone na mąkę)", "8 g Proszek do pieczenia", "1 łyżeczka Ekstrakt waniliowy", "½ łyżeczki Cynamon", "Szczypta soli", "250 g Skyr naturalny", "1 łyżeczka Pasta lub ekstrakt waniliowy", "10 g Miód", "150 g Borówki", "10 g Masło klarowane"],
      ["Przygotuj ciasto. Zmiksuj: twaróg, jajka, zmielone płatki, wanilię, cynamon, sól, proszek do pieczenia. Odstaw na 10 minut, aby płatki wchłonęły część wilgoci.", "Usmaż pancakes. Rozgrzej patelnię na średnim ogniu. Posmaruj cienko masłem klarowanym. Nakładaj niewielkie porcje ciasta. Smaż około 2 minuty z każdej strony. Najlepiej zrobić 8–10 mniejszych placuszków.", "Przygotuj krem. Połącz skyr z wanilią i miodem. Nie miksuj zbyt długo – krem powinien pozostać gęsty.", "Podanie. Ułóż pancakes na talerzu. Dodaj krem. Posyp borówkami."]),
    R("b05","Mango Sticky Rice Overnight Oats","Tajska",["breakfast"],"Nabiał",10,80,"fresh",
      "",
      ["110 g Płatki owsiane górskie", "350 g Skyr naturalny", "150 g Jogurt grecki 2%", "120 ml Mleko 2%", "80 ml Mleko kokosowe (pełnotłuste)", "20 g Nasiona chia", "220 g Dojrzałe mango", "15 g Miód (syrop klonowy może być zamiennikiem)", "1 łyżeczka Ekstrakt waniliowy", "Skórka z ½ limonki", "Szczypta soli", "15 g Wiórki kokosowe", "10 g Prażony sezam", "Mięta (opcjonalnie)"],
      ["Przygotuj bazę. W misce wymieszaj: płatki, skyr, jogurt, mleko, mleko kokosowe, chia.", "Dodaj smak. Pokrój połowę mango w drobną kostkę. Dodaj do masy razem z: wanilią, syropem klonowym, skórką z limonki, szczyptą soli. Dokładnie wymieszaj.", "Schłodź. Przełóż do dwóch szczelnych słoików. Odstaw do lodówki na minimum 8 godzin.", "Podanie. Na wierzchu ułóż pozostałe mango. Posyp: prażonym sezamem, wiórkami kokosowymi. Opcjonalnie udekoruj listkami mięty."]),
    R("b06","Breakfast Burrito z Kurczakiem, Jajecznicą i Awokado","Meksykańska",["breakfast"],"Jajka",10,107,"fresh",
      "",
      ["220 g Pierś z kurczaka (surowa)", "3 szt. Jajka L", "120 g Skyr naturalny", "120 g Awokado", "150 g Pomidor", "50 g Czerwona cebula", "Kolendra – garść", "2 szt. Tortille pełnoziarniste (około 60 g każda)", "30 g Ser cheddar", "10 g Oliwa", "1 łyżeczka Kumin", "1 łyżeczka Papryka wędzona", "1 łyżeczka Czosnek granulowany", "½ łyżeczki Oregano", "Sól", "Pieprz", "120 g Skyr naturalny (cała ilość podana wyżej)", "Sok z ½ limonki", "Szczypta soli", "Kolendra"],
      ["Kurczak. Pokrój pierś w drobną kostkę. Dopraw: kuminem, papryką, czosnkiem, oregano, solą, pieprzem. Smaż na oliwie około 7–8 minut.", "Jajecznica. Na tej samej patelni przygotuj delikatną jajecznicę. Nie przesuszaj jej – powinna pozostać kremowa.", "Salsa. Wymieszaj skyr z sokiem z limonki i drobno posiekaną kolendrą.", "Złożenie burrito. Na tortilli ułóż: sos, kurczaka, jajecznicę, cheddar, pomidory, cebulę, awokado. Zawiń ciasno.", "Grillowanie. Połóż burrito na suchej patelni lub w opiekaczu. Grilluj około 2 minuty z każdej strony."]),
    R("b07","Tiramisu Overnight Oats","Europejska",["breakfast"],"Nabiał",10,90,"fresh",
      "",
      ["110 g Płatki owsiane górskie", "350 g Skyr naturalny", "150 g Jogurt grecki 2%", "180 ml Mleko 2%", "20 g Nasiona chia", "80 ml Mocne espresso (ostudzone)", "1 łyżeczka Ekstrakt waniliowy", "15 g Miód", "10 g Kakao (ciemne, niesłodzone)", "Szczypta soli", "100 g Skyr naturalny", "½ łyżeczki Wanilia", "5 g Kakao do oprószenia", "10 g Gorzka czekolada 85% (starta)"],
      ["Przygotuj bazę. W dużej misce połącz: płatki, skyr, jogurt grecki, mleko, chia. Dodaj ostudzone espresso.", "Dodaj aromaty. Dodaj: wanilię, miód, kakao, szczyptę soli. Dokładnie wymieszaj.", "Przygotuj warstwę kremową. W osobnej miseczce wymieszaj 100 g skyru z wanilią.", "Złóż deser. Do dwóch słoików nałóż: warstwę owsianki, cienką warstwę kremu, ponownie owsiankę, na wierzch resztę kremu. Schładzaj minimum 8 godzin.", "Przed podaniem. Oprósz kakao. Dodaj startą gorzką czekoladę."]),
    R("b08","Bajgiel z Wędzonym Łososiem, Serkiem i Awokado","Amerykańska",["breakfast"],"Ryby i owoce morza",10,84,"fresh",
      "",
      ["2 szt. Bajgle (ok. 95 g każdy)", "180 g Łosoś wędzony na zimno", "80 g Serek śmietankowy naturalny", "150 g Skyr naturalny", "120 g Awokado", "120 g Pomidor", "100 g Ogórek", "40 g Czerwona cebula", "Koperek", "Szczypiorek", "20 g Kapary", "Sok z ½ cytryny", "Świeżo mielony pieprz"],
      ["Przygotuj krem. Wymieszaj: serek śmietankowy, skyr, posiekany szczypiorek, odrobinę soku z cytryny, pieprz. Nie dosalaj – łosoś i kapary są wystarczająco słone.", "Bajgiel. Przekrój bajgiel na pół. Podpiecz w tosterze lub na suchej patelni przez 2–3 minuty. Powinien być chrupiący z zewnątrz, miękki w środku.", "Warzywa. Pokrój: pomidora, ogórka, cebulę, awokado.", "Złożenie. Posmaruj bajgiel kremem. Dodaj: łososia, awokado, pomidora, ogórka, cebulę, kapary. Na koniec posyp koperkiem i skrop kilkoma kroplami cytryny."]),
    R("b09","Tosty z Awokado, Burratą i Mortadelą z Pistacjami","Europejska",["breakfast"],"Tofu/roślinne",10,70,"fresh",
      "",
      ["140 g Chleb na zakwasie", "125 g Burrata", "100 g Mortadela z pistacjami", "180 g Skyr naturalny", "120 g Awokado", "180 g Pomidory (najlepiej malinowe)", "40 g Rukola", "20 g Pistacje niesolone", "10 g Oliwa extra virgin", "Skórka z ½ cytryny", "Pieprz", "Płatki chili (opcjonalnie)"],
      ["Przygotuj krem. Wymieszaj skyr ze skórką z cytryny i odrobiną pieprzu. Nie solimy – burrata i mortadela są już słone.", "Pieczywo. Podpiecz chleb. Powinien być mocno chrupiący.", "Warzywa. Pokrój: pomidory, awokado. Rukolę delikatnie skrop oliwą.", "Złożenie. Na tostach rozsmaruj cienką warstwę kremu. Dodaj: rukolę, awokado, burratę, mortadelę, pomidory. Posyp posiekanymi pistacjami. Na koniec dodaj kilka kropel oliwy i świeżo mielony pieprz."]),
    R("b10","Menemen z Fetą i Chrupiącym Chlebem","Turecka",["breakfast"],"Jajka",10,85,"fresh",
      "",
      ["5 szt. Jajka L", "450 g Pomidory malinowe", "120 g Zielona papryka", "80 g Cebula", "15 g Masło", "5 g Oliwa", "70 g Feta", "180 g Skyr naturalny", "140 g Chleb na zakwasie", "2 łyżeczki Pul biber", "Pieprz", "Sól (ostrożnie)", "Natka pietruszki", "Szczypiorek"],
      ["Przygotowanie. 1. Na oliwie i maśle zeszklij cebulę. Dodaj paprykę. Smaż około 5 minut. 2. Dodaj pokrojone pomidory. Gotuj około 10 minut, aż większość wody odparuje. 3. Dodaj pul biber. Dopraw pieprzem. 4. Roztrzep jajka. Wlej na patelnię. Delikatnie mieszaj silikonową łopatką. Jajka mają być kremowe, nie suche. 5. Dodaj pokruszoną fetę. Wymieszaj tylko raz. 6. Podawaj ze skyrem i chrupiącym chlebem."]),
    R("b11","Green Goddess Toast z Awokado, Jajkami i Fetą","Europejska",["breakfast"],"Jajka",10,85,"fresh",
      "",
      ["140 g Chleb na zakwasie", "5 szt. Jajka L", "70 g Feta", "180 g Skyr naturalny", "150 g Awokado", "Sok z ½ cytryny", "15 g Natka pietruszki", "10 g Szczypiorek", "10 g Bazylia", "10 g Oliwa extra virgin", "120 g Ogórek", "80 g Rzodkiewki", "30 g Mikrolistki lub kiełki", "Pieprz", "Płatki chili", "Sól morska"],
      ["Green Goddess. Zblenduj: awokado, skyr, natkę, szczypiorek, bazylię, oliwę, sok z cytryny. Dopraw solą i pieprzem.", "Jajka. Gotuj przez 7 minut. Przełóż do lodowatej wody. Obierz. Przekrój na pół.", "Pieczywo. Mocno podpiecz.", "Warzywa. Pokrój ogórka i rzodkiewki bardzo cienko.", "Złożenie. Na chlebie rozsmaruj krem. Dodaj: jajka, fetę, warzywa, kiełki. Na końcu dodaj pieprz i kilka płatków chili."]),
    R("b12","Whipped Twaróg z Pieczonymi Truskawkami, Pistacjami i Miodem","Polska",["breakfast"],"Nabiał",10,78,"fresh",
      "",
      ["300 g Twaróg półtłusty", "150 g Jogurt grecki 2%", "1 łyżeczka Pasta waniliowa", "Skórka z ½ cytryny", "Szczypta soli", "300 g Truskawki", "15 g Miód", "Sok z ½ cytryny", "20 g Pistacje", "15 g Płatki migdałów", "Mięta", "2–3 szt. Pełnoziarniste herbatniki (opcjonalnie; nieujęte w makro)"],
      ["Piecz truskawki. Rozgrzej piekarnik do 190°C. Truskawki wymieszaj z miodem i sokiem z cytryny. Piecz 15 minut. Odstaw do ostygnięcia.", "Przygotuj mus. Zmiksuj: twaróg, jogurt, wanilię, skórkę z cytryny, szczyptę soli. Blenduj około 2 minut. Mus powinien być całkowicie gładki.", "Podanie. Nałóż mus. Dodaj pieczone truskawki. Posyp: pistacjami, migdałami, miętą."]),
    R("b13","Bircher Muesli z Jabłkiem, Orzechami i Cynamonem","Europejska",["breakfast"],"Nabiał",10,92,"fresh",
      "",
      ["100 g Płatki owsiane górskie", "250 g Twaróg półtłusty", "200 g Jogurt grecki 2%", "150 ml Mleko 2%", "250 g Jabłka (kwaśne, np. Szara Reneta lub Pink Lady)", "Sok z ½ cytryny", "20 g Orzechy włoskie", "20 g Rodzynki", "15 g Nasiona chia", "1½ łyżeczki Cynamon cejloński", "1 łyżeczka Wanilia", "15 g Płatki migdałów", "Świeża mięta (opcjonalnie)"],
      ["Zetrzyj jabłka. Zetrzyj na grubych oczkach tarki. Od razu skrop sokiem z cytryny.", "Przygotuj bazę. Połącz: płatki, twaróg, jogurt, mleko, chia, wanilię, cynamon. Dodaj starte jabłka. Na końcu wsyp rodzynki.", "Schłodź. Przełóż do dwóch pojemników. Odstaw do lodówki na minimum 8 godzin.", "Podanie. Posyp: orzechami włoskimi, płatkami migdałów. Opcjonalnie udekoruj miętą."]),
    R("b14","Kanapki z Mozzarellą, Szynką Cotto i Pesto Pistacjowym","Europejska",["breakfast"],"Nabiał",10,76,"fresh",
      "",
      ["140 g Chleb na zakwasie", "150 g Mozzarella", "160 g Szynka cotto", "180 g Pomidory malinowe", "40 g Rukola", "30 g Pesto pistacjowe", "5 g Oliwa extra virgin", "Pieprz", "Bazylia"],
      ["Przygotowanie. 1. Podpiecz kromki chleba. 2. Posmaruj cienką warstwą pesto. 3. Ułóż: rukolę, mozzarellę, szynkę, pomidory. 4. Dodaj pieprz. Kilka listków bazylii. Odrobinę oliwy. Gotowe."]),
    R("b15","Jajecznica z Szynką Cotto, Hüttenkäse i Szczypiorkiem","Europejska",["breakfast"],"Jajka",10,108,"fresh",
      "",
      ["5 szt. Jajka L", "250 g Hüttenkäse", "140 g Szynka cotto", "140 g Chleb na zakwasie", "10 g Masło", "20 g Szczypiorek", "Pieprz", "Sól", "200 g Pomidory"],
      ["Przygotowanie. 1. Pokrój szynkę w kostkę. Podsmaż na maśle przez około minutę. 2. Dodaj roztrzepane jajka. Smaż na małym ogniu. 3. Kiedy jajka będą prawie gotowe, dodaj Hüttenkäse. Delikatnie wymieszaj. Nie gotuj dłużej niż minutę. 4. Dodaj dużą ilość szczypiorku. Dopraw pieprzem. 5. Podawaj z chrupiącym chlebem oraz pomidorami."]),
    R("b16","Kanapki Skandynawskie z Matjasem, Twarożkiem i Ogórkiem","Europejska",["breakfast"],"Ryby i owoce morza",10,95,"fresh",
      "",
      ["140 g Chleb żytni na zakwasie", "160 g Filety śledziowe matjas (masa po odsączeniu)", "250 g Twaróg półtłusty", "80 g Jogurt grecki 2%", "150 g Ogórek", "100 g Rzodkiewki", "40 g Czerwona cebula", "15 g Koperek", "10 g Szczypiorek", "Sok z ½ cytryny", "Pieprz"],
      ["Twarożek. Wymieszaj: twaróg, jogurt, koperek, szczypiorek, pieprz, kilka kropel cytryny. Nie dosalaj.", "Warzywa. Pokrój bardzo cienko: ogórka, rzodkiewki, cebulę.", "Pieczywo. Opcjonalnie lekko podpiecz.", "Złożenie. Posmaruj kromki twarożkiem. Dodaj: matjasa, ogórka, rzodkiewkę, cebulę. Na końcu dużo koperku."]),
    R("b17","Jajka na Miękko z Twarożkiem, Awokado i Kiszonym Ogórkiem","Polska",["breakfast"],"Jajka",10,106,"fresh",
      "",
      ["5 szt. Jajka L", "250 g Twaróg półtłusty", "70 g Jogurt grecki 2%", "140 g Chleb na zakwasie", "120 g Awokado", "150 g Ogórki kiszone", "180 g Pomidory", "20 g Szczypiorek", "Pieprz", "Sól", "Rzodkiewki (opcjonalnie)"],
      ["Twarożek. Wymieszaj twaróg z jogurtem. Dodaj: szczypiorek, pieprz, odrobinę soli.", "Jajka. Gotuj przez 6½ minuty. Przełóż do zimnej wody na minutę.", "Warzywa. Pokrój: awokado, ogórki kiszone, pomidory.", "Podanie. Na talerzu ułóż: twarożek, jajka, pieczywo, warzywa. Posyp szczypiorkiem."]),
    R("b18","Kanapki z Pastą z Tuńczyka, Jajkiem i Ogórkiem Kiszonym","Polska",["breakfast"],"Jajka",10,87,"fresh",
      "",
      ["140 g Chleb na zakwasie", "160 g Tuńczyk w sosie własnym (po odsączeniu)", "3 szt. Jajka L", "80 g Jogurt grecki 2%", "10 g Musztarda Dijon", "120 g Ogórki kiszone", "20 g Kapary", "40 g Czerwona cebula", "15 g Szczypiorek", "Sok z ¼ cytryny", "Pieprz", "180 g Pomidory", "80 g Rzodkiewki"],
      ["Ugotuj jajka. Gotuj przez 9 minut. Przelej zimną wodą i obierz.", "Przygotuj pastę. Drobno posiekaj jajka. Dodaj: odsączonego tuńczyka, jogurt grecki, Dijon, drobno posiekane kapary, cebulę, szczypiorek, sok z cytryny. Delikatnie wymieszaj widelcem.", "Pieczywo. Podpiecz kromki chleba.", "Podanie. Nałóż grubą warstwę pasty. Podawaj z pomidorem, rzodkiewką i ogórkiem kiszonym."]),
    R("b19","Omlet Caprese z Mozzarellą, Pomidorami i Bazylią","Europejska",["breakfast"],"Jajka",10,76,"fresh",
      "",
      ["5 szt. Jajka L", "125 g Mozzarella", "10 g Masło", "250 g Pomidory malinowe", "20 g Bazylia", "40 g Rukola", "140 g Chleb na zakwasie", "10 g Ocet balsamiczny (gęsty)", "5 g Oliwa extra virgin", "Pieprz", "Sól"],
      ["Przygotuj składniki. Pokrój mozzarellę i pomidory. Osusz mozzarellę ręcznikiem papierowym.", "Omlet. Roztrzep jajka. Dopraw pieprzem i odrobiną soli. Rozgrzej masło na patelni. Wlej jajka. Gdy omlet zacznie się ścinać, ułóż na jednej połowie mozzarellę i połowę pomidorów. Złóż omlet na pół i smaż jeszcze około minuty.", "Sałatka. Pozostałe pomidory wymieszaj z rukolą i bazylią. Dodaj oliwę oraz kilka kropel kremu balsamicznego.", "Podanie. Podawaj omlet z chrupiącym pieczywem i świeżą sałatką."]),
    R("b20","Cottage Bowl z Awokado, Pomidorami, Pestkami Dyni i Chrupiącym Chlebem","Europejska",["breakfast"],"Tofu/roślinne",10,71,"fresh",
      "",
      ["400 g Serek wiejski (cottage cheese)", "120 g Awokado", "250 g Pomidory malinowe lub koktajlowe", "120 g Ogórek", "20 g Pestki dyni", "10 g Oliwa extra virgin", "Sok z ½ cytryny", "15 g Szczypiorek", "10 g Koperek", "Pieprz", "Sól", "1 łyżeczka Za'atar (lub sumak dla bardziej cytrusowego charakteru)", "140 g Chleb na zakwasie"],
      ["Przygotuj miskę. Do miski przełóż serek wiejski. Dopraw pieprzem, za'atarem i w razie potrzeby odrobiną soli.", "Dodaj warzywa. Pokrój: pomidory, ogórka, awokado. Ułóż na serku.", "Wykończenie. Posyp: pestkami dyni, koperkiem, szczypiorkiem. Skrop oliwą i sokiem z cytryny.", "Podanie. Podawaj z ciepłym, chrupiącym chlebem."]),
    R("b21","Wrap Cezar z Kurczakiem, Parmezanem i Sosem Jogurtowym","Amerykańska",["breakfast"],"Nabiał",10,101,"fresh",
      "",
      ["220 g Pieczona pierś z kurczaka (masa po obróbce)", "25 g Parmezan", "2 szt. Tortille pełnoziarniste (ok. 60 g każda)", "120 g Sałata rzymska", "150 g Pomidorki koktajlowe", "120 g Jogurt grecki 2%", "10 g Musztarda Dijon", "Sok z ½ cytryny", "1 łyżeczka Sos Worcestershire", "1 mały ząbek czosnku", "Pieprz"],
      ["Przygotuj sos. Wymieszaj jogurt z: Dijon, czosnkiem, Worcestershire, sokiem z cytryny, pieprzem.", "Przygotuj składniki. Pokrój kurczaka w cienkie plastry. Posiekaj sałatę. Przekrój pomidorki na pół.", "Złóż wrap. Na tortilli rozsmaruj sos. Dodaj: sałatę, kurczaka, pomidorki, starty parmezan.", "Grillowanie. Zwiń ciasno. Podsmaż na suchej patelni lub w opiekaczu przez 1–2 minuty z każdej strony."]),
    R("b22","Frittata ze Szpinakiem, Fetą i Pieczoną Papryką","Europejska",["breakfast"],"Jajka",10,70,"fresh",
      "",
      ["Dlaczego 4 porcje? Frittata najlepiej wychodzi jako większa forma. Przy podziale poniżej zjecie 2½ porcji, a 1½ porcji zostanie na kolejny dzień.", "8 szt. Jajka L", "180 g Feta", "200 g Świeży szpinak", "2 szt. Czerwona papryka (ok. 350 g)", "120 g Cebula", "2 ząbki Czosnek", "10 g Oliwa", "1 łyżeczka Oregano", "1 łyżeczka Tymianek", "Pieprz", "3½ kromki (ok. 125 g) do bieżącego podania Chleb na zakwasie", "80 g oraz sok z ½ cytryny Rukola"],
      ["Upiecz paprykę. Piekarnik 220°C. Piecz około 20 minut, aż skórka lekko się przypali. Obierz. Pokrój w paski.", "Podsmaż warzywa. Na oliwie zeszklij cebulę. Dodaj czosnek. Dodaj szpinak. Smaż tylko do zwiędnięcia.", "Masa jajeczna. Roztrzep jajka. Dodaj: oregano, tymianek, pieprz. Dodaj pokruszoną fetę. Dodaj paski pieczonej papryki.", "Pieczenie. Całość przelej do formy. Piecz około 25 minut w 180°C. Środek powinien być ścięty, ale nadal soczysty.", "Podanie. Podawaj z rukolą skropioną cytryną oraz chrupiącym chlebem."]),
    R("b23","Mediterranean Breakfast Bowl z Halloumi, Hummusem i Jajkiem","Bliski Wschód",["breakfast"],"Jajka",10,87,"fresh",
      "",
      ["140 g Halloumi", "4 szt. Jajka L", "120 g Hummus", "250 g Pomidory", "180 g Ogórek", "120 g Papryka", "80 g Rzodkiewki", "40 g Oliwki Kalamata", "40 g Pestki granatu (opcjonalnie, w sezonie; nieujęte w makro)", "15 g Natka pietruszki", "10 g Mięta", "1 łyżeczka Za'atar", "10 g Oliwa extra virgin", "Sok z ½ cytryny", "120 g Pita pełnoziarnista (chleb na zakwasie jako zamiennik)"],
      ["Halloumi. Pokrój w plastry. Grilluj po 2 minuty z każdej strony na suchej patelni.", "Jajka. Gotuj przez 6½ minuty. Schłodź i przekrój na pół.", "Warzywa. Pokrój: pomidory, ogórka, paprykę, rzodkiewki.", "Złożenie bowla. Do miski dodaj: hummus, warzywa, halloumi, jajka, oliwki. Posyp: natką, miętą, za'atarem. Opcjonalnie dodaj pestki granatu. Na końcu dodaj kilka kropel oliwy i sok z cytryny. Podawaj z pitą lub chlebem."]),
    R("b24","Tosty z Krewetkami, Awokado i Jajkiem Sadzonym","Europejska",["breakfast"],"Jajka",10,84,"fresh",
      "",
      ["220 g Krewetki obrane (masa po rozmrożeniu i osuszeniu)", "2 szt. Jajka L", "4 kromki Chleb na zakwasie (140 g)", "120 g Awokado", "150 g Pomidorki koktajlowe", "10 g Masło", "2 ząbki czosnku", "Sok i skórka z ½ cytryny", "Natka pietruszki", "Płatki chili (opcjonalnie)", "Pieprz", "Sól"],
      ["Przygotuj awokado. Rozgnieć je widelcem z: sokiem z cytryny, pieprzem, odrobiną soli.", "Krewetki. Na mocno rozgrzanej patelni rozpuść masło. Dodaj czosnek. Po 30 sekundach wrzuć krewetki. Smaż 1–2 minuty z każdej strony. Na końcu dodaj skórkę i sok z cytryny oraz natkę.", "Jajka. Usmaż dwa jajka sadzone. Żółtko powinno pozostać płynne.", "Złożenie. Na podpieczonym chlebie rozsmaruj awokado. Dodaj pomidorki. Następnie krewetki. Na wierzchu połóż jajko. Posyp natką i świeżo mielonym pieprzem."]),
    R("b25","Proteinowe Pancakes z Serka Wiejskiego, Borówek i Jogurtu Greckiego","Amerykańska",["breakfast"],"Jajka",10,88,"fresh",
      "",
      ["300 g Serek wiejski", "3 szt. Jajka L", "90 g Mąka owsiana", "8 g Proszek do pieczenia", "½ łyżeczki Cynamon", "1 łyżeczka Ekstrakt waniliowy", "Szczypta soli", "180 g Jogurt grecki 2%", "150 g Borówki", "15 g Miód (syrop klonowy może być zamiennikiem)", "15 g Pistacje"],
      ["Przygotuj ciasto. Zblenduj: serek wiejski, jajka, wanilię. Dodaj: mąkę owsianą, proszek do pieczenia, cynamon, sól. Odstaw na 5 minut.", "Smażenie. Rozgrzej nieprzywierającą patelnię. Smaż na dobrze rozgrzanej patelni z nieprzywierającą powłoką. Smaż małe pancakes około 2–3 minuty z każdej strony. Nie odwracaj ich zbyt wcześnie.", "Podanie. Podawaj z: jogurtem greckim, borówkami, pistacjami, niewielką ilością miodu."]),
    R("b26","Breakfast Quesadilla z Jajkami, Szynką Cotto i Cheddarem","Meksykańska",["breakfast"],"Jajka",10,83,"fresh",
      "",
      ["4 szt. Jajka L", "140 g Szynka cotto", "50 g Cheddar", "2 szt. Tortille pełnoziarniste (ok. 60 g każda)", "60 g Szpinak baby", "150 g Pomidorki koktajlowe", "5 g Masło", "15 g Szczypiorek", "Pieprz", "½ łyżeczki Papryka wędzona", "Sos (opcjonalnie; nieujęty w makro)", "100 g Jogurt grecki 2%", "Sok z limonki", "Kolendra", "Szczypta kminu rzymskiego"],
      ["Jajecznica. Na maśle przygotuj kremową jajecznicę. Pod koniec dodaj: szynkę, szpinak, paprykę wędzoną, szczypiorek. Smaż jeszcze około minuty.", "Złożenie. Na połowie tortilli rozłóż farsz. Posyp startym cheddarem. Złóż tortillę na pół.", "Grillowanie. Grilluj na suchej patelni po 2 minuty z każdej strony, aż tortilla będzie złocista, a ser się roztopi.", "Podanie. Pokrój na trójkąty. Podawaj z pomidorkami. Opcjonalnie dodaj sos jogurtowo-limonkowy."]),
    R("b27","English Muffin Breakfast Sandwich z Indykiem, Jajkiem i Cheddarem","Amerykańska",["breakfast"],"Jajka",10,91,"fresh",
      "",
      ["2 szt. English muffin (ok. 65 g każda)", "160 g Pieczona pierś z indyka (plastry) (masa po obróbce)", "2 szt. Jajka L", "40 g Cheddar dojrzewający", "120 g Pomidor", "30 g Rukola", "80 g Jogurt grecki 2%", "10 g Musztarda Dijon", "5 g Miód", "Sok z ¼ cytryny", "Pieprz", "5 g Masło (opcjonalnie; nieujęte w makro)"],
      ["Sos. Wymieszaj: jogurt grecki, Dijon, miód, sok z cytryny, pieprz.", "Muffiny. Przekrój English muffiny. Opcjonalnie posmaruj przekrojone muffiny bardzo cienką warstwą masła. Podpiecz je na suchej patelni lub w tosterze przez 2–3 minuty, aż będą lekko chrupiące.", "Jajka. Usmaż jajka na małej patelni. Jeśli masz obręcz do jajek, użyj jej – dzięki temu jajko będzie idealnie pasować do muffina. Żółtko może być lekko płynne lub średnio ścięte.", "Złożenie. Dolną połówkę muffina posmaruj sosem. Ułóż kolejno: rukolę, plaster pomidora, indyka, cheddar, jajko. Przykryj górną połówką muffina. Jeśli lubisz roztopiony ser, zgrilluj całość jeszcze przez 1 minutę w opiekaczu."]),
    R("b28","Tuna Melt na Zakwasie z Cheddarem i Piklami","Amerykańska",["breakfast"],"Ryby i owoce morza",10,84,"fresh",
      "",
      ["4 kromki Chleb na zakwasie (ok. 160 g)", "180 g Tuńczyk w sosie własnym (odsączony)", "80 g Jogurt grecki 2%", "10 g Musztarda Dijon", "15 g Kapary", "40 g Czerwona cebula", "Sok z ¼ cytryny", "Pieprz", "60 g Cheddar dojrzewający", "100 g Ogórki kiszone (pikle jako zamiennik)", "10 g Szczypiorek"],
      ["Przygotuj pastę. Wymieszaj: odsączonego tuńczyka, jogurt grecki, Dijon, drobno posiekaną cebulę, kapary, sok z cytryny, pieprz.", "Złóż kanapki. Na dwóch kromkach rozłóż pastę. Posyp startym cheddarem. Przykryj pozostałymi kromkami.", "Grillowanie. Podsmaż na patelni grillowej lub w opiekaczu przez 3–4 minuty, aż pieczywo będzie chrupiące, a ser całkowicie się rozpuści.", "Podanie. Przekrój po skosie. Podawaj z piklami i szczypiorkiem."]),
    R("b29","Croissant z Jajecznicą, Indykiem, Comté i Sosem Miodowo-Dijon","Francuska",["breakfast"],"Jajka",10,109,"fresh",
      "",
      ["2 średnie Maślane croissanty (ok. 75 g każdy)", "160 g Pieczona pierś z indyka (masa po obróbce)", "4 szt. Jajka L", "40 g Ser Comté", "30 g Rukola", "150 g Pomidor malinowy", "80 g Jogurt grecki 2%", "10 g Musztarda Dijon", "8 g Miód", "Sok z ¼ cytryny", "Pieprz", "5 g Masło"],
      ["Sos. Połącz: jogurt grecki, Dijon, miód, sok z cytryny, pieprz.", "Croissant. Przekrój na pół. Podgrzej przez 3–4 minuty w piekarniku (180°C) lub w air fryerze.", "Jajecznica. Na maśle przygotuj delikatną, kremową jajecznicę. Nie przesmażaj jej – powinna pozostać lekko wilgotna.", "Złożenie. Na dolnej części croissanta ułóż: rukolę, pomidora, pieczonego indyka, jajecznicę, cienkie plastry Comté. Dodaj sos i przykryj górną częścią croissanta."]),
    R("b30","Huevos Rancheros z Czarną Fasolą, Awokado i Salsą Fresca","Meksykańska",["breakfast"],"Jajka",10,63,"fresh",
      "",
      ["4 szt. Jajka L", "240 g Czarna fasola (odsączona)", "4 szt. Małe tortille kukurydziane (ok. 25 g każda)", "250 g Pomidory", "60 g Czerwona cebula", "1 szt. Awokado (ok. 150 g)", "15 g Kolendra", "1 szt. Limonka", "1 łyżeczka Kmin rzymski", "1 łyżeczka Papryka wędzona", "Chili – do smaku", "10 g Oliwa"],
      ["Salsa fresca. Pokrój w drobną kostkę: pomidory, cebulę. Dodaj kolendrę, sok z limonki i pieprz.", "Fasola. Podsmaż na oliwie z: kminem, papryką, odrobiną chili. Delikatnie rozgnieć około 1/3 fasoli.", "Tortille. Podgrzej na suchej patelni przez około 30 sekund z każdej strony.", "Jajka. Usmaż jajka sadzone.", "Podanie. Na tortillach ułóż: fasolę, jajka, salsę, plastry awokado. Na końcu skrop limonką."]),
    R("b31","Bajgiel z Wędzonym Łososiem, Serkiem Chrzanowym i Ogórkiem","Amerykańska",["breakfast"],"Ryby i owoce morza",10,66,"fresh",
      "",
      ["2 szt. Bajgle pełnoziarniste (ok. 95 g każdy)", "160 g Łosoś wędzony na zimno", "120 g Serek śmietankowy light", "150 g Ogórek szklarniowy", "40 g Czerwona cebula", "20 g Kapary", "10 g Chrzan tarty", "Sok z ¼ cytryny", "15 g Koperek", "Pieprz"],
      ["Serek. Połącz: serek, chrzan, sok z cytryny, pieprz, koperek.", "Bajgiel. Przekrój i opiecz.", "Złożenie. Posmaruj obie połówki serkiem. Dodaj: łososia, cienkie plasterki ogórka, cebulę, kapary. Przykryj drugą połówką."]),
    R("b32","Sabich z Jajkiem, Hummusem i Bakłażanem","Bliski Wschód",["breakfast"],"Jajka",10,57,"fresh",
      "",
      ["2 szt. Pity pełnoziarniste (ok. 70 g każda)", "4 szt. Jajka L", "120 g Hummus", "1 duży Bakłażan (ok. 350 g)", "180 g Pomidor", "120 g Ogórek", "15 g Natka pietruszki", "Sok z ½ cytryny", "1 łyżeczka Za'atar", "10 g Oliwa"],
      ["Bakłażan. Pokrój w plastry. Skrop oliwą. Piecz 20 minut w 210°C lub grilluj.", "Jajka. Ugotuj na twardo (9 minut). Pokrój w ćwiartki.", "Warzywa. Pokrój pomidora i ogórka w kostkę.", "Złożenie. Podgrzej pitę. Posmaruj hummusem. Dodaj: bakłażana, jajka, warzywa, natkę. Skrop sokiem z cytryny i posyp za'atarem."]),
    R("b33","Overnight Oats Pistacja & Czerwona Porzeczka","Europejska",["breakfast"],"Nabiał",10,57,"freeze",
      "",
      ["100 g Płatki owsiane górskie", "250 g Jogurt grecki 2%", "200 ml Mleko 2%", "20 g Nasiona chia", "30 g Pasta pistacjowa 100%", "15 g Miód", "1 łyżeczka Ekstrakt waniliowy", "Szczypta soli", "120 g Czerwona porzeczka", "20 g, grubo posiekane Pistacje (niesolone)", "Skórka z ½ cytryny"],
      ["Przygotuj bazę. W dużym słoiku lub pojemniku wymieszaj: płatki owsiane, jogurt grecki, mleko, chia, pastę pistacjową, miód, wanilię, szczyptę soli. Dokładnie wymieszaj, aż pasta pistacjowa całkowicie połączy się z masą.", "Schładzanie. Przykryj i wstaw do lodówki na minimum 6 godzin, najlepiej na całą noc.", "Podanie. Przed podaniem delikatnie wymieszaj owsiankę. Dodaj: czerwoną porzeczkę, posiekane pistacje, świeżo startą skórkę z cytryny."]),
    R("b34","Overnight Oats Black Forest","Europejska",["breakfast"],"Nabiał",10,55,"freeze",
      "",
      ["100 g Płatki owsiane górskie", "250 g Jogurt grecki 2%", "200 ml Mleko 2%", "20 g Nasiona chia", "15 g Kakao naturalne", "15 g Miód", "1 łyżeczka Ekstrakt waniliowy", "Szczypta soli", "150 g Wiśnie (świeże lub mrożone)", "20 g Gorzka czekolada 70%", "20 g Płatki migdałów"],
      ["Przygotuj bazę. Wymieszaj: płatki owsiane, jogurt, mleko, chia, kakao, miód, wanilię, sól.", "Schładzanie. Przykryj i odstaw do lodówki na minimum 6 godzin.", "Topping. Jeśli używasz mrożonych wiśni, rozmroź je i odlej nadmiar soku. Posiekaj gorzką czekoladę. Lekko podpraż płatki migdałów.", "Podanie. Na owsiankę wyłóż: wiśnie, gorzką czekoladę, płatki migdałów."]),
    R("b35","Overnight Oats Banoffee","Europejska",["breakfast"],"Nabiał",10,50,"freeze",
      "",
      ["100 g Płatki owsiane górskie", "250 g Jogurt grecki 2%", "180 ml Mleko 2%", "20 g Nasiona chia", "1 łyżeczka Ekstrakt waniliowy", "Szczypta soli", "60 g Daktyle Medjool", "40 ml Gorąca woda", "Szczypta soli", "1 duży Banan (ok. 140 g)", "20 g Orzechy pekan", "10 g, starta Gorzka czekolada 70%"],
      ["Przygotuj karmel. Zblenduj daktyle z gorącą wodą i szczyptą soli na gładki krem.", "Przygotuj bazę. Wymieszaj: płatki, jogurt, mleko, chia, wanilię, połowę karmelu daktylowego. Odstaw do lodówki na noc.", "Podanie. Na wierzchu ułóż: plasterki banana, pozostały karmel, posiekane pekany, startą gorzką czekoladę."]),
    R("b36","Overnight Oats Lemon Cheesecake z Borówkami","Amerykańska",["breakfast"],"Nabiał",10,68,"freeze",
      "",
      ["100 g Płatki owsiane górskie", "200 g Jogurt grecki 2%", "120 g Twaróg półtłusty (zblendowany)", "180 ml Mleko 2%", "20 g Nasiona chia", "15 g Miód", "Skórka z 1 cytryny", "Sok z ½ cytryny", "1 łyżeczka Ekstrakt waniliowy", "150 g Borówki", "20 g Płatki migdałów", "Odrobina startej skórki z cytryny"],
      ["Przygotuj bazę. Połącz: płatki, jogurt, zblendowany twaróg, mleko, chia, miód, wanilię, skórkę i sok z cytryny. Dokładnie wymieszaj.", "Schładzanie. Odstaw do lodówki na minimum 6 godzin, najlepiej na całą noc.", "Podanie. Na wierzch dodaj: borówki, podprażone płatki migdałów, odrobinę świeżej skórki z cytryny."]),
    R("b37","Kanapki z Pastą z Wędzonej Makreli, Chrzanem i Ogórkiem Kiszonym","Polska",["breakfast"],"Ryby i owoce morza",10,57,"fresh",
      "",
      ["180 g Wędzona makrela (obrana ze skóry i ości)", "80 g Jogurt grecki 2%", "100 g Ogórki kiszone", "80 g Rzodkiewki", "15 g Szczypiorek", "10 g Koperek", "15 g Chrzan tarty", "5 g Musztarda Dijon", "Sok z ¼ cytryny", "Świeżo mielony pieprz", "4 kromki Chleb na zakwasie (ok. 140 g)"],
      ["Przygotuj pastę. Rozdrobnij makrelę widelcem. Dodaj: jogurt grecki, chrzan, Dijon, sok z cytryny, pieprz. Na końcu wmieszaj: drobno pokrojone ogórki kiszone, szczypiorek, koperek. Nie blenduj – pasta powinna zachować strukturę.", "Pieczywo. Chleb podpiecz w tosterze lub na suchej patelni.", "Podanie. Na ciepłym pieczywie rozłóż pastę. Posyp plasterkami rzodkiewki i dodatkowym koperkiem."]),
    R("b38","Breakfast Club Sandwich z Pieczonym Indykiem, Jajkiem i Sosem Dijon","Amerykańska",["breakfast"],"Jajka",10,102,"fresh",
      "",
      ["6 kromek Chleb na zakwasie (ok. 210 g)", "180 g Pieczona pierś z indyka (masa po obróbce)", "2 szt. Jajka L", "4 cienkie plastry Boczek wędzony (ok. 40 g; uwzględniony w makro wersji podstawowej)", "180 g Pomidor malinowy", "4 liście Sałata rzymska (ok. 60 g)", "80 g Ogórek", "100 g Jogurt grecki 2%", "15 g Musztarda Dijon", "5 g Miód", "Sok z ¼ cytryny", "Pieprz"],
      ["Sos. Wymieszaj: jogurt, Dijon, miód, sok z cytryny, pieprz.", "Boczek. Usmaż na chrupko. Odsącz na ręczniku papierowym. W wariancie bez boczku pomiń ten krok.", "Jajka. Usmaż jajka sadzone. Żółtko powinno pozostać lekko płynne.", "Pieczywo. Podpiecz wszystkie kromki.", "Składanie. Warstwa 1 chleb, sos, sałata, indyk, pomidor. Warstwa 2 kromka chleba, sos, jajko, boczek, ogórek. Przykryj trzecią kromką. Przekrój po skosie i zabezpiecz wykałaczką."]),
    R("b39","New York Breakfast Bagel z Pieczonym Indykiem, Awokado i Piklowaną Cebulą","Amerykańska",["breakfast"],"Tofu/roślinne",10,84,"fresh",
      "",
      ["2 szt. Bajgle pełnoziarniste (ok. 95 g każdy)", "180 g Pieczona pierś z indyka (masa po obróbce)", "80 g Serek śmietankowy light", "1 szt. Awokado (ok. 150 g)", "150 g Pomidor malinowy", "30 g Rukola", "1 szt. Czerwona cebula (ok. 100 g)", "50 ml Ocet jabłkowy", "50 ml Woda", "1 łyżeczka Cukier", "½ łyżeczki Sól", "10 g Szczypiorek", "Pieprz", "Sok z ¼ cytryny"],
      ["Piklowana cebula. Połącz ocet, wodę, cukier i sól. Dodaj cienko pokrojoną cebulę. Odstaw na minimum 30 minut (najlepiej przygotować dzień wcześniej). Przed użyciem dokładnie odsącz cebulę; zalewa nie jest częścią porcji ani makro.", "Bajgiel. Przekrój i opiecz od środka.", "Serek. Wymieszaj serek ze szczypiorkiem i pieprzem.", "Składanie. Posmaruj obie połówki serkiem. Dodaj: rukolę, pomidora, indyka, awokado, piklowaną cebulę. Skrop odrobiną soku z cytryny i zamknij bajgla."]),
    R("b40","Breakfast Kimchi Fried Rice z Indykiem, Jajkiem i Gochujang","Koreańska",["breakfast"],"Jajka",10,81,"fresh",
      "",
      ["180 g Pieczona pierś z indyka (masa po obróbce)", "2 szt. Jajka L", "300 g Ryż jaśminowy ugotowany (najlepiej z poprzedniego dnia)", "180 g Kimchi", "30 g Dymka", "20 g Gochujang", "15 ml Sos sojowy", "10 ml Olej sezamowy", "10 g Sezam", "Nori pokruszone – opcjonalnie"],
      ["Przygotuj składniki. Pokrój kimchi na mniejsze kawałki. Pokrój indyka w kostkę.", "Smażenie. Na dużej patelni podsmaż kimchi przez 2–3 minuty. Dodaj indyka. Dodaj ryż. Na końcu wmieszaj: gochujang, sos sojowy, olej sezamowy. Smaż jeszcze 3–4 minuty, aż ryż będzie gorący i lekko chrupiący.", "Jajka. Usmaż dwa jajka sadzone. Żółtko powinno pozostać płynne.", "Podanie. Na ryżu ułóż jajko. Posyp: sezamem, dymką, pokruszonym nori."]),
    R("b41","Fit Pancakes z Jogurtu Greckiego, Borówek i Cytryny","Europejska",["breakfast"],"Jajka",10,67,"freeze",
      "",
      ["250 g Jogurt grecki 2%", "2 szt. Jajka L", "100 g Mąka owsiana", "8 g Proszek do pieczenia", "Skórka z 1 cytryny", "1 łyżeczka Ekstrakt waniliowy", "Szczypta soli", "150 g Skyr naturalny", "150 g Borówki", "15 g Miód", "Mięta (opcjonalnie)"],
      ["Przygotuj ciasto. W misce wymieszaj: jogurt grecki, jajka, wanilię, skórkę z cytryny. Dodaj: mąkę owsianą, proszek do pieczenia, szczyptę soli. Wymieszaj tylko do połączenia składników. Odstaw na 5 minut, aby mąka owsiana wchłonęła wilgoć.", "Smażenie. Rozgrzej patelnię z nieprzywierającą powłoką. Smaż na dobrze rozgrzanej patelni z nieprzywierającą powłoką. Nakładaj około 2 łyżki ciasta na jednego pancakesa. Smaż 2–3 minuty z każdej strony na średnim ogniu.", "Podanie. Podawaj z: skyrem, borówkami, cienką strużką miodu, opcjonalnie listkami mięty i odrobiną skórki z cytryny."]),
    R("b42","Avocado Toast z Fetą, Jajkiem i Chrupiącą Ciecierzycą","Europejska",["breakfast"],"Jajka",10,69,"fresh",
      "",
      ["4 kromki Chleb na zakwasie (ok. 160 g)", "4 szt. Jajka L", "70 g Feta", "1½ szt. Dojrzałe awokado (ok. 200 g)", "150 g Pomidorki koktajlowe", "120 g Ciecierzyca ugotowana lub z puszki (odsączona)", "5 g Oliwa", "1 łyżeczka Wędzona papryka", "½ łyżeczki Kumin", "Sok z ½ cytryny", "Płatki chili (opcjonalnie)", "Pieprz", "Mikroliście lub kiełki"],
      ["Ciecierzyca. Wymieszaj ciecierzycę z oliwą, papryką i kuminem. Piecz 20 minut w 200°C lub przygotuj w air fryerze przez 12–15 minut, aż będzie chrupiąca.", "Jajka. Usmaż jajka sadzone lub ugotuj je na miękko (6½ minuty).", "Awokado. Rozgnieć z sokiem z cytryny i pieprzem. Nie dodawaj dużo soli – feta jest już słona.", "Złożenie. Podpiecz chleb. Posmaruj awokado. Dodaj: fetę, jajko, pomidorki, chrupiącą ciecierzycę, kiełki. Na koniec posyp płatkami chili."]),
    R("b43","Tosty z Halloumi, Pieczarkami i Hummusem","Bliski Wschód",["breakfast"],"Tofu/roślinne",10,64,"fresh",
      "",
      ["4 kromki Chleb na zakwasie (ok. 160 g)", "150 g Halloumi klasyczne", "100 g Hummus", "300 g Pieczarki", "1 szt. Szalotka (ok. 40 g)", "15 g Natka pietruszki", "5 g Oliwa", "1 łyżeczka Tymianek świeży", "Pieprz", "Sok z ¼ cytryny"],
      ["Pieczarki. Pokrój pieczarki w grube plastry. Na rozgrzanej patelni z oliwą podsmaż szalotkę, następnie dodaj pieczarki i tymianek. Smaż na dużym ogniu przez 6–8 minut, aż odparują i się zarumienią.", "Halloumi. Pokrój ser w plastry o grubości około 1 cm. Grilluj lub smaż na suchej patelni po 2 minuty z każdej strony.", "Pieczywo. Podpiecz kromki chleba. Posmaruj je grubą warstwą hummusu.", "Podanie. Na hummusie ułóż: grillowane halloumi, pieczarki, natkę pietruszki. Na koniec skrop sokiem z cytryny i dopraw świeżo mielonym pieprzem."]),
    R("b44","Śródziemnomorska Miska Śniadaniowa z Kurczakiem, Hummusem i Jajkiem","Bliski Wschód",["breakfast"],"Jajka",10,85,"fresh",
      "",
      ["180 g Pieczona pierś z kurczaka (masa po obróbce)", "2 szt. Jajka L", "120 g Hummus", "200 g Pomidory koktajlowe", "150 g Ogórek", "120 g Papryka czerwona", "40 g Czerwona cebula", "40 g Oliwki Kalamata", "15 g Natka pietruszki", "Sok z ½ cytryny", "1 łyżeczka Za'atar", "5 g Oliwa extra virgin"],
      ["Jajka. Ugotuj przez 6½ minuty. Schłódź i przekrój na pół.", "Warzywa. Pokrój: pomidory, ogórka, paprykę, cebulę.", "Miska. Na dnie rozsmaruj hummus. Dodaj warzywa. Następnie: kurczaka, jajko, oliwki. Posyp natką i za'atarem. Na koniec skrop oliwą i sokiem z cytryny."]),
    R("b45","Zielony Omlet z Ricottą, Ziołami i Pieczonymi Pomidorkami","Europejska",["breakfast"],"Jajka",10,62,"fresh",
      "",
      ["5 szt. Jajka L", "120 g Ricotta", "20 g Parmezan, drobno starty", "200 g Pomidorki koktajlowe", "60 g Szpinak baby", "10 g Bazylia", "15 g Szczypiorek", "10 g Natka pietruszki", "5 g Oliwa extra virgin", "Skórka z ½ cytryny", "Pieprz", "Szczypta soli"],
      ["Pomidorki. Skrop pomidorki oliwą, dopraw pieprzem i szczyptą soli, a następnie piecz przez 10 minut w 200°C lub podsmaż na patelni do lekkiego zrumienienia.", "Masa jajeczna. Roztrzep jajka z parmezanem. Dodaj drobno posiekane: bazylię, szczypiorek, natkę. Na końcu wmieszaj szpinak.", "Omlet. Wlej masę na dobrze rozgrzaną patelnię. Smaż na małym ogniu przez 4–5 minut. Gdy omlet będzie prawie ścięty, wyłóż ricottę małymi porcjami. Złóż omlet na pół i pozostaw jeszcze na minutę.", "Podanie. Podawaj z pieczonymi pomidorkami. Na koniec dodaj odrobinę skórki z cytryny i kilka listków świeżej bazylii."]),
    R("b46","Croque Madame","Francuska",["breakfast"],"Jajka",10,114,"fresh",
      "",
      ["4 kromki Chleb na zakwasie (ok. 160 g)", "180 g Pieczona pierś z indyka (masa po obróbce)", "2 szt. Jajka L", "60 g, starty Gruyère", "10 g Masło", "10 g Mąka pszenna", "200 ml Mleko 2%", "80 g Skyr naturalny", "Gałka muszkatołowa – szczypta", "Pieprz"],
      ["Beszamel. Rozpuść masło. Dodaj mąkę i mieszaj przez minutę. Stopniowo wlewaj mleko, mieszając trzepaczką. Po zgęstnieniu zdejmij z ognia i wmieszaj skyr. Dopraw pieprzem i gałką muszkatołową.", "Kanapki. Na dwóch kromkach ułóż: pieczonego indyka, połowę sera. Przykryj pozostałymi kromkami. Na wierzchu rozprowadź beszamel i posyp resztą sera.", "Zapiekanie. Piecz przez 8–10 minut w 200°C, a następnie włącz grill na 2 minuty, aby ser się zarumienił.", "Jajka. Usmaż jajka sadzone z płynnym żółtkiem. Połóż po jednym na każdej kanapce."]),
    R("b47","Carrot Cake Baked Oats z Twarogiem i Kremem Waniliowym","Amerykańska",["breakfast"],"Jajka",10,90,"freeze",
      "",
      ["125 g Płatki owsiane górskie", "160 g Twaróg półtłusty", "150 g Skyr naturalny", "1 szt. Jajko L", "120 g, drobno starta Marchew", "20 g Miód", "1 łyżeczka Proszek do pieczenia", "1½ łyżeczki Cynamon", "¼ łyżeczki Imbir mielony", "Wanilia i szczypta soli", "150 g Skyr naturalny", "10 g Orzechy włoskie", "Skórka z ½ pomarańczy lub cytryny", "Kilka kropli wanilii"],
      ["Baza. Zblenduj płatki, twaróg, 150 g skyru, jajko, miód, proszek do pieczenia, wanilię, przyprawy i sól.", "Marchew. Wmieszaj drobno startą marchew. Przełóż masę do niewielkiego naczynia wyłożonego papierem.", "Pieczenie. Piecz 22–25 minut w 190°C, aż środek się zetnie, ale pozostanie wilgotny. Odstaw na 10 minut.", "Krem. Pozostały skyr wymieszaj z wanilią i skórką cytrusową. Podziel baked oats 60/40, dodaj krem i orzechy."]),
    R("b48","Japoński Breakfast Rice Bowl z Krewetkami, Jajkiem i Edamame","Japońska",["breakfast"],"Jajka",10,100,"fresh",
      "",
      ["190 g Krewetki obrane", "2 szt. Jajka L", "100 g Ryż jaśminowy lub do sushi (suchy)", "100 g Edamame", "30 g Awokado", "200 g Ogórek", "80 g Rzodkiewka", "180 g Skyr naturalny", "15 ml Sos sojowy", "5–8 g Wasabi", "15 ml Ocet ryżowy", "½ szt. Limonka", "1 arkusz Nori", "5 g Sezam"],
      ["Ryż. Ugotuj ryż. Po ugotowaniu dopraw go octem ryżowym i odrobiną soli.", "Sos. Wymieszaj skyr z wasabi, limonką i kilkoma kroplami sosu sojowego.", "Krewetki i jajka. Krewetki osusz i smaż 3–4 minuty z pozostałym sosem sojowym. Jajka ugotuj na półtwardo lub usmaż.", "Złożenie. Do misek włóż odważony ryż, edamame, warzywa, krewetki, jajko i awokado. Dodaj sos, nori oraz sezam."]),
    R("l01","Chicken Shawarma Rice Bowl z Hummusem i Sosem Czosnkowym","Bliski Wschód",["lunch"],"Drób",30,93,"freeze",
      "",
      ["220 g Pierś z kurczaka (masa surowa)", "10 g Oliwa", "2 łyżeczki Kumin", "1 łyżeczka Kolendra mielona", "1 łyżeczka Papryka wędzona", "¼ łyżeczki Cynamon", "2 ząbki Czosnek", "Sok z ½ cytryny", "190 g Ryż basmati (suchy)", "80 g Hummus", "300 g Pomidor, ogórek i czerwona cebula", "150 g Skyr", "Sok z ½ cytryny", "1 mały ząbek Czosnek", "Natka pietruszki lub mięta"],
      ["Kurczak. Wymieszaj mięso z oliwą, cytryną, czosnkiem i przyprawami. Odstaw na 15 minut, a następnie smaż na mocno rozgrzanej patelni 7–9 minut.", "Ryż. Ugotuj ryż sypko i odstaw pod przykryciem na 5 minut.", "Sos. Połącz skyr z cytryną, czosnkiem i ziołami; dopraw solą i pieprzem.", "Złożenie. Do misek włóż ryż, warzywa, hummus i kurczaka. Polej sosem dopiero przed jedzeniem."]),
    R("l02","Korean Gochujang Chicken z Ryżem i Ogórkiem","Koreańska",["lunch"],"Ryby i owoce morza",30,97,"freeze",
      "",
      ["330 g Udka z kurczaka bez skóry i kości", "35 g Gochujang", "25 ml Sos sojowy", "20 g Miód", "5 g Olej sezamowy", "2 ząbki Czosnek", "15 g Imbir", "185 g Ryż jaśminowy (suchy)", "120 g Edamame", "220 g Ogórek", "80 g Marchew", "25 ml Ocet ryżowy", "Szczypta soli i cukru", "8 g Sezam"],
      ["Pikle. Ogórek pokrój cienko, wymieszaj z octem, solą i szczyptą cukru; odstaw na czas gotowania.", "Ryż. Ugotuj ryż. Edamame dodaj do garnka na ostatnie 3 minuty lub ugotuj osobno.", "Kurczak. Smaż kurczaka 8–10 minut, aż mocno się zrumieni. Dodaj gochujang, sos sojowy, miód, imbir i czosnek; redukuj 2 minuty do lepkiej glazury.", "Podanie. Podaj z ryżem, edamame, ogórkiem i sezamem."]),
    R("l03","Greckie Klopsiki z Indyka, Cytrynowymi Ziemniakami i Tzatziki","Grecka",["lunch"],"Drób",30,97,"freeze",
      "",
      ["240 g Mielony indyk 5%", "50 g Feta", "60 g Cebula", "2 ząbki Czosnek", "2 łyżeczki Oregano", "Natka pietruszki – garść", "750 g Ziemniaki", "10 g Oliwa", "Sok z 1 cytryny", "Oregano i sól", "180 g Jogurt grecki 2%", "180 g Ogórek", "150 g Pomidor", "Koperek, czosnek, cytryna"],
      ["Pieczenie. Ziemniaki pokrój w łódeczki, wymieszaj z oliwą, cytryną i oregano. Piecz 20 minut w 210°C.", "Klopsiki. Połącz składniki, uformuj 10–12 klopsików. Dodaj na blachę i piecz dalsze 16–18 minut.", "Tzatziki. Ogórek zetrzyj i mocno odciśnij. Wymieszaj z jogurtem, czosnkiem, koperkiem i cytryną.", "Podanie. Podziel ziemniaki i klopsiki, dodaj pomidora i tzatziki."]),
    R("l04","Pad Krapow z Indykiem, Ryżem i Jajkiem","Tajska",["lunch"],"Ryby i owoce morza",30,93,"fresh",
      "",
      ["270 g Mielony indyk 5%", "100 g Cebula", "180 g Papryka", "3 ząbki Czosnek", "Chili – do smaku", "25 ml Sos sojowy", "10 ml Sos rybny", "10 g Olej", "Bazylia – duża garść", "170 g Ryż jaśminowy (suchy)", "2 szt. Jajka L (ok. 120 g)", "150 g Ogórek", "1 szt. Limonka"],
      ["Ryż. Ugotuj ryż jaśminowy i pozostaw pod przykryciem.", "Stir-fry. Na bardzo gorącej patelni smaż czosnek i chili 20 sekund, dodaj indyka i rozbijaj łopatką. Po zrumienieniu dodaj cebulę, paprykę oraz sosy.", "Bazylia. Zdejmij patelnię z ognia i wmieszaj dużą garść bazylii.", "Jajka. Usmaż jajka z chrupiącym brzegiem i płynnym żółtkiem. Podaj z ogórkiem i limonką."]),
    R("l05","Light Chicken Tikka Masala z Basmati","Indyjska",["lunch"],"Drób",30,109,"freeze",
      "",
      ["300 g Pierś z kurczaka", "150 g Jogurt grecki 2%", "2 łyżeczki Garam masala", "1 łyżeczka Kurkuma", "Czosnek i imbir – po 15 g", "400 g Passata", "200 ml Lekkie mleko kokosowe", "150 g Cebula", "10 g Oliwa", "Kumin, kolendra, chili", "185 g Ryż basmati (suchy)", "Kolendra i limonka"],
      ["Marynata. Kurczaka wymieszaj z połową jogurtu i przyprawami. Odstaw minimum 20 minut.", "Obsmażanie. Kurczaka krótko zrumień partiami i odłóż.", "Sos. Na tej samej patelni zeszklij cebulę, dodaj przyprawy, passatę i mleko kokosowe. Gotuj 12 minut.", "Wykończenie. Włóż kurczaka do sosu na 5 minut. Po zdjęciu z ognia wmieszaj pozostały jogurt. Podaj z ryżem i kolendrą."]),
    R("l06","Turkey Chili z Czarną Fasolą i Kukurydzą","Amerykańska",["lunch"],"Drób",30,107,"freeze",
      "",
      ["240 g Mielony indyk 5%", "250 g po odsączeniu Czarna fasola", "100 g Kukurydza", "450 g Passata", "250 g Cebula i papryka", "8 g Oliwa", "Kumin, papryka wędzona, oregano, chipotle", "50 g Ryż (suchy)", "20 g Cheddar", "100 g Skyr", "Limonka i kolendra"],
      ["Baza. Na oliwie zeszklij cebulę i paprykę. Dodaj indyka i mocno zrumień.", "Przyprawy. Dodaj kumin, paprykę, oregano i chipotle; smaż 30 sekund.", "Gotowanie. Wlej passatę, dodaj fasolę i kukurydzę. Gotuj bez przykrycia 20–25 minut.", "Podanie. Podaj z małą porcją ryżu, cheddarem, skyrem, limonką i kolendrą."]),
    R("l07","Chicken Teriyaki z Brokułem i Edamame","Japońska",["lunch"],"Ryby i owoce morza",30,107,"freeze",
      "",
      ["290 g Pierś z kurczaka", "35 ml Sos sojowy", "15 g Miód", "20 ml Mirin", "15 g Imbir", "2 ząbki Czosnek", "8 g Olej", "170 g Ryż (suchy)", "300 g Brokuł", "150 g Edamame", "8 g Sezam"],
      ["Ryż i warzywa. Ugotuj ryż. Brokuł i edamame ugotuj krótko na parze, aby pozostały jędrne.", "Kurczak. Pokrój kurczaka w duże kawałki i smaż na oleju do zrumienienia.", "Glazura. Wlej sos sojowy, mirin, miód, imbir i czosnek. Redukuj 2–3 minuty, obracając mięso.", "Podanie. Podaj z ryżem, warzywami i sezamem."]),
    R("l08","Tureckie Köfte z Indyka, Bulgurem, Ezme i Cacikiem","Turecka",["lunch"],"Drób",30,96,"freeze",
      "",
      ["260 g Mielony indyk 5%", "60 g Cebula", "2 ząbki Czosnek", "Kumin, kolendra, pul biber", "20 g Natka pietruszki", "150 g Bulgur (suchy)", "80 g Passata", "60 g Cebula", "5 g Oliwa", "Papryka słodka i pul biber", "400 g Pomidor, papryka, ogórek i cebula", "200 g Jogurt grecki 2%", "5 g Oliwa", "Cytryna, mięta, sumak"],
      ["Köfte. Wymieszaj mięso z cebulą, czosnkiem, ziołami i przyprawami. Uformuj podłużne kotleciki i piecz 14–16 minut w 220°C lub usmaż na patelni grillowej.", "Bulgur. Zeszklij cebulę na połowie oliwy, dodaj passatę i przyprawy. Wsyp bulgur, zalej wodą w proporcji około 1:2 i gotuj do miękkości.", "Ezme. Bardzo drobno posiekaj pomidor, paprykę, część cebuli i ogórka. Dopraw cytryną, pul biberem, sumakiem i pozostałą oliwą.", "Cacık. Jogurt wymieszaj z tartym ogórkiem, czosnkiem i miętą. Podawaj wszystko w osobnych sekcjach miski."]),
    R("l09","Peruwiański Kurczak z Ají Amarillo, Batatem i Salsą Kukurydzianą","Peruwiańska",["lunch"],"Drób",30,98,"freeze",
      "",
      ["250 g Pierś z kurczaka", "30 g Pasta ají amarillo", "150 g Skyr", "2 ząbki Czosnek", "1 szt. Limonka", "775 g Bataty", "10 g Oliwa", "150 g Kukurydza", "100 g Awokado", "180 g Pomidor i cebula", "Kolendra"],
      ["Bataty. Pokrój w kostkę, wymieszaj z oliwą i solą. Piecz 25–30 minut w 210°C.", "Kurczak. Zrumień kurczaka. Dodaj pastę ají amarillo, czosnek i odrobinę wody; duś 4 minuty.", "Sos. Po zdjęciu z ognia wmieszaj połowę skyru i sok z limonki.", "Salsa. Połącz kukurydzę, pomidor, cebulę i kolendrę. Podaj z awokado i pozostałym skyrem."]),
    R("l10","Chicken Pesto Orzo ze Szpinakiem i Pomidorkami","Europejska",["lunch"],"Drób",30,99,"fresh",
      "",
      ["220 g Pierś z kurczaka", "160 g Orzo (suche)", "45 g Pesto bazyliowe", "30 g Parmezan", "100 g Jogurt grecki 2%", "300 g Szpinak i pomidorki", "2 ząbki; cytryna – ½ szt. Czosnek", "Bulion – ok. 450 ml"],
      ["Kurczak. Pokrój kurczaka, dopraw i zrumień w szerokim garnku. Odłóż.", "Orzo. Do garnka dodaj czosnek i orzo. Wlewaj bulion partiami, gotując jak szybkie risotto przez 9–10 minut.", "Warzywa. Dodaj szpinak, pomidorki i kurczaka; gotuj 2 minuty.", "Wykończenie. Zdejmij z ognia. Wmieszaj pesto, jogurt i parmezan. Dopraw cytryną i pieprzem."]),
    R("l11","Vietnamese Lemongrass Chicken Noodle Bowl","Wietnamska",["lunch"],"Ryby i owoce morza",30,89,"freeze",
      "",
      ["350 g Udka z kurczaka bez skóry i kości", "2 łodygi Trawa cytrynowa", "2 ząbki Czosnek", "20 ml Sos rybny", "15 g Miód", "3 g Olej", "185 g Makaron ryżowy (suchy)", "300 g Marchew, ogórek i kapusta", "20 g Orzeszki ziemne", "Mięta, kolendra, bazylia", "Sok z 1 limonki", "15 ml Sos rybny", "30 ml Woda", "Chili i czosnek"],
      ["Marynata. Drobno posiekaj trawę cytrynową i wymieszaj z czosnkiem, sosem rybnym, miodem i olejem. Dodaj kurczaka na 20 minut.", "Kurczak. Smaż na mocnym ogniu do zrumienienia.", "Makaron. Zalej lub ugotuj zgodnie z instrukcją, zahartuj zimną wodą.", "Złożenie. Połącz makaron z warzywami i ziołami. Dodaj kurczaka, dressing i orzeszki."]),
    R("l12","Filipińskie Adobo z Kurczaka, Ryżem i Fasolką","Filipińska",["lunch"],"Drób",30,103,"freeze",
      "",
      ["370 g Udka z kurczaka bez skóry i kości", "45 ml Sos sojowy", "45 ml Ocet ryżowy lub trzcinowy", "15 g Miód", "5 ząbków Czosnek", "3 szt. Liść laurowy", "1 łyżeczka Czarny pieprz", "5 g Olej", "185 g Ryż jaśminowy (suchy)", "2 szt. Jajka L (120 g)", "250 g Fasolka szparagowa"],
      ["Obsmażanie. Kurczaka lekko zrumień na oleju.", "Duszenie. Dodaj sos sojowy, ocet, miód, czosnek, liść laurowy i 150 ml wody. Duś bez przykrycia 20–25 minut.", "Redukcja. Wyjmij mięso, zredukuj sos do lekkiej glazury i ponownie obtocz kurczaka.", "Podanie. Podaj z ryżem, ugotowanym jajkiem i fasolką."]),
    R("l13","Miso Salmon Rice Bowl z Brokułem i Edamame","Japońska",["lunch"],"Ryby i owoce morza",30,91,"freeze",
      "",
      ["250 g Filet z łososia", "25 g Miso", "15 ml Sos sojowy", "10 g Miód", "5 g Olej sezamowy", "10 g Imbir", "125 g Ryż (suchy)", "150 g Edamame", "250 g Brokuł", "150 g Ogórek", "8 g; limonka – ½ szt. lub ocet ryżowy – 15 ml Sezam"],
      ["Glazura. Wymieszaj miso, sos sojowy, miód, olej i imbir.", "Łosoś. Posmaruj łososia glazurą i piecz 10–13 minut w 210°C; na koniec użyj grilla przez minutę.", "Baza. Ugotuj ryż. Brokuł i edamame ugotuj krótko na parze.", "Podanie. Złóż bowl z ogórkiem i sezamem. Dodaj limonkę lub ocet ryżowy."]),
    R("l14","Łosoś Puttanesca z Ziemniakami i Fasolką","Europejska",["lunch"],"Ryby i owoce morza",30,92,"freeze",
      "",
      ["330 g Filet z łososia", "400 g Passata lub pomidory", "50 g Oliwki", "25 g Kapary", "5 g Oliwa", "3 ząbki Czosnek", "Chili, oregano i skórka z cytryny", "725 g Ziemniaki", "200 g Fasolka szparagowa", "Natka pietruszki i cytryna"],
      ["Ziemniaki. Pokrój w mniejsze kawałki i ugotuj lub upiecz do miękkości. Fasolkę ugotuj al dente.", "Sos. Na oliwie krótko podsmaż czosnek i chili. Dodaj passatę, oliwki, kapary oraz oregano; redukuj 10–12 minut.", "Łosoś. Włóż porcje łososia do gęstego sosu i piecz 9–12 minut w 200°C, zależnie od grubości filetu.", "Podanie. Dodaj natkę, skórkę i sok z cytryny. Podaj z ziemniakami i fasolką."]),
    R("l15","Krewetki w Zielonym Curry z Warzywami i Ryżem","Tajska",["lunch"],"Ryby i owoce morza",30,92,"fresh",
      "",
      ["340 g Krewetki obrane", "250 ml Lekkie mleko kokosowe", "35 g Pasta zielonego curry", "350 g Papryka, fasolka i cukinia", "5 g Olej", "15 ml Sos rybny", "1 szt. Limonka", "Bazylia i kolendra", "205 g Ryż jaśminowy (suchy)"],
      ["Baza curry. Na oleju podsmaż pastę curry przez 30 sekund. Wlej część mleka kokosowego i zagotuj.", "Warzywa. Dodaj warzywa i resztę mleka. Gotuj 6–8 minut.", "Krewetki. Dodaj osuszone krewetki na ostatnie 3–4 minuty. Dopraw sosem rybnym i limonką.", "Podanie. Podaj z ryżem, dużą ilością bazylii i kolendry."]),
    R("l16","Ponzu Salmon Poke Bowl z Awokado, Edamame i Ogórkiem","Japońska",["lunch"],"Ryby i owoce morza",30,87,"freeze",
      "",
      ["270 g Filet z łososia", "20 ml Sos sojowy", "20 ml Sok z limonki", "15 ml Ocet ryżowy", "10 g Imbir", "160 g Ryż sushi (suchy)", "120 g Edamame", "80 g Awokado", "250 g Ogórek i rzodkiewka", "30 g Piklowany imbir", "10 g Sezam", "1 arkusz Nori"],
      ["Ryż. Ugotuj ryż, a następnie dopraw niewielką ilością octu ryżowego i całkowicie ostudź.", "Łosoś. Wymieszaj sos sojowy, limonkę, ocet i imbir. Połową posmaruj łososia i piecz 10–12 minut w 200°C. Ostudź i podziel na kawałki.", "Warzywa. Ogórek i rzodkiewkę pokrój cienko. Awokado skrop limonką.", "Złożenie. Na ryżu ułóż łososia, edamame, awokado, warzywa i imbir. Dodaj nori, sezam oraz pozostały ponzu."]),
    R("l17","Fish Tacos z Dorszem, Coleslawem i Awokado","Meksykańska",["lunch"],"Ryby i owoce morza",30,97,"fresh",
      "",
      ["260 g Filet z dorsza", "10 g Oliwa", "Kumin, papryka wędzona, chili, czosnek", "310 g Tortille kukurydziane (ok. 6 szt.)", "100 g Awokado", "250 g Kapusta i marchew", "150 g Mango", "180 g Skyr", "1 szt. Limonka", "Kolendra i jalapeño"],
      ["Ryba. Dorsza osusz, pokrój i dopraw. Piecz 10–12 minut w 210°C lub smaż krótko na patelni.", "Slaw. Kapustę i marchew wymieszaj z limonką, solą i częścią sosu.", "Tortille. Podgrzej na suchej patelni po 20–30 sekund z każdej strony.", "Złożenie. Dodaj dorsza, slaw, mango, awokado, sos i kolendrę."]),
    R("l18","Tuna Steak Niçoise Bowl","Francuska",["lunch"],"Ryby i owoce morza",30,109,"fresh",
      "",
      ["240 g Stek z tuńczyka", "2 szt. Jajka L (120 g)", "675 g Ziemniaki", "250 g Fasolka szparagowa", "250 g Pomidory", "50 g Oliwki", "15 g Oliwa", "15 g Musztarda Dijon", "1 szt. Cytryna", "15 g Kapary"],
      ["Warzywa. Ugotuj ziemniaki i fasolkę. Jajka gotuj 7 minut.", "Dressing. Wymieszaj oliwę, Dijon, cytrynę, kapary i pieprz.", "Tuńczyk. Osusz, dopraw i smaż na bardzo gorącej patelni 60–90 sekund z każdej strony.", "Podanie. Pokrój tuńczyka i ułóż na ciepłych ziemniakach z warzywami oraz dressingiem."]),
    R("l19","Lekkie Risotto z Krewetkami, Cukinią i Groszkiem","Europejska",["lunch"],"Ryby i owoce morza",30,92,"fresh",
      "",
      ["250 g Krewetki", "185 g Ryż arborio", "300 g Cukinia", "150 g Groszek", "45 g Parmezan", "15 g Masło", "80 g Cebula", "700 ml Bulion", "80 ml Białe wino", "1 szt. Cytryna"],
      ["Krewetki. Krewetki osusz, krótko obsmaż po 60–90 sekund i odłóż.", "Ryż. Na części masła zeszklij cebulę, wsyp ryż i tostuj minutę. Wlej wino.", "Gotowanie. Dodawaj gorący bulion partiami, mieszając. Po 10 minutach dodaj cukinię i groszek.", "Mantecatura. Po około 17 minutach zdejmij z ognia, dodaj krewetki, resztę masła, parmezan, skórkę i sok z cytryny."]),
    R("l20","Śródziemnomorski Łosoś z Kuskusem, Fetą i Warzywami","Grecka",["lunch"],"Ryby i owoce morza",30,106,"fresh",
      "",
      ["300 g Łosoś", "350 g Cukinia, papryka i pomidorki", "10 g Oliwa", "Oregano, czosnek, cytryna", "165 g Kuskus (suchy)", "60 g Feta", "100 g Skyr", "Natka i mięta"],
      ["Warzywa. Warzywa wymieszaj z oliwą, oregano i czosnkiem. Piecz 12 minut w 210°C.", "Łosoś. Dodaj łososia, dopraw cytryną i piecz kolejne 10–12 minut.", "Kuskus. Zalej kuskus wrzątkiem lub bulionem, odstaw 5 minut i spulchnij.", "Podanie. Połącz kuskus z ziołami, dodaj warzywa, łososia, fetę i cytrynowy skyr."]),
    R("l21","Tajskie Kotleciki Krewetkowe z Sałatką z Makaronu Ryżowego","Tajska",["lunch"],"Ryby i owoce morza",30,104,"freeze",
      "",
      ["390 g Krewetki", "1 szt. Jajko L (60 g)", "25 g Czerwona pasta curry", "80 g Fasolka szparagowa", "20 g Mąka ryżowa lub skrobia", "10 g Olej", "Limonka i kolendra", "150 g Makaron ryżowy (suchy)", "300 g Ogórek, marchew i kapusta", "20 g Orzeszki ziemne", "10 g Sos rybny, limonka i chili; miód"],
      ["Masa. Połowę krewetek posiekaj bardzo drobno, a połowę grubo. Wymieszaj z jajkiem, pastą curry, fasolką, mąką, kolendrą i skórką z limonki.", "Kotleciki. Uformuj 8 małych kotlecików. Smaż na cienkiej warstwie oleju po 2–3 minuty z każdej strony albo piecz 12–14 minut w 220°C.", "Sałatka. Ugotuj makaron, przepłucz zimną wodą i połącz z cienko pokrojonymi warzywami.", "Dressing. Wymieszaj limonkę, sos rybny, chili i odrobinę miodu. Polej sałatkę przed podaniem i posyp orzeszkami."]),
    R("l22","Makaron z Tuńczykiem, Kaparami, Oliwkami i Pomidorami","Europejska",["lunch"],"Ryby i owoce morza",30,102,"fresh",
      "",
      ["190 g Makaron (suchy)", "230 g po odsączeniu Tuńczyk w sosie własnym", "350 g Passata lub pomidory", "50 g Oliwki", "25 g Kapary", "10 g Oliwa", "25 g Parmezan", "Czosnek, chili, natka, cytryna"],
      ["Sos. Na oliwie podsmaż czosnek i chili. Dodaj pomidory, kapary i oliwki; gotuj 10 minut.", "Makaron. Ugotuj al dente, zachowując filiżankę wody.", "Tuńczyk. Dodaj tuńczyka do sosu tylko na 2–3 minuty, aby go nie wysuszyć.", "Wykończenie. Wymieszaj z makaronem i odrobiną wody. Dodaj natkę, cytrynę i parmezan."]),
    R("l23","Dorsz z Ciecierzycą, Chorizo i Pomidorami","Hiszp./Portug.",["lunch"],"Ryby i owoce morza",30,109,"fresh",
      "",
      ["320 g Dorsz", "220 g po odsączeniu Ciecierzyca", "50 g Chorizo", "300 g Ziemniaki", "400 g Passata", "250 g Cebula i papryka", "5 g Oliwa", "½ szt. lub ocet sherry – 10 ml Papryka wędzona, czosnek i natka; cytryna"],
      ["Baza. Wytop chorizo na małym ogniu. Dodaj cebulę, paprykę i czosnek.", "Gulasz. Dodaj ziemniaki, passatę i 150 ml wody. Gotuj 15 minut, następnie dodaj ciecierzycę.", "Dorsz. Ułóż kawałki dorsza w sosie, przykryj i gotuj 7–9 minut.", "Podanie. Posyp natką i skrop cytryną lub octem sherry."]),
    R("l24","Jambalaya z Krewetkami, Kurczakiem i Warzywami","Amerykańska",["lunch"],"Ryby i owoce morza",30,96,"fresh",
      "",
      ["180 g Krewetki", "110 g Pierś z kurczaka", "40 g Chorizo", "200 g Ryż (suchy)", "300 g Papryka, seler i cebula", "250 g; bulion drobiowy – 300 ml Passata", "5 g Oliwa", "Przyprawa Cajun, czosnek, tymianek"],
      ["Obsmażanie. W garnku zrumień chorizo, następnie kurczaka. Odłóż mięso.", "Warzywa. Dodaj cebulę, paprykę i seler; smaż 5 minut. Wsyp przyprawy i ryż.", "Gotowanie. Wlej passatę i bulion. Gotuj pod przykryciem około 15 minut.", "Krewetki. Dodaj kurczaka i krewetki na ostatnie 4 minuty. Odstaw pod przykryciem na 5 minut."]),
    R("l25","Mexican Chicken Tinga Bowl z Czarną Fasolą i Limonkowym Skyrem","Meksykańska",["lunch"],"Drób",30,108,"freeze",
      "",
      ["270 g Pierś z kurczaka", "300 g Passata", "120 g Cebula", "20–30 g Chipotle w adobo", "8 g Oliwa", "Oregano, kumin, czosnek", "105 g Ryż (suchy)", "140 g po odsączeniu Czarna fasola", "80 g Kukurydza", "60 g Awokado", "300 g Kapusta, pomidor i cebula", "150 g Skyr", "Limonka i kolendra"],
      ["Tinga. Kurczaka ugotuj lub krótko obsmaż, a następnie porwij. Cebulę zeszklij na oliwie, dodaj czosnek, chipotle, passatę, oregano i kumin.", "Duszenie. Dodaj kurczaka i gotuj 10–12 minut, aż sos mocno oblepi mięso.", "Baza. Ugotuj ryż. Fasolę i kukurydzę przepłucz i podgrzej z odrobiną sosu tinga.", "Złożenie. Do misek włóż ryż, fasolę, tingę, warzywa i awokado. Skyr wymieszaj z limonką oraz kolendrą i dodaj po podgrzaniu."]),
    R("l26","Polędwiczka Wieprzowa z Sosem Dijon, Pieczarkami i Ziemniakami","Francuska",["lunch"],"Wieprzowina",30,113,"fresh",
      "",
      ["300 g Polędwiczka wieprzowa", "10 g Oliwa", "Tymianek, sól, pieprz", "300 g Pieczarki", "180 g Jogurt grecki 2%", "10 g Masło", "25 g Musztarda Dijon", "150 ml Bulion", "850 g Ziemniaki", "250 g Fasolka szparagowa"],
      ["Ziemniaki. Ugotuj lub upiecz ziemniaki; fasolkę ugotuj al dente.", "Mięso. Polędwiczkę pokrój w grube medaliony, zrumień i smaż do temperatury około 63–65°C. Odłóż na 5 minut.", "Sos. Na patelni zrumień pieczarki na maśle, dodaj Dijon i bulion. Zdejmij z ognia, wmieszaj jogurt.", "Podanie. Włóż mięso do sosu tylko na chwilę. Podaj z ziemniakami i fasolką."]),
    R("l27","Tropikalny Poke Bowl z Krewetkami, Mango, Ananasem i Piklowanymi Warzywami","Europejska",["lunch"],"Ryby i owoce morza",30,104,"freeze",
      "",
      ["330 g Krewetki", "Sok i skórka z 1 limonki", "20 ml; oliwa lub olej neutralny – 5 g Sos sojowy", "Sriracha lub chili", "160 g Ryż sushi (suchy)", "180 g Mango", "150 g Ananas", "350 g Ogórek, czerwona kapusta i rzodkiewka", "10 g Sezam", "1 arkusz Nori", "180 g Skyr", "Limonka, sriracha i odrobina sosu sojowego"],
      ["Ryż. Ugotuj ryż, lekko dopraw octem ryżowym i całkowicie ostudź.", "Krewetki. Wymieszaj z limonką, sosem sojowym i chili. Smaż 2–3 minuty lub użyj ugotowanych krewetek i tylko je zamarynuj.", "Pikle. Rzodkiewkę i część kapusty zalej na 15 minut octem ryżowym z odrobiną soli i cukru.", "Złożenie. Na ryżu ułóż mango, ananasa, warzywa i krewetki. Dodaj sos ze skyru, sezam i nori."]),
    R("l28","Malezyjski Ayam Masak Merah z Ryżem i Fasolką","Europejska",["lunch"],"Drób",30,101,"freeze",
      "",
      ["420 g Udka z kurczaka bez skóry i kości", "400 g Passata", "120 ml Lekkie mleko kokosowe", "150 g Cebula", "2 łodygi Trawa cytrynowa", "20 g Imbir", "3 ząbki Czosnek", "20 g Sambal oelek", "5 g Olej", "Anyż gwiazdkowy i cynamon", "135 g Ryż jaśminowy (suchy)", "200 g Zielona fasolka", "200 g Ogórek", "Limonka i kolendra"],
      ["Pasta. Cebulę, czosnek, imbir, sambal i miękką część trawy cytrynowej zblenduj z odrobiną wody.", "Kurczak. Udka mocno zrumień na minimalnej ilości oleju i odłóż.", "Sos. Pastę smaż 4–5 minut. Dodaj przyprawy, passatę i mleko kokosowe; gotuj 10 minut.", "Duszenie. Włóż kurczaka i duś 15–18 minut. Podaj z ryżem, fasolką, świeżym ogórkiem i limonką."]),
    R("l29","Marokański Kurczak z Kiszoną Cytryną, Oliwkami i Kuskusem","Bliski Wschód",["lunch"],"Drób",30,101,"freeze",
      "",
      ["350 g Udka z kurczaka bez skóry i kości", "150 g Cebula", "300 g Marchew i cukinia", "40 g Oliwki", "½ szt. Kiszona cytryna", "5 g; bulion drobiowy lub warzywny – 150 ml Oliwa", "Imbir, czosnek, kumin, kurkuma i kolendra", "115 g Kuskus (suchy)", "100 g po odsączeniu Ciecierzyca", "120 g Jogurt grecki 2%", "Natka lub kolendra"],
      ["Kurczak. Udka dopraw i zrumień na oliwie. Odłóż.", "Baza. Podsmaż cebulę, imbir i czosnek. Dodaj kumin, kurkumę, marchew oraz odrobinę bulionu.", "Duszenie. Dodaj kurczaka, cukinię, ciecierzycę, drobno pokrojoną skórkę kiszonej cytryny i oliwki. Duś 20 minut.", "Kuskus. Zalej gorącym bulionem, odstaw i spulchnij. Podaj z jogurtem i dużą ilością ziół."]),
    R("l30","Jamaican Jerk Chicken z Rice & Peas i Limonkowym Slawem","Karaibska",["lunch"],"Drób",30,91,"freeze",
      "",
      ["340 g Udka z kurczaka bez skóry i kości", "60 g Zielona cebulka", "3 ząbki Czosnek", "20 g Imbir", "2 łyżeczki Tymianek", "1½ łyżeczki Ziele angielskie", "Chili Scotch bonnet lub inne – do smaku", "Sok z 1 limonki", "5 g Olej", "115 g Ryż (suchy)", "160 g po odsączeniu Czarna lub czerwona fasola", "100 ml Lekkie mleko kokosowe", "350 g Kapusta, marchew i ananas", "Limonka, kolendra i sól"],
      ["Marynata. Zblenduj zieloną cebulkę, czosnek, imbir, tymianek, ziele angielskie, chili, limonkę i olej. Wymieszaj z kurczakiem na minimum 30 minut.", "Kurczak. Piecz 20–24 minuty w 220°C albo smaż na patelni grillowej, aż mocno się zrumieni.", "Rice & peas. Ryż ugotuj z fasolą, mlekiem kokosowym i wodą. Dopraw tymiankiem oraz szczyptą ziela angielskiego.", "Slaw. Kapustę i marchew wymieszaj z ananasem, limonką, kolendrą i solą. Podaj na zimno."]),
    R("l31","Korean Beef Bulgogi Bowl","Koreańska",["lunch"],"Ryby i owoce morza",30,103,"fresh",
      "",
      ["320 g Chuda wołowina", "35 ml Sos sojowy", "20 g Miód", "8 g Olej sezamowy", "100 g Gruszka", "Czosnek i imbir", "185 g Ryż (suchy)", "100 g Edamame", "300 g; sezam – 8 g Marchew, kapusta i ogórek", "Sezam i dymka"],
      ["Marynata. Zetrzyj gruszkę i połącz z sosem sojowym, miodem, olejem, czosnkiem i imbirem. Marynuj wołowinę 30 minut.", "Baza. Ugotuj ryż i edamame; warzywa pokrój cienko.", "Smażenie. Wołowinę smaż bardzo krótko, partiami, na mocno rozgrzanej patelni.", "Podanie. Podaj z ryżem, warzywami, edamame i dymką."]),
    R("l32","Pork Souvlaki z Cytrynowymi Ziemniakami i Tzatziki","Grecka",["lunch"],"Wieprzowina",30,108,"fresh",
      "",
      ["290 g Polędwiczka wieprzowa", "12 g Oliwa", "1 szt. Cytryna", "Czosnek, oregano, tymianek", "750 g Ziemniaki", "200 g Jogurt grecki 2%", "40 g Feta", "300 g Ogórek, pomidor i cebula", "Koperek"],
      ["Marynata. Mięso pokrój w kostkę, wymieszaj z połową oliwy, cytryną, czosnkiem i oregano. Marynuj 30 minut.", "Ziemniaki. Piecz z pozostałą oliwą, cytryną i oregano około 30 minut w 210°C.", "Souvlaki. Nadziewaj na patyczki i grilluj lub smaż 8–10 minut, obracając.", "Podanie. Zrób tzatziki z jogurtu i ogórka; podaj z sałatką i fetą."]),
    R("l33","Paneer Tikka Bowl z Ciecierzycą i Basmati","Indyjska",["lunch"],"Roślinne",30,91,"fresh",
      "",
      ["200 g Paneer", "200 g Skyr", "250 g Papryka i cebula", "Garam masala, kumin, kurkuma, chili", "5 g Olej", "180 g po odsączeniu Ciecierzyca", "105 g Ryż basmati (suchy)", "200 g Ogórek i pomidor", "Mięta, kolendra, limonka"],
      ["Marynata. Połowę skyru wymieszaj z przyprawami i limonką. Dodaj paneer oraz paprykę z cebulą na 20 minut.", "Pieczenie. Rozłóż na blasze i piecz 15–18 minut w 220°C, na koniec krótko grilluj.", "Baza. Ugotuj ryż; ciecierzycę podgrzej z kuminem i solą.", "Podanie. Pozostały skyr wymieszaj z miętą. Złóż bowl z warzywami i kolendrą."]),
    R("l34","Pierś z Kaczki z Pomarańczą, Puree Ziemniaczano-Selerowym i Burakiem","Polska",["lunch"],"Drób",30,110,"fresh",
      "",
      ["290 g Pierś z kaczki, możliwie odtłuszczona", "Tymianek, sól i pieprz", "650 g Ziemniaki", "250 g Seler korzeniowy", "150 g Skyr", "300 g Buraki", "150 g Pomarańcza", "5 g Oliwa", "15 ml Ocet balsamiczny"],
      ["Buraki. Pokrój w cząstki, wymieszaj z oliwą i piecz 35–40 minut w 200°C.", "Puree. Ziemniaki i seler ugotuj do miękkości. Utłucz ze skyrem, solą i pieprzem.", "Kaczka. Natnij skórę i połóż pierś na zimnej patelni skórą w dół. Wytapiaj powoli, usuń nadmiar tłuszczu, dosmaż z drugiej strony i odstaw na 7 minut.", "Sos. Sok i skórkę z pomarańczy zredukuj z balsamico. Podaj kaczkę pokrojoną w plastry z puree, burakiem i sosem."]),
    R("l35","Stir-Fry z Wołowiną, Brokułem i Nerkowcami","Amerykańska",["lunch"],"Wołowina",30,93,"fresh",
      "",
      ["290 g Chuda wołowina", "400 g Brokuł", "100 g Cebula", "10 g Olej", "15 g Miód", "30 ml Sos sojowy", "20 ml Sos ostrygowy", "Imbir i czosnek", "160 g Ryż (suchy)", "25 g Nerkowce"],
      ["Baza. Ugotuj ryż. Brokuł zblanszuj 2 minuty i dokładnie osusz.", "Wołowina. Smaż cienkie paski partiami na bardzo wysokim ogniu, następnie odłóż.", "Sos. Na patelni podsmaż imbir i czosnek, dodaj sosy, miód i 50 ml wody.", "Połączenie. Dodaj brokuł oraz wołowinę, szybko wymieszaj. Posyp nerkowcami."]),
    R("l36","Crispy Halloumi & Chickpea Bowl z Warzywami","Europejska",["lunch"],"Roślinne",30,88,"fresh",
      "",
      ["130 g Halloumi", "160 g po odsączeniu Ciecierzyca", "90 g Quinoa (sucha)", "400 g Cukinia, papryka i bakłażan", "5 g Oliwa", "200 g Skyr", "15 g Tahini", "1 szt. Cytryna", "Czosnek i mięta"],
      ["Pieczenie. Warzywa i ciecierzycę wymieszaj z oliwą oraz przyprawami. Piecz 25 minut w 210°C.", "Quinoa. Przepłucz i ugotuj zgodnie z instrukcją.", "Halloumi. Pokrój cienko i smaż na suchej patelni po 60–90 sekund z każdej strony.", "Sos. Wymieszaj skyr, tahini, cytrynę i czosnek. Złóż bowl i dodaj miętę."]),
    R("l37","Kantońska Pierś z Kaczki w Glazurze Hoisin z Ryżem, Pak Choi i Ogórkiem","Chińska",["lunch"],"Drób",30,102,"fresh",
      "",
      ["350 g Pierś z kaczki", "35 g Sos hoisin", "20 ml Sos sojowy", "10 g Miód", "1 łyżeczka Przyprawa five-spice", "15 g Imbir", "2 ząbki Czosnek", "160 g Ryż jaśminowy (suchy)", "300 g Pak choi", "200 g Ogórek", "100 g Marchew", "8 g Sezam", "Dymka i ocet ryżowy"],
      ["Pikle. Ogórek i marchew pokrój cienko, wymieszaj z octem ryżowym i szczyptą soli.", "Kaczka. Skórę natnij, natrzyj five-spice i połóż na zimnej patelni. Wytapiaj tłuszcz, odlej nadmiar i dosmaż z drugiej strony. Odstaw na 7 minut.", "Glazura. Hoisin, sos sojowy, miód, imbir i czosnek zagotuj krótko na tej samej patelni. Posmaruj kaczkę cienką warstwą.", "Podanie. Pak choi krótko przesmaż lub ugotuj na parze. Kaczkę pokrój i podaj z ryżem, piklami, pak choi, dymką oraz sezamem."]),
    R("l38","Fit Lasagne Wołowe z Twarogiem i Mozzarellą","Europejska",["lunch"],"Wołowina",30,120,"freeze",
      "",
      ["170 g Chuda wołowina mielona", "500 g Passata", "250 g Marchew, seler i cebula", "8 g Oliwa", "Czosnek, oregano, bazylia", "135 g Płaty lasagne", "250 g Twaróg / serek wiejski (wartość uśredniona)", "60 g Mozzarella light", "15 g Parmezan", "120 g Szpinak"],
      ["Ragù. Zrumień wołowinę. Dodaj warzywa, passatę i zioła; gotuj minimum 25 minut do gęstości.", "Krem. Twaróg zblenduj z pieprzem, gałką muszkatołową i odrobiną wody.", "Złożenie. Układaj ragù, płaty, krem twarogowy i szpinak. Na wierzchu dodaj mozzarellę i parmezan.", "Pieczenie. Piecz 35–40 minut w 190°C. Odstaw 15 minut przed krojeniem."]),
    R("l39","Tagine z Jagnięciną, Morelami i Kuskusem","Bliski Wschód",["lunch"],"Roślinne",30,105,"fresh",
      "",
      ["260 g Chuda jagnięcina", "100 g po odsączeniu Ciecierzyca", "35 g Suszone morele", "350 g Passata", "250 g Cebula i marchew", "8 g Oliwa", "Kumin, kolendra, cynamon, imbir", "125 g Kuskus (suchy)", "150 g Jogurt grecki 2%", "Cytryna, kolendra, mięta"],
      ["Mięso. Jagnięcinę zrumień partiami i odłóż.", "Baza. Na oliwie podsmaż cebulę, marchew i przyprawy. Dodaj passatę oraz mięso.", "Duszenie. Duś pod przykryciem 60–90 minut. Na ostatnie 20 minut dodaj ciecierzycę i morele.", "Podanie. Podaj z kuskusem, jogurtem, cytryną i kolendrą."]),
    R("l40","Paella z Kurczakiem i Krewetkami","Hiszp./Portug.",["lunch"],"Ryby i owoce morza",30,90,"fresh",
      "",
      ["130 g Pierś z kurczaka", "150 g Krewetki", "30 g Chorizo", "165 g Ryż do paelli", "100 g Groszek", "300 g Papryka, pomidor i cebula", "8 g Oliwa", "450 ml Bulion", "Szafran, wędzona papryka, cytryna"],
      ["Sofrito. Na oliwie zrumień chorizo i kurczaka. Dodaj cebulę, paprykę, pomidor i paprykę wędzoną.", "Ryż. Wsyp ryż i wymieszaj raz. Wlej gorący bulion z szafranem.", "Gotowanie. Gotuj bez mieszania około 15 minut. Dodaj groszek oraz krewetki na ostatnie 4–5 minut.", "Odpoczynek. Zwiększ ogień na 30 sekund dla socarrat, następnie odstaw pod ściereczką na 5 minut. Podaj z cytryną."]),
    R("l41","Miso Peanut Ramen z Krewetkami i Jajkiem","Japońska",["lunch"],"Ryby i owoce morza",30,108,"fresh",
      "",
      ["30 g Miso", "30 g Masło orzechowe", "800 ml Bulion drobiowy lub warzywny", "25 ml Sos sojowy", "Imbir, czosnek, chili", "250 g Krewetki", "2 szt. Jajka L (120 g)", "175 g Makaron ramen (suchy)", "100 g Edamame", "300 g Grzyby i pak choi", "5 g Olej sezamowy"],
      ["Bulion. Podsmaż imbir i czosnek, wlej bulion. Miso i masło orzechowe rozprowadź w miseczce z częścią gorącego płynu i wlej do garnka.", "Dodatki. Jajka ugotuj 7 minut. Grzyby i pak choi podgotuj w bulionie.", "Krewetki. Dodaj krewetki na 3 minuty. Nie doprowadzaj bulionu z miso do gwałtownego wrzenia.", "Podanie. Makaron ugotuj osobno. Rozdziel do misek, zalej bulionem, dodaj jajka, edamame i chili."]),
    R("l42","Pho Bo z Chudą Wołowiną i Ziołami","Wietnamska",["lunch"],"Ryby i owoce morza",30,91,"fresh",
      "",
      ["320 g Chuda wołowina", "200 g Makaron ryżowy", "1,2 l Bulion wołowy", "150 g Cebula", "50 g Imbir", "3 gwiazdki Anyż", "1 laska Cynamon", "4 szt. Goździki", "25 ml Sos rybny", "300 g Kiełki, dymka, kolendra i mięta", "Limonka i chili"],
      ["Przyprawy. Cebulę i imbir mocno przypal na suchej patelni. Anyż, cynamon i goździki upraż.", "Bulion. Dodaj wszystko do bulionu i gotuj bardzo łagodnie 35–45 minut. Przecedź i dopraw sosem rybnym.", "Makaron i mięso. Makaron przygotuj osobno. Wołowinę pokrój jak najcieniej.", "Podanie. Do misek włóż makaron i surową wołowinę, zalej wrzącym bulionem. Dodaj kiełki, zioła, limonkę i chili."]),
    R("l43","Syczuański Kurczak Kung Pao z Ryżem i Ogórkiem","Chińska",["lunch"],"Drób",30,104,"freeze",
      "",
      ["330 g Pierś z kurczaka", "300 g Papryka, seler naciowy i cebula", "25 g Orzeszki ziemne", "8 g Olej", "6–10 szt. Suszone chili", "1 łyżeczka Pieprz syczuański", "Imbir i czosnek", "30 ml Sos sojowy", "25 ml Ocet Chinkiang", "15 g Miód", "10 g Skrobia ziemniaczana", "150 g Ryż jaśminowy (suchy)", "250 g Ogórek", "Ocet ryżowy i chili"],
      ["Marynata. Kurczaka pokrój w kostkę i wymieszaj z łyżką sosu sojowego oraz połową skrobi.", "Ogórek. Rozgnieć bokiem noża, pokrój i wymieszaj z octem ryżowym, chili oraz szczyptą soli.", "Stir-fry. Na mocno rozgrzanej patelni smaż kurczaka partiami. Dodaj suszone chili, pieprz syczuański, imbir, czosnek i warzywa.", "Sos. Wlej sos sojowy, Chinkiang, miód i pozostałą skrobię rozpuszczoną w wodzie. Dodaj orzeszki i mieszaj około minuty. Podaj z ryżem oraz zimnym ogórkiem."]),
    R("l44","Grecka Moussaka z Chudą Wołowiną i Bakłażanem","Grecka",["lunch"],"Wołowina",30,106,"fresh",
      "",
      ["400 g Bakłażan", "375 g Ziemniaki", "10 g Oliwa", "210 g Chuda wołowina mielona", "400 g Passata", "120 g Cebula", "Cynamon, oregano, czosnek", "220 g Twaróg / serek wiejski (wartość uśredniona)", "40 g Feta", "1 szt. Jajko L (60 g)", "Gałka muszkatołowa"],
      ["Warzywa. Bakłażana i ziemniaki pokrój, skrop oliwą i piecz 20 minut w 210°C.", "Mięso. Wołowinę zrumień, dodaj cebulę, passatę i przyprawy. Gotuj do bardzo gęstej konsystencji.", "Krem. Zblenduj twaróg, jajko, fetę i gałkę.", "Złożenie. Układaj ziemniaki, mięso i bakłażana. Przykryj kremem. Piecz 30 minut w 190°C i odstaw 15 minut."]),
    R("l45","Coq au Vin Light z Puree Ziemniaczanym","Francuska",["lunch"],"Drób",30,102,"freeze",
      "",
      ["290 g Udka z kurczaka bez skóry", "30 g Boczek", "300 g Pieczarki", "250 g Cebula i marchew", "8 g Masło", "300 ml Czerwone wino", "250 ml Bulion", "Tymianek, liść laurowy, czosnek", "625 g Ziemniaki", "100 g Skyr", "Natka pietruszki"],
      ["Obsmażanie. Boczek wytop, kurczaka zrumień i odłóż.", "Warzywa. Na tej samej patelni zrumień pieczarki i warzywa. Dodaj masło, czosnek i zioła.", "Duszenie. Wlej wino i zredukuj o 1/3. Dodaj bulion oraz kurczaka, duś 35–45 minut.", "Puree. Ziemniaki ugotuj i utłucz ze skyrem oraz odrobiną płynu z gotowania. Podaj z natką."]),
    R("l46","Pork Carnitas Tacos z Salsą i Limonkowym Slawem","Meksykańska",["lunch"],"Wieprzowina",30,95,"fresh",
      "",
      ["230 g Chudsza łopatka wieprzowa", "Pomarańcza i limonka – sok", "Czosnek, kumin, oregano, liść laurowy", "190 g Tortille kukurydziane", "120 g po odsączeniu Czarna fasola", "60 g Awokado", "150 g Skyr", "250 g Kapusta, marchew i cebula", "Kolendra, limonka, salsa"],
      ["Duszenie. Wieprzowinę zalej sokiem cytrusowym i niewielką ilością wody, dodaj przyprawy. Duś pod przykryciem 2–2½ godziny.", "Chrupkość. Porwij mięso, rozłóż na blasze i grilluj 5–7 minut z kilkoma łyżkami sosu.", "Slaw. Kapustę i marchew wymieszaj z limonką, solą i częścią skyru.", "Tacos. Podgrzej tortille, dodaj fasolę, mięso, slaw, salsę i awokado."]),
    R("l47","Pieczony Kurczak Katsu z Japońskim Curry","Japońska",["lunch"],"Drób",30,105,"fresh",
      "",
      ["270 g Pierś z kurczaka", "50 g Panko", "1 szt. Jajko L (60 g)", "8 g Olej", "100 g; marchew – 150 g; ziemniaki – 200 g Cebula", "500 ml Bulion", "2 łyżeczki Japońska przyprawa curry", "15 g Mąka", "100 g Skyr", "135 g Ryż (suchy)", "120 g Ogórek piklowany"],
      ["Katsu. Kurczaka rozbij, dopraw, zanurz w jajku i panko. Skrop olejem i piecz 16–18 minut w 220°C, obracając raz.", "Curry. Warzywa podsmaż na suchej patelni lub z odrobiną wody. Dodaj przyprawę curry i mąkę, następnie bulion. Gotuj do miękkości.", "Wykończenie. Część warzyw zblenduj dla gęstości. Po zdjęciu z ognia wmieszaj skyr.", "Podanie. Pokrój katsu, podaj z ryżem, curry i piklami."]),
    R("l48","Pieczone Kotlety Pożarskie z Ziemniakami i Mizerią","Polska",["lunch"],"Drób",30,107,"freeze",
      "",
      ["180 g Pierś z kurczaka mielona", "140 g Mięso z udka kurczaka mielone", "1 szt. Jajko L (60 g)", "25 g Panko lub bułka tarta", "50 ml Mleko 2%", "80 g Cebula", "5 g Masło", "5 g Olej", "Majeranek, natka, sól i pieprz", "600 g Ziemniaki", "300 g Ogórek", "180 g Jogurt grecki 2%", "Koperek, cytryna lub ocet"],
      ["Masa. Panko zalej mlekiem. Cebulę zeszklij na maśle. Połącz oba rodzaje mięsa, jajko, panko, cebulę, natkę i przyprawy.", "Kotlety. Uformuj 8 mniejszych kotletów, posmaruj cienko olejem i piecz 16–20 minut w 210°C, obracając w połowie.", "Ziemniaki. Ugotuj w osolonej wodzie i posyp koperkiem albo lekko utłucz z odrobiną wody z gotowania.", "Mizeria. Ogórek pokrój cienko, lekko posól i odciśnij. Wymieszaj z jogurtem, koperkiem i odrobiną cytryny lub octu."]),
    R("d01","Stek z Tuńczyka z Ryżem Limonkowym, Edamame i Sosem Wasabi-Skyr","Japońska",["dinner"],"Ryby i owoce morza",15,108,"fresh",
      "",
      ["200 g Stek z tuńczyka (masa surowa)", "5 g Oliwa", "20 ml Sos sojowy", "10 g Sezam", "Pieprz", "150 g Ryż jaśminowy (suchy)", "150 g Edamame", "250 g Ogórek i rzodkiewka", "150 g Skyr", "8 g Wasabi", "Sok z 1 limonki", "Szczypta soli"],
      ["Ryż. Ugotuj ryż; po wyłączeniu dodaj sok i skórkę z połowy limonki.", "Sos. Wymieszaj skyr z wasabi, limonką i szczyptą soli.", "Tuńczyk. Osusz steki, posmaruj oliwą i smaż na bardzo gorącej patelni po 60–90 sekund z każdej strony.", "Podanie. Pokrój tuńczyka, podaj z ryżem, edamame, warzywami, sosem i sezamem."]),
    R("d02","Stek Wołowy Minute z Ziemniakami, Rukolą i Chimichurri","Europejska",["dinner"],"Wołowina",20,88,"fresh",
      "",
      ["240 g Stek wołowy minute / rostbef (masa surowa)", "Sól i pieprz", "5 g Oliwa", "800 g Ziemniaki", "10 g Oliwa", "Papryka wędzona i sól", "120 g Skyr", "Natka pietruszki – duża garść", "1 ząbek Czosnek", "15 ml Ocet winny", "Chili", "250 g Rukola i pomidorki"],
      ["Ziemniaki. Pokrój w kostkę, wymieszaj z oliwą i przyprawami; piecz 16–18 minut w 200°C w air fryerze.", "Chimichurri. Posiekaj natkę i wymieszaj ze skyrem, octem, czosnkiem i chili.", "Stek. Osusz mięso, dopraw i smaż 2–3 minuty z każdej strony. Odstaw na 5 minut.", "Podanie. Pokrój w poprzek włókien i podaj z ziemniakami, rukolą oraz sosem."]),
    R("d03","Łosoś Miso-Maple z Udonem i Pak Choi","Japońska",["dinner"],"Ryby i owoce morza",18,79,"fresh",
      "",
      ["220 g Filet z łososia (masa surowa)", "30 g Pasta miso", "15 g Miód lub syrop klonowy", "20 ml Sos sojowy", "10 g Imbir", "380 g Makaron udon świeży", "100 g Edamame", "250 g Pak choi", "5 g Olej sezamowy", "1 szt. Limonka"],
      ["Glazura. Połącz miso, miód, sos sojowy, imbir i 2 łyżki wody.", "Łosoś. Smaż skórą w dół 5 minut, odwróć, dodaj połowę glazury i smaż jeszcze 3 minuty.", "Udon. Odłóż łososia. Na tej samej patelni podsmaż pak choi, dodaj udon, edamame i pozostałą glazurę.", "Podanie. Wróć z łososiem na patelnię na 30 sekund i dopraw limonką."]),
    R("d04","Krewetki Fajita z Tortillami, Awokado i Limonkowym Skyrem","Meksykańska",["dinner"],"Ryby i owoce morza",15,98,"fresh",
      "",
      ["270 g Krewetki obrane (po rozmrożeniu)", "300 g Papryka i cebula", "10 g Oliwa", "Kumin, papryka wędzona, chili", "Sok z 1 limonki", "230 g Tortille pszenne", "140 g Awokado", "150 g Skyr", "120 g Salsa pomidorowa", "Kolendra"],
      ["Sos. Wymieszaj skyr z połową soku z limonki, solą i pieprzem.", "Warzywa. Na mocnym ogniu smaż paprykę i cebulę 4–5 minut.", "Krewetki. Dodaj krewetki i przyprawy; smaż 3–4 minuty. Dopraw resztą limonki.", "Podanie. Podgrzej tortille i podaj z awokado, salsą oraz sosem."]),
    R("d05","Kurczak Souvlaki z Pitą, Pomidorem i Tzatziki","Grecka",["dinner"],"Drób",20,99,"fresh",
      "",
      ["210 g Pierś z kurczaka (masa surowa)", "10 g Oliwa", "Sok z 1 cytryny", "2 łyżeczki Oregano", "2 ząbki Czosnek", "210 g Pita", "50 g Feta", "300 g Pomidor, ogórek i cebula", "200 g Jogurt grecki 2%", "150 g Ogórek", "Koperek i czosnek"],
      ["Tzatziki. Zetrzyj ogórek, odciśnij i wymieszaj z jogurtem, koperkiem oraz czosnkiem.", "Kurczak. Pokrój w paski, wymieszaj z oliwą, cytryną, oregano i czosnkiem; smaż 8–10 minut.", "Pita. Podgrzej na suchej patelni po 30 sekund z każdej strony.", "Podanie. Złóż pity lub podaj wszystko jako talerz z fetą i świeżymi warzywami."]),
    R("d06","Dorsz na Maśle Miso z Ryżem i Szpinakiem","Japońska",["dinner"],"Ryby i owoce morza",18,95,"fresh",
      "",
      ["310 g Filet z dorsza (masa surowa)", "15 g Masło", "30 g Pasta miso", "15 ml Sos sojowy", "Sok z ½ cytryny", "225 g Ryż basmati (suchy)", "100 g Edamame", "250 g Szpinak", "1 ząbek Czosnek"],
      ["Ryż. Ugotuj ryż zgodnie z instrukcją.", "Sos. Rozetrzyj miękkie masło z miso, sosem sojowym i cytryną.", "Dorsz. Smaż dorsza 3–4 minuty z każdej strony. Pod koniec dodaj masło miso i polewaj nim rybę.", "Szpinak. Odłóż rybę, na tej samej patelni zwiń szpinak z czosnkiem i edamame. Podaj z ryżem."]),
    R("d07","Halloumi z Ciecierzycą, Pomidorami i Harissą","Europejska",["dinner"],"Roślinne",15,77,"fresh",
      "",
      ["150 g Halloumi", "200 g Ciecierzyca (po odsączeniu)", "300 g Pomidory krojone", "25 g Harissa", "5 g Oliwa", "140 g Pita", "100 g Skyr", "1 szt. Cytryna", "Natka i mięta"],
      ["Halloumi. Pokrój w plastry i zrumień na suchej patelni po 1–2 minuty z każdej strony; odłóż.", "Sos. Na tej samej patelni podgrzej oliwę, harissę, pomidory i ciecierzycę przez 6–7 minut.", "Pita. Podgrzej pitę na suchej patelni lub w tosterze.", "Podanie. Włóż halloumi do sosu na 30 sekund. Podaj ze skyrem, cytryną i ziołami."]),
    R("d08","Tofu Gochujang z Ryżem, Edamame i Ogórkiem","Koreańska",["dinner"],"Ryby i owoce morza",20,78,"fresh",
      "",
      ["300 g Tofu naturalne twarde", "35 g Gochujang", "20 ml Sos sojowy", "15 g Miód", "5 g Oliwa", "15 g Skrobia ziemniaczana", "185 g Ryż jaśminowy (suchy)", "120 g Edamame", "300 g Ogórek i marchew", "8 g Sezam"],
      ["Ryż. Ugotuj ryż; edamame dodaj na ostatnie 3 minuty.", "Tofu. Osusz, porwij na kawałki, obtocz w skrobi i smaż na oliwie 8–10 minut.", "Glazura. Połącz gochujang, sos sojowy, miód i 3 łyżki wody; wlej do tofu i redukuj 1–2 minuty.", "Podanie. Podaj z ryżem, warzywami i sezamem."]),
    R("d09","Polędwiczka Wieprzowa Dijon z Kuskusem i Fasolką","Francuska",["dinner"],"Wieprzowina",20,95,"fresh",
      "",
      ["230 g Polędwiczka wieprzowa (masa surowa)", "10 g Oliwa", "30 g Musztarda Dijon", "150 g Skyr", "1 ząbek Czosnek", "205 g Kuskus (suchy)", "250 g Fasolka szparagowa", "Natka pietruszki", "1 szt. Cytryna"],
      ["Kuskus. Zalej wrzątkiem, przykryj na 5 minut i spulchnij widelcem.", "Mięso. Pokrój w cienkie medaliony, dopraw i smaż po 2 minuty z każdej strony; odłóż.", "Sos. Na małym ogniu wymieszaj musztardę, skyr, czosnek i 3 łyżki wody. Nie doprowadzaj do wrzenia.", "Podanie. Włóż mięso do sosu na minutę. Podaj z kuskusem i fasolką, dopraw cytryną."]),
    R("d10","Indyk Saltimbocca z Gnocchi i Szpinakiem","Europejska",["dinner"],"Drób",20,105,"fresh",
      "",
      ["250 g Pierś z indyka (masa surowa)", "40 g Prosciutto cotto", "60 g Mozzarella", "8 listków Szałwia", "5 g Oliwa", "470 g Gnocchi", "250 g Szpinak", "1 ząbek Czosnek", "1 szt. Cytryna"],
      ["Indyk. Rozbij plastry cienko, połóż na nich szynkę i szałwię; dopraw pieprzem.", "Smażenie. Smaż 3 minuty od strony mięsa i 2 minuty od strony szynki; pod koniec dodaj mozzarellę i przykryj na minutę.", "Gnocchi. Odłóż mięso. Na tej samej patelni zrumień gnocchi 6–7 minut, bez gotowania.", "Szpinak. Dodaj czosnek i szpinak, zwiń przez minutę. Podaj z cytryną."]),
    R("d11","Krewetki Saganaki z Fetą i Chrupiącym Pieczywem","Grecka",["dinner"],"Ryby i owoce morza",20,101,"fresh",
      "",
      ["240 g Krewetki obrane", "400 g Pomidory krojone / passata", "100 g Feta", "10 g Oliwa", "2 ząbki Czosnek", "Oregano i chili", "240 g Chleb na zakwasie", "100 g Skyr", "Natka pietruszki"],
      ["Sos. Na oliwie podgrzej czosnek, dodaj passatę, oregano i chili; gotuj 8–10 minut.", "Krewetki. Dodaj krewetki i gotuj 3 minuty.", "Feta. Pokrusz fetę, przykryj patelnię na 2 minuty, aż lekko zmięknie.", "Podanie. Podaj ze skyrem, natką i mocno podpieczonym chlebem."]),
    R("d12","Kurczak Satay z Makaronem Ryżowym i Ogórkiem","Tajska",["dinner"],"Drób",20,81,"fresh",
      "",
      ["200 g Pierś z kurczaka (masa surowa)", "5 g Oliwa", "20 ml Sos sojowy", "Czosnek i imbir", "40 g Masło orzechowe", "100 g Skyr", "Sok z 1 limonki", "15 g Sriracha", "80 ml Woda", "170 g Makaron ryżowy (suchy)", "300 g Ogórek i marchew", "Kolendra lub mięta"],
      ["Makaron. Zalej wrzątkiem zgodnie z instrukcją i odcedź.", "Kurczak. Pokrój cienko i smaż na mocnym ogniu 7–8 minut z czosnkiem, imbirem i sosem sojowym.", "Sos. Wymieszaj masło orzechowe, skyr, limonkę, srirachę i wodę. Wlej do kurczaka i podgrzej minutę.", "Podanie. Dodaj makaron, wymieszaj i podaj z chrupiącym ogórkiem oraz ziołami."]),
    R("d13","Kanapki z Matjasem, Ziemniakiem, Jabłkiem i Koperkiem","Nordycka",["dinner"],"Roślinne",12,93,"fresh",
      "",
      ["170 g Matjas (po odsączeniu)", "220 g Chleb żytni", "300 g Ugotowane ziemniaki", "100 g Jabłko", "160 g Ogórek kiszony i cebula", "200 g Serek wiejski", "100 g Skyr", "15 g Musztarda Dijon", "Koperek – duża garść", "Pieprz i sok z cytryny"],
      ["Krem. Zblenduj lub rozgnieć serek wiejski ze skyrem, musztardą, koperkiem i pieprzem.", "Dodatki. Ziemniaki, jabłko, ogórek i cebulę pokrój bardzo cienko.", "Pieczywo. Chleb podpiecz, jeżeli wolisz kontrast chrupkości.", "Złożenie. Posmaruj kremem, ułóż ziemniaki, matjasa, jabłko, ogórek i dużo koperku."]),
    R("d14","Roast Beef Sandwich z Chrzanowym Skyrem, Cheddarem i Piklami","Europejska",["dinner"],"Wołowina",10,95,"fresh",
      "",
      ["190 g Pieczony rostbef / roast beef", "220 g Chleb na zakwasie", "50 g Cheddar", "180 g Ogórki kiszone i cebula", "60 g Rukola", "150 g Skyr", "25 g Chrzan", "15 g Musztarda Dijon", "Pieprz"],
      ["Sos. Wymieszaj skyr z chrzanem, musztardą i pieprzem.", "Pieczywo. Podpiecz kromki w tosterze lub na suchej patelni.", "Składanie. Posmaruj sosem, dodaj rukolę, roast beef, cheddar, pikle i cebulę.", "Wykończenie. Dociśnij kanapki i przetnij na pół; opcjonalnie podgrzej minutę, aby ser lekko zmiękł."]),
    R("d15","Focaccia z Kurczakiem Pesto, Mozzarellą i Rukolą","Europejska",["dinner"],"Drób",15,94,"fresh",
      "",
      ["190 g Pieczona pierś z kurczaka", "250 g Focaccia", "80 g Mozzarella", "20 g Pesto", "250 g Pomidor i rukola", "100 g Skyr", "Sok z cytryny", "Pieprz"],
      ["Sos. Wymieszaj skyr z cytryną i pieprzem.", "Składanie. Przekrój focaccię, posmaruj pesto i skyrem, dodaj kurczaka, mozzarellę oraz pomidora.", "Podgrzanie. Podgrzej w opiekaczu lub na patelni pod przykryciem 4–5 minut.", "Wykończenie. Dodaj rukolę po podgrzaniu, aby pozostała świeża."]),
    R("d16","Wrap z Wędzonym Łososiem, Serkiem Wiejskim i Ogórkiem","Nordycka",["dinner"],"Ryby i owoce morza",8,92,"fresh",
      "",
      ["160 g Łosoś wędzony", "260 g Tortille", "250 g Serek wiejski", "100 g Awokado", "250 g Ogórek", "Koperek i cytryna"],
      ["Krem. Rozgnieć serek wiejski z pieprzem, koperkiem i sokiem z cytryny.", "Tortille. Podgrzej po 15–20 sekund na suchej patelni, aby były elastyczne.", "Składanie. Posmaruj kremem, ułóż łososia, awokado i cienki ogórek.", "Zawijanie. Zawiń ciasno i przekrój ukośnie."]),
    R("d17","Grecki Gyros Wrap z Kurczakiem, Fetą i Tzatziki","Grecka",["dinner"],"Drób",15,106,"fresh",
      "",
      ["230 g Pierś z kurczaka (surowa lub wcześniej upieczona)", "250 g Tortille", "70 g Feta", "300 g Pomidor, ogórek i cebula", "200 g Jogurt grecki 2%", "120 g Ogórek", "Czosnek, koperek, cytryna", "Oregano i papryka"],
      ["Tzatziki. Wymieszaj jogurt z odciśniętym ogórkiem, czosnkiem, koperkiem i cytryną.", "Kurczak. Jeśli jest surowy, pokrój cienko, dopraw oregano i papryką, smaż 8 minut. Gotowy tylko podgrzej.", "Tortille. Podgrzej krótko na suchej patelni.", "Złożenie. Dodaj tzatziki, kurczaka, warzywa i fetę; zawiń ciasno."]),
    R("d18","Tosty z Makrelą, Twarożkiem Chrzanowym i Ogórkiem Kiszonym","Nordycka",["dinner"],"Ryby i owoce morza",10,109,"fresh",
      "",
      ["150 g Makrela wędzona (po obraniu)", "200 g Twaróg półtłusty", "100 g Skyr", "25 g Chrzan", "Sok z cytryny", "Pieprz", "290 g Chleb na zakwasie", "200 g Ogórki kiszone", "80 g Czerwona cebula", "Koperek"],
      ["Pasta. Makrelę rozdrobnij i wymieszaj z twarogiem, skyrem, chrzanem, cytryną oraz pieprzem.", "Pieczywo. Mocno podpiecz chleb.", "Dodatki. Ogórek i cebulę pokrój cienko.", "Podanie. Na tostach rozłóż pastę, pikle i koperek."]),
    R("d19","Club Sandwich z Indykiem, Jajkiem, Awokado i Dijon","Amerykańska",["dinner"],"Drób",15,96,"fresh",
      "",
      ["150 g Pieczona pierś z indyka", "220 g Chleb tostowy / na zakwasie", "180 g Jajka (3 szt.)", "120 g Awokado", "250 g Pomidor i sałata", "100 g Skyr", "20 g Musztarda Dijon", "Sok z cytryny", "Pieprz"],
      ["Jajka. Ugotuj na twardo lub wykorzystaj wcześniej ugotowane; pokrój w plastry.", "Sos. Wymieszaj skyr z Dijon, cytryną i pieprzem.", "Pieczywo. Podpiecz kromki.", "Złożenie. Układaj warstwy: sos, sałata, indyk, pomidor, jajko i awokado. Dociśnij i przekrój."]),
    R("d20","Wrap Falafel z Hummusem, Piklowaną Cebulą i Warzywami","Bliski Wschód",["dinner"],"Roślinne",12,76,"fresh",
      "",
      ["200 g Falafele gotowe", "200 g Tortille", "80 g Hummus", "300 g Pomidor, ogórek, sałata", "100 g Piklowana cebula", "150 g Skyr", "20 g Tahini", "1 szt. Cytryna", "Kumin i sól"],
      ["Falafele. Podgrzej zgodnie z instrukcją: air fryer, piekarnik lub patelnia.", "Sos. Wymieszaj skyr z tahini, cytryną, kuminem i odrobiną wody.", "Tortille. Podgrzej krótko na suchej patelni.", "Złożenie. Posmaruj hummusem, dodaj falafele, warzywa, pikle i sos; zawiń."]),
    R("d21","Quesadilla z Indykiem, Cheddarem, Kukurydzą i Salsą","Meksykańska",["dinner"],"Drób",15,105,"fresh",
      "",
      ["270 g Mielony indyk 5%", "80 g Kukurydza", "50 g Cheddar", "150 g Salsa", "Kumin i papryka wędzona", "180 g Tortille", "150 g Skyr", "1 szt. Limonka", "Kolendra"],
      ["Indyk. Smaż na suchej patelni z kuminem i papryką 6–7 minut; dodaj kukurydzę.", "Składanie. Na połowie każdej tortilli ułóż mięso, cheddar i łyżkę salsy; złóż.", "Smażenie. Smaż na suchej patelni po 2 minuty z każdej strony.", "Podanie. Pokrój na trójkąty i podaj ze skyrem, resztą salsy i limonką."]),
    R("d22","Croque Monsieur Light z Szynką, Gruyère i Beszamelem ze Skyru","Francuska",["dinner"],"Wieprzowina",18,96,"fresh",
      "",
      ["210 g Chleb", "140 g Szynka dobrej jakości", "70 g Gruyère", "5 g Masło", "200 g Skyr", "100 ml Mleko 2%", "15 g Musztarda Dijon", "Gałka muszkatołowa i pieprz", "250 g Sałata z ogórkiem"],
      ["Sos. Wymieszaj skyr z mlekiem, Dijon, gałką i pieprzem.", "Składanie. Chleb posmaruj cienko sosem, dodaj szynkę i większość sera; zamknij kanapki.", "Smażenie. Posmaruj z zewnątrz odrobiną masła i smaż pod przykryciem po 3–4 minuty z każdej strony.", "Wykończenie. Na wierzchu rozłóż resztę sosu i sera; przykryj na minutę lub zapiecz krótko pod grillem."]),
    R("d23","Banh Mi z Polędwiczką Minute, Piklami i Sriracha-Skyrem","Wietnamska",["dinner"],"Wieprzowina",20,88,"fresh",
      "",
      ["220 g Polędwiczka wieprzowa (masa surowa)", "20 ml Sos sojowy", "10 g Miód", "1 ząbek Czosnek", "5 g Oliwa", "270 g Bagietka", "300 g Marchew, ogórek i rzodkiewka", "30 ml Ocet ryżowy", "Kolendra", "100 g Skyr", "30 g Lekki majonez", "15 g Sriracha", "1 szt. Limonka"],
      ["Pikle. Warzywa pokrój cienko, wymieszaj z octem, szczyptą soli i cukru.", "Sos. Wymieszaj skyr, majonez, srirachę i limonkę.", "Mięso. Pokrój bardzo cienko i smaż 5–6 minut z sosem sojowym, miodem i czosnkiem.", "Złożenie. Podgrzej bagietkę, posmaruj sosem, dodaj mięso, odciśnięte pikle i kolendrę."]),
    R("d24","Tuna Melt Wrap z Cheddarem, Kaparami i Piklami","Amerykańska",["dinner"],"Ryby i owoce morza",12,97,"fresh",
      "",
      ["150 g Tuńczyk w sosie własnym (po odsączeniu)", "150 g Skyr", "20 g Lekki majonez", "25 g Kapary", "120 g Ogórki kiszone", "15 g Musztarda Dijon", "250 g Tortille", "70 g Cheddar", "80 g Kukurydza", "60 g Rukola"],
      ["Pasta. Wymieszaj tuńczyka ze skyrem, majonezem, kaparami, piklami i Dijon.", "Składanie. Na tortillach rozłóż pastę, kukurydzę i cheddar; złóż boki i zwiń.", "Smażenie. Smaż na suchej patelni 2–3 minuty z każdej strony.", "Podanie. Dodaj rukolę po przekrojeniu lub podaj ją obok."]),
    R("d25","Spaghetti z Tuńczykiem, Cytryną, Kaparami i Rukolą","Europejska",["dinner"],"Ryby i owoce morza",15,92,"fresh",
      "",
      ["215 g Spaghetti (suche)", "190 g Tuńczyk w sosie własnym (po odsączeniu)", "40 g Parmezan", "15 g Oliwa", "30 g Kapary", "100 g Rukola", "1 szt. Cytryna", "1 ząbek Czosnek"],
      ["Makaron. Ugotuj al dente; zachowaj około 150 ml wody.", "Baza. W dużej misce wymieszaj tuńczyka, oliwę, kapary, startą skórkę i sok z cytryny oraz czosnek.", "Połączenie. Dodaj gorący makaron, parmezan i kilka łyżek wody; energicznie wymieszaj.", "Wykończenie. Dodaj rukolę, pieprz i ewentualnie więcej cytryny."]),
    R("d26","Makaron z Krewetkami, Pomidorami, Fetą i Chili","Grecka",["dinner"],"Ryby i owoce morza",20,97,"fresh",
      "",
      ["210 g Makaron krótki (suchy)", "250 g Krewetki", "350 g Passata", "100 g Feta", "10 g Oliwa", "2 ząbki Czosnek", "Chili i oregano", "Natka pietruszki"],
      ["Makaron. Ugotuj al dente i zachowaj pół szklanki wody.", "Sos. Na oliwie podgrzej czosnek i chili, dodaj passatę; redukuj 7–8 minut.", "Krewetki. Dodaj krewetki na 3 minuty, następnie makaron i trochę wody.", "Feta. Zdejmij z ognia, dodaj fetę, oregano i natkę; wymieszaj częściowo."]),
    R("d27","Orzo z Kurczakiem, Szpinakiem i Cytryną","Europejska",["dinner"],"Drób",22,112,"fresh",
      "",
      ["200 g Pierś z kurczaka (masa surowa)", "210 g Orzo (suche)", "250 g Szpinak", "40 g Parmezan", "150 g Skyr", "5 g Oliwa", "500 ml Bulion", "1 szt. Cytryna", "2 ząbki Czosnek"],
      ["Kurczak. Pokrój w kostkę, dopraw i zrumień w garnku na oliwie przez 5 minut.", "Orzo. Dodaj czosnek, orzo i bulion; gotuj 10–12 minut, mieszając kilka razy.", "Szpinak. Dodaj szpinak i zwiń przez minutę.", "Wykończenie. Zdejmij z ognia, wmieszaj skyr, parmezan oraz sok i skórkę z cytryny."]),
    R("d28","Udon z Wołowiną, Brokułem i Sosem Ostrygowym","Chińska",["dinner"],"Wołowina",18,79,"fresh",
      "",
      ["200 g Chuda wołowina (masa surowa)", "550 g Makaron udon świeży", "300 g Brokuł", "10 g Oliwa", "35 g Sos ostrygowy", "20 ml Sos sojowy", "Imbir i czosnek", "1 szt. Limonka"],
      ["Sos. Wymieszaj sos ostrygowy, sojowy, imbir, czosnek i 3 łyżki wody.", "Wołowina. Smaż cienkie paski na bardzo gorącej patelni 2–3 minuty; odłóż.", "Brokuł. Dodaj brokuł i 3 łyżki wody, przykryj na 3 minuty.", "Połączenie. Dodaj udon, sos i wołowinę; smaż 2 minuty. Dopraw limonką."]),
    R("d29","Gnocchi z Kurczakiem, Pesto i Pomidorkami","Europejska",["dinner"],"Drób",18,94,"fresh",
      "",
      ["240 g Pierś z kurczaka (masa surowa)", "470 g Gnocchi", "30 g Pesto", "60 g Mozzarella", "300 g Pomidorki koktajlowe", "150 g Szpinak", "Pieprz i cytryna"],
      ["Kurczak. Pokrój i smaż 6–7 minut; odłóż.", "Gnocchi. Na tej samej patelni zrumień gnocchi 6 minut, bez wcześniejszego gotowania.", "Warzywa. Dodaj pomidorki i szpinak na 2 minuty.", "Wykończenie. Wróć z kurczakiem, zdejmij z ognia i wmieszaj pesto oraz mozzarellę."]),
    R("d30","Shortcut Ramen z Krewetkami, Jajkiem i Miso","Japońska",["dinner"],"Ryby i owoce morza",18,111,"fresh",
      "",
      ["185 g Makaron ramen (suchy)", "240 g Krewetki", "180 g Jajka (3 szt.)", "100 g Edamame", "50 g Pasta miso", "900 ml Bulion", "300 g Pieczarki i pak choi", "5 g Olej sezamowy", "Imbir, czosnek, chili"],
      ["Jajka. Ugotuj 7 minut, przelej zimną wodą i obierz.", "Bulion. Zagotuj bulion z imbirem, czosnkiem i warzywami.", "Makaron. Dodaj ramen, krewetki i edamame; gotuj zgodnie z czasem makaronu, zwykle 3–4 minuty.", "Miso. Zdejmij z ognia, rozprowadź miso w chochelce bulionu i wlej z powrotem. Podaj z jajkiem i olejem sezamowym."]),
    R("d31","Kimchi Fried Rice z Indykiem i Jajkiem","Koreańska",["dinner"],"Ryby i owoce morza",15,99,"fresh",
      "",
      ["220 g Mielony indyk 5%", "195 g Ryż jaśminowy (suchy; najlepiej ugotowany wcześniej)", "180 g Jajka (3 szt.)", "200 g Kimchi", "100 g Edamame", "8 g Olej sezamowy", "20 g Gochujang", "15 ml Sos sojowy"],
      ["Indyk. Smaż na mocnym ogniu 5–6 minut, rozbijając łopatką.", "Kimchi. Dodaj posiekane kimchi i gochujang; smaż 2 minuty.", "Ryż. Dodaj zimny ryż, edamame i sos sojowy; smaż 4–5 minut.", "Jajka. Zrób miejsce na patelni, wbij jajka i wymieszaj. Wykończ olejem sezamowym."]),
    R("d32","Kuskus z Łososiem, Fetą, Ogórkiem i Ziołami","Europejska",["dinner"],"Ryby i owoce morza",15,83,"fresh",
      "",
      ["250 g Filet z łososia (masa surowa)", "5 g Oliwa", "1 szt. Cytryna", "Kumin i pieprz", "170 g Kuskus (suchy)", "50 g Feta", "350 g Ogórek, pomidor i cebula", "Natka, mięta i koperek"],
      ["Kuskus. Zalej wrzątkiem, przykryj na 5 minut; dopraw cytryną i ziołami.", "Łosoś. Dopraw i smaż 4–5 minut skórą w dół, potem 2–3 minuty z drugiej strony.", "Warzywa. Pokrój i wymieszaj z kuskusem.", "Podanie. Rozdrobnij łososia na duże kawałki, dodaj fetę i pozostałe zioła."]),
    R("d33","Penne Arrabbiata z Indykiem, Burratą i Bazylią","Europejska",["dinner"],"Drób",20,93,"fresh",
      "",
      ["220 g Penne (suche)", "230 g Mielony indyk 5%", "400 g Passata", "80 g Burrata", "5 g Oliwa", "2 ząbki Czosnek", "Chili i bazylia"],
      ["Makaron. Ugotuj al dente i zachowaj trochę wody.", "Indyk. Smaż 6–7 minut, aż się zrumieni.", "Sos. Dodaj czosnek, chili i passatę; gotuj 8 minut.", "Połączenie. Dodaj makaron i odrobinę wody. Podaj z porwaną burratą i bazylią."]),
    R("d34","Soba z Tofu, Edamame i Sosem Orzechowym","Europejska",["dinner"],"Ryby i owoce morza",18,84,"fresh",
      "",
      ["190 g Tofu twarde", "130 g Makaron soba (suchy)", "120 g Edamame", "300 g Ogórek i marchew", "30 g Masło orzechowe", "20 ml Sos sojowy", "100 g Skyr", "1 szt. Limonka", "10 g Sriracha", "Imbir"],
      ["Soba. Ugotuj zgodnie z instrukcją, przepłucz chłodną wodą.", "Tofu. Pokrój i zrumień na suchej patelni lub użyj gotowego tofu wędzonego.", "Sos. Wymieszaj masło orzechowe, skyr, soję, limonkę, srirachę i odrobinę wody.", "Połączenie. Wymieszaj sobę z tofu, edamame, warzywami i sosem."]),
    R("d35","Ryżowy Bowl z Łososiem, Sriracha Mayo i Awokado","Europejska",["dinner"],"Ryby i owoce morza",15,82,"fresh",
      "",
      ["220 g Łosoś (surowy do usmażenia lub upieczony)", "160 g Ryż jaśminowy (suchy)", "80 g Awokado", "80 g Edamame", "300 g Ogórek i marchew", "30 g Lekki majonez", "100 g Skyr", "15 g Sriracha", "15 ml Sos sojowy", "1 szt. Limonka"],
      ["Ryż. Ugotuj ryż i lekko przestudź.", "Łosoś. Jeśli surowy, usmaż 7–8 minut na patelni lub w air fryerze.", "Sos. Wymieszaj majonez, skyr, srirachę i limonkę.", "Złożenie. Do misek włóż ryż, łososia, awokado, edamame i warzywa. Polej sosem i soją."]),
    R("d36","Makaron Aglio e Olio z Kurczakiem, Brokułem i Parmezanem","Europejska",["dinner"],"Drób",20,88,"fresh",
      "",
      ["200 g Makaron (suchy)", "170 g Pierś z kurczaka (masa surowa)", "300 g Brokuł", "40 g Parmezan", "10 g Oliwa", "4 ząbki Czosnek", "Chili i natka", "1 szt. Cytryna"],
      ["Makaron. Ugotuj al dente; brokuł wrzuć do tego samego garnka na ostatnie 3 minuty.", "Kurczak. Pokrój cienko i smaż 7–8 minut; odłóż.", "Aglio e olio. Na małym ogniu podgrzej oliwę z czosnkiem i chili przez 45 sekund.", "Połączenie. Dodaj makaron, brokuł, kurczaka, parmezan i trochę wody. Dopraw cytryną i natką."]),
    R("d37","Pinsa z Mortadelą, Burratą, Pistacjami i Rukolą","Europejska",["dinner"],"Roślinne",15,65,"fresh",
      "",
      ["430 g Spód do pinsy", "80 g Mortadela", "100 g Burrata", "15 g Pistacje", "100 g Passata", "80 g Rukola", "Skórka z cytryny", "Pieprz"],
      ["Pieczenie. Spód posmaruj cienko passatą i piecz zgodnie z instrukcją, zwykle 7–9 minut w 230°C.", "Burrata. Wyjmij wcześniej z lodówki i osusz.", "Złożenie. Na gorącej pinsie ułóż mortadelę, porwaną burratę i rukolę.", "Wykończenie. Posyp pistacjami, pieprzem i skórką z cytryny."]),
    R("d38","Pinsa z Tuńczykiem, Czerwoną Cebulą, Oliwkami i Mozzarellą","Europejska",["dinner"],"Ryby i owoce morza",16,88,"fresh",
      "",
      ["420 g Spód do pinsy", "130 g Tuńczyk w sosie własnym (po odsączeniu)", "100 g Mozzarella", "150 g Passata", "40 g Oliwki", "100 g Czerwona cebula", "Oregano i chili", "5 g Oliwa"],
      ["Spód. Posmaruj passatą i posyp oregano.", "Dodatki. Rozłóż dobrze odciśniętego tuńczyka, mozzarellę, cebulę i oliwki.", "Pieczenie. Piecz 8–10 minut w 230°C.", "Wykończenie. Dodaj chili, pieprz i kilka kropli oliwy."]),
    R("d39","Pinsa z Kurczakiem Pesto, Mozzarellą i Pomidorkami","Europejska",["dinner"],"Drób",18,92,"fresh",
      "",
      ["370 g Spód do pinsy", "190 g Pierś z kurczaka (upieczona lub usmażona)", "80 g Mozzarella", "20 g Pesto", "250 g Pomidorki", "60 g Rukola", "Pieprz i cytryna"],
      ["Spód. Posmaruj połową pesto rozcieńczonego łyżką wody.", "Dodatki. Rozłóż kurczaka, mozzarellę i pomidorki.", "Pieczenie. Piecz 8–10 minut w 230°C.", "Wykończenie. Dodaj rukolę, pozostałe pesto, pieprz i cytrynę."]),
    R("d40","Pinsa z Halloumi, Harissą, Papryką i Miodem","Europejska",["dinner"],"Roślinne",18,78,"fresh",
      "",
      ["410 g Spód do pinsy", "120 g Halloumi", "50 g Hummus", "250 g Pieczona papryka", "25 g Harissa", "15 g Miód", "100 g Skyr", "Mięta i cytryna"],
      ["Baza. Wymieszaj hummus z harissą i rozsmaruj cienko na spodzie.", "Dodatki. Rozłóż paprykę i cienkie plastry halloumi.", "Pieczenie. Piecz 8–10 minut w 230°C.", "Wykończenie. Skrop miodem i cytryną; podaj ze skyrem i miętą."]),
    R("d41","Loaded Potato z Tuńczykiem, Serkiem Wiejskim i Kukurydzą","Europejska",["dinner"],"Ryby i owoce morza",15,110,"fresh",
      "",
      ["875 g Duże ziemniaki", "40 g Cheddar", "150 g Tuńczyk w sosie własnym", "250 g Serek wiejski", "100 g Skyr", "80 g Kukurydza", "120 g Ogórek kiszony", "Szczypiorek i pieprz"],
      ["Ziemniaki. Nakłuj i podgrzewaj w mikrofali 8–10 minut; opcjonalnie dopiecz 5 minut w air fryerze.", "Nadzienie. Wymieszaj tuńczyka, serek, skyr, kukurydzę, pikle i szczypiorek.", "Złożenie. Natnij ziemniaki, rozgnieć środek widelcem i nałóż nadzienie.", "Wykończenie. Posyp cheddarem i podgrzej minutę, aż zmięknie."]),
    R("d42","Shakshuka Express z Ciecierzycą, Fetą i Pieczywem","Bliski Wschód",["dinner"],"Roślinne",20,91,"fresh",
      "",
      ["240 g Jajka (4 szt.)", "150 g Ciecierzyca", "400 g Passata", "60 g Feta", "5 g Oliwa", "20 g Harissa", "Kumin i papryka wędzona", "190 g Chleb na zakwasie", "150 g Skyr", "Natka pietruszki"],
      ["Sos. Na oliwie podgrzej harissę i przyprawy, dodaj passatę oraz ciecierzycę; gotuj 8 minut.", "Jajka. Zrób zagłębienia, wbij jajka, przykryj i gotuj 5–7 minut.", "Feta. Pokrusz fetę i dodaj po zdjęciu z ognia.", "Podanie. Podaj ze skyrem, natką i chrupiącym pieczywem."]),
    R("d43","Tortilla Pizza z Szynką Cotto, Mozzarellą i Pieczarkami","Europejska",["dinner"],"Wieprzowina",12,89,"fresh",
      "",
      ["230 g Tortille", "160 g Szynka cotto", "120 g Mozzarella", "150 g Passata", "250 g Pieczarki", "100 g Skyr", "Oregano i chili"],
      ["Spody. Tortille ułóż na blasze lub suchej patelni.", "Dodatki. Posmaruj passatą, dodaj pieczarki, szynkę i mozzarellę.", "Pieczenie. Piecz 7–9 minut w 220°C lub smaż pod przykryciem na małym ogniu.", "Podanie. Posyp oregano, chili i podaj ze skyrem jako dipem."]),
    R("d44","Hummus Plate z Jajkami, Pitą, Fetą i Warzywami","Bliski Wschód",["dinner"],"Roślinne",12,85,"fresh",
      "",
      ["120 g Hummus", "240 g Jajka (4 szt.)", "170 g Pita", "50 g Feta", "150 g Skyr", "450 g Pomidor, ogórek i rzodkiewka", "Za’atar, sumak, cytryna"],
      ["Jajka. Ugotuj 7–8 minut lub użyj przygotowanych wcześniej.", "Pita. Podgrzej w tosterze lub na suchej patelni.", "Sos. Wymieszaj skyr z cytryną, solą i odrobiną sumaku.", "Złożenie. Rozsmaruj hummus, dodaj jajka, warzywa, fetę, zioła i za’atar. Podaj z pitą."]),
    R("d45","Fit Nachos z Indykiem, Fasolą, Cheddarem i Salsą","Europejska",["dinner"],"Drób",20,96,"fresh",
      "",
      ["180 g Tortille", "180 g Mielony indyk 5%", "150 g Czarna fasola", "50 g Cheddar", "200 g Salsa", "150 g Skyr", "Kumin, papryka, chili", "Limonka i kolendra"],
      ["Chipsy. Tortille pokrój w trójkąty i piecz 6–8 minut w 200°C.", "Indyk. Smaż z przyprawami 6–7 minut, dodaj fasolę i połowę salsy.", "Zapiekanie. Na chipsach rozłóż mięso i cheddar; zapiekaj 3–4 minuty.", "Podanie. Dodaj resztę salsy, skyr, limonkę i kolendrę."]),
    R("d46","Burger Bowl z Wołowiną, Ziemniakami i Sosem Big Mac Light","Amerykańska",["dinner"],"Wołowina",25,105,"fresh",
      "",
      ["250 g Mielona wołowina 5%", "775 g Ziemniaki", "50 g Cheddar", "5 g Oliwa", "350 g Sałata, pomidor i cebula", "150 g Ogórki konserwowe", "150 g Skyr", "20 g Lekki majonez", "15 g Musztarda", "20 g Ketchup", "10 ml Sok z ogórków"],
      ["Ziemniaki. Pokrój, wymieszaj z oliwą i piecz 18–20 minut w air fryerze.", "Wołowina. Smaż na mocnej patelni 6–7 minut, dopraw solą, pieprzem i papryką.", "Sos. Wymieszaj skyr, majonez, musztardę, ketchup i sok z ogórków.", "Złożenie. Do misek włóż sałatę, ziemniaki, wołowinę, cheddar, pikle i sos."]),
    R("d47","Quesadilla z Krewetkami, Awokado i Cheddarem","Meksykańska",["dinner"],"Ryby i owoce morza",15,98,"fresh",
      "",
      ["190 g Krewetki", "210 g Tortille", "80 g Cheddar", "100 g Awokado", "150 g Skyr", "250 g Papryka i cebula", "Limonka, kumin i chili"],
      ["Krewetki. Smaż z papryką, cebulą, kuminem i chili 4–5 minut; dopraw limonką.", "Składanie. Na tortillach ułóż krewetki i cheddar; złóż na pół.", "Smażenie. Smaż po 2 minuty z każdej strony na suchej patelni.", "Podanie. Podaj z awokado rozgniecionym z limonką oraz skyrem."]),
    R("d48","Pinsa Bianca z Prosciutto Cotto, Ricottą, Szpinakiem i Cytryną","Europejska",["dinner"],"Roślinne",18,89,"fresh",
      "",
      ["370 g Spód do pinsy", "150 g Prosciutto cotto", "150 g Ricotta", "20 g Parmezan", "200 g Szpinak", "5 g Oliwa", "Skórka z cytryny i pieprz"],
      ["Krem. Wymieszaj ricottę z parmezanem, pieprzem i skórką z cytryny.", "Spód. Rozsmaruj krem na pinsie, dodaj połowę szpinaku.", "Pieczenie. Piecz 8–10 minut w 230°C.", "Wykończenie. Dodaj szynkę cotto, resztę szpinaku, kilka kropli oliwy i cytrynę."])
  ];}

  // specjalne pseudo-pozycje trybu dnia (wpisywane w komórki planu)
  const SPECIAL = {
    "__zupa__": {name:"🍜 Dzień zupy / botwinka / rosół", prot:35, note:"Świadomy dzień z niższym białkiem — OK w skali tygodnia."},
    "__mias__": {name:"🍽️ Na mieście / lunch w pracy (Powiśle)", prot:40, note:"Wybrany posiłek poza domem — nie liczy się do gotowania."},
    "__kater__":{name:"📦 Katering dietetyczny", prot:45, note:"Dostawa — bez gotowania tego dnia."}
  };

  function seedWeek(){ return mkWeek({
      "Pon":{b:"b07", l:"l01", di:"d01"},
      "Wt":{b:"b07", l:"l01", di:"d01"},
      "Śr":{b:"b08", l:"l36", di:"d36"},
      "Czw":{b:"b08", l:"l36", di:"d36"},
      "Pt":{b:"b21", l:"l03", di:"d16"},
      "Sob":{b:"b21", l:"l03", di:"d16"},
      "Nd":{b:"b01", l:"l17", di:"d40"}
    }); }
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
    [["twarogu tłustego","twaróg tłusty","tłusty twaróg"],[16,3,9]],
    [["twarogu chudego","twaróg chudy","chudy twaróg","chudego twarogu"],[19,1,1]],
    [["twarogu półtłustego","twaróg półtłusty","twarogu","twaróg"],[18,3,5]],
    [["serek śmietankowy","serka śmietankowego","biały serek do smarowania","serek do smarowania"],[7,4,25]],
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
    [["mleka 3,2","mleko 3,2","mleka 3.2","mleko pełne"],[3,5,3.2]],
    [["mleka 0,5","mleko 0,5","mleka 1,5","mleko 1,5","mleko chude"],[3,5,1]],
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
    [["brokuł","cukini","bakłażan","papryk","marchew","cebul","por ","seler","ogór","pomidor","rzodkiew","kiełk","grzyb","pieczar","dyni","kapust"],[2,5,1]],
    [["czosnk","czosnek","imbir","chili","trawa cytrynowa","galangal"],[3,10,1]],
    [["groszek"],[5,14,1]],

    // ── uzupełnienia z dokumentów (spójność dla własnych przepisów) ──
    [["ananas"],[1,13,0]],
    [["bajgle"],[10,50,3]],
    [["bajgle pełnoziarniste"],[10,50,3]],
    [["burrata"],[13,3,24]],
    [["chorizo"],[24,2,38]],
    [["focaccia"],[8,50,9]],
    [["gnocchi"],[3,30,1]],
    [["kuskus"],[13,72,1]],
    [["maślane croissanty"],[8,45,21]],
    [["miso"],[12,26,6]],
    [["one"],[4,4,44]],
    [["pak choi"],[2,2,0]],
    [["pasta miso"],[12,26,6]],
    [["pestki granatu"],[2,19,1]],
    [["pesto"],[5,6,44]],
    [["pesto pistacjowe"],[5,6,44]],
    [["prosciutto cotto"],[27,0,13]],
    [["quinoa"],[14,64,6]],
    [["ricotta"],[11,3,13]],
    [["ser"],[11,3,4]],
    [["sos"],[3,44,1]],
    [["sriracha"],[2,19,1]],
    [["za'atar"],[9,50,10]],
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
    if(/masło orzechow|masła orzechow/.test(n)) return 20;
    if(/masł[oa]\b|masło/.test(n)) return 15;
    if(/jajk|jajo|jaj\b/.test(n)) return 55;              // ~1 jajko, gdy brak liczby (np. panierka)
    if(/miód|miod|syrop/.test(n)) return 20;
    if(/granol/.test(n)) return 40;
    if(/panko|bułka tart|bułką tart|mąk/.test(n)) return 30;
    if(/jogurt|śmietan/.test(n)) return 100;
    if(/serek|serka|twaróg|twarog/.test(n)) return 60;
    if(/ser |sera|feta|parmezan|mozzarell/.test(n)) return 40;
    if(/orzech|orzeszk|sezam|migdał|nasion|pestk|słonecznik/.test(n)) return 20;
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
      // Żaden składnik się nie sparsował — ostatnia deska ratunku z deklarowanego białka.
      const p=+(r.proteinTotal||0);
      return { kcal: Math.round((p*4+p*3.2+p*1.6*9)/10)*10, carbs: Math.round(p*0.8), fat: Math.round(p*0.4), protein: p, auto:true, lowConf:true };
    }
    // Białko, węgle, tłuszcz i kcal liczymy WYŁĄCZNIE ze składników — jedno źródło prawdy.
    // Deklarowane proteinTotal nie jest już używane do korekty (dawny clamp fs zaniżał kcal).
    // kcal = dokładnie 4P+4C+9F z zaokrąglonych makr, żeby przepis był wewnętrznie spójny.
    const Pr = Math.round(P), Cr = Math.round(C), Fr = Math.round(F);
    const kcal = Pr*4 + Cr*4 + Fr*9;
    return { kcal, carbs: Cr, fat: Fr, protein: Pr, auto:true };
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
  function carbAdjMeal(d, mk){
    if(mk!=="lunch" && mk!=="dinner") return 1;
    const a=(state.carbAdj||{})[d];
    if(a==null) return 1;
    if(typeof a==="number") return isFinite(a)?a:1;   // legacy (dzień)
    const v = mk==="lunch" ? a.l : a.di;
    return (v==null||!isFinite(v))?1:v;
  }
  function carbAdjOf(d){
    const a=(state.carbAdj||{})[d];
    if(a==null) return 1;
    if(typeof a==="number") return isFinite(a)?a:1;
    const l=(a.l==null||!isFinite(a.l))?1:a.l, di=(a.di==null||!isFinite(a.di))?1:a.di;
    return Math.min(l,di);
  }
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
    MEALS.forEach(([mk])=>{ const r=findR(state.week[d][mk].recipeId); if(r) C+=(+r.carbs||0)*(adjusted?carbAdjMeal(d,mk):1); });
    const sh=findR(state.week[d].shakeId||""); if(sh) C+=(+sh.carbs||0);
    return C;
  }
  function mealMacro(d, mk){
    const {m,k}=split(); const {c:cs, ck:cks}=splitCF(); const {f:fs, fk:fks}=splitFat();
    const meal=state.week[d][mk]; const rr=findR(meal.recipeId); const ca=carbAdjMeal(d,mk);
    const T={p:0,c:0,f:0,kcal:0,fib:0}, K={p:0,c:0,f:0,kcal:0,fib:0};
    if(SPECIAL[meal.recipeId]){ const pr=mealProt(meal); T.p=pr;K.p=pr;T.kcal=pr*4;K.kcal=pr*4; }
    else if(rr && rr.ty && rr.mg){ T.p=+rr.ty.p||0;T.c=(+rr.ty.c||0)*ca;T.f=+rr.ty.f||0;T.kcal=+rr.ty.kcal||0;T.fib=+rr.ty.fib||0; K.p=+rr.mg.p||0;K.c=(+rr.mg.c||0)*ca;K.f=+rr.mg.f||0;K.kcal=+rr.mg.kcal||0;K.fib=+rr.mg.fib||0; }
    else if(rr){ T.p=rr.proteinTotal*m;K.p=rr.proteinTotal*k;T.c=(+rr.carbs||0)*cs*ca;K.c=(+rr.carbs||0)*cks*ca;T.f=(+rr.fat||0)*fs;K.f=(+rr.fat||0)*fks;T.kcal=(+rr.kcal||0)*m;K.kcal=(+rr.kcal||0)*k; }
    return {ty:T, mg:K};
  }
  function dayPersonMacros(d){
    const {m,k}=split(); const {c:cs, ck:cks}=splitCF(); const {f:fs, fk:fks}=splitFat();
    const T={p:0,c:0,f:0,kcal:0,fib:0,sat:0,unsat:0}, K={p:0,c:0,f:0,kcal:0,fib:0,sat:0,unsat:0};
    MEALS.forEach(([mk])=>{ const meal=state.week[d][mk]; const rr=findR(meal.recipeId); const ca=carbAdjMeal(d,mk);
      if(SPECIAL[meal.recipeId]){ const pr=mealProt(meal); T.p+=pr; K.p+=pr; T.kcal+=pr*4; K.kcal+=pr*4; }
      else if(rr && rr.ty && rr.mg){
        T.p+=+rr.ty.p||0; T.c+=(+rr.ty.c||0)*ca; T.f+=+rr.ty.f||0; T.kcal+=+rr.ty.kcal||0; T.fib+=+rr.ty.fib||0; T.sat+=+rr.ty.sat||0; T.unsat+=+rr.ty.unsat||0;
        K.p+=+rr.mg.p||0; K.c+=(+rr.mg.c||0)*ca; K.f+=+rr.mg.f||0; K.kcal+=+rr.mg.kcal||0; K.fib+=+rr.mg.fib||0; K.sat+=+rr.mg.sat||0; K.unsat+=+rr.mg.unsat||0;
      } else if(rr){
        T.p+=rr.proteinTotal*m; K.p+=rr.proteinTotal*k; T.c+=(+rr.carbs||0)*cs*ca; K.c+=(+rr.carbs||0)*cks*ca; T.f+=(+rr.fat||0)*fs; K.f+=(+rr.fat||0)*fks; T.kcal+=(+rr.kcal||0)*m; K.kcal+=(+rr.kcal||0)*k;
      }
    });
    const sh=findR(state.week[d].shakeId||"");
    if(sh){ T.p+=sh.proteinTotal*m; K.p+=sh.proteinTotal*k; T.c+=(+sh.carbs||0)*cs; K.c+=(+sh.carbs||0)*cks; T.f+=(+sh.fat||0)*fs; K.f+=(+sh.fat||0)*fks; T.kcal+=(+sh.kcal||0)*m; K.kcal+=(+sh.kcal||0)*k; }
    const ap2=+state.week[d].addP2||0, ap1=+state.week[d].addP1||0;
    T.p+=ap2; K.p+=ap1; T.kcal+=ap2*4; K.kcal+=ap1*4;
    const anyCarb = Math.abs(carbAdjMeal(d,"lunch")-1)>=0.03 || Math.abs(carbAdjMeal(d,"dinner")-1)>=0.03;
    [T,K].forEach(o=>{ o.p=Math.round(o.p); o.c=Math.round(o.c); o.f=Math.round(o.f); o.fib=Math.round(o.fib*10)/10; o.sat=Math.round(o.sat*10)/10; o.unsat=Math.round(o.unsat*10)/10; });
    if(anyCarb){ T.kcal=Math.round(T.p*4+T.c*4+T.f*9); K.kcal=Math.round(K.p*4+K.c*4+K.f*9); } else { T.kcal=Math.round(T.kcal); K.kcal=Math.round(K.kcal); }
    return {ty:T, mg:K};
  }
  function fitCarbsToTarget(){
    const T=state.targets;
    const targetTotal=(+T.carb1||0)+(+T.carb2||0); // węgle obojga razem
    if(!targetTotal){ alert("Ustaw cele węglowodanów w nagłówku."); return; }
    const FLOOR=0.70;                 // danie musi zostać daniem — max ~30% mniej dodatku na posiłek
    let changed=0; const stuck=[];
    DAYS.forEach(d=>{
      const bfC=(()=>{ let c=0; ["breakfast"].forEach(mk=>{ const r=findR(state.week[d][mk].recipeId); if(r) c+=(+r.carbs||0); }); const sh=findR(state.week[d].shakeId||""); if(sh) c+=(+sh.carbs||0); return c; })();
      const luR=findR(state.week[d].lunch.recipeId),  diR=findR(state.week[d].dinner.recipeId);
      const luC=luR?(+luR.carbs||0):0, diC=diR?(+diR.carbs||0):0;
      const dayC=bfC+luC+diC;
      if(dayC<=0){ state.carbAdj[d]={l:1,di:1}; return; }
      let need = dayC - targetTotal;          // ile węgli trzeba ZDJĄĆ (oboje)
      if(need<=0){ state.carbAdj[d]={l:1,di:1}; return; }  // tniemy tylko w dół
      // 1) najpierw obiad do minimum
      const maxCutL = luC*(1-FLOOR);
      const cutL = Math.max(0, Math.min(need, maxCutL));
      const fL = luC>0 ? (luC-cutL)/luC : 1;
      need -= cutL;
      // 2) potem kolacja do minimum
      const maxCutD = diC*(1-FLOOR);
      const cutD = Math.max(0, Math.min(need, maxCutD));
      const fD = diC>0 ? (diC-cutD)/diC : 1;
      need -= cutD;
      state.carbAdj[d]={ l:Math.round(fL*100)/100, di:Math.round(fD*100)/100 };
      if(Math.abs(fL-1)>=0.03 || Math.abs(fD-1)>=0.03) changed++;
      if(need>3) stuck.push(d);                // nadal powyżej celu przy minimalnych dodatkach
    });
    queueSave(); renderWeek();
    let msg="Dopasowano węgle w "+changed+" dniach.\n\nKOLEJNOŚĆ CIĘCIA:\n• śniadania — NIE ruszam\n• najpierw OBIAD (dodatki w dół do minimum)\n• potem KOLACJA\n\nSkaluję tylko dodatki (ryż, kasza, ziemniaki, bataty, frytki); pieczywo, tortille, makaron i owsianki zostają. Minimum = 70% porcji dodatku.";
    if(stuck.length) msg+="\n\n⚠ W tych dniach nie da się zejść niżej bez cięcia białka i tłuszczu (obiad i kolacja już na minimum dodatków):\n"+stuck.join(", ")+".";
    alert(msg);
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
  function ratingObj(recipeId){ let v=(state.ratings||{})[recipeId]; if(typeof v==="number") return {ty:v,mg:v}; return v||{}; }
  function getRatingBy(recipeId,who){ return +ratingObj(recipeId)[who]||0; }
  function getRating(recipeId){ const o=ratingObj(recipeId); const vs=["ty","mg"].map(w=>+o[w]||0).filter(x=>x>0); return vs.length? Math.round((vs.reduce((a,b)=>a+b,0)/vs.length)*10)/10 : 0; }
  function setRating(recipeId,who,v){
    state.ratings=state.ratings||{};
    let o=state.ratings[recipeId]; if(typeof o==="number") o={ty:o,mg:o}; o=o||{};
    if(+o[who]===v) delete o[who]; else o[who]=v;
    if(!o.ty && !o.mg) delete state.ratings[recipeId]; else state.ratings[recipeId]=o;
    queueSave();
  }
  function starsHTML(recipeId, cls){
    const row=(who,lab)=>{ const rv=getRatingBy(recipeId,who); let h=`<span class="kk-rlab" style="font-size:11px;color:#6b7280;display:inline-block;min-width:38px;">${lab}</span><span class="kk-stars ${cls||""}" data-rid="${recipeId}" data-who="${who}">`; for(let i=1;i<=5;i++) h+=`<span class="kk-star ${i<=rv?"on":""}" data-v="${i}">★</span>`; h+=`</span>`; return h; };
    const avg=getRating(recipeId);
    let h=`<div style="display:flex;flex-direction:column;gap:1px;"><div>${row("ty","Ty")}</div><div>${row("mg","Magda")}</div>${avg>0?`<div style="font-size:11px;color:#6b7280;">średnia ${avg}★</div>`:""}</div>`;
    return h;
  }
  function bindStars(root){
    root.querySelectorAll(".kk-star").forEach(st=> st.addEventListener("click",e=>{
      e.stopPropagation();
      const wrap=e.target.closest(".kk-stars");
      setRating(wrap.dataset.rid, wrap.dataset.who||"ty", +e.target.dataset.v);
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
      { const mm=(typeof MACROS!=="undefined"&&MACROS[r.id])?MACROS[r.id]:estimateMacros(r); r.proteinTotal=mm.protein; r.kcal=mm.kcal; r.carbs=mm.carbs; r.fat=mm.fat; if(typeof SEASON_DOC!=="undefined"&&SEASON_DOC[r.id]) r.season=SEASON_DOC[r.id]; if(typeof PMAC!=="undefined"&&PMAC[r.id]){ r.ty=PMAC[r.id].ty; r.mg=PMAC[r.id].mg; r.rsplitP=PMAC[r.id].sp; r.rsplitC=PMAC[r.id].sc; r.rsplitF=PMAC[r.id].sf; } if(typeof SIDE!=="undefined"&&SIDE[r.id]){ Object.assign(r, SIDE[r.id]); } }
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
      { id:"w_t1", name:"Tydzień 1", mult:{}, week: mkWeek({
      "Pon":{b:"b07", l:"l01", di:"d01"},
      "Wt":{b:"b07", l:"l01", di:"d01"},
      "Śr":{b:"b08", l:"l36", di:"d36"},
      "Czw":{b:"b08", l:"l36", di:"d36"},
      "Pt":{b:"b21", l:"l03", di:"d16"},
      "Sob":{b:"b21", l:"l03", di:"d16"},
      "Nd":{b:"b01", l:"l17", di:"d40"}
    }) },
      { id:"w_t2", name:"Tydzień 2", mult:{}, week: mkWeek({
      "Pon":{b:"b05", l:"l11", di:"d02"},
      "Wt":{b:"b05", l:"l11", di:"d02"},
      "Śr":{b:"b14", l:"l07", di:"d35"},
      "Czw":{b:"b14", l:"l07", di:"d35"},
      "Pt":{b:"b28", l:"l32", di:"d15"},
      "Sob":{b:"b28", l:"l32", di:"d15"},
      "Nd":{b:"b03", l:"l18", di:"d47"}
    }) },
      { id:"w_t3", name:"Tydzień 3", mult:{}, week: mkWeek({
      "Pon":{b:"b02", l:"l09", di:"d03"},
      "Wt":{b:"b02", l:"l09", di:"d03"},
      "Śr":{b:"b15", l:"l40", di:"d19"},
      "Czw":{b:"b15", l:"l40", di:"d19"},
      "Pt":{b:"b44", l:"l22", di:"d28"},
      "Sob":{b:"b44", l:"l22", di:"d28"},
      "Nd":{b:"b06", l:"l33", di:"d38"}
    }) },
      { id:"w_t4", name:"Tydzień 4", mult:{}, week: mkWeek({
      "Pon":{b:"b04", l:"l30", di:"d04"},
      "Wt":{b:"b04", l:"l30", di:"d04"},
      "Śr":{b:"b16", l:"l04", di:"d22"},
      "Czw":{b:"b16", l:"l04", di:"d22"},
      "Pt":{b:"b22", l:"l16", di:"d27"},
      "Sob":{b:"b22", l:"l16", di:"d27"},
      "Nd":{b:"b30", l:"l46", di:"d44"}
    }) },
      { id:"w_t5", name:"Tydzień 5", mult:{}, week: mkWeek({
      "Pon":{b:"b13", l:"l10", di:"d23"},
      "Wt":{b:"b13", l:"l10", di:"d23"},
      "Śr":{b:"b17", l:"l08", di:"d05"},
      "Czw":{b:"b17", l:"l08", di:"d05"},
      "Pt":{b:"b43", l:"l13", di:"d25"},
      "Sob":{b:"b43", l:"l13", di:"d25"},
      "Nd":{b:"b10", l:"l19", di:"d45"}
    }) },
      { id:"w_t6", name:"Tydzień 6", mult:{}, week: mkWeek({
      "Pon":{b:"b33", l:"l25", di:"d06"},
      "Wt":{b:"b33", l:"l25", di:"d06"},
      "Śr":{b:"b18", l:"l31", di:"d20"},
      "Czw":{b:"b18", l:"l31", di:"d20"},
      "Pt":{b:"b12", l:"l27", di:"d29"},
      "Sob":{b:"b12", l:"l27", di:"d29"},
      "Nd":{b:"b23", l:"l37", di:"d41"}
    }) },
      { id:"w_t7", name:"Tydzień 7", mult:{}, week: mkWeek({
      "Pon":{b:"b34", l:"l28", di:"d07"},
      "Wt":{b:"b34", l:"l28", di:"d07"},
      "Śr":{b:"b19", l:"l48", di:"d21"},
      "Czw":{b:"b19", l:"l48", di:"d21"},
      "Pt":{b:"b39", l:"l20", di:"d30"},
      "Sob":{b:"b39", l:"l20", di:"d30"},
      "Nd":{b:"b24", l:"l44", di:"d48"}
    }) },
      { id:"w_t8", name:"Tydzień 8", mult:{}, week: mkWeek({
      "Pon":{b:"b35", l:"l43", di:"d08"},
      "Wt":{b:"b35", l:"l43", di:"d08"},
      "Śr":{b:"b20", l:"l26", di:"d14"},
      "Czw":{b:"b20", l:"l26", di:"d14"},
      "Pt":{b:"b40", l:"l21", di:"d39"},
      "Sob":{b:"b40", l:"l21", di:"d39"},
      "Nd":{b:"b29", l:"l47", di:"d26"}
    }) },
      { id:"w_t9", name:"Tydzień 9", mult:{}, week: mkWeek({
      "Pon":{b:"b36", l:"l02", di:"d09"},
      "Wt":{b:"b36", l:"l02", di:"d09"},
      "Śr":{b:"b27", l:"l38", di:"d18"},
      "Czw":{b:"b27", l:"l38", di:"d18"},
      "Pt":{b:"b45", l:"l14", di:"d33"},
      "Sob":{b:"b45", l:"l14", di:"d33"},
      "Nd":{b:"b09", l:"l34", di:"d42"}
    }) },
      { id:"w_t10", name:"Tydzień 10", mult:{}, week: mkWeek({
      "Pon":{b:"b25", l:"l12", di:"d10"},
      "Wt":{b:"b25", l:"l12", di:"d10"},
      "Śr":{b:"b31", l:"l06", di:"d17"},
      "Czw":{b:"b31", l:"l06", di:"d17"},
      "Pt":{b:"b26", l:"l15", di:"d32"},
      "Sob":{b:"b26", l:"l15", di:"d32"},
      "Nd":{b:"b32", l:"l39", di:"d46"}
    }) },
      { id:"w_t11", name:"Tydzień 11", mult:{}, week: mkWeek({
      "Pon":{b:"b41", l:"l05", di:"d11"},
      "Wt":{b:"b41", l:"l05", di:"d11"},
      "Śr":{b:"b37", l:"l29", di:"d13"},
      "Czw":{b:"b37", l:"l29", di:"d13"},
      "Pt":{b:"b42", l:"l23", di:"d31"},
      "Sob":{b:"b42", l:"l23", di:"d31"},
      "Nd":{b:"b38", l:"l41", di:"d43"}
    }) },
      { id:"w_t12", name:"Tydzień 12", mult:{}, week: mkWeek({
      "Pon":{b:"b47", l:"l45", di:"d37"},
      "Wt":{b:"b47", l:"l45", di:"d37"},
      "Śr":{b:"b11", l:"l24", di:"d24"},
      "Czw":{b:"b11", l:"l24", di:"d24"},
      "Pt":{b:"b48", l:"l35", di:"d34"},
      "Sob":{b:"b48", l:"l35", di:"d34"},
      "Nd":{b:"b46", l:"l42", di:"d12"}
    }) }
    ];
  }
  function defaultState(){
    return { targets:{ p1:115, p2:160, splitM:58, splitF:56, splitC:53, kcal1:1800, kcal2:2250, fat1:60, fat2:75, carb1:200, carb2:225, fib1:28, fib2:35 }, recipes:seed(), week:seedWeek(), shopping:[], prep:[], mult:{ fr1:2 }, freezer:[], carbAdj:{}, cooked:[], ratings:{}, recipesVersion:RECIPES_VERSION, shopDays:null, shopView:"recipe", shopSum:false, shopMode:"engine", shopWeek:1, presetChecked:{}, prepMode:"engine", prepWeek:1, prepChecked:{}, season:"all", savedWeeks:seedSavedWeeks(), prevWeekIds:[], genTempo:"mix", batchExtra:{} };
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
      const mine=(state.recipes||[]).filter(r=> r.userAdded===true && !freshIds.has(r.id));
      // 2) zachowaj Wasze notatki przy wbudowanych przepisach
      const notes={}; (state.recipes||[]).forEach(r=>{ if(r.unotes) notes[r.id]=r.unotes; });
      fresh.forEach(r=>{ if(notes[r.id]) r.unotes=notes[r.id]; });
      // przelicz makro własnych przepisów ze składników (nowe, jedno źródło prawdy)
      mine.forEach(r=>{ const mm=estimateMacros(r); r.proteinTotal=mm.protein; r.kcal=mm.kcal; r.carbs=mm.carbs; r.fat=mm.fat; });
      state.recipes=fresh.concat(mine);
      // 3) zaktualizuj cele do uzgodnionych wartości
      const D=defaultState().targets;
      state.targets=Object.assign({}, state.targets||{}, D);
      // 4) wyczyść korekty węgli (odnoszą się do starych gramatur)
      state.carbAdj={};
      // 4b) ustaw nowy wzorcowy tydzień (fit-przepisy z powtórzeniami pod batch cooking)
      state.week=seedWeek();
      state.savedWeeks=seedSavedWeeks();
      state.prevWeekIds=[];
      state.carbAdj={};
      state.mult={};
      // 5) usuń stare zadania prep bez znacznika (rosły w nieskończoność) i stare pozycje zakupów
      const AUTO_TXT=/^(Zamarynuj i zamroź|Ugotuj na zapas i zamroź|Świeżo w dniu podania|Rozłóż porcje)/;
      state.prep=(state.prep||[]).filter(t=> !(t.auto || t.srcId || AUTO_TXT.test(t.text||"")) );
      state.shopping=(state.shopping||[]).filter(it=> it.auto===false );
      state.targets=state.targets||{};
      state.targets.kcal2=2250; state.targets.p2=160; state.targets.fat2=75; state.targets.carb2=225; state.targets.fib2=35;
      state.targets.kcal1=1800; state.targets.p1=115; state.targets.fat1=60; state.targets.carb1=200; state.targets.fib1=28;
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
    if(!state.shopMode) state.shopMode="engine";
    if(!state.shopWeek) state.shopWeek=1;
    if(!state.presetChecked) state.presetChecked={};
    if(!state.eaten) state.eaten={};
    if(!state.prepMode) state.prepMode="engine";
    if(!state.prepWeek) state.prepWeek=1;
    if(!state.prepChecked) state.prepChecked={};
    render();
  }
  function queueSave(){ clearTimeout(saveTimer); saveTimer=setTimeout(async()=>{ try{ await window.storage.set(STORAGE_KEY,JSON.stringify(state),true);}catch(e){console.error(e);} },350); }
  function uid(p){ return p+Math.random().toString(36).slice(2,8); }
  function findR(id){ return state.recipes.find(r=>r.id===id); }
  // ── Nawigacja: otwórz kartę przepisu z dowolnego miejsca (plan tygodnia, prep) ──
  function openRecipe(id){
    const r=findR(id); if(!r) return false;
    const order=["breakfast","lunch","dinner","shake"];
    const target=order.find(mk=>(r.mealTypes||[]).includes(mk))||"breakfast";
    tab=target; refreshTabs();
    setTimeout(()=>{
      const card=document.querySelector('.kk-panel[data-panel="'+target+'"] .kk-card[data-id="'+id+'"]');
      if(!card) return;
      card.scrollIntoView({behavior:"smooth",block:"center"});
      const det=card.querySelector("details"); if(det) det.open=true;
      const prev=card.style.boxShadow;
      card.style.transition="box-shadow .25s"; card.style.boxShadow="0 0 0 3px var(--tomato,#F0563F)";
      setTimeout(()=>{ card.style.boxShadow=prev||""; },1600);
    },60);
    return true;
  }
  // Z opisu "Pn–Wt śniadanie" itp. znajdź konkretny przepis w zapisanym tygodniu w_t{wk}
  function dotyczyRecipeIds(wk, txt){
    const sw=(state.savedWeeks||[]).find(w=>w.id==="w_t"+wk);
    if(!sw||!sw.week) return [];
    const t=(txt||"").toLowerCase();
    const days=[];
    if(/pn[–-]wt|poniedz|kolacje pn|blok pn/.test(t)) days.push("Pon");
    if(/śr[–-]czw|sr[–-]czw|środ|sroda/.test(t)) days.push("Śr");
    if(/pt[–-]sob|piąt|piat/.test(t)) days.push("Pt");
    if(/niedziel|(^|[^a-ząćęłńóśźż])nd([^a-ząćęłńóśźż]|$)/.test(t)) days.push("Nd");
    const meals=[];
    if(/śniad/.test(t)) meals.push("breakfast");
    if(/obiad/.test(t)) meals.push("lunch");
    if(/kolacj/.test(t)) meals.push("dinner");
    const ids=[];
    days.forEach(d=> meals.forEach(mk=>{ const cell=sw.week[d]; const id=cell&&cell[mk]&&cell[mk].recipeId; if(id&&findR(id)&&ids.indexOf(id)<0) ids.push(id); }));
    return ids;
  }
  // Indeks pierwszego dnia w opisie (do sortowania sekcji „Na świeżo" od poniedziałku)
  function prepDayIdx(txt){
    const t=(txt||"").toLowerCase(); let b=99;
    if(/pn[–-]wt|poniedz|kolacje pn|blok pn/.test(t)) b=Math.min(b,0);
    if(/śr[–-]czw|sr[–-]czw|środ|sroda/.test(t)) b=Math.min(b,2);
    if(/pt[–-]sob|piąt|piat/.test(t)) b=Math.min(b,4);
    if(/niedziel|(^|[^a-ząćęłńóśźż])nd([^a-ząćęłńóśźż]|$)/.test(t)) b=Math.min(b,6);
    return b;
  }
  function gotoLink(ids){ return (ids&&ids.length===1) ? ` <a class="kk-goto" data-open="${ids[0]}" style="color:var(--tomato,#F0563F);font-weight:600;cursor:pointer;white-space:nowrap;">→ przepis</a>` : ""; }
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
    let list=inMeal;
    if(showSeason && state.season!=="all") list=list.filter(r=> (r.season||"all")==="all" || r.season===state.season);
    if(cuisinesHere.length>1 && meal!=="shake" && fCuisine!=="Wszystkie") list=list.filter(r=>r.cuisine===fCuisine);
    if(!noProteinFilter && fProtein!=="Wszystkie") list=list.filter(r=>r.ptype===fProtein);
    if(state.onlyFav) list=list.filter(r=>getRating(r.id)>=4);

    html+=`<div class="kk-note" style="margin:2px 0 8px;">Pasujących przepisów: <b>${list.length}</b></div><div class="kk-grid">`;
    const {m,k}=split();
    if(list.length===0) html+=`<div class="kk-note">Brak przepisów dla tego filtra. Zmień filtr albo dodaj własny przepis niżej.</div>`;
    list.forEach(r=>{
      const pl=PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh;
      const mult=getMult(r.id);
      html+=`<div class="kk-card" data-id="${r.id}">
        <div class="kk-chead">
          <div class="kk-cuis">${esc(r.cuisine)}${r.ptype&&r.ptype!=="—"?" · "+esc(r.ptype):""}</div>
          <div class="kk-cname">${esc(r.name)}</div>
          ${r.desc?`<div class="kk-cdesc" style="font-size:12px;color:#6b7280;margin:3px 0 2px;line-height:1.4;">${esc(r.desc)}</div>`:""}
          <div class="kk-meta">
            <span>⏱ ${r.prepTime} min</span>
            <span>Białko: ${r.proteinTotal} g</span>
            <span>Ty ${r.ty?r.ty.p:Math.round(r.proteinTotal*m)} · M ${r.mg?r.mg.p:Math.round(r.proteinTotal*k)}</span>
            ${r.kcal?`<span>≈ ${r.kcal} kcal · W ${r.carbs||0} · T ${r.fat||0}</span>`:""}
            ${r.ty&&r.mg?`<span>Ty ${r.ty.kcal} kcal · M ${r.mg.kcal} kcal</span>`:""}
            ${r.ty&&r.mg&&r.ty.fib!=null?`<span>Błonnik Ty ${r.ty.fib} · M ${r.mg.fib} g · nasyc. Ty ${r.ty.sat}/M ${r.mg.sat} g</span>`:""}
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
            const sP=(r.rsplitP!=null?r.rsplitP:m), sC=(r.rsplitC!=null?r.rsplitC:cs); const share=(ing,who)=>{ const carb=isCarbFood(ing); const f = carb ? (who==="ty"?sC:1-sC) : (who==="ty"?sP:1-sP); return scalePortion(scaleIng(ing,mult), f); };
            return `<details><summary>Podział na dwie miski</summary>
            ${r.portioning?`<div class="kk-note" style="margin:0 0 6px;background:#f6f3ec;padding:6px 8px;border-radius:6px;line-height:1.45;">⚖️ <b>Podział globalny:</b> ${esc(r.portioning)}</div>`:""}
            <div class="kk-note" style="margin:0 0 6px;">Mięso/sos/tłuszcz: <b>${Math.round((r.rsplitP!=null?r.rsplitP:m)*100)}/${Math.round((1-(r.rsplitP!=null?r.rsplitP:m))*100)}</b> · Węgle: <b>${Math.round((r.rsplitC!=null?r.rsplitC:cs)*100)}/${Math.round((1-(r.rsplitC!=null?r.rsplitC:cs))*100)}</b></div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <div style="flex:1; min-width:140px;"><b style="font-size:11px;">Twoja miska</b><ul>${r.ingredients.map(i=>`<li>${esc(share(i,"ty"))}</li>`).join("")}</ul></div>
              <div style="flex:1; min-width:140px;"><b style="font-size:11px;">Miska Magdy</b><ul>${r.ingredients.map(i=>`<li>${esc(share(i,"m"))}</li>`).join("")}</ul></div>
            </div>
            <div class="kk-note" style="margin-top:4px;">Ryż i ziemniaki dzielicie niemal po równo, mięso i sos w Twoją stronę. Przyprawy „do smaku" — na oko.</div>
          </details>`; })():""}
          <details><summary>Przygotowanie</summary><ol>${r.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></details>
          ${(r.why||r.triki||r.zam||r.mealprep)?`<details><summary>Wskazówki i meal prep</summary>
            ${r.why?`<div class="kk-note" style="margin:6px 0;"><b>💡 Dlaczego działa</b><br>${esc(r.why).replace(/\n/g,"<br>")}</div>`:""}
            ${r.triki?`<div class="kk-note" style="margin:6px 0;"><b>🔥 Restauracyjne triki</b><br>${esc(r.triki).replace(/\n/g,"<br>")}</div>`:""}
            ${r.zam?`<div class="kk-note" style="margin:6px 0;"><b>🔄 Zamienniki</b><br>${esc(r.zam).replace(/\n/g,"<br>")}</div>`:""}
            ${r.mealprep?`<div class="kk-note" style="margin:6px 0;"><b>📦 Meal prep</b><br>${esc(r.mealprep).replace(/\n/g,"<br>")}</div>`:""}
          </details>`:""}
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
      if(isNew){ u.userAdded=true; state.recipes.push(u); } else state.recipes=state.recipes.map(x=>x.id===r.id?u:x);
      editing=null; queueSave(); renderMealTab(meal); renderWeek();
    });
    document.getElementById("f-kcalest").addEventListener("click",()=>{
      const tmp={ proteinTotal:+document.getElementById("f-prot").value||0, ingredients:document.getElementById("f-ing").value.split("\n").map(s=>s.trim()).filter(Boolean) };
      const mm=estimateMacros(tmp);
      document.getElementById("f-prot").value=mm.protein;
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
    const _T=state.targets;
    const cele=`<div class="kk-sgroup" style="margin-bottom:10px;"><h4>Cele dzienne (na osobę)</h4><div style="overflow-x:auto;"><table style="border-collapse:collapse;font-size:12px;min-width:440px;"><thead><tr><th style="text-align:left;padding:4px 8px;"></th><th style="padding:4px 8px;">Kalorie</th><th style="padding:4px 8px;">Białko</th><th style="padding:4px 8px;">Tłuszcz</th><th style="padding:4px 8px;">Węgle</th><th style="padding:4px 8px;">Błonnik</th></tr></thead><tbody><tr><td style="text-align:left;padding:4px 8px;font-weight:700;">Ty</td><td style="padding:4px 8px;text-align:center;"><b>${_T.kcal2}</b> kcal</td><td style="padding:4px 8px;text-align:center;"><b>${_T.p2}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.fat2}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.carb2}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.fib2!=null?_T.fib2:"—"}</b> g</td></tr><tr><td style="text-align:left;padding:4px 8px;font-weight:700;">Magda</td><td style="padding:4px 8px;text-align:center;"><b>${_T.kcal1}</b> kcal</td><td style="padding:4px 8px;text-align:center;"><b>${_T.p1}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.fat1}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.carb1}</b> g</td><td style="padding:4px 8px;text-align:center;"><b>${_T.fib1!=null?_T.fib1:"—"}</b> g</td></tr></tbody></table></div><div class="kk-note" style="margin-top:4px;">Cele po aktualizacji jadłospisu. Edycja — w nagłówku aplikacji.</div></div>`;
    let html=cele+`<div class="kk-actions-row" style="align-items:center;">
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
          ${meal.recipeId?`<div class="kk-mname"${rNow?` data-open="${rNow.id}" title="Otwórz przepis" style="cursor:pointer;text-decoration:underline dotted;"`:""}>${esc(mealName(meal))}</div>`:""}
          ${plNow?`<span class="kk-badge ${plNow[1]}" style="font-size:9px;">${plNow[0]}</span>`:""}
          ${meal.recipeId?`<div class="kk-mprot">${(SPECIAL[meal.recipeId]||(meal.recipeId+"").indexOf("frz_")===0)?"~":""}Ty ${Math.round(mealProt(meal)*(SPECIAL[meal.recipeId]?1:m))} · M ${Math.round(mealProt(meal)*(SPECIAL[meal.recipeId]?1:k))} g</div>`:""}
          ${isRepeat?`<div class="kk-repeat">↺ w zesz. tyg.</div>`:""}
          ${(()=>{ const hs=carbHints(rNow, carbAdjMeal(d,mk)); return hs.length?`<div class="kk-carbhint">${hs.map(x=>esc(x)).join("<br>")}</div>`:""; })()}
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
      DAYS.forEach(d=>{ const al=carbAdjMeal(d,"lunch"), ad=carbAdjMeal(d,"dinner");
        const pc=x=>Math.round(x*100); const cl=x=> x<0.97?"kk-miss":(x>1.03?"kk-hit":"");
        html+=`<td class="kk-dtotal" style="text-align:center;font-size:11px;"><span class="${cl(al)}" style="font-weight:700;">O ${pc(al)}%</span> · <span class="${cl(ad)}" style="font-weight:700;">K ${pc(ad)}%</span><div class="kk-tot-macro">mniej dodatków</div></td>`;
      });
      html+=`</tr>`;
    }
    html+=`<tr><th style="background:var(--slate-2);">Suma / cel</th>`;
    DAYS.forEach(d=>{
      const dm=dayPersonMacros(d);
      const pM=dm.ty.p, cM=dm.ty.c, fM=dm.ty.f, kM=dm.ty.kcal, pK=dm.mg.p, cK=dm.mg.c, fK=dm.mg.f, kK=dm.mg.kcal;
      const T=state.targets;
      const cls=(val,target,tol)=> !target ? "" : (Math.abs(val-target)<=target*(tol||0.15) ? "kk-hit" : "kk-miss");
      html+=`<td class="kk-dtotal">
        <div class="kk-tot-person">
          <b>Ty</b>
          <span class="${cls(pM,T.p2,0.10)}">B ${Math.round(pM)}/${T.p2}</span>
          <span class="${cls(cM,T.carb2,0.20)}">W ${cM}/${T.carb2}</span>
          <span class="${cls(fM,T.fat2,0.25)}">T ${fM}/${T.fat2}</span>
          <span class="${cls(kM,T.kcal2,0.12)}">${kM}/${T.kcal2} kcal</span>
          <span style="font-size:10px;color:#6b7280;">Bł ${dm.ty.fib} · nas ${dm.ty.sat} · nienas ${dm.ty.unsat} g</span>
        </div>
        <div class="kk-tot-person">
          <b>Magda</b>
          <span class="${cls(pK,T.p1,0.10)}">B ${Math.round(pK)}/${T.p1}</span>
          <span class="${cls(cK,T.carb1,0.20)}">W ${cK}/${T.carb1}</span>
          <span class="${cls(fK,T.fat1,0.25)}">T ${fK}/${T.fat1}</span>
          <span class="${cls(kK,T.kcal1,0.12)}">${kK}/${T.kcal1} kcal</span>
          <span style="font-size:10px;color:#6b7280;">Bł ${dm.mg.fib} · nas ${dm.mg.sat} · nienas ${dm.mg.unsat} g</span>
        </div>
      </td>`;
    });
    html+=`</tr></tbody></table></div>
    <div class="kk-note"><b>B</b> = białko, <b>W</b> = węglowodany, <b>T</b> = tłuszcz (g). Zielone = w celu, czerwone = poza celem. Podział wspólnego dania: <b>mięso, sos i tłuszcz ${state.targets.splitM}/${100-state.targets.splitM}</b> (jedna patelnia — tłuszczu nie da się rozdzielić inaczej niż białka), <b>węgle ${state.targets.splitC}/${100-state.targets.splitC}</b> (ryż i ziemniaki nakładacie osobno). Makro Ty/Magda dokładnie z finalnego jadłospisu (z błonnikiem i tłuszczami nasyconymi/nienasyconymi).</div>`;
    // balans białka — wszystkie posiłki
    const tc={};
    DAYS.forEach(d=> MEALS.forEach(([mk])=>{ const r=findR(state.week[d][mk].recipeId); if(r&&r.ptype&&r.ptype!=="—"){ tc[r.ptype]=(tc[r.ptype]||0)+1; }}));
    DAYS.forEach(d=>{ const sh=findR(state.week[d].shakeId||""); if(sh&&sh.ptype&&sh.ptype!=="—"){ tc[sh.ptype]=(tc[sh.ptype]||0)+1; }});
    const order=["Jajka","Nabiał","Tofu/roślinne","Drób","Wołowina","Ryby i owoce morza","Wieprzowina","Roślinne"];
    const extra=Object.keys(tc).filter(t=>!order.includes(t));
    let tally=`<div class="kk-sgroup" style="margin-top:12px;"><h4>Balans białka w tygodniu (wszystkie posiłki)</h4><div style="display:flex; gap:14px; flex-wrap:wrap; font-size:13px;">`;
    order.concat(extra).forEach(t=>{ if(tc[t]) tally+=`<span><b>${tc[t]}×</b> ${esc(t)}</span>`; });
    if(Object.keys(tc).length===0) tally+=`<span style="color:#7a7156;">Wybierzcie dania powyżej, żeby zobaczyć balans.</span>`;
    tally+=`</div></div>`;
    const WT={p:0,c:0,f:0,kcal:0,fib:0}, WK={p:0,c:0,f:0,kcal:0,fib:0};
    DAYS.forEach(d=>{ const dm=dayPersonMacros(d); ["p","c","f","kcal","fib"].forEach(x=>{ WT[x]+=dm.ty[x]; WK[x]+=dm.mg[x]; }); });
    const Tt=state.targets;
    const cA=(avg,t)=> !t ? "" : (Math.abs(avg-t)<=t*0.12 ? "kk-hit":"kk-miss");
    const srows=[["Kalorie","kcal","kcal2","kcal1"," kcal"],["Białko","p","p2","p1"," g"],["Tłuszcz","f","fat2","fat1"," g"],["Węgle","c","carb2","carb1"," g"],["Błonnik","fib","fib2","fib1"," g"]];
    let sumTbl=`<div class="kk-sgroup" style="margin-top:12px;"><h4>Podsumowanie tygodnia — suma i średnia dzienna vs cel (osobno)</h4>
      <div style="overflow-x:auto;"><table style="border-collapse:collapse;font-size:12px;min-width:640px;">
      <thead><tr><th style="text-align:left;padding:4px 8px;"></th><th colspan="2" style="padding:4px 8px;border-bottom:1px solid var(--line);">Ty</th><th colspan="2" style="padding:4px 8px;border-bottom:1px solid var(--line);">Magda</th></tr>
      <tr><th style="text-align:left;padding:4px 8px;"></th><th style="padding:4px 8px;">suma (7 dni)</th><th style="padding:4px 8px;">śr./dzień · cel</th><th style="padding:4px 8px;">suma (7 dni)</th><th style="padding:4px 8px;">śr./dzień · cel</th></tr></thead><tbody>`;
    srows.forEach(row=>{ const lab=row[0],key=row[1],gTy=Tt[row[2]]||0,gMg=Tt[row[3]]||0,u=row[4];
      const aT=WT[key]/7, aM=WK[key]/7;
      sumTbl+=`<tr><td style="text-align:left;padding:4px 8px;font-weight:600;">${lab}</td>
        <td style="padding:4px 8px;text-align:center;">${Math.round(WT[key])}${u}</td>
        <td style="padding:4px 8px;text-align:center;"><span class="${cA(aT,gTy)}"><b>${Math.round(aT)}${u}</b></span> <span style="color:#9ca3af;">· ${gTy||"—"}</span></td>
        <td style="padding:4px 8px;text-align:center;">${Math.round(WK[key])}${u}</td>
        <td style="padding:4px 8px;text-align:center;"><span class="${cA(aM,gMg)}"><b>${Math.round(aM)}${u}</b></span> <span style="color:#9ca3af;">· ${gMg||"—"}</span></td></tr>`;
    });
    sumTbl+=`</tbody></table></div><div class="kk-note" style="margin-top:6px;">„suma" = łącznie z 7 dni; „śr./dzień" = suma ÷ 7 porównana z celem dziennym (zielone = ±12%). Błonnik z finalnego jadłospisu.</div></div>`;
    tally+=sumTbl;
    state.eaten=state.eaten||{};
    let eHTML=`<div class="kk-sgroup" style="margin-top:12px;"><h4>✅ Faktycznie zjedzone (osobno Ty / Magda)</h4><div class="kk-note" style="margin:0 0 8px;">Domyślnie = wg planu. Odznacz posiłek, którego ktoś nie zjadł (np. lunch na mieście). „Faktyczne makro" liczy tylko zaznaczone. Nie miesza się z planem.</div><div style="overflow-x:auto;"><table style="border-collapse:collapse;font-size:11px;min-width:640px;"><thead><tr><th style="text-align:left;padding:3px 6px;">Dzień</th><th style="padding:3px 6px;">Śniadanie</th><th style="padding:3px 6px;">Obiad</th><th style="padding:3px 6px;">Kolacja</th></tr></thead><tbody>`;
    DAYS.forEach(d=>{ if(!state.eaten[d]) state.eaten[d]={ty:{breakfast:true,lunch:true,dinner:true},mg:{breakfast:true,lunch:true,dinner:true}};
      eHTML+=`<tr><td style="text-align:left;padding:3px 6px;font-weight:600;">${d}</td>`;
      ["breakfast","lunch","dinner"].forEach(mk=>{ const r=findR(state.week[d][mk].recipeId); const nm=r?esc(r.name).slice(0,24):"—";
        const tOn=state.eaten[d].ty[mk]!==false, mOn=state.eaten[d].mg[mk]!==false;
        eHTML+=`<td style="padding:3px 6px;text-align:center;"><div style="font-size:10px;color:#9ca3af;margin-bottom:2px;">${nm}</div><span class="kk-eatchip" data-eat="${d}|ty|${mk}" style="cursor:pointer;padding:1px 7px;border-radius:6px;border:1px solid var(--line);${tOn?"background:var(--herb);color:#fff;":""}">Ty</span> <span class="kk-eatchip" data-eat="${d}|mg|${mk}" style="cursor:pointer;padding:1px 7px;border-radius:6px;border:1px solid var(--line);${mOn?"background:var(--plum);color:#fff;":""}">M</span></td>`;
      });
      eHTML+=`</tr>`;
    });
    eHTML+=`</tbody></table></div>`;
    const ET={p:0,c:0,f:0,kcal:0,fib:0}, EM={p:0,c:0,f:0,kcal:0,fib:0};
    DAYS.forEach(d=>{ ["breakfast","lunch","dinner"].forEach(mk=>{ const mm=mealMacro(d,mk);
      if(state.eaten[d]&&state.eaten[d].ty[mk]!==false) ["p","c","f","kcal","fib"].forEach(x=>ET[x]+=mm.ty[x]);
      if(state.eaten[d]&&state.eaten[d].mg[mk]!==false) ["p","c","f","kcal","fib"].forEach(x=>EM[x]+=mm.mg[x]); }); });
    const cE=(a,t)=> !t?"":(Math.abs(a-t)<=t*0.12?"kk-hit":"kk-miss");
    const erows=[["Kalorie","kcal","kcal2","kcal1"," kcal"],["Białko","p","p2","p1"," g"],["Tłuszcz","f","fat2","fat1"," g"],["Węgle","c","carb2","carb1"," g"],["Błonnik","fib","fib2","fib1"," g"]];
    eHTML+=`<div class="kk-note" style="margin:8px 0 4px;"><b>Faktyczne makro (tylko zjedzone)</b></div><div style="overflow-x:auto;"><table style="border-collapse:collapse;font-size:12px;min-width:640px;"><thead><tr><th style="text-align:left;padding:4px 8px;"></th><th colspan="2" style="padding:4px 8px;border-bottom:1px solid var(--line);">Ty</th><th colspan="2" style="padding:4px 8px;border-bottom:1px solid var(--line);">Magda</th></tr><tr><th style="text-align:left;padding:4px 8px;"></th><th style="padding:4px 8px;">suma</th><th style="padding:4px 8px;">śr./dzień · cel</th><th style="padding:4px 8px;">suma</th><th style="padding:4px 8px;">śr./dzień · cel</th></tr></thead><tbody>`;
    erows.forEach(row=>{ const g2=Tt[row[2]]||0,g1=Tt[row[3]]||0,u=row[4]; const aT=ET[row[1]]/7,aM=EM[row[1]]/7;
      eHTML+=`<tr><td style="text-align:left;padding:4px 8px;font-weight:600;">${row[0]}</td><td style="text-align:center;padding:4px 8px;">${Math.round(ET[row[1]])}${u}</td><td style="text-align:center;padding:4px 8px;"><span class="${cE(aT,g2)}"><b>${Math.round(aT)}${u}</b></span> <span style="color:#9ca3af;">· ${g2||"—"}</span></td><td style="text-align:center;padding:4px 8px;">${Math.round(EM[row[1]])}${u}</td><td style="text-align:center;padding:4px 8px;"><span class="${cE(aM,g1)}"><b>${Math.round(aM)}${u}</b></span> <span style="color:#9ca3af;">· ${g1||"—"}</span></td></tr>`;
    });
    eHTML+=`</tbody></table></div></div>`;
    tally+=eHTML;
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
    p.querySelectorAll(".kk-mname[data-open]").forEach(el=> el.addEventListener("click",()=> openRecipe(el.dataset.open)));
    document.getElementById("fitcarbs").addEventListener("click",()=>{ fitCarbsToTarget(); });
    document.getElementById("resetcarbs").addEventListener("click",()=>{ resetCarbs(); });
    document.getElementById("printweek").addEventListener("click",()=>{ printPlan(); });
    p.querySelectorAll("[data-eat]").forEach(el=> el.addEventListener("click",()=>{ const a=el.dataset.eat.split("|"); const d=a[0],who=a[1],mk=a[2]; state.eaten=state.eaten||{}; if(!state.eaten[d]) state.eaten[d]={ty:{breakfast:true,lunch:true,dinner:true},mg:{breakfast:true,lunch:true,dinner:true}}; state.eaten[d][who][mk]=(state.eaten[d][who][mk]===false); queueSave(); renderWeek(); }));
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
      const basePortions = o.count*getMult(id);   // pełne porcje na dania z planu (wszystkie składniki)
      // Porcje "na zapas do zamrożenia" dotyczą TYLKO białka i sosu.
      // Mrozimy samą bazę (np. mięso w sosie), więc nie dokupujemy podwójnych
      // węglowodanów, warzyw ani pieczywa — te robi się świeżo w dniu jedzenia.
      const FREEZE_CATS=["Mięso","Ryby i owoce morza","Spiżarnia / sosy / tłuszcze"];
      const parts=[];
      if(o.count>1) parts.push(o.count+"× w planie");
      if(extra>0) parts.push(extra+" na zapas (tylko białko/sos)");
      const totLabel = basePortions + extra;
      const gname = parts.length ? `${r.name} (${parts.join(", ")} → do ${totLabel} porcji)` : r.name;
      const mealsTxt=[...o.meals].join(", ");
      const daysTxt=DAYS.filter(d=>o.days.has(d)).join(", ");
      r.ingredients.forEach(ing=>{
        const freezeThis = extra>0 && FREEZE_CATS.includes(prodCat(ing));
        const port = basePortions + (freezeThis ? extra : 0);
        const scaled=scaleIng(ing, port);
        add.push({id:uid("i"), name:scaled, group:gname, meal:mealsTxt, days:daysTxt,
                  cat:prodCat(ing), auto:true, checked:!!wasChecked[scaled.toLowerCase()]});
      });
    });
    state.shopping=state.shopping.concat(add);
    queueSave(); renderShop();
    if(notify && add.length===0) alert("Nie ma czego wygenerować — wybierz dania w Planie tygodnia (i sprawdź filtr dni).");
  }

  function renderShopPreset(p, modeToggle, wk){
    if(!state.presetChecked) state.presetChecked={};
    const items=(typeof SHOP_PRESETS!=="undefined" && SHOP_PRESETS[String(wk)])?SHOP_PRESETS[String(wk)]:[];
    const chk=state.presetChecked[wk]||{};
    const blockView=!!state.shopBlockView;
    const BLOCKS=["Pn–Wt","Śr–Czw","Pt–Sob","Nd"];
    // Z opisu użycia ("Pn–Wt obiad; Śr–Czw kolacja") wyłuskaj bloki gotowania.
    function useBlocks(use){ if(!use) return null; const found=new Set();
      String(use).split(";").forEach(seg=>{ const head=(seg.split(":")[0]||"").toLowerCase();
        if(/pn[–-]wt/.test(head)) found.add("Pn–Wt");
        if(/śr[–-]czw|sr[–-]czw/.test(head)) found.add("Śr–Czw");
        if(/pt[–-]sob/.test(head)) found.add("Pt–Sob");
        if(/(^|[^a-ząćęłńóśźż])nd([^a-ząćęłńóśźż]|$)/.test(head)) found.add("Nd");
      });
      return found.size?found:null;
    }
    const dayToggle=`<div class="kk-filters" style="margin-bottom:10px;"><div class="kk-fbtn ${!blockView?"active":""}" id="sd-week">Cała lista</div><div class="kk-fbtn ${blockView?"active":""}" id="sd-day">Filtr bloków</div></div>`;
    const _sw=(state.savedWeeks||[]).find(w=>w.id==="w_t"+wk);
    let freezeHTML="";
    if(_sw){ const seenF={}; const fz=[];
      ["Pon","Wt","Śr","Czw","Pt","Sob","Nd"].forEach(dy=>{ const cell=_sw.week[dy]||{}; ["breakfast","lunch","dinner"].forEach(mk=>{ const r=findR(cell[mk]&&cell[mk].recipeId); if(r && (r.prepStyle==="freeze"||r.prepStyle==="mar") && !seenF[r.id]){ seenF[r.id]=1; fz.push(r); } }); });
      if(fz.length){ freezeHTML=`<div class="kk-sgroup" style="margin-top:14px;"><h4>🧊 Ugotuj na zapas i zamroź</h4><div class="kk-note" style="margin:0 0 6px;">Te dania z tego tygodnia dobrze znoszą mrożenie — zrób podwójną porcję i odłóż rezerwę na gorszy tydzień.</div>`+fz.map(r=>`<div class="kk-sitem"><span>${esc(r.name)} <span class="kk-badge ${(PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh)[1]}">${(PREP_LABEL[r.prepStyle]||PREP_LABEL.fresh)[0]}</span></span></div>`).join("")+`</div>`; }
    }
    let html=modeToggle+dayToggle;
    let shown=items.map((it,idx)=>Object.assign({idx},it));
    if(blockView){
      if(!state.presetBlockSel) state.presetBlockSel={};
      if(!state.presetBlockSel[wk]){ state.presetBlockSel[wk]={}; BLOCKS.forEach(x=>state.presetBlockSel[wk][x]=true); }
      const sel=state.presetBlockSel[wk];
      html+=`<div class="kk-note" style="margin:0 0 8px;">Dania gotujesz w <b>blokach 2-dniowych</b> (Pn–Wt, Śr–Czw, Pt–Sob) i osobno w niedzielę — jedno gotowanie starcza na cały blok. Zaznacz bloki, które robisz; pokażę produkty tylko na nie (na 2 osoby). Produkty bazowe/spiżarniane (bez bloku) są zawsze. Pozycja oznaczona <span class="kk-fromtag">wspólny</span> jest kupowana raz na kilka bloków (nie da się jej rozbić), więc pojawia się, gdy zaznaczysz którykolwiek z nich.</div>`;
      html+=`<div class="kk-filters" style="margin-bottom:10px;">`+BLOCKS.map(b=>`<div class="kk-fbtn ${sel[b]?"active":""}" data-block="${b}">${b}</div>`).join("")+`<div class="kk-fbtn" id="sd-all">Wszystkie</div><div class="kk-fbtn" id="sd-none">Wyczyść</div></div>`;
      shown=shown.filter(it=>{ const b=useBlocks(it.use); if(!b) return true; return BLOCKS.some(x=>sel[x]&&b.has(x)); });
    } else {
      html+=`<div class="kk-note" style="margin:0 0 12px;">Gotowa lista na <b>Tydzień ${wk}</b> (z pliku, na 2 osoby, cały tydzień). Odhaczenia zapisują się i są wspólne. Chcesz zakupy tylko na część tygodnia? Włącz „Filtr bloków".</div>`;
    }
    if(shown.length===0){ html+=`<div class="kk-note">Brak pozycji dla wybranych bloków.</div>`; p.innerHTML=html+freezeHTML; }
    else {
      const byC={}, ord=[];
      shown.forEach(it=>{ const c=it.cat||"Inne"; if(!byC[c]){byC[c]=[];ord.push(c);} byC[c].push(it); });
      const done=shown.reduce((n,it)=>n+(chk["i"+it.idx]?1:0),0);
      html+=`<div class="kk-note" style="margin:0 0 8px;">Odhaczono <b>${done}/${shown.length}</b>${blockView?` · bloki: ${BLOCKS.filter(x=>state.presetBlockSel[wk][x]).join(", ")||"—"}`:""}.</div>`;
      ord.forEach(c=>{ html+=`<div class="kk-sgroup"><h4>${esc(c)}</h4>`;
        byC[c].forEach(it=>{ const key="i"+it.idx; const on=!!chk[key];
          const b=useBlocks(it.use); const shared=(b&&b.size>1);
          html+=`<div class="kk-sitem ${on?"checked":""}" data-key="${key}"><input type="checkbox" ${on?"checked":""}><span>${esc(it.name)}${it.qty?` — <b>${esc(it.qty)}</b>`:""}${shared?` <span class="kk-fromtag">wspólny</span>`:""}${it.use?` <span class="kk-fromtag">${esc(it.use)}</span>`:""}</span></div>`;
        });
        html+=`</div>`;
      });
      p.innerHTML=html+freezeHTML;
      p.querySelectorAll(".kk-sitem input").forEach(cb=> cb.addEventListener("change",e=>{ const key=e.target.closest(".kk-sitem").dataset.key; if(!state.presetChecked[wk]) state.presetChecked[wk]={}; state.presetChecked[wk][key]=e.target.checked; queueSave(); renderShop(); }));
    }
    const smE=document.getElementById("sm-eng"); if(smE) smE.addEventListener("click",()=>{ state.shopMode="engine"; queueSave(); renderShop(); });
    const smW=document.getElementById("sm-week"); if(smW) smW.addEventListener("change",e=>{ state.shopWeek=+e.target.value; queueSave(); renderShop(); });
    const sdW=document.getElementById("sd-week"); if(sdW) sdW.addEventListener("click",()=>{ state.shopBlockView=false; queueSave(); renderShop(); });
    const sdD=document.getElementById("sd-day"); if(sdD) sdD.addEventListener("click",()=>{ state.shopBlockView=true; queueSave(); renderShop(); });
    p.querySelectorAll("[data-block]").forEach(el=> el.addEventListener("click",()=>{ const b=el.dataset.block; if(!state.presetBlockSel) state.presetBlockSel={}; if(!state.presetBlockSel[wk]){ state.presetBlockSel[wk]={}; BLOCKS.forEach(x=>state.presetBlockSel[wk][x]=true); } state.presetBlockSel[wk][b]=!state.presetBlockSel[wk][b]; queueSave(); renderShop(); }));
    const saAll=document.getElementById("sd-all"); if(saAll) saAll.addEventListener("click",()=>{ state.presetBlockSel[wk]={}; BLOCKS.forEach(x=>state.presetBlockSel[wk][x]=true); queueSave(); renderShop(); });
    const snNone=document.getElementById("sd-none"); if(snNone) snNone.addEventListener("click",()=>{ state.presetBlockSel[wk]={}; BLOCKS.forEach(x=>state.presetBlockSel[wk][x]=false); queueSave(); renderShop(); });
  }
    function renderShop(){
    const p=document.querySelector('[data-panel="shop"]');
    const view=state.shopView||"recipe";
    const smode = state.shopMode==="preset" ? "preset" : "engine";
    const swk = +state.shopWeek||1;
    const modeToggle = `<div class="kk-filters" style="margin-bottom:10px;"><div class="kk-fbtn ${smode==="engine"?"active":""}" id="sm-eng">Silnik: generuj z planu</div><div class="kk-fbtn ${smode==="preset"?"active":""}" id="sm-pre" style="border-color:var(--herb);">Gotowa lista (z pliku)</div>${smode==="preset"?`<select id="sm-week" style="padding:8px;border:1px solid var(--line);border-radius:6px;font-size:12px;">${Array.from({length:12},(_,i)=>i+1).map(w=>`<option value="${w}" ${swk===w?"selected":""}>Tydzień ${w}</option>`).join("")}</select>`:""}</div>`;
    if(smode==="preset"){ return renderShopPreset(p, modeToggle, swk); }
    let html=modeToggle+`<div class="kk-actions-row">
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
    const smE0=document.getElementById("sm-eng"); if(smE0) smE0.addEventListener("click",()=>{ state.shopMode="engine"; queueSave(); renderShop(); });
    const smP0=document.getElementById("sm-pre"); if(smP0) smP0.addEventListener("click",()=>{ state.shopMode="preset"; queueSave(); renderShop(); });
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
    const rated=Object.entries(state.ratings||{}).map(([rid,v])=>({r:findR(rid),v:getRating(rid)})).filter(x=>x.r&&x.v>0).sort((a,b)=>b.v-a.v);
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
    const survMeals=(()=>{ const byT=t=>state.recipes.filter(r=>r.mealTypes.includes(t)).sort((a,b)=>(a.prepTime||99)-(b.prepTime||99)).slice(0,4); return [].concat(byT("breakfast"),byT("lunch"),byT("dinner")).filter(Boolean); })();
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

  function renderPrepPreset(p, prepToggle, wk){
    const items=(typeof PREP_PRESETS!=="undefined" && PREP_PRESETS[String(wk)])?PREP_PRESETS[String(wk)]:[];
    if(!state.prepChecked) state.prepChecked={};
    const chk=state.prepChecked[wk]||{};
    let html=prepToggle+`<div class="kk-note" style="margin:0 0 12px;">Gotowy plan meal prep na <b>Tydzień ${wk}</b> (z pliku). Odhaczaj etapy — zapis wspólny. Kliknij <b>→ przepis</b> przy zadaniu, żeby od razu otworzyć jego kartę. „Silnik" wróci do listy generowanej z planu.</div>`;
    if(items.length===0){ html+=`<div class="kk-note">Brak wgranego meal prepu dla tego tygodnia.</div>`; p.innerHTML=html; }
    else {
      // Sesje prep (Niedziela / Czwartek / …). Info „świeżo" wędruje do osobnej sekcji niżej.
      const byT={}; const ord=[];
      items.forEach((it,idx)=>{ const t=it.termin||"Inne"; if(!byT[t]){byT[t]=[];ord.push(t);} byT[t].push(Object.assign({idx:idx},it)); });
      const done=items.reduce((a,it,idx)=>a+(chk["p"+idx]?1:0),0);
      html+=`<div class="kk-note" style="margin:0 0 8px;">Odhaczono <b>${done}/${items.length}</b> etapów prep.</div>`;
      ord.forEach(t=>{ html+=`<div class="kk-sgroup"><h4>${esc(t)}</h4><div class="kk-plist">`;
        byT[t].forEach(it=>{ const key="p"+it.idx; const on=!!chk[key];
          const sub=[it.dotyczy,it.store?("Przechowywanie: "+it.store):""].filter(Boolean).join(" · ");
          const link=gotoLink(dotyczyRecipeIds(wk,it.dotyczy));
          html+=`<div class="kk-pitem ${on?"checked":""}" data-key="${key}"><input type="checkbox" ${on?"checked":""}><span>${it.etap&&it.etap!=="—"?`<b>${esc(String(it.etap))}.</b> `:""}${esc(it.co)}${link}${it.czas?` <span class="kk-badge kk-b-fresh">${esc(it.czas)}</span>`:""}${sub?`<span class="kk-psub">${esc(sub)}</span>`:""}</span></div>`;
        });
        html+=`</div></div>`;
      });
      // ── Sekcja „Na świeżo" — zadania dzień po dniu (od poniedziałku), osobne checkboxy ──
      const fresh=items.map((it,idx)=>Object.assign({idx},it))
        .filter(it=> it.fresh && it.fresh!=="—")
        .sort((a,b)=> (prepDayIdx(a.dotyczy)-prepDayIdx(b.dotyczy)) || (a.idx-b.idx));
      if(fresh.length){
        const fdone=fresh.reduce((n,it)=>n+(chk["f"+it.idx]?1:0),0);
        html+=`<div class="kk-sgroup" style="margin-top:16px;border:1px solid var(--mustard,#F5A524);border-radius:12px;padding:10px;"><h4>🍳 Na świeżo — dzień po dniu</h4><div class="kk-note" style="margin:0 0 8px;">Robisz w dniu jedzenia (nie z wyprzedzeniem). Kolejność od poniedziałku. Odhaczono <b>${fdone}/${fresh.length}</b>.</div><div class="kk-plist">`;
        fresh.forEach(it=>{ const key="f"+it.idx; const on=!!chk[key];
          const link=gotoLink(dotyczyRecipeIds(wk,it.dotyczy));
          html+=`<div class="kk-pitem ${on?"checked":""}" data-key="${key}"><input type="checkbox" ${on?"checked":""}><span><b>${esc(it.dotyczy||"")}</b> — ${esc(it.fresh)}${link}</span></div>`;
        });
        html+=`</div></div>`;
      }
      p.innerHTML=html;
    }
    const pE=document.getElementById("pm-eng"); if(pE) pE.addEventListener("click",()=>{ state.prepMode="engine"; queueSave(); renderPrep(); });
    const pW=document.getElementById("pm-week"); if(pW) pW.addEventListener("change",e=>{ state.prepWeek=+e.target.value; queueSave(); renderPrep(); });
    p.querySelectorAll(".kk-pitem input").forEach(cb=> cb.addEventListener("change",e=>{ const key=e.target.closest(".kk-pitem").dataset.key; if(!state.prepChecked) state.prepChecked={}; if(!state.prepChecked[wk]) state.prepChecked[wk]={}; state.prepChecked[wk][key]=e.target.checked; queueSave(); renderPrep(); }));
    p.querySelectorAll(".kk-goto[data-open]").forEach(el=> el.addEventListener("click",e=>{ e.stopPropagation(); openRecipe(el.dataset.open); }));
  }
  function renderPrep(){
    const p=document.querySelector('[data-panel="prep"]');
    const pmode = state.prepMode==="preset" ? "preset" : "engine";
    const pwk = +state.prepWeek||1;
    const prepToggle = `<div class="kk-filters" style="margin-bottom:10px;"><div class="kk-fbtn ${pmode==="engine"?"active":""}" id="pm-eng">Silnik: z planu</div><div class="kk-fbtn ${pmode==="preset"?"active":""}" id="pm-pre" style="border-color:var(--herb);">Gotowy meal prep (z pliku)</div>${pmode==="preset"?`<select id="pm-week" style="padding:8px;border:1px solid var(--line);border-radius:6px;font-size:12px;">${Array.from({length:12},(_,i)=>i+1).map(w=>`<option value="${w}" ${pwk===w?"selected":""}>Tydzień ${w}</option>`).join("")}</select>`:""}</div>`;
    if(pmode==="preset"){ return renderPrepPreset(p, prepToggle, pwk); }
    let html=prepToggle+`<div class="kk-actions-row"><button class="kk-btn" id="gp">Generuj listę prep</button><button class="kk-btn sec" id="cp">Usuń odhaczone</button></div><div class="kk-plist">`;
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
    const _wp=document.getElementById("wipep"); if(_wp) _wp.addEventListener("click",()=>{
      if(!confirm("Wyczyścić całą listę prep (łącznie z ręcznie dodanymi)?")) return;
      state.prep=[]; queueSave(); renderPrep();
    });
    document.getElementById("ap").addEventListener("click",()=>{ const i=document.getElementById("np"); if(i.value.trim()){ state.prep.push({id:uid("t"),text:i.value.trim(),checked:false}); i.value=""; queueSave(); renderPrep(); }});
    const pmE0=document.getElementById("pm-eng"); if(pmE0) pmE0.addEventListener("click",()=>{ state.prepMode="engine"; queueSave(); renderPrep(); });
    const pmP0=document.getElementById("pm-pre"); if(pmP0) pmP0.addEventListener("click",()=>{ state.prepMode="preset"; queueSave(); renderPrep(); });
  }

  window.__KK_START = load;
  window.__KK_RELOAD = load;
})();
