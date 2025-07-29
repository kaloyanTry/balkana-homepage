'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Instead of importing JSON files, let's define translations directly
const translations = {
  en: {
    title: 'BalkanaTry',
    goal: 'Goal',
    activities: 'Activities',
    values: 'Values',
    quote1: "'Discipline is the bridge between goals and accomplishment.'",
    quote1_author: '(Eliud Kipchoge)',
    paragraph1_start:
      'Our goal is to preserve and maintain traditional paths, trails, and routes in the mountains, specifically in the Balkana region of the Central Stara Planina area.',
    paragraph1_bold:
      'The goal of this web application is to share information about local routes.',
    paragraph1_middle:
      'You can explore some or all of them and share your experience. On the BalkanaTry web application, you will find short descriptions of the routes, including GPS coordinates of starting points, destinations, distance, elevation gain, and images. If you plan to explore a particular route, you can use the application to share information about when you intend to run, cycle, or hike the route and how many friends will join you. This information is shared on the web application, so if someone else is interested in the route, they can join you or simply know that the route has been explored by others recently. There is an explorer area where you can find information for your Balkana explorations. No names or other personal information are shared on the web app.',
    paragraph1_end: 'Touch Balkana!',
    quote2:
      "'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'",
    quote2_author: '(Aristotel)',
    paragraph2_start:
      'We organize and support outdoor activities in the local area, including mountain running and mountain cycling events, preserving and renovating traditional paths, and volunteering opportunities. For example, you can see the Tryavna Tour and Mahnatite Skali RUN events among our',
    projects_link: 'projects',
    paragraph2_end:
      'area. There you can find information about our other activities, such as clearing forest paths and renovating route markers.',
    quote3:
      "'The key to genuine happiness is in our hands. To think this way is to discover the essential values of kindness, brotherly love and altruism. The more clearly we see the benefits of these values, the more we will seek to reject anything that opposes them; in this way we will be able to bring about inner transformation...",
    quote3_continue:
      "Follow the three R's: - Respect for self. - Respect for others. - Responsibility for all your actions.'",
    quote3_author: '(Dalai Lama)',
    paragraph3_start:
      'We are trying to live very close to nature, relearning to co-exist and inhabit the wild without polluting and without causing harm.',
    paragraph3_bold:
      'Living actively with respect for nature and others, and sharing the experiences are our main values.',
    paragraph3_end:
      'All the activities we undertake are guided by the principles of maintaining a clean and healthy environment and achieving zero ecological footprint.',
    explore_routes: 'Explore the routes',
    explore_projects: 'Explore the projects',
  },
  bg: {
    title: 'Балкана ТРАЙ',
    goal: 'Цел',
    activities: 'Дейности',
    values: 'Ценности',
    quote1: "'Дисциплината е мостът между целите и постижението.'",
    quote1_author: '(Елиуд Кипчоге)',
    paragraph1_start:
      'Нашата цел е да запазваме и поддържаме традиционни пътеки, маршрути и трасета в планините, специално в района на Балкана в Централна Стара планина.',
    paragraph1_bold:
      'Целта на това уеб приложение е да споделя информация за местни маршрути.',
    paragraph1_middle:
      'Можете да изследвате някои или всички от тях и да споделите опита си. В уеб приложението BalkanaTry ще намерите кратки описания на маршрутите, включително GPS координати на стартови точки, дестинации, разстояние, изкачване и изображения. Ако планирате да изследвате определен маршрут, можете да използвате приложението, за да споделите информация за това кога възнамерявате да тичате, карате велосипед или ходите по маршрута и колко приятели ще се присъединят към вас. Тази информация се споделя в уеб приложението, така че ако някой друг се интересува от маршрута, може да се присъедини към вас или просто да знае, че маршрутът е бил изследван от други наскоро. Има изследователска зона, където можете да намерите информация за вашите изследвания в Балкана. Никакви имена или друга лична информация не се споделят в уеб приложението.',
    paragraph1_end: 'Докоснете Балкана!',
    quote2:
      "'Ние сме това, което правим многократно. Съвършенството тогава не е действие, а навик.'",
    quote2_author: '(Аристотел)',
    paragraph2_start:
      'Ние организираме и подкрепяме дейности на открито в местния район, включително планински бягания и планински колоездачни събития, запазване и реновиране на традиционни пътеки и възможности за доброволчество. Например, можете да видите събитията Tryavna Tour и Mahnatite Skali RUN сред нашата',
    projects_link: 'проекти',
    paragraph2_end:
      'зона. Там можете да намерите информация за нашите други дейности, като почистване на горски пътеки и реновиране на маркери за маршрути.',
    quote3:
      "'Ключът към истинското щастие е в нашите ръце. Да мислим по този начин означава да открием основните ценности на добротата, братската любов и алтруизма. Колкото по-ясно виждаме ползите от тези ценности, толкова повече ще се стремим да отхвърлим всичко, което им се противопоставя; по този начин ще можем да постигнем вътрешно преобразяване...",
    quote3_continue:
      "Следвайте трите Р: - Уважение към себе си. - Уважение към другите. - Отговорност за всички свои действия.'",
    quote3_author: '(Далай Лама)',
    paragraph3_start:
      'Ние се опитваме да живеем много близо до природата, преучавайки как да съжителстваме и да обитаваме дивата природа без да замърсяваме и без да причиняваме вреда.',
    paragraph3_bold:
      'Активният живот с уважение към природата и другите, и споделянето на преживяванията са нашите основни ценности.',
    paragraph3_end:
      'Всички дейности, които предприемаме, се ръководят от принципите за поддържане на чиста и здравословна среда и постигане на нулев екологичен отпечатък.',
    explore_routes: 'Разгледайте маршрутите',
    explore_projects: 'Разгледайте проектите',
  },
};

export function useTranslation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Get language from URL parameter
    const langFromUrl = searchParams.get('lang');
    const currentLocale = langFromUrl === 'bg' ? 'bg' : 'en';
    setLocale(currentLocale);
  }, [searchParams]);

  const t = (key) => {
    const translation = translations[locale]?.[key];
    return translation || key;
  };

  const changeLanguage = (newLocale) => {
    // Get current URL without query parameters
    const currentPath = window.location.pathname;
    // Navigate to same path with new language parameter
    router.push(`${currentPath}?lang=${newLocale}`);
  };

  return { t, locale, changeLanguage };
}
