import AnimatedSection from './AnimatedSection';

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      title: "Мебель по душе",
      description: "Каждое изделие создаётся вручную — с любовью и вниманием к деталям."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Натуральные материалы",
      description: "Используем только экологически чистую древесину и безопасные лаки."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "По вашему желанию",
      description: "Создаём мебель под размеры вашего дома и стиль жизни."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Без спешки и с комфортом",
      description: "Работаем без нервов и давления — ведь хорошее требует времени."
    }
  ];

  // Base64 SVG pattern for graph paper texture
  const paperTexture = `
    data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="graph" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#D3CBB8" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="40" height="40" fill="url(#graph)" />
      </svg>
    `)}`
    .replace(/\s+/g, '')
    .trim();

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('${paperTexture}')`,
        backgroundColor: '#FEFDF7'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FAF8F4] opacity-70"></div>

      <div className="relative container mx-auto px-4">
        <AnimatedSection animation="fadeIn" className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Почему выбирают <span className="font-medium text-[#8DB892]">МебельЭко</span>
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            Потому что мы делаем не просто мебель — мы создаём уют, тепло и гармонию в вашем доме.
          </p>
        </AnimatedSection>

        {/* Responsive Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <AnimatedSection
              key={index}
              animation="slideUp"
              delay={index * 150}
              className="group"
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 text-center h-full transform group-hover:-translate-y-2">
                <div className="flex justify-center items-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8DB892] to-[#7BA583] text-white transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#8DB892] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
