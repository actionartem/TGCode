"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "ru" | "en";

interface Translations {
  nav: {
    services: string;
    cases: string;
    process: string;
    contacts: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  whyUs: {
    title: string;
    items: string[];
  };
  cases: {
    title: string;
    filters: string[];
    items: {
      title: string;
      description: string;
      category: string;
      stack: string[];
      results: string[];
    }[];
  };
  process: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  tech: {
    title: string;
    tags: string[];
    extra: string;
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      telegram: string;
      telegramPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      note: string;
      success: string;
    };
  };
  footer: {
    tagline: string;
  };
}

const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      services: "Услуги",
      cases: "Кейсы",
      process: "Процесс",
      contacts: "Контакты",
    },
    hero: {
      title: "Делаем сайты и продукты, которые не стыдно показать.",
      subtitle: "",
      cta: "Обсудить проект",
      ctaSecondary: "Смотреть кейсы",
    },
    services: {
      title: "Что делаем",
      items: [
        {
          title: "Сайты и лендинги",
          description: "Быстро грузятся, красиво выглядят, повышают конверцию.",
        },
        {
          title: "Корпоративные сайты",
          description: "Структура, информативность и сбалансированный стиль.",
        },
        {
          title: "Telegram боты",
          description: "От поддержки до автоматизации процессов.",
        },
        {
          title: "Telegram mini apps",
          description: "Мини-продукты внутри Telegram, полноценные сервисы.",
        },
        {
          title: "Веб-сервисы / CRM",
          description:
            "Кабинеты, роли, задачи, аналитика, интеграции конкретно под вас.",
        },
        {
          title: "UI/UX + Motion",
          description: "Продумаем логику и добавим магию в детали.",
        },
        {
          title: "Интеграции и API",
          description: "Свяжем всё и со всем чем нужно.",
        },
        {
          title: "Поддержка и развитие",
          description: "После релиза не исчезаем, а помогаем дальше.",
        },
      ],
    },
    whyUs: {
      title: "Почему мы",
      items: [
        "Делаем эффектно, быстро и с изюминкой.",
        "Вы не успеете моргнуть, как увидите первый прототип, чтоб вы могли пощупать идею.",
        "Не прячем процесс, держим вас в курсе событий.",
        "Любим сложные задачи, но простые тоже любим.",
      ],
    },
    cases: {
      title: "Кейсы",
      filters: ["Все", "Сайты", "Mini apps", "Боты", "Веб-сервисы"],
      items: [
        {
          title: "Помощник по еде",
          description: "Рецепты по КБЖУ + меню под цель.",
          category: "Mini apps",
          stack: ["React", "Telegram API", "Node.js", "PostgreSQL"],
          results: [
            "Генерация рецептов по параметрам",
            "Подбор меню на день/неделю",
            "Учёт КБЖУ и целей пользователя",
            "Интеграция с Telegram",
          ],
        },
        {
          title: "Сайт-резюме",
          description: "Лаконично, быстро, с анимациями.",
          category: "Сайты",
          stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
          results: [
            "Чистый минималистичный дизайн",
            "Плавные анимации при скролле",
            "Загрузка менее 1 секунды",
            "Адаптив под все устройства",
          ],
        },
        {
          title: "CRM / трекер задач",
          description: "Гант, статусы, аналитика процессов.",
          category: "Веб-сервисы",
          stack: ["React", "TypeScript", "Node.js", "MongoDB"],
          results: [
            "Диаграммы Ганта для проектов",
            "Система ролей и прав доступа",
            "Аналитика продуктивности",
            "Интеграция с календарём",
          ],
        },
        {
          title: "Языковая платформа",
          description: "Уроки, практика, прогресс, мотивация.",
          category: "Веб-сервисы",
          stack: ["Vue.js", "Python", "FastAPI", "PostgreSQL"],
          results: [
            "Интерактивные уроки",
            "Геймификация обучения",
            "Отслеживание прогресса",
            "Система достижений",
          ],
        },
        {
          title: "Бот для путешествий",
          description: "Маршрут, план, подсказки — без хаоса.",
          category: "Боты",
          stack: ["Python", "Telegram Bot API", "OpenAI", "Redis"],
          results: [
            "Планирование маршрутов",
            "Рекомендации по местам",
            "Напоминания и уведомления",
            "Интеграция с картами",
          ],
        },
        {
          title: "Интерактивная презентация",
          description: "Вау-скролл + конфигуратор + заявки.",
          category: "Сайты",
          stack: ["Three.js", "GSAP", "React", "WebGL"],
          results: [
            "3D-визуализация продукта",
            "Параллакс-эффекты при скролле",
            "Конфигуратор с превью",
            "Форма сбора заявок",
          ],
        },
      ],
    },
    process: {
      title: "Как работаем",
      steps: [
        {
          title: "01",
          description: "Собираем и согласовываем первичные требования.",
        },
        { title: "02", description: "Быстро предоставляем первый прототип." },
        {
          title: "03",
          description: "Подготавливаем дизайн и стиль, чтоб согласовать с вами.",
        },
        {
          title: "04",
          description:
            "Приступаем к разработке, а потом даже протестим всё это дело.",
        },
        {
          title: "05",
          description: "Доработки, запуск и поддержка (если вам она нужна).",
        },
      ],
    },
    tech: {
      title: "Технологии",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Telegram API",
        "Three.js",
        "Framer Motion",
        "Tailwind CSS",
      ],
      extra: "интеграции, API, платежи, аналитика",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Сколько это стоит?",
          answer:
            "Без шаблонных цен: скажите задачу — мы предложим варианты по бюджету и срокам.",
        },
        {
          question: "С чего начать?",
          answer:
            "С пары предложений о проекте. Можно без ТЗ — разберём вместе.",
        },
        {
          question: "Берёте маленькие задачи?",
          answer: "Да. Иногда с них и начинается что-то большое.",
        },
        {
          question: "Сроки?",
          answer:
            "Зависит от объёма. Обычно быстро показываем первую версию, дальше итерациями.",
        },
      ],
    },
    contact: {
      title: "Давайте реализуем вашу идею!",
      subtitle:
        "Опишите что вы хотите, как умеете. Хоть одним предложением. (Но можете оставить поле пустым, мы не обидимся)",
      form: {
        name: "Имя",
        namePlaceholder: "Как к вам обращаться?",
        email: "Email",
        emailPlaceholder: "Например yahochu@site.ru",
        telegram: "Telegram",
        telegramPlaceholder: "Например @username",
        phone: "Телефон",
        phonePlaceholder: "Если удобнее звонок по телефону",
        message: "Коротко о задаче",
        messagePlaceholder:
          "Что нужно сделать? Для кого? Когда хочется запустить?",
        submit: "Отправить запрос",
        note: "Все поля необязательные. Можно отправить пустым — мы просто уточним детали.",
        success: "Спасибо! Мы скоро свяжемся с вами.",
      },
    },
    footer: {
      tagline:
        "Делаем интерфейсы, которые выглядят как продукт, а не как «очередной сайт».",
    },
  },
  en: {
    nav: {
      services: "Services",
      cases: "Cases",
      process: "Process",
      contacts: "Contacts",
    },
    hero: {
      title: "We create websites and products you're proud to show.",
      subtitle: "",
      cta: "Discuss project",
      ctaSecondary: "View cases",
    },
    services: {
      title: "What we do",
      items: [
        {
          title: "Websites & Landing pages",
          description: "fast loading, beautiful living, high converting.",
        },
        {
          title: "Corporate websites",
          description: "structure, informativeness, style — without boredom.",
        },
        {
          title: "Telegram bots",
          description: "from support to process automation.",
        },
        {
          title: "Telegram mini apps",
          description: "mini-products inside Telegram, full-fledged services.",
        },
        {
          title: "Web services / CRM",
          description: "dashboards, roles, tasks, analytics, integrations.",
        },
        {
          title: "UI/UX + Motion",
          description: "we think through logic and add magic to details.",
        },
        {
          title: "Integrations & API",
          description: "we connect everything with everything (carefully).",
        },
        {
          title: "Support & Development",
          description: "we don't disappear after release.",
        },
      ],
    },
    whyUs: {
      title: "Why us",
      items: [
        "We make it impressive, but not at the expense of meaning.",
        "We show prototypes early — so you can 'feel' the idea.",
        "We don't hide the process: short updates, clear decisions.",
        "We love complex tasks. Simple ones — too.",
        "If we can make it simpler — we will. If not — we'll make it beautiful.",
      ],
    },
    cases: {
      title: "Cases",
      filters: ["All", "Websites", "Mini apps", "Bots", "Web services"],
      items: [
        {
          title: "Food Assistant",
          description: "Recipes by macros + goal-based menu.",
          category: "Mini apps",
          stack: ["React", "Telegram API", "Node.js", "PostgreSQL"],
          results: [
            "Recipe generation by parameters",
            "Daily/weekly menu selection",
            "Macro and goal tracking",
            "Telegram integration",
          ],
        },
        {
          title: "Resume Website",
          description: "Minimalist, fast, with animations.",
          category: "Websites",
          stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
          results: [
            "Clean minimalist design",
            "Smooth scroll animations",
            "Sub-second loading",
            "Responsive on all devices",
          ],
        },
        {
          title: "CRM / Task Tracker",
          description: "Gantt, statuses, process analytics.",
          category: "Web services",
          stack: ["React", "TypeScript", "Node.js", "MongoDB"],
          results: [
            "Project Gantt charts",
            "Role and permission system",
            "Productivity analytics",
            "Calendar integration",
          ],
        },
        {
          title: "Language Platform",
          description: "Lessons, practice, progress, motivation.",
          category: "Web services",
          stack: ["Vue.js", "Python", "FastAPI", "PostgreSQL"],
          results: [
            "Interactive lessons",
            "Gamified learning",
            "Progress tracking",
            "Achievement system",
          ],
        },
        {
          title: "Travel Bot",
          description: "Route, plan, tips — no chaos.",
          category: "Bots",
          stack: ["Python", "Telegram Bot API", "OpenAI", "Redis"],
          results: [
            "Route planning",
            "Place recommendations",
            "Reminders and notifications",
            "Maps integration",
          ],
        },
        {
          title: "Interactive Presentation",
          description: "Wow-scroll + configurator + leads.",
          category: "Websites",
          stack: ["Three.js", "GSAP", "React", "WebGL"],
          results: [
            "3D product visualization",
            "Parallax scroll effects",
            "Configurator with preview",
            "Lead capture form",
          ],
        },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        { title: "01", description: "We listen and clarify." },
        { title: "02", description: "Prototype: quickly show the logic." },
        { title: "03", description: "Design: prepare and approve the style." },
        { title: "04", description: "Development: carefully, fast, and tested." },
        {
          title: "05",
          description: "Launch & improve: metrics, tweaks, support.",
        },
      ],
    },
    tech: {
      title: "Technologies",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Telegram API",
        "Three.js",
        "Framer Motion",
        "Tailwind CSS",
      ],
      extra: "integrations, API, payments, analytics",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How much does it cost?",
          answer:
            "No template prices: tell us your task — we'll offer options for budget and timing.",
        },
        {
          question: "Where to start?",
          answer:
            "With a couple of sentences about the project. No brief needed — we'll figure it out together.",
        },
        {
          question: "Do you take small tasks?",
          answer: "Yes. Sometimes something big starts from them.",
        },
        {
          question: "Deadlines?",
          answer:
            "Depends on scope. Usually we quickly show the first version, then iterate.",
        },
      ],
    },
    contact: {
      title: "Let's make you a project!",
      subtitle:
        "Describe your idea as you can. Even one sentence. Even empty (we won't be offended).",
      form: {
        name: "Name",
        namePlaceholder: "How should we call you?",
        email: "Email",
        emailPlaceholder: "where to reply if needed",
        telegram: "Telegram",
        telegramPlaceholder: "e.g., @username",
        phone: "Phone",
        phonePlaceholder: "if you prefer a call",
        message: "Brief about the task",
        messagePlaceholder: "What needs to be done? For whom? When to launch?",
        submit: "Send request",
        note: "All fields are optional. You can send it empty — we'll just clarify details.",
        success: "Thank you! We'll get back to you soon.",
      },
    },
    footer: {
      tagline:
        "We create interfaces that look like a product, not like 'just another website'.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
