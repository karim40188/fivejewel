import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navbar from '../_components/Navbar/Navbar';
import Footer from '../_components/Footer/Footer';
import Script from 'next/script'; // استيراد Script من next/script

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title = locale === "ar" ? "الجواهر الخمسة" : "Five Jewel";
  const description = locale === "ar"
    ? "الجواهر الخمسة - شريكك الموثوق في خدمات الغسيل الفاخرة. نقدم حلولًا سريعة وموثوقة وصديقة للبيئة لجميع احتياجات الغسيل الخاصة بك. من الغسيل العادي إلى التنظيف الجاف، نضمن أن يتم التعامل مع ملابسك بعناية فائقة وتوصيلها بتميز."
    : "Five Jewel - Your trusted partner for premium laundry services. We offer fast, reliable, and eco-friendly solutions for all your laundry needs. From washing to dry cleaning, we ensure your clothes are treated with care and delivered with excellence.";

  return {
    title: title,
    description: description,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // نتحقق من أن اللغة المدخلة صالحة
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // نحصل على الرسائل المترجمة
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <head>
        <meta
          name="description"
          content={
            locale === "ar"
              ? "الجواهر الخمسة - شريكك الموثوق في خدمات الغسيل الفاخرة..."
              : "Five Jewel - Your trusted partner for premium laundry services..."
          }
        />
      </head>
      <body>
        {/* إضافة Meta Pixel باستخدام Script */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1316476476361735');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* إضافة Snapchat Pixel باستخدام Script */}
        <Script id="snapchat-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){
              if(e.snaptr) return;
              var a=e.snaptr=function(){
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
              };
              a.queue=[];
              var s='script';
              var r=t.createElement(s);
              r.async=!0;
              r.src=n;
              var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);
            })(window,document,'https://sc-static.net/scevent.min.js');

            snaptr('init', '83b9a2bf-8509-41ac-8271-bb0966c0d804', {
              'user_email': '__INSERT_USER_EMAIL__'
            });

            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>

        {/* إضافة noscript داخل body */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1316476476361735&ev=PageView&noscript=1"
            alt="Facebook Pixel"
          />
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://tr.snapchat.com/v2/p?pid=83b9a2bf-8509-41ac-8271-bb0966c0d804&ev=PAGE_VIEW"
            alt="Snapchat Pixel"
          />
        </noscript>

        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className='mt-[100px]'>
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}