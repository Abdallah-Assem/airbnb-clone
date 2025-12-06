import { Injectable } from '@angular/core';

export interface SiteSection {
  name: string;
  description: string;
  features: string[];
  keywords: string[];
  keywordsAr: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {

  private siteInfo = {
    en: {
      name: 'Airbnb Clone - The Broker',
      tagline: 'Your Trusted Egyptian Property Platform',
      description: 'A comprehensive property rental and booking platform connecting hosts and guests across Egypt. Find your perfect home away from home or list your property to earn income.',

      fullDescription: `Welcome to The Broker - Egypt's premier property rental marketplace!

🏠 **What We Offer:**
Our platform provides a seamless experience for both property seekers and hosts. Whether you're looking for a short-term vacation rental, a long-term apartment, or want to list your property, we've got you covered.

✨ **Key Features:**
• **Smart Search**: Advanced filters for location, price, bedrooms, amenities, and property types
• **Instant Booking**: Quick and secure booking process with real-time availability
• **Verified Listings**: All properties are verified for quality and authenticity
• **Host Dashboard**: Comprehensive tools for property owners to manage listings
• **Secure Payments**: Integrated payment system with multiple options
• **Real-time Chat**: Direct communication between hosts and guests
• **Face ID Login**: Secure biometric authentication for quick access
• **Multilingual**: Full support for English and Arabic
• **Reviews & Ratings**: Transparent feedback system for trust and quality
• **Interactive Maps**: Explore properties with advanced map integration

💼 **For Guests:**
Browse thousands of properties across Egypt - from Cairo apartments to North Coast chalets. Filter by budget, location, amenities, and more. Book instantly with secure payment options. Track your bookings, communicate with hosts, and leave reviews.

🏡 **For Hosts:**
List your property in minutes with our easy-to-use interface. Upload photos, set prices, manage availability, and earn income. Access detailed analytics, manage bookings, and communicate with guests through our platform.

🔒 **Security & Trust:**
We prioritize your safety with verified listings, secure payments, and biometric authentication. Our customer support team is available 24/7 to assist you.

📱 **Technology:**
Built with cutting-edge technology including Angular, ASP.NET Core, SignalR for real-time features, Firebase integration, and AI-powered chatbot assistance.`,

      sections: {
        search: {
          name: 'Property Search',
          description: 'Advanced search engine to find your perfect property',
          features: [
            'Filter by location, price range, bedrooms, bathrooms, and amenities',
            'Property type selection (apartment, villa, house, penthouse, chalet, studio)',
            'Sort by price, rating, newest, and popularity',
            'Save favorite properties for later',
            'Interactive map view with clustering',
            'Real-time availability checking',
            'Detailed property cards with images and ratings'
          ],
          keywords: ['search', 'find', 'looking', 'show', 'browse', 'explore', 'filter', 'property', 'apartment', 'villa'],
          keywordsAr: ['بحث', 'ابحث', 'دور', 'عايز', 'محتاج', 'اريد', 'عقار', 'شقة', 'فيلا', 'منزل']
        },

        booking: {
          name: 'Booking System',
          description: 'Seamless booking experience with secure payments',
          features: [
            'Real-time availability calendar',
            'Instant booking confirmation',
            'Multiple payment methods (Stripe integration)',
            'Booking history and management',
            'Automatic invoice generation',
            'Cancellation and refund policies',
            'Guest-host messaging during booking',
            'Email notifications for booking updates'
          ],
          keywords: ['book', 'reserve', 'reservation', 'stay', 'check-in', 'checkout', 'rent', 'payment'],
          keywordsAr: ['حجز', 'احجز', 'حجوزات', 'إقامة', 'دفع', 'استئجار']
        },

        hosting: {
          name: 'Host Your Property',
          description: 'Earn income by listing your property',
          features: [
            'Easy property listing creation',
            'Photo upload with drag-and-drop',
            'Pricing and availability management',
            'Booking calendar and scheduling',
            'Guest communication tools',
            'Earnings dashboard and analytics',
            'Property performance insights',
            'Automated booking confirmations',
            'Review management'
          ],
          keywords: ['host', 'list', 'add', 'create', 'property', 'my property', 'earn', 'income', 'owner'],
          keywordsAr: ['مضيف', 'اضافة', 'إضافة', 'عقاري', 'املك', 'بيع', 'تأجير', 'دخل']
        },

        account: {
          name: 'User Account',
          description: 'Manage your profile and preferences',
          features: [
            'Profile customization with photo upload',
            'Face ID biometric authentication',
            'Booking history tracking',
            'Favorite properties collection',
            'Payment methods management',
            'Notification preferences',
            'Language selection (English/Arabic)',
            'Security settings',
            'Account verification'
          ],
          keywords: ['account', 'profile', 'settings', 'login', 'register', 'face id', 'password', 'security'],
          keywordsAr: ['حساب', 'الحساب', 'الملف الشخصي', 'تسجيل', 'دخول', 'إعدادات', 'أمان']
        },

        features: {
          name: 'Platform Features',
          description: 'Advanced features that make us unique',
          features: [
            'AI-powered chatbot assistant (The Broker)',
            'Real-time notifications via SignalR',
            'Face ID login for quick access',
            'Interactive maps with location search',
            'Multi-language support (EN/AR)',
            'Responsive design for all devices',
            'Dark/Light mode support',
            'Advanced search filters',
            'Wishlist and favorites',
            'Reviews and ratings system',
            'Direct messaging between users',
            'Email notifications',
            'PDF invoice generation',
            'Social media integration',
            'Analytics and insights for hosts'
          ],
          keywords: ['features', 'how', 'what', 'capabilities', 'tools', 'technology', 'ai', 'chatbot'],
          keywordsAr: ['مميزات', 'خصائص', 'كيف', 'ماذا', 'أدوات', 'تقنية', 'ذكاء اصطناعي']
        },

        help: {
          name: 'Help & Support',
          description: 'Get assistance when you need it',
          features: [
            '24/7 AI chatbot support',
            'Comprehensive FAQ section',
            'Contact form for inquiries',
            'Email support',
            'Video tutorials and guides',
            'Community forum',
            'Live chat support',
            'Help center with articles',
            'Safety and security tips'
          ],
          keywords: ['help', 'support', 'contact', 'question', 'how to', 'tutorial', 'guide', 'faq'],
          keywordsAr: ['مساعدة', 'دعم', 'اتصال', 'سؤال', 'كيف', 'شرح', 'مركز المساعدة']
        }
      }
    },

    ar: {
      name: 'Airbnb Clone - السمسارة',
      tagline: 'منصتك العقارية المصرية الموثوقة',
      description: 'منصة شاملة لتأجير وحجز العقارات تربط المضيفين والضيوف في جميع أنحاء مصر. اعثر على منزلك المثالي بعيداً عن المنزل أو أدرج عقارك لكسب الدخل.',

      fullDescription: `مرحباً بك في السمسارة - سوق تأجير العقارات الأول في مصر!

🏠 **ما نقدمه:**
توفر منصتنا تجربة سلسة لكل من الباحثين عن العقارات والمضيفين. سواء كنت تبحث عن إيجار لقضاء إجازة قصيرة الأجل، أو شقة طويلة الأجل، أو تريد إدراج عقارك، فنحن نوفر لك كل ما تحتاجه.

✨ **الميزات الرئيسية:**
• **البحث الذكي**: مرشحات متقدمة للموقع والسعر وغرف النوم والمرافق وأنواع العقارات
• **الحجز الفوري**: عملية حجز سريعة وآمنة مع توفر في الوقت الفعلي
• **قوائم موثقة**: جميع العقارات موثقة للجودة والأصالة
• **لوحة تحكم المضيف**: أدوات شاملة لأصحاب العقارات لإدارة القوائم
• **مدفوعات آمنة**: نظام دفع متكامل مع خيارات متعددة
• **دردشة فورية**: تواصل مباشر بين المضيفين والضيوف
• **تسجيل الدخول ببصمة الوجه**: مصادقة بيومترية آمنة للوصول السريع
• **متعدد اللغات**: دعم كامل للغة الإنجليزية والعربية
• **المراجعات والتقييمات**: نظام شفاف للتعليقات لضمان الثقة والجودة
• **خرائط تفاعلية**: استكشف العقارات مع تكامل خرائط متقدم

💼 **للضيوف:**
تصفح آلاف العقارات في جميع أنحاء مصر - من شقق القاهرة إلى شاليهات الساحل الشمالي. قم بالتصفية حسب الميزانية والموقع والمرافق والمزيد. احجز على الفور مع خيارات دفع آمنة. تتبع حجوزاتك، وتواصل مع المضيفين، واترك تقييمات.

🏡 **للمضيفين:**
قم بإدراج عقارك في دقائق باستخدام واجهتنا سهلة الاستخدام. قم بتحميل الصور، وتحديد الأسعار، وإدارة التوفر، وكسب الدخل. الوصول إلى التحليلات التفصيلية، وإدارة الحجوزات، والتواصل مع الضيوف من خلال منصتنا.

🔒 **الأمان والثقة:**
نحن نعطي الأولوية لسلامتك مع القوائم الموثقة والمدفوعات الآمنة والمصادقة البيومترية. فريق دعم العملاء لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك.

📱 **التكنولوجيا:**
تم البناء بأحدث التقنيات بما في ذلك Angular و ASP.NET Core و SignalR للميزات في الوقت الفعلي وتكامل Firebase ومساعد chatbot مدعوم بالذكاء الاصطناعي.`,

      sections: {
        search: {
          name: 'البحث عن العقارات',
          description: 'محرك بحث متقدم للعثور على عقارك المثالي',
          features: [
            'التصفية حسب الموقع ونطاق السعر وغرف النوم والحمامات والمرافق',
            'اختيار نوع العقار (شقة، فيلا، منزل، بنتهاوس، شاليه، استوديو)',
            'الترتيب حسب السعر والتقييم والأحدث والشعبية',
            'حفظ العقارات المفضلة للرجوع إليها لاحقاً',
            'عرض الخريطة التفاعلية مع التجميع',
            'التحقق من التوفر في الوقت الفعلي',
            'بطاقات عقارات تفصيلية مع الصور والتقييمات'
          ],
          keywords: ['search', 'find', 'looking', 'show', 'browse', 'explore', 'filter', 'property', 'apartment', 'villa'],
          keywordsAr: ['بحث', 'ابحث', 'دور', 'عايز', 'محتاج', 'اريد', 'عقار', 'شقة', 'فيلا', 'منزل']
        },

        booking: {
          name: 'نظام الحجز',
          description: 'تجربة حجز سلسة مع مدفوعات آمنة',
          features: [
            'تقويم التوفر في الوقت الفعلي',
            'تأكيد الحجز الفوري',
            'طرق دفع متعددة (تكامل Stripe)',
            'تاريخ وإدارة الحجوزات',
            'إنشاء الفواتير تلقائياً',
            'سياسات الإلغاء والاسترداد',
            'مراسلة الضيف والمضيف أثناء الحجز',
            'إشعارات البريد الإلكتروني لتحديثات الحجز'
          ],
          keywords: ['book', 'reserve', 'reservation', 'stay', 'check-in', 'checkout', 'rent', 'payment'],
          keywordsAr: ['حجز', 'احجز', 'حجوزات', 'إقامة', 'دفع', 'استئجار']
        },

        hosting: {
          name: 'أضف عقارك',
          description: 'اكسب الدخل من خلال إدراج عقارك',
          features: [
            'إنشاء قائمة عقارات سهل',
            'تحميل الصور بالسحب والإفلات',
            'إدارة التسعير والتوفر',
            'تقويم الحجز والجدولة',
            'أدوات التواصل مع الضيوف',
            'لوحة تحكم الأرباح والتحليلات',
            'رؤى أداء العقار',
            'تأكيدات الحجز التلقائية',
            'إدارة المراجعات'
          ],
          keywords: ['host', 'list', 'add', 'create', 'property', 'my property', 'earn', 'income', 'owner'],
          keywordsAr: ['مضيف', 'اضافة', 'إضافة', 'عقاري', 'املك', 'بيع', 'تأجير', 'دخل']
        },

        account: {
          name: 'حساب المستخدم',
          description: 'إدارة ملفك الشخصي وتفضيلاتك',
          features: [
            'تخصيص الملف الشخصي مع تحميل الصورة',
            'مصادقة بيومترية ببصمة الوجه',
            'تتبع تاريخ الحجوزات',
            'مجموعة العقارات المفضلة',
            'إدارة طرق الدفع',
            'تفضيلات الإشعارات',
            'اختيار اللغة (الإنجليزية/العربية)',
            'إعدادات الأمان',
            'التحقق من الحساب'
          ],
          keywords: ['account', 'profile', 'settings', 'login', 'register', 'face id', 'password', 'security'],
          keywordsAr: ['حساب', 'الحساب', 'الملف الشخصي', 'تسجيل', 'دخول', 'إعدادات', 'أمان']
        },

        features: {
          name: 'ميزات المنصة',
          description: 'ميزات متقدمة تجعلنا فريدين',
          features: [
            'مساعد chatbot مدعوم بالذكاء الاصطناعي (السمسارة)',
            'إشعارات في الوقت الفعلي عبر SignalR',
            'تسجيل الدخول ببصمة الوجه للوصول السريع',
            'خرائط تفاعلية مع البحث عن الموقع',
            'دعم متعدد اللغات (EN/AR)',
            'تصميم متجاوب لجميع الأجهزة',
            'دعم الوضع الداكن/الفاتح',
            'مرشحات بحث متقدمة',
            'قائمة الرغبات والمفضلات',
            'نظام المراجعات والتقييمات',
            'المراسلة المباشرة بين المستخدمين',
            'إشعارات البريد الإلكتروني',
            'إنشاء فاتورة PDF',
            'تكامل وسائل التواصل الاجتماعي',
            'التحليلات والرؤى للمضيفين'
          ],
          keywords: ['features', 'how', 'what', 'capabilities', 'tools', 'technology', 'ai', 'chatbot'],
          keywordsAr: ['مميزات', 'خصائص', 'كيف', 'ماذا', 'أدوات', 'تقنية', 'ذكاء اصطناعي']
        },

        help: {
          name: 'المساعدة والدعم',
          description: 'احصل على المساعدة عندما تحتاجها',
          features: [
            'دعم chatbot AI على مدار الساعة طوال أيام الأسبوع',
            'قسم الأسئلة الشائعة الشامل',
            'نموذج الاتصال للاستفسارات',
            'دعم البريد الإلكتروني',
            'دروس فيديو وأدلة',
            'منتدى المجتمع',
            'دعم الدردشة المباشرة',
            'مركز المساعدة مع المقالات',
            'نصائح السلامة والأمان'
          ],
          keywords: ['help', 'support', 'contact', 'question', 'how to', 'tutorial', 'guide', 'faq'],
          keywordsAr: ['مساعدة', 'دعم', 'اتصال', 'سؤال', 'كيف', 'شرح', 'مركز المساعدة']
        }
      }
    }
  };

  /**
   * Get full site description
   */
  getFullDescription(lang: 'en' | 'ar' = 'en'): string {
    return this.siteInfo[lang].fullDescription;
  }

  /**
   * Get site overview
   */
  getSiteOverview(lang: 'en' | 'ar' = 'en'): string {
    const info = this.siteInfo[lang];
    return `${info.name}\n${info.tagline}\n\n${info.description}`;
  }

  /**
   * Get section information
   */
  getSectionInfo(sectionKey: string, lang: 'en' | 'ar' = 'en'): SiteSection | null {
    const section = this.siteInfo[lang].sections[sectionKey as keyof typeof this.siteInfo.en.sections];
    if (!section) return null;

    return {
      name: section.name,
      description: section.description,
      features: section.features,
      keywords: section.keywords,
      keywordsAr: section.keywordsAr
    };
  }

  /**
   * Detect which section user is asking about
   */
  detectSection(query: string, lang: 'en' | 'ar' = 'en'): string | null {
    const lowerQuery = query.toLowerCase();
    const sections = this.siteInfo[lang].sections;

    let bestMatch: { section: string; score: number } = { section: '', score: 0 };

    Object.entries(sections).forEach(([key, section]) => {
      let score = 0;
      const keywords = lang === 'ar' ? section.keywordsAr : section.keywords;

      keywords.forEach(keyword => {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          score += 2;
        }
      });

      if (score > bestMatch.score) {
        bestMatch = { section: key, score };
      }
    });

    return bestMatch.score > 0 ? bestMatch.section : null;
  }

  /**
   * Get formatted section response
   */
  getSectionResponse(sectionKey: string, lang: 'en' | 'ar' = 'en'): string {
    const section = this.getSectionInfo(sectionKey, lang);
    if (!section) return '';

    if (lang === 'ar') {
      return `📌 **${section.name}**\n\n${section.description}\n\n✨ **الميزات:**\n${section.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}`;
    } else {
      return `📌 **${section.name}**\n\n${section.description}\n\n✨ **Features:**\n${section.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}`;
    }
  }

  /**
   * Get all sections summary
   */
  getAllSectionsSummary(lang: 'en' | 'ar' = 'en'): string {
    const sections = this.siteInfo[lang].sections;

    if (lang === 'ar') {
      let summary = '🏠 **أقسام المنصة:**\n\n';
      Object.values(sections).forEach((section, i) => {
        summary += `${i + 1}. **${section.name}**: ${section.description}\n`;
      });
      return summary;
    } else {
      let summary = '🏠 **Platform Sections:**\n\n';
      Object.values(sections).forEach((section, i) => {
        summary += `${i + 1}. **${section.name}**: ${section.description}\n`;
      });
      return summary;
    }
  }
}
